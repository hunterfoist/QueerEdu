module.exports = (sequelize, DataTypes) => {

    const Lesson = sequelize.define('lesson', {
        lessonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lessonDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fileUpload: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Lesson;
};