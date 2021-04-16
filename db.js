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
   module.exports = sequelize;