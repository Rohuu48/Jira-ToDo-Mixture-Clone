const AuthenticationCheck = ({ isLoggedIn, children }) => {
  return isLoggedIn ? null : children;
};
export default AuthenticationCheck;
