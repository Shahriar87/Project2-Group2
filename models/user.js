module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        username: {
            type: Sequelize.TEXT
        },
 
        about: {
            type: Sequelize.TEXT
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        Q1: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        },

        Q2: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        },

        Q3: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        },

        Q4: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        },

        Q5: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        }
 
 
    });
 
    return User;
 
}