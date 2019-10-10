import Joi from 'joi';
import response from '../helpers/response';

const validateFlag = (req, res, next) => {
  const schema = {
    reason: Joi.string()
      .min(5)
      .max(120)
      .required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
  next();
};
export default validateFlag;
