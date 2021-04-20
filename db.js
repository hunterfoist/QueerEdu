const Sequelize = require('sequelize');
const sequelize = new Sequelize("QueerEdu", "postgres", "password",{
    host: "localhost",
    dialect: "postgres", 
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     }
    }
);

sequelize.authenticate().then(
    function() {
        console.log('Connected to QueerEdu postgres database');
    },
    function(err){
        console.log(err);
    }
);

const User = sequelize.import('./models/user-model');
const Lesson = sequelize.import('./models/lesson-model');
const Post = sequelize.import('./models/post-model');



User.hasMany(Lesson)
Lesson.belongsTo(User)
User.hasMany(Post)
Lesson.belongsTo(User)
module.exports = {
  User,
  Lesson,
  Post,
};

module.exports = sequelize;