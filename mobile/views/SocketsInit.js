// const Sockets = require("./Sockets");
import Sockets from "./Sockets"

export default function InitSocketUtils() {
  Sockets.getConnect();
  // Sockets.onConnect()

  Sockets.onRoomCreate();
  Sockets.onRoomJoin();
  Sockets.onRoomLeave();

  Sockets.onRoomSendMessage();
}
