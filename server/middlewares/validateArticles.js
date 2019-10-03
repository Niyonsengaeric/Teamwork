import Joi from 'joi';

const validateArticle = (article) => {
  const schema = {
    title: Joi.string()
      .max(120)
      .required(),
    article: Joi.string()
      .min(5)
      .max(1024)
      .required(),
  };

  return Joi.validate(article, schema);
};
export default validateArticle;
