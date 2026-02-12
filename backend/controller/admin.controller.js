function createCourse(req,res){
    return res.status(200).json({message:"Done"});
}
function updateCourse(req,res){
    return res.status(200).json({message:"Done"});
}
function deleteCourse(req,res){
    return res.status(200).json({message:"Done"});
}
function getUsers(req,res){
    return res.status(200).json({message:"Done"});
}

module.exports = ({
    createCourse,
    updateCourse,
    deleteCourse,
    getUsers
})