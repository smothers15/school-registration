const {Student} = require('../models')

//view all
module.exports.viewAll = async function(req, res) {
    const students = await Student.findAll();
    res.render('student/view_all', {students})
}
//profile
module.exports.viewProfile = async function(req, res) {
    const student = await Student.findByPk(req.params.id);
    res.render('student/profile', {student});
}
//render add
module.exports.renderAddForm = function(req, res){
    const student = {
        first_name: '',
        last_name: '',
        grade_level: 9,
    }
    res.render('student/add', {student});
}
//add
module.exports.addStudent = async function(req, res){
    const student = await Student.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        grade_level:req.body.grade_level
    });
    res.redirect(`/students/profile/${student.id}`);
}
//render edit
module.exports.renderEditForm = async function(req, res) {
    const student = await Student.findByPk(req.params.id);
    res.render('student/edit', {student});
}
//edit
module.exports.updateStudent = async function(req, res) {
    const student = await Student.update({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        grade_level:req.body.grade_level,
    },{
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/students/profile/${req.params.id}`);
}
//delete
module.exports.deleteStudent = async function(req, res) {
    await Student.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/students');
}