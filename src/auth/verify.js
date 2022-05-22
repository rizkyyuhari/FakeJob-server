const { verify } = require("jsonwebtoken");
module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, process.env.SECRET_KEY, (err, decode)=>{
            if(err){
                res.send({
                    succes  :false,
                    message: 'Invalid Token'
                })
            }
            else{
                next()
            }
        })
    }
    else{
        return res.send({
            succes : false,
            message : 'Access Denied! Unauthorized user'
        })
    }
  },
};
