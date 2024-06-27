const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // firstName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // lastName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
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
    // address: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
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


const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});


const OrderItems = sequelize.define('OrderItems', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id',
      },
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
});


module.exports = { User, Order, OrderItems };