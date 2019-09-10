import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validate from "../middlewares/validateUser";
import users from "../models/usersModels";
import express from "express";
import response from "../helpers/response";
const router = express.Router();

class usersController {
  // Register new User
  static async regUser(req, res) {
    const { error } = validate(req.body);

    if (error)
      return response.response(
        res,
        422,
        "error",
        `${error.details[0].message}`,
        true
      );

    // (error.details[0].message

    const user = await users.filter(
      user => user.email.toLowerCase() === req.body.email.toLowerCase()
    );
    if (user.length > 0) {
      return response.response(
        res,
        409,
        "error",
        "User with that email already registered",
        true
      );
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        department,
        address
      } = req.body;
      // Add to object
      const addUser = {
        id: users.length + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        jobRole: jobRole,
        department: department,
        address: address,
        is_admin: false
      };
      const salt = await bcrypt.genSalt(10);
      addUser.password = await bcrypt.hash(addUser.password, salt);

      users.push(addUser);
      const hideitems = { ...addUser };
      delete hideitems.password;

      const user = await users.filter(
        user => user.email.toLowerCase() === req.body.email.toLowerCase()
      );
      const token = jwt.sign(
        { id: user[0].id, is_admin: user[0].is_admin },
        process.env.JWT
      );
      const data = {
        token,
        firstname: firstName.trim(),
        lastName: lastName.trim(),
        gender: gender.trim(),
        email: email.trim(),
        department: department.trim(),
        jobRole: jobRole.trim()
      };

      response.response(res, 201, "User created successfully", data, false);
    }
  }
}
export default usersController;
