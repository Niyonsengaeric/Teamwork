import Joi from 'joi';
import response from '../helpers/response';

const validatecomment = (req, res, next) => {
  const schema = {
    comment: Joi.string()
      .required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
  next();
};
export default validatecomment;
