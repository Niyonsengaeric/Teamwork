import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import users from './routes/users';
import articles from './routes/articles';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v2', users);
app.use('/api/v2', articles);

app.use((req, res, next) => {
  const error = new Error('resource not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: error.status || 500, error: error.message });
  next();
});

const { PORT } = process.env;

app.listen(PORT);

export default app;
