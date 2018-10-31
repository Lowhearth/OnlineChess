
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4000

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('newMove', (selectedTile, selectedPiece, newPosition) => {
    console.log("moveMade")
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log(selectedTile + JSON.stringify(selectedPiece) + newPosition)
  //  io.sockets.emit('change color', color)
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
