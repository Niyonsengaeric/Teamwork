import Joi from 'joi';

function validateArticle(user) {
  const schema = {
    title: Joi.string()
      .max(120)
      .required(),
    article: Joi.string()
      .min(5)
      .max(1024)
      .required(),
  };

  return Joi.validate(user, schema);
}
export default validateArticle;
