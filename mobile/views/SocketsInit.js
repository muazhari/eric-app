import Sockets from "./Sockets";

export default function InitSocketUtils() {
  Sockets.connect();
  Sockets.OnConnect();

  Sockets.OnRoomCreate();
  Sockets.OnRoomJoin();
  Sockets.OnRoomLeave();

  Sockets.OnRoomSendMessage();
}
