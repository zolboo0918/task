exports.checkRole = (role) => {
  return (req, res, next) => {
    if (!req.role.includes(role)) {
      // throw new Error("Таний эрх хүрэлцэхгүй байна");
      res.status(403).json({
        success: false,
        error: "Таний эрх хүрэлцэхгүй байна",
      });
    }
    next();
  };
};
