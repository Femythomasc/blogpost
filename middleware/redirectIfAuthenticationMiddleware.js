module.exports = async(req,res,next) =>{
    if(req.session.UserId){
        return res.redirect('/')
    }
    next();
}