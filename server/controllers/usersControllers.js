import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validateUser from '../middlewares/validateUser';
import validateLogin from '../middlewares/validateLogin';
import users from '../models/usersModels';
import response from '../helpers/response';

class usersController {
  // Register new User
  static async regUser(req, res) {
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

    // (error.details[0].message

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

      return response.response(
        res,
        201,
        'User created successfully',
        token,
        false,
      );
    }
    return response;
  }

  // User log in
  static async loginUser(req, res) {
    const { password } = req.body;
    // ###validate userlogin
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
        response.response(res, 200, 'success', token, false);
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
