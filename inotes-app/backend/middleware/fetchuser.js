const jwt = require('jsonwebtoken');
const JWT_SECRET = 'For All Time Always.'
const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token');

    if(!token){
        res.status(401).json({error:'Access Denied'});
    }
    try{
    const data = jwt.verify(token,JWT_SECRET);
    // console.log(data);
    req.user = data.id;
    next();}
    catch(error){
        res.status(401).json({error:'Access Denied'});
    }
}
module.exports = fetchuser; 