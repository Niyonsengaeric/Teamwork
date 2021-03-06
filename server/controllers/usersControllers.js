import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Client } from 'pg';
import dotenv from 'dotenv';
import validateUser from '../middlewares/validateUser';
import validateLogin from '../middlewares/validateLogin';
import response from '../helpers/response';

dotenv.config();
const { DATABASE_URL } = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString,
});
client.connect();

class usersController {
  static async regUser(req, res) {
    const user = await client.query('SELECT * FROM users WHERE email=$1 ', [req.body.email.toLowerCase()]);
    if (user.rows.length > 0) {
      response.response(res, 409, 'error', 'User with that email already registered', true);
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        department,
        address,
      } = req.body;
      const salt = await bcrypt.genSalt(10);
      const newpassword = await bcrypt.hash(password, salt);
      client.query('INSERT INTO users(first_name, last_name, email, password, gender, job_role, department,address,is_admin)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
        firstName,
        lastName,
        email.toLowerCase(), newpassword,
        gender.toUpperCase(), jobRole, department, address, 'false',
      ]);

      const userinfo = await client.query('SELECT * FROM users WHERE email=$1 ', [
        req.body.email.toLowerCase(),
      ]);
      const token = jwt.sign(
        { id: userinfo.rows[0].id, isAdmin: userinfo.rows[0].is_admin },
        process.env.JWT,
      );
      const data = { token };
      return response.response(
        res,
        201,
        'User registered successfully',
        data,
        false,
      );
    }
    return response;
  }

  static async loginUser(req, res) {
    const { password } = req.body;
    const userinformations = await client.query('SELECT * FROM users WHERE email=$1', [
      req.body.email.toLowerCase().trim(),
    ]);
    if (userinformations.rows.length > 0) {
      if (bcrypt.compareSync(password, userinformations.rows[0].password)) {
        const token = jwt.sign(
          { id: userinformations.rows[0].id, isAdmin: userinformations.rows[0].is_admin },
          process.env.JWT,
        );
        const data = { token };
        response.response(res, 200, 'Login successfully', data, false);
      } else {
        return response.response(
          res,
          401,
          'error',
          'Invalid user or password',
          true,
        );
      }
    } else {
      return response.response(
        res,
        401,
        'error',
        'Invalid user or password',
        true,
      );
    }
    return response;
  }
}
export default usersController;
