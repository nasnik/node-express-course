//done after week 4 video
const authorize = (req, res, next) => {
    const {user} = req.query;
    if(user === 'john'){
        req.user = {name: 'john', id: 3};
        next();
    }
    else{
        res.status(401).send('Unauthorized');
    }
}
//done according to week 4 optional assignment
const authCookies = (req, res, next) => {
    if (req.cookies.name) {
        req.user = req.cookies.name;
        next();
    } else {
        res.status(401).json({ message: "unauthorized" });
    }
};
module.exports = {authorize, authCookies};