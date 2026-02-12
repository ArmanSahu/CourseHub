function getProfile(req,res){
    res.status(200).json({message:"Hii"});
}
function getUserCourse(req,res){
    res.status(200);
}

module.exports = {getProfile,getUserCourse};