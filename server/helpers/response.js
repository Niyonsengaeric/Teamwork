class Responding {
  static response(res, statusCode, mess, data, error = false) {
    if (error) {
      return res.status(statusCode).json({
        status: statusCode,
        error: data,
      });
    }
    return res.status(statusCode).json({
      status: statusCode,
      message: mess,
      data,
    });
  }
}
export default Responding;
