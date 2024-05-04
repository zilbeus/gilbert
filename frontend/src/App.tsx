import {useState, useEffect} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {FindApplications} from "../wailsjs/go/main/App";


interface InputBoxProps {
    value: string;
    onChange: (e: any) => void;
}

interface ResultsBoxProps {
    items: JSX.Element[];
}

interface ResultItemProps {
    item: string;
}

function App() {
    const [input, setInput] = useState('');
    const [applications, setApplications] = useState<string[]>([]);
    const [listItems, setListItems] = useState<JSX.Element[]>([]);

    const search = (e: any) => {
        const input = e.target.value;
        setInput(input);
        FindApplications(input).then((result) => {
            console.log(result);
            setApplications(result);
            const items = result.map(i => <ResultItem item={i}/>);
            setListItems(items);
        });
    }

    const InputBox = (props: InputBoxProps) => {
        return (
            <input
                id="name"
                autoFocus
                className="w-full bg-neutral-900 text-neutral-300 p-4 border-0 focus:outline-none"
                onChange={props.onChange}
                autoComplete="off"
                name="input"
                type="text"
                value={props.value}
            />
        );
    }

    const ResultsBox = (props: ResultsBoxProps) => {
        if (props.items.length === 0) {
            return (<></>);
        }

        return (
            <ul className="bg-neutral-800 text-neutral-400">{props.items}</ul>
        );

    }

    const ResultItem = (props: ResultItemProps) => {
        return (
            <li 
                className="hover:bg-neutral-700" 
                onClick={() => console.log("Clicked: ", props.item)}
            >
                {props.item}
            </li>
        );
    }

    return (
        <div id="App" className="text-4xl">
            <div id="input" className="border-4 border-neutral-800">
                <InputBox value={input} onChange={search}/>
                <ResultsBox items={listItems}/>
            </div>
        </div>
    )
}

export default App
