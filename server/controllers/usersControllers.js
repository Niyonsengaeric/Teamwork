import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validateUser from '../middlewares/validateUser';
import validateLogin from '../middlewares/validateLogin';
import users from '../models/usersModels';
import response from '../helpers/response';

class usersController {
  static async regUser(req, res) {
    try {
      const { error } = validateUser(req.body);

      if (error) {
        return response.response(
          res,
          422,
          'error',
          `${error.details[0].message}`,
          true,
        );
      }

      const user = await users.filter(
        (usermail) => usermail.email.toLowerCase() === req.body.email.toLowerCase(),
      );
      if (user.length > 0) {
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
        // Add to object
        const addUser = {
          id: users.length + 1,
          firstName,
          lastName,
          email,
          password,
          gender,
          jobRole,
          department,
          address,
          isAdmin: false,
        };
        const salt = await bcrypt.genSalt(10);
        addUser.password = await bcrypt.hash(addUser.password, salt);
        users.push(addUser);
        const hideitems = { ...addUser };
        delete hideitems.password;

        const useremail = await users.filter(
          (usermail) => usermail.email.toLowerCase() === req.body.email.toLowerCase(),
        );
        const token = jwt.sign(
          { id: useremail[0].id, isAdmin: useremail[0].isAdmin },
          process.env.JWT,
        );
        const data = { token };
        return response.response(
          res,
          201,
          'user registered successfully',
          data,
          false,
        );
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  static async loginUser(req, res) {
    try {
      const { password } = req.body;
      const { error } = validateLogin(req.body);
      if (error) {
        return response.response(
          res,
          422,
          'error',
          `${error.details[0].message}`,
          true,
        );
      }

      const user = await users.filter(
        (usermail) => usermail.email.toLowerCase() === req.body.email.toLowerCase().trim(),
      );
      if (user.length > 0) {
        if (bcrypt.compareSync(password, user[0].password)) {
          const token = jwt.sign(
            { id: user[0].id, isAdmin: user[0].isAdmin },
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
    } catch (error) {
      return error;
    }
  }
}
export default usersController;
