import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import * as axios from 'axios';

function App() {

    const inputRef = useRef(null);

    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios.get("http://localhost:7542/users").then(res => {
            setUsers(res.data);
        })
    }

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = () => {
        axios.post("http://localhost:7542/users", {name: inputRef.current.value}).then(res => {
            getUsers();
            inputRef.current.value = '';
        })
    }

    return (
        <div>
            <div>
                <input ref={inputRef} />
                <button onClick={createUser}>Create new</button>
            </div>
            <div>
                {users.map((u) => <div>{u.name} {u.key}</div>)}
            </div>
        </div>
    );
}

export default App;
