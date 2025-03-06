export const isAuthenticated = (req, res, next) => {
  console.log("Yes it is authenticated we allow you to login");
  next();
};
