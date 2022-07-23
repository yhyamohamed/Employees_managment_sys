import "./App.css";
import {Routes, Route} from "react-router-dom";
import Hello from "./components/Hello";
import Navbar from "./components/Navbar"

import {createContext, useEffect, useState} from "react";
import Login from "./components/Login";
import APIService from "./services/APIService";

import MainRoutes from "./MainRoutes";


export const UserContext = createContext();

function App() {
    const [user, setUser] = useState({
        authenticated: false,
        token: '',
    });
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        if(localStorage.getItem('token')){
            const result = await APIService.get('http://127.0.0.1:8000/api/user', localStorage.getItem('token'));
            if(result.success) {
                setUser({
                    authenticated: true,
                    token: localStorage.getItem('token'),
                    ...result.result.data
                });
                setLoading(false);
            } else {
                localStorage.removeItem('token');
                setUser({
                    authenticated: false,
                    token: ''
                });
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkToken();
    },[]);

    if(loading) {
        return <div>Loading...</div>
    }

    return (
      <UserContext.Provider value={{ user, setUser }}>
        <>

            <Routes>
              <Route exact path="/" element={<Hello />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route path="*" element={<MainRoutes />}></Route>
              
            </Routes>
    
        </>
      </UserContext.Provider>
    );
}

export default App;
