import response from '../helpers/response';

const adminChecker = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return response.response(res, 403, 'error', 'You dont have a permission to perform this action', true);

  next();
  return (isAdmin);
};
export default {
  adminChecker,
};
