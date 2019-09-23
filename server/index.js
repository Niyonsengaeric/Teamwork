// importing routes
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import users from './routes/users';
import articles from './routes/articles';
import response from './helpers/response';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1', users);
app.use('/api/v1', articles);

// catch a non existing resource
app.use('*', (req, res) => {
  // res.status(404).send('resource not found');
  response.response(res, 404, 'error', 'resource not found', true);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is Running on port ${PORT}`);
});

export default app;
