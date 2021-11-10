const {io} = require("socket.io-client");

const socket = io('ws://127.0.0.1:7931',{
    withCredentials: true
})

socket.on("connect",()=>{
    console.log('socket connected')
})

export {socket};