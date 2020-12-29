function userController(User){
    function getUsersList(req, res){
        const usersList = {};
        User.find(usersList, (error, users)=>{
            if(error){
                res.status(404);
                res.send('Not found');
            }else{
                res.json(users)
            }
        })
    }
    return {getUsersList}
}

module.exports = userController;