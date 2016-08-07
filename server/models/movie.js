'use strict';

module.exports = function(sequelize, DataTypes) {
    let Movie = sequelize.define("Movie", {
        title: DataTypes.STRING,
        year: DataTypes.STRING,
        DirectorId: DataTypes.INTEGER,
        genre: DataTypes.STRING,
        description: DataTypes.STRING,
        synopsis: DataTypes.STRING,
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        }
    }, {
        classMethods: {
            associate: function(models) {
                Movie.belongsTo(models.Director);
            }
        }
    });
    return Movie;
};
