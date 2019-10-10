import Joi from 'joi';
import response from '../helpers/response';

const signupValidator = (req, res, next) => {
  const schema = {
    firstName: Joi.string()
      .max(50)
      .trim()
      .uppercase()
      .regex(/^\S*$/)
      .required(),
    lastName: Joi.string()
      .regex(/^\S*$/)
      .max(50)
      .uppercase()
      .required(),
    email: Joi.string()
      .regex(/^\S*$/)
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
      .valid(['M', 'F', 'MALE', 'FEMALE'])
      .uppercase()
      .required(),
    jobRole: Joi.string()
      .regex(/^\S*$/)
      .max(15)
      .required(),
    department: Joi.string()
      .regex(/^\S*$/)
      .min(2)
      .max(15)
      .required(),
    address: Joi.string()
      .regex(/^\S*$/)
      .max(15)
      .required(),
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
  next();
};
export default signupValidator;
