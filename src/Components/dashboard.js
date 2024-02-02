import { useLocation } from "react-router-dom";
import {useState,useEffect,useRef} from 'react';
import {socket} from '../Util/socket';

const Dashboard = () => {
    //used to get the data passed with the navigate for the name of the user
    const {state} = useLocation();
    const {name,room} = state;

    const [message, setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const mes = useRef(null);
    

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages(messages => [...messages,{message,name}])
        socket.emit("send_message" , {message , name});
        setMessage('');
    }

    useEffect(() => {
        if (mes) {
        mes.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
        }
    }, []);

     useEffect(() => {
            socket.on("message", (data) => {
                setMessages(messages => [...messages,data]);
            })

            socket.on("received_message", (data)=> {
                setMessages(messages => [...messages,data]);
            })

            return (() => {
                socket.off();
            })
    },[]);

    return (
        <div className="message-container">
            <div className="heading">
                <h1 className="appname">ChatApp</h1>
                <h2 className="room">Room {room}</h2>
            </div>
            
            <ul className="chat-container" id="chatList" ref={mes}>
                {messages.map(data => (
                    <div key={data.id}>
                    {name === data.name ? (
                        <li className="self">
                        <div className="msg">
                            <p>{data.name}</p>
                            <h4 className="message">{data.message}</h4>
                        </div>
                        </li>
                    ) : (
                        <li className={data.name === "host" ? "host" : "other"}>
                        <div className="msg">
                            {data.name !== "host" && <p>{data.name}</p>}  
                            <h4 className="message">{data.message}</h4>
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