import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import users from './routes/users';
import response from './helpers/response';
import articles from './routes/articles';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v2', users);
app.use('/api/v2', articles);

app.use('*', (req, res) => {
  response.response(res, 404, 'error', 'resource not found', true);
});

const { PORT } = process.env;

app.listen(PORT);

export default app;
