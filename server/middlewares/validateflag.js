import Joi from 'joi';

const validateArticle = (flag) => {
  const schema = {
    reason: Joi.string()
      .max(120)
      .required(),
  };

  return Joi.validate(flag, schema);
};
export default validateArticle;
