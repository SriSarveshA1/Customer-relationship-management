exports.userResponce=(users)=>{
    userResult=[];
    users.forEach(function(user){
        userResult.push({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus
        })
    })
    console.log(userResult);
    return userResult;
}