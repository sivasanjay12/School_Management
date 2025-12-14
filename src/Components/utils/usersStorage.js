// usersStorage.js - Temporary storage for users
let users = [];

export const addUser = (userData) => {
  const newUser = {
    id: Date.now(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

export const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const validateUser = (username, password) => {
  return users.find(user => user.username === username && user.password === password);
};

export const getAllUsers = () => {
  return [...users];
};