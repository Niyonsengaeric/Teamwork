import Joi from 'joi';

const validatecomment = (comment) => {
  const schema = {
    comment: Joi.string()
      .required(),
  };

  return Joi.validate(comment, schema);
};
export default validatecomment;
