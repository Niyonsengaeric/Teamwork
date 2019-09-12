import Joi from 'joi';

function validatelogin(comment) {
  const schema = {
    comment: Joi.string()
      .required(),
  };

  return Joi.validate(comment, schema);
}
export default validatelogin;
