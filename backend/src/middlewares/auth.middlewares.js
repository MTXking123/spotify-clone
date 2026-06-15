const jwt = require("jsonwebtoken");

const authArtist = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Only artists can access this route",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { authArtist };

async function authUser(req,res){

const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorised"})
    }

   try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "user" && decoded.role !== "artist"){
        return res.status(403).json({ message: "You don't have access"})
    }

    req.user = decoded

    next();
}

   catch(err){
     console.log(err);
     return res.status(401).json({message:"Unauthorised"})
   }
}


module.exports = {authArtist, authUser}