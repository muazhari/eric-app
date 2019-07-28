import { Alert } from "react-native";
import io from "socket.io-client";
import moment from "moment";
import Utils from "../Config/Utils";
import LiveStatus from "../Config/liveStatus";

let socket = null;

const getSocket = () => {
  return socket;
};

const connect = () => {
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

const handleOnConnect = () => {
  socket.on("connect", callback => {
    console.tron.log("connect");
  });
};

// const emitClientDisconnect = () => {
//   socket.emit("disconnect", callback => {
//     console.tron.log("by client disconnect");
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
  console.tron.log("room-pre-create");
};

const OnRoomCreate = () => {
  socket.on("room-post-create", callback => {
    if (callback) {
      const { memberViewer } = callback;
      Utils.getContainer("chats").setState({ memberViewer });
    }
  });
  console.tron.log("room-post-create");
};

const emitRoomJoin = (roomName, userId) => {
  socket.emit(
    "room-pre-join",
    { roomName, userId },
    // countViewer verified by server.
    data => {
      if (data) {
        const { countViewer, liveStatus } = data;
        Utils.getContainer("chats").setState({
          countMembers
        });
      }
    }
  );
  console.tron.log("room-pre-join");
};

const OnRoomJoin = () => {
  socket.on("room-post-join", callback => {
    if (callback) {
      const { memberViewer } = callback;
      Utils.getContainer("chats").setState({ memberViewer });
    }
  });
  console.tron.log("room-post-join");
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

  console.tron.log("room-pre-leave");
};

const handleOnRoomLeave = () => {
  socket.on("room-post-leave", callback => {
    console.tron.log("room-post-leave");
    if (callback) {
      const { memberViewer } = callback;
      Utils.getContainer("chats").setState({ memberViewer });
    }
  });
  console.tron.log("room-post-leave");
};

const emitRoomSendMessage = (
  roomName,
  userId,
  message,
  productId,
  productImageUrl,
  productUrl
) => {
  socket.emit("room-pre-send-message", {
    roomName,
    userId,
    message,
    productId,
    productImageUrl,
    productUrl
  });

  console.tron.log("room-pre-send-message");
};

const handleOnRoomSendMessage = () => {
  socket.on("room-post-send-message", callback => {
    const {
      userId,
      message,
      productId,
      productImageUrl,
      productUrl
    } = callback;
    listMessages = Utils.getContainer("chats").state.listMessages;
    const newListMessages = listMessages.slice();
    newListMessages.push({
      userId,
      message,
      productId,
      productImageUrl,
      productUrl
    });
    Utils.getContainer("chats").setState({
      listMessages: newListMessages
    });
  });

  console.tron.log("room-post-send-message");
};

const SocketUtils = {
  getSocket,
  connect,
  handleOnConnect,
  emitClientDisconnect,

  emitRoomJoin,
  handleOnRoomJoin,
  emitRoomLeave,
  handleOnRoomLeave,

  emitRoomSendMessage,
  handleOnRoomSendMessage
};
export default SocketUtils;
