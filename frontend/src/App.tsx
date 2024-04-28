import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";

function App() {
    const [input, setInput] = useState('');
    const updateInput = (e: any) => setInput(e.target.value);

    return (
        <div id="App">
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateInput} autoComplete="off" name="input" type="text"/>
            </div>
        </div>
    )
}

export default App
