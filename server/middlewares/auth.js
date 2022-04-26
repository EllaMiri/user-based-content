export function secure(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("You must login...");
  }
}
