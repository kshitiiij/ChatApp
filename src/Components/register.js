import {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [fullName,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        //the page will refresh after hitting the button , this will prevent it from refreshing
        e.preventDefault();
        const user = {fullName,email,password};
        setName(''); setEmail(''); setPassword('');
        console.log(user);
        fetch('https://chatapp-nxzf.onrender.com/auth/register', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'} ,
            body : JSON.stringify(user)
        }).then(() => {
            console.log("user registered!");
            navigate("/dashboard" , {state : {name : fullName}});
        })

    }

    return (
        <div className="register">
            <h1>ChatApp</h1>
            <div className='register-container'>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label> Name: </label>
                    <input 
                        type="text" 
                        required    placeholder='Name'
                        onChange={e => setName(e.target.value)}
                        value={fullName}
                    ></input>
                    <label> Email: </label>
                    <input 
                        type="email" 
                        required    placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value = {email}
                    />
                    <label> Password: </label>
                    <input 
                        type="password" 
                        required    placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        value = {password}
                    />
                    <button className='register-button'>Register</button>
                    {/* <input type="submit" value="Submit" /> */}
                </form>
            </div>
            
        </div>
    )
}

export default Register;



// <form onSubmit={handleSubmit}>
//         <label>Blog Title:</label>
//         <input 
//             type="text" 
//             required
//             onChange={(e) =>setTitle(e.target.value)}
//             value = {title}
//         ></input>
//         <label>Blog Body:</label>
//         <textarea 
//             required
//             value = {body}
//             onChange = {(e) => setBody(e.target.value)}
//         ></textarea>
//         <label>Blog Author:</label>
//         <input 
//             type="text" 
//             required
//             onChange={(e) =>setAuthor(e.target.value)}
//             value = {author}
//         ></input>
//         <button>Add Blog</button>
//             </form>