module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
        },
            password:{
                type:  DataTypes.STRING,
                allowNull: false,
            },   
      
            firstName:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            lastName:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            contentArea:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            gradeLevel:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            state:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            schoolName:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            teacherOrStudent:{
                type:  DataTypes.STRING,
                allowNull: false,
            },

            profileImage: {
                type:  DataTypes.STRING,
                allowNull: true,
            }
     })
     return User;
    }