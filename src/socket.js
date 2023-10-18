import {io} from "socket.io-client";

const socket = new io('http://localhost/5500', {
    autoConnect:false
})

export default socket;