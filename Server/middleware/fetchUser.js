var jwt = require('jsonwebtoken');
const JWT_SECRETE = '6thsemProj';

const fetchuser = (req, res,next) => {

    //get user from token and add id to request obj
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"please authenticate with valid token"});
    }

    try {
        const data = jwt.verify(token,JWT_SECRETE);
        req.user = data.user;
        next();
    } 
    catch (error) {
        return res.status(401).send({error:"please authenticate with valid token"});
    }
}
module.exports = fetchuser;