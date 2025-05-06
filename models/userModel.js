import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import bcrypt from "bcrypt";

const User = sequelize.define('User', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING(30),  
    allowNull: false,
  },
  instrument: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false,
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: false,
  createdAt: "createdAt",  // Instead of "created_at"
  updatedAt: "updatedAt",  // Instead of "updated_at"
});

// Hash the password before creating a user
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Remove sensitive data and format dates in JSON response
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  
  // Format dates
  if (values.createdAt) {
    values.createdAt = formatDate(values.createdAt);
  }
  
  if (values.updatedAt) {
    values.updatedAt = formatDate(values.updatedAt);
  }
  
  // Remove password
  delete values.password;
  
  // Return the object with desired fields
  return {
    userID: values.userID,
    userName: values.userName,
    role: values.role,
    instrument: values.instrument,
    createdAt: values.createdAt,
    updatedAt: values.updatedAt
  };
};

// Validate password
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Format date as DD.MM.YYYY
function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export default User;
