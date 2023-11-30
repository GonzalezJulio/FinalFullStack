export default (req, res, next) => {
    let status = 404;
    let from = `${req.method} ${req.url}`;
    let message = "Not found endpoint";
    return res.status(404).json({ status, from, message });
  };