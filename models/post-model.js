module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('post', {
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fileUpload: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Post;
};