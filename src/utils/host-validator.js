export const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS || "").split(",");

export const validateHost = (req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_HOSTS.includes(origin)) {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};
