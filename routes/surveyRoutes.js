const _ = require("lodash");
const { URL } = require("url");
const { Path } = require("path-parser");

const mongoose = require("mongoose");
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) =>
    res.send("Thanks for voting!")
  );

  app.post("/api/surveys/webhooks", (req, res) => {
    // process events with correct pathname pattern
    // then extract a list of object with email, surveyId, and choice
    // unmatched events becaome undefined
    _.chain(req.body)
      .map(({ email, url }) => {
        const pathname = new URL(url).pathname;
        const p = new Path("/api/surveys/:surveyId/:choice");
        const match = p.test(pathname);
        if (match) {
          return { email, ...match };
        }
      })
      // filter out undefined
      .compact()
      // filter out duplications (no duplicated (email, surveyId))
      .uniqBy("email", "surveyId")
      // assemble a mongoDB querry and execute
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  // Create a survey and send emails
  app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // console.log(survey);

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credit -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
