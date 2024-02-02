import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {socket} from '../Util/socket';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [room,setRoom] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const credential = {email,password,room};
        setEmail('');   
        setPassword('');    
        setRoom('');

        fetch('https://chatapp-nxzf.onrender.com/auth/signin', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        // 'Authorization' : 'JWT <token_here>'
                    },    
            body : JSON.stringify(credential)
        }).then((res) => res.json())
        .then((res) => {
            var token = res.token;
            fetch("https://chatapp-nxzf.onrender.com/profile", {
                method :'POST',
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : `JWT ${token}`
                }
            }).then(res => res.json())
            .then(res => {
                const username =res.fullName;
                if(username){
                    socket.emit("join_room", {username,room});
                    navigate("/dashboard" , {state : {name : username, room : room}});
                } else {
                    alert("Please enter valid credential.")
                }
            })
        });


    }

    return (
        <div className="login">
            <h1>ChatApp</h1>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label> Email: </label>
                    <input 
                        type="email" 
                        required    placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        value = {email}
                    />
                    <label> Password: </label>
                    <input 
                        type="password" 
                        required    placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        value = {password}
                    />
                    <label> Room: </label>
                    <input 
                        type="text" 
                        required    placeholder="Room"
                        onChange={e => setRoom(e.target.value)}
                        value = {room}
                    />
                    <button className="login-button">Login</button>
                    {/* <input type="submit" value="Submit" /> */}
                </form>
            </div>
            <div className="register-link">
                <p>If you're not registered!!</p> 
                <Link to = {'/register'}><button>Register</button></Link>
            </div>
            
        </div>
    )
}

export default Login;