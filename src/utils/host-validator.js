export const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS || "").split(",");

export const validateHost = (req, res, next) => {
  const host = req.headers.host;
  if (ALLOWED_HOSTS.includes(host)) {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};
