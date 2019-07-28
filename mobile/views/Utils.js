let userId = null;
let roomName = null;
let timeOutMessages = [];

let container = {}; // eslint-disable-line

const socketIOIP = "http://localhost:3333";

const getSocketIOIP = () => {
  return socketIOIP;
};

const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getContainer = containerName => {
  return container[containerName];
};

const setContainer = (containerName, con) => {
  container[containerName] = con;
};

const setUserId = id => {
  userId = id;
};

const getUserId = () => {
  return userId;
};

const setRoomName = name => {
  roomName = name;
};

const getRoomName = () => {
  return roomName;
};

const Utils = {
  isNullOrUndefined,
  getContainer,
  setContainer,
  getUserId,
  setUserId,
  getRoomName,
  setRoomName,
  getSocketIOIP
};

export default Utils;
