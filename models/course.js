'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.Student, {
        through: 'student_courses',
        as: 'students',
        foreignKey: 'course_id',
        otherKey: 'student_id',
        timestamps: false
      })
    }
  };
  Course.init({
    name: DataTypes.STRING,
    instructor_name: DataTypes.STRING,
    department: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    timestamps: false,
    tableName: 'courses'
  });
  return Course;
};