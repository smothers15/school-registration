const {Course} = require('../models');
const departments = ['Math', 'English', 'Music', 'Art', 'PE', 'World Language', 'Social Studies', 'Science'].sort();

module.exports.viewAll = async function(req, res) {
    const courses = await Course.findAll();
    res.render('course/view_all', {courses});
}

module.exports.viewProfile = async function(req, res) {
    const course = await Course.findByPk(req.params.id, {
        include: 'students'
    });
    res.render('course/profile', {course});
}

module.exports.renderEditForm = async function(req, res) {
    const course = await Course.findByPk(req.params.id);
    res.render('course/edit', {course, departments});
}

module.exports.updateCourse = async function(req, res) {
    const course = await Course.update({
        name: req.body.name,
        department: req.body.department,
        instructor_name: req.body.instructor_name,
        description: req.body.description
    },{
        where: {
            id:req.params.id
        }
    });
    res.redirect(`/courses/profile/${req.params.id}`);
}

module.exports.renderAddForm = async function(req, res) {
    const course = {
        name: '',
        department: departments[0],
        instructor_name: '',
        description: ''
    }
    res.render('course/add', {course, departments});

}

module.exports.addCourse = async function(req, res) {
    const course = await Course.create({
        name: req.body.name,
        department: req.body.department,
        instructor_name: req.body.instructor_name,
        description: req.body.description
    });
    res.redirect(`/courses/profile/${course.id}`);
}

module.exports.deleteCourse = async function(req, res) {
    await Course.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/courses');
}