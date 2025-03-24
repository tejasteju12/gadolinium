import jwt from "jsonwebtoken";
const payload: jwt.JwtPayload = {
  iss: "https://github.com/tejasteju12",
  sub: "tejasteju12",
};
const secretKey =  "HelloWorld";
const token = jwt.sign(payload, secretKey,{
  algorithm: "HS256",
  expiresIn: "7d",
});

console.log("Token",token);
try{
  const decoded = jwt.verify(token, secretKey);
  console.log("Decoded",decoded); 
} catch (error) {
  console.error("Error decoding token", error);
}