const NotFoundMiddleware = (req, res) => {
  res.status(404).send('route not found');
};

export default NotFoundMiddleware;
