import Joi from 'joi';

const signupValidator = (user) => {
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
      .required()
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/),

    gender: Joi.string()
      .max(7)
      .required(),
    jobRole: Joi.string()
      .max(15)
      .required(),
    department: Joi.string()
      .min(2)
      .max(15)
      .required(),
    address: Joi.string()
      .max(15)
      .required(),
  };

  return Joi.validate(user, schema);
};
export default signupValidator;
