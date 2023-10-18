import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    // const [fullName,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const credential = {email,password};
        console.log(credential);
        setEmail('');   setPassword('');

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
                console.log(res.fullName);
                const username =res.fullName;
                if(username){
                    navigate("/dashboard" , {state : {name : username}});
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