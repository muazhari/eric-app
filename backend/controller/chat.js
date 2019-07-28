const mongoose = require('mongoose')
const Utils = require('../Utils')

// const Room = mongoose.model('Room')

const roomList = {}

module.exports = io => {
  function socketIdsInRoom(roomName) {
    const socketIds = io.nsps['/'].adapter.rooms[roomName].sockets
    if (socketIds) {
      const collection = []
      for (const key in socketIds) {
        collection.push(key)
      }
      return collection
    }
    return []
  }

  function createRoom(roomName, error) {
    roomList[roomName] = {
      member: [],
      countMembers: 1,
      messages: [],
    }
    // }
  }

  function findMember(socketId) {
    for (const roomName in roomList) {
      for (let i = 0; i < roomList[roomName].member.length; i++) {
        if (roomList[roomName].member[i].socketId == socketId) {
          return roomList[roomName].member[i]
        }
      }
    }
    return null
  }

  io.on('connection', socket => {
    console.log('connection')

    socket.on('disconnect', () => {
      console.log('Disconnect')
    })

    socket.on('room-pre-create', (data, callback) => {
      console.log('room-pre-create')
      const { roomName, userId } = data
      socket.join(roomName)
      socket.roomName = roomName
      // socket.broadcast.to(roomName).emit('newMeclient')
      const socketIds = socketIdsInRoom(roomName)
      roomList[roomName].countMembers += 1
      roomList[roomName].member.push({
        socketId: socket.id,
        userId,
      })
      console.log(JSON.stringify(roomList))
      callback(socketIds.length)
      const roomNameList = Object.keys(roomList)
      socket.broadcast.to(roomName).emit('room-post-join', { roomNameList })
    })

    socket.on('room-pre-join', data => {
      console.log('room-pre-join')
      const { roomName, userId } = data
      createRoom(roomName)
      roomList[roomName].participant.push({
        socketId: socket.id,
        userId,
      })

      roomList.countMembers = roomList[roomName].participant.length

      socket.join(roomName)
      socket.roomName = roomName
      socket.userId = userId

      socket.broadcast.to(roomName).emit('room-post-join', { roomName, userId })
    })

    socket.on('room-pre-left', data => {
      console.log('room-left')
      const { roomName, userId } = data
      createRoom(roomName)
      roomList[roomName].participant.push({
        socketId: socket.id,
        userId,
      })

      socket.join(roomName)
      socket.roomName = roomName
      socket.userId = userId

      socket.broadcast.to(roomName).emit('room-post-left', { roomName, userId })
    })

    socket.on('message-pre-send', data => {
      console.log('message-send')
      const { roomName, userId, message } = data
      roomList[roomName].messages.push({
        userId,
        message,
        createdAt: Utils.getCurrentDateTime(),
      })
      socket.broadcast.to(roomName).emit('message-post-send', {
        userId,
        message,
      })
    })
  })
}
