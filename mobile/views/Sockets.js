const { Alert } = require("react-native");
// const io = require("socket.io-client");
import io from "socket.io-client";
const moment = require("moment");
import Utils from "./Utils";

let socket = null;

const getSocket = () => {
  return socket;
};

const getConnect = () => {
  socket = io.connect(Utils.getSocketIOIP(), {
    timeout: 10000,
    jsonp: false,
    transports: ["websocket"],
    autoConnect: false,
    agent: "-",
    // path: '/', // Whatever your path is
    pfx: "-",
    // key: token, // Using token-based auth.
    // passphrase: cookie, // Using cookie auth.
    cert: "-",
    ca: "-",
    ciphers: "-",
    rejectUnauthorized: "-",
    perMessageDeflate: "-"
  });
};

const onConnect = () => {
  socket.on("connect", callback => {
    console.log("connect");
  });
};

// const emitClientDisconnect = () => {
//   socket.emit("disconnect", callback => {
//     console.log("by client disconnect");
//   });
// };

const emitRoomCreate = (roomName, userId) => {
  socket.emit("room-pre-create", { roomName, userId }, callback => {
    if (callback) {
      const { memberViewer } = callback;
      Utils.getContainer("chats").setState({
        memberViewer
      });
    }
  });
  console.log("room-pre-create");
};

const onRoomCreate = () => {
  socket.on("room-post-create", callback => {
    if (callback) {
      const { roomList } = callback;
      Utils.getContainer("chats").setState({ roomNameList });
    }
  });
  console.log("room-post-create");
};

const emitRoomJoin = (roomName, userId) => {
  socket.emit(
    "room-pre-join",
    { roomName, userId },
    // countMembers verified by server.
    data => {
      if (data) {
        const { countMembers, liveStatus } = data;
        Utils.getContainer("chats").setState({
          countMembers
        });
      }
    }
  );
  console.log("room-pre-join");
};

const onRoomJoin = () => {
  socket.on("room-post-join", callback => {
    if (callback) {
      const { memberViewer } = callback;
      Utils.getContainer("chats").setState({ memberViewer });
    }
  });
  console.log("room-post-join");
};

const emitRoomLeave = (roomName, userId) => {
  socket.emit(
    "room-pre-leave",
    {
      roomName,
      userId
    },
    callback => {
      if (callback) {
        const { lobbyName } = callback;
        emitRoomJoin(lobbyName, userId);
      }
    }
  );

  console.log("room-pre-leave");
};

const onRoomLeave = () => {
  socket.on("room-post-leave", callback => {
    console.log("room-post-leave");
    if (callback) {
      const { memberViewer } = callback;
      Utils.getContainer("chats").setState({ memberViewer });
    }
  });
  console.log("room-post-leave");
};

const emitRoomSendMessage = (roomName, userId, message) => {
  socket.emit("room-pre-send-message", {
    roomName,
    userId,
    message
  });

  console.log("room-pre-send-message");
};

const onRoomSendMessage = () => {
  socket.on("room-post-send-message", callback => {
    const { userId, message } = callback;
    listMessages = Utils.getContainer("chats").state.listMessages;
    const newListMessages = listMessages.slice();
    newListMessages.push({
      userId,
      message
    });
    Utils.getContainer("chats").setState({
      listMessages: newListMessages
    });
  });

  console.log("room-post-send-message");
};

const Sockets = {
  getSocket,
  getConnect,
  onConnect,

  emitRoomCreate,
  onRoomCreate,
  emitRoomJoin,
  onRoomJoin,
  emitRoomLeave,
  onRoomLeave,

  emitRoomSendMessage,
  onRoomSendMessage
};
export default Sockets;
