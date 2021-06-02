// import React, { useState, useEffect } from 'react';
// import firebase from '../Config/Firebase';
// import { Route, Redirect } from 'react-router-dom';
// import Characters from './Characters';
// import Register from '../Auth/Register';

// const IsUserAuth = () => {

//     const [ user, setUser ] = useState(null)
//     //const [ idTokenUser, setIdTokenUser ] = useState(null)

//     useEffect(() => {
//         firebase
//         .auth().onAuthStateChanged();
//         if (user) {
//             setUser(user)
//             setIdTokenUser(idTokenUser)
//             console.log(idTokenResult)
//         }
//     }, [ user ])

//     /* ID TOKEN */

//     // idTokenUser = firebase.auth().currentUser.getIdTokenResult(user);
//     // setIdTokenUser(idTokenUser)
//     // console.log(idTokenResult)

//     /* GUARDED ROUTE */

//     // const ProtectedRoute = ({component: Component, isAuth: isAuth, logOut: logOut,...rest}) => {
//     //     return <Route 
//     //         {...rest}
//     //         render = {(props) => {
//     //             if (user) {
//     //                 <Characters pathname="/main"/>
//     //             }
//     //             else {
//     //                 return ( 
//     //                     <Register pathname="/" />
//     //                 )
//     //             }
//     //         }}
//     //     />
//     // }
 
//     return (
//         <div>
//             {user ? (
//                 <Characters />
//             ) : (
//                 <Register />
//             )}
//             <h1>HomePage</h1>
//             <p>Here will be the display</p>
//         </div>
//     )
// }

// export default IsUserAuth;

/* SECOND TRY */

import React, { useContext, createContext, useState, useEffect } from "react";
import firebase from '../Config/Firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom"
import Characters from "./Characters";
import Register from "../Auth/Register";
import Login from "../Auth/Login";

const App = () => {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <AuthButton />

                    <ul>
                        <li><Link to="/">Register</Link></li>
                        <li><Link to="/main">Main</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/">
                            <Register />
                        </Route>
                        <PrivateRoute>
                            <Characters />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    )
}

const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    const [user, setUser ] = useState(null);

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

const AuthUser = () => {

    const [user, setUser ] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged();
        if (user) {
            setUser(user)
        }
    }, [ user ])

}

export default App;