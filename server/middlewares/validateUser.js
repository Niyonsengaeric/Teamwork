import Joi from "joi";
module.exports = function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .max(50)
      .trim()
      .required(),
    lastName: Joi.string()
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(250)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required(),

    gender: Joi.string()
      .max(7)
      .required(),
    jobRole: Joi.string()
      .max(15)
      .required(),
    department: Joi.string()
      .max(15)
      .required(),
    address: Joi.string()
      .max(15)
      .required()
  };

  return Joi.validate(user, schema);
};
