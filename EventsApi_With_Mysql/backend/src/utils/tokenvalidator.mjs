export const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access: No token provided",
    });
  }

  // Add your token validation logic here (e.g., JWT verification)

  // If token is valid, proceed to the next middleware or controller
  next();
};
