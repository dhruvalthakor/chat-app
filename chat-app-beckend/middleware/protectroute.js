const jwt = require("jsonwebtoken");

const user = require("../model/usermodel");

const protectroute=(req,res,next)=>{
    try {
        const token=req.cookie.jwt;
if (!token) {
    return res.status(401).json({ message: "no token procided" });
};
const decode=jwt.verify(token,process.env.JWT_SECRET);
if (!decode) {
    return res.status(401).json({ message: " invelid token" });
}
const user=user.findById=(decode.userId).select("-password");
if (!user) {
    return res.status(404).json({ message: "user not found" });
}

req.user=user;
next();
    } catch (error) {
        console.log("error in protectroute middleware",error.message);
    res.status(500).json({ message: "Internal server error" });
    };
};

module.exports=protectroute;