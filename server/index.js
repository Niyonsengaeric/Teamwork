// importing routes
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import users from './routes/users';
import articles from './routes/articles';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1', users);
app.use('/api/v1', articles);

// catch 405
app.use((req, res, next) => {
  const error = new Error('Method not allowed');
  error.status = 405;
  next(error);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is Running on port ${PORT}`);
});

export default app;
