'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Course, {
        through: 'student_courses',
        as: 'courses',
        foreignKey: 'student_id',
        otherKey: 'course_id',
        timestamps: false
      })
    }
  };
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    grade_level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
    timestamps: false,
    tableName: 'students'
  });
  return Student;
};