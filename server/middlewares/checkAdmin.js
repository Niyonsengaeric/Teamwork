import response from '../helpers/response';

module.exports = function (req, res, next) {
  const { isAdmin } = req.user;
  if (!isAdmin) return response.response(res, 401, 'error', 'You dont have a permission to perform this action', true);

  next();
  return (isAdmin);
};
