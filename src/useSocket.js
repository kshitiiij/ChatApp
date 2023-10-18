import { useEffect } from "react"
import socket from "./socket";

const useSocket = () => {
    useEffect(() => {
        socket.connect();
    },[])
}