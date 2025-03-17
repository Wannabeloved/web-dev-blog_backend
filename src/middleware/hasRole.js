export default roles =>
  async function (req, res, next) {
    if (roles.includes(req.user.role)) next();
    else
      res.send({
        status: "error",
        message: "User does not have permission to access this resource",
      });
  };
