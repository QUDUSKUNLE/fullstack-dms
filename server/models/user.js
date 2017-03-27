module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      unique: true,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          as: 'documents'
        });
      }
    }
  });
  return User;
};
