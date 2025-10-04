import jwt from "jsonwebtoken";



export const generateToken = (userId, res) => {
  const {JWT_SECRET}= process.env;
  if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxage: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // accessible only by web server
    sameSite: "Strict", // protect against CSRF
    secure: process.env.NODE_ENV === "development" ? false : true, // https only in production
  })
  return token;
}