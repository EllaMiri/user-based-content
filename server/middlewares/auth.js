export function secure(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("You must login...");
  }
}
