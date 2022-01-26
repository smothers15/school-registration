const {Course} = require('../models');

module.exports.viewAll = async function(req, res) {
    const courses = await Course.findAll();
    res.render('course/view_all', {courses});
}

module.exports.viewProfile = async function(req, res) {
    const course = await Course.findByPk(req.params.id);
    res.render('course/profile', {course});
}