import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {FindApplications} from "../wailsjs/go/main/App";

function App() {
    const [input, setInput] = useState('');
    const [applications, setApplications] = useState<string[]>([]);
    const [listItems, setListItems] = useState<JSX.Element[]>([]);
    const updateInput = (e: any) => setInput(e.target.value);

    const search = (e: any) => {
        const input = e.target.value;
        setInput(input);
        FindApplications(input).then((result) => {
            console.log(result);
            setApplications(result);
            const items = result.map(i => <li>{i}</li>);
            setListItems(items);
        });
    }

    return (
        <div id="App">
            <div id="input">
                <input id="name" onChange={search} autoComplete="off" name="input" type="text"/>
                <ul>{listItems}</ul>
            </div>
        </div>
    )
}

export default App
