const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Enter a valid email'
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4], 
                msg: 'Password must be at least 4 characters long'
            }
        }
    }
}

);

User.login = async function(email, password) {
  const user = await User.findOne({
    where: {
        email: email
    }
  })

  if (user) {
    // console.log(user.password);
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
        return user
    }
    throw Error('Incorrect password')
  }
  throw Error('User not found')
}


User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt)
  console.log('Hashed: ', user.password);
});




module.exports = { User };