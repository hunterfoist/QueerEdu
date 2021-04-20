const User = require("./user-model");
const Lesson = require("./lesson-model");



User.hasMany(Lesson)
Lesson.belongsTo(User)
module.exports = {
  User,
  Lesson,
};