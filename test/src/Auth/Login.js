import React, { useState } from 'react';
import firebase from '../Config/Firebase';
import { useHistory, Link } from 'react-router-dom';
import {  TextField, Button } from '@material-ui/core';

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);

    //const [user, setUser] = useState(null);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                history.push("/main")
                const token = localStorage.getItem("refreshToken", user.refreshToken);
                console.log(token);
                //setUser("user");
                console.log(user);
            })
            .catch((error) => {
                setError(error)
            })
    }

    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            history.push("/");
            //setUser(null);
        });
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column", marginTop: "80px" }}>
            <h1 style={{ color: "rebeccapurple" }}>LOGIN</h1>
            {error && <p className="error-message" style={{color: 'red'}}>{error.message}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField 
                    label="Email"
                    variant="filled"
                    id="email"
                    value={email}
                    type="text"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    style={{fontSize: '12px'}}
                />
                <TextField 
                    label="Password"
                    variant="filled"
                    id="password"
                    value={password}
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={{fontSize: '12px'}}
                />
                <Button type="submit" variant="contained" color="secondary" style={{width: '130px', height: '35px', fontSize: '14px', marginTop: '6px'}}>
                    Login in
                </Button>
            </form>
            <div style={{ margin: "20px 20px" }}>
                Don't have an account? {''}
                <Button variant="contained" color="primary" style={{ width: '130px', height: '35px', fontSize: '14px', padding: '6px'}}>
                    <Link to="/" style={{color: 'white', fontSize: '12px'}}>
                        Register
                    </Link>
                </Button>
            </div>        
        </div>
    )
}

export default Login;