import React from "react";

export default ({ input, label, meta: { touched, error } }) => {
  // extract props.input, props.label, props.meta.touched, and props.meta.error

  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text">{touched && error}</div>
    </div>
  );
};
