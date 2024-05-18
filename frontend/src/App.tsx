import { useState, useEffect } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { FindApplications } from "../wailsjs/go/main/App";

interface InputBoxProps {
  value: string;
  onChange: (e: any) => void;
}

interface ResultsBoxProps {
  items: JSX.Element[];
}

interface ResultItemProps {
  item: string;
  id: number;
}

function App() {
  const [input, setInput] = useState("");
  const [applications, setApplications] = useState<string[]>([]);
  const [listItems, setListItems] = useState<JSX.Element[]>([]);

  const search = (e: any) => {
    const input = e.target.value;
    setInput(input);
    FindApplications(input).then((result) => {
      console.log(result);
      setApplications(result);
      const items = result.map((item, idx) => (
        <ResultItem item={item} id={idx} />
      ));
      setListItems(items);
    });
  };

  const InputBox = (props: InputBoxProps) => {
    return (
      <div
        className={
          props.value?.length > 0
            ? "p-3 bg-neutral-900 rounded-t-2xl border-b-2 border-b-neutral-700"
            : "p-3 bg-neutral-900 rounded-2xl"
        }
      >
        <input
          id="name"
          autoFocus
          className="w-full bg-neutral-800 text-neutral-300 p-4 border-2 focus:outline-none border-neutral-700 rounded-2xl"
          onChange={props.onChange}
          autoComplete="off"
          name="input"
          type="text"
          value={props.value}
        />
      </div>
    );
  };

  const ResultsBox = (props: ResultsBoxProps) => {
    if (props.items.length === 0) {
      return <></>;
    }

    return (
      <ul className="bg-neutral-950 text-neutral-400 p-4">{props.items}</ul>
    );
  };

  const ResultItem = (props: ResultItemProps) => {
    return (
      <li
        className="hover:bg-yellow-900 hover:text-amber-500 p-4 rounded-2xl text-neutral-300"
        onClick={() => console.log("Clicked: ", props.item)}
      >
        <div className="flex flex-row justify-between">
          <div>{props.item}</div>
          <div className="text-lg text-neutral-500 self-center">
            Alt + {props.id + 1}
          </div>
        </div>
      </li>
    );
  };

  const Footer = () => {
    return (
      <div className="p-1 w-full bg-neutral-900 text-neutral-300 rounded-b-2xl text-lg text-neutral-600 border-t-2 border-neutral-700 text-center">
        UP/DOWN to navigate, RET to select, ESC to dismiss
      </div>
    );
  };

  return (
    <div id="App" className="text-4xl border-2 border-neutral-700 rounded-2xl">
      <InputBox value={input} onChange={search} />
      {listItems && listItems.length > 0 && (
        <>
          <ResultsBox items={listItems} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
