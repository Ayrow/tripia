import { StatusCodes } from 'http-status-codes';

const ErrorHandlerMiddleware = (req, res) => {
  const defaultError = {
    statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(err.keyValue)} field has be unique`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default ErrorHandlerMiddleware;
