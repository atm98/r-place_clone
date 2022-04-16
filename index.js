const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server)

const CANVAS_ROW = 50
const CANVAS_COLUMN = 50
var canvas = [ ]

for(var rows =  0;rows < CANVAS_ROW;rows++){
    canvas[rows] = []
    for(var cols = 0;cols < CANVAS_COLUMN;cols++){
        canvas[rows][cols] = '#FFF'
    }
}

app.use(express.static('public'))

io.on("connection", socket => {
    socket.emit('canvas',canvas)
    socket.on('color',data =>{
        canvas[data.row-1][data.col -1] = data.color
        io.emit("canvas",canvas)
    })
})

server.listen(3000)
