import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import {useState,useEffect} from 'react';

const socket = io.connect("https://chatapp-nxzf.onrender.com")

const Dashboard = () => {
    //used to get the data passed with the navigate for the name of the user
    const {state} = useLocation();
    const {name} = state;

    const [message, setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages(messages => [...messages,{message,name}])
        if(message.length>0) {
            console.log("notblank");
            socket.emit("send_message" , {message , name});
        }
        setMessage('');
    }

     useEffect(() => {
            socket.on("received_message", (data)=> {
                setMessages(messages => [...messages,data]);
            })

            return (() => {
                socket.off();
            })
    },[]);

    return (
        <div className="message-container">
            <h1>ChatApp</h1>
            <ul className="chat-container" id="chatList">
                {messages.map(data => (
                    <div key={data.id}>
                    {name === data.name ? (
                        <li className="self">
                        <div className="msg">
                            <p>{data.name}</p>
                            <div className="message"> {data.message}</div>
                        </div>
                        </li>
                    ) : (
                        <li className="other">
                        <div className="msg">
                            <p>{data.name}</p>
                        <div className="message"> {data.message} </div>
                        </div>
                        </li>
                    )}
                    </div>
                ))}
            </ul>


            <div className="send-container">
                <form>
                    <input 
                        type="text" required placeholder="Message" className="message-input" value = {message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button className="send-button" onClick={sendMessage}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Dashboard;