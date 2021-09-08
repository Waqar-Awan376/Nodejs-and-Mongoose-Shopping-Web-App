module.exports=(req,res,next)=>
{
    if(!req.user.role==='user')
    {
        res.redirect('/auth/login');
    }
    next();
}