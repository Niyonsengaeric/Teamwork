import response from '../helpers/response';

module.exports = function (req, res, next) {

  if (!req.user.is_admin) return response.response(res, 401, 'error', 'You dont have a permission to perform this action', true);

  next();
  return ()
};
