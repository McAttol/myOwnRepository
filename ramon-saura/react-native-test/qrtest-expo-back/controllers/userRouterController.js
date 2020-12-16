function userController(User){
    function getUserList(req, res){
        const usersList = {}
        User.find(usersList, (error, users)=>{
            if(error){
                res.status(404);
                res.send("Not found");
            }else{
                res.json(users);
            }
        })
    }
    return {getUserList}
}

module.exports = userController;