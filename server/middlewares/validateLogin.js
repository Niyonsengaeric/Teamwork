import Joi from 'joi';
import response from '../helpers/response';

const validatelogin = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .max(250)
      .trim()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
  next();
};
export default validatelogin;
