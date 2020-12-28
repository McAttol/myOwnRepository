function userController(User){
    function getUser(req, res){
        res.send(req.user)
    }
    function newUser(req, res){
        const user = new User(req.body)
        if(!req.body.passport){
            res.status(400);
            res.send("Passport number is required")
        } else {
            user.save()
            res.status(201)
            res.json(user)
        }
    }
    function upLoad(req, res){
        const {user} = req;
        if (user){
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.passport = req.body.passport;
            user.address = req.body.address;
            user.phone = req.body.phone;
            user.save((err)=>{
                if (err){
                    res.send(err)
                }else{
                    res.json(user)
                }
            })
        }

    }
    return {getUser, newUser, upLoad}
}

module.exports = userController;