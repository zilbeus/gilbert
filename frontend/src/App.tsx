import { useState, useEffect } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { FindApplications, RunApplication } from "../wailsjs/go/main/App";
import {
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  CircleArrowOutUpLeft,
  Option,
} from "lucide-react";

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

interface Application {
  name: string;
  path: string;
  exec: string;
}

function App() {
  const [input, setInput] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [listItems, setListItems] = useState<JSX.Element[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const items = applications.map((item: Application, idx) => (
      <ResultItem item={item.name} id={idx} />
    ));
    setListItems(items);
  }, [selectedItem]);

  const search = (e: any) => {
    const input = e.target.value;
    setInput(input);
    FindApplications(input).then((result) => {
      setApplications(result);
      setSelectedItem(result.length > 0 ? 0 : undefined);
      const items = result.map((item: Application, idx) => (
        <ResultItem item={item.name} id={idx} />
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
          onKeyDown={handleInputBoxKeyInput}
        />
      </div>
    );
  };

  const handleInputBoxKeyInput = (event: any) => {
    if (event.key == "ArrowDown" || event.key == "ArrowUp") {
      handleSelectedItemChange(event);
      return;
    }
    if (event.key == "Enter") {
      if (selectedItem !== undefined) {
        console.log(
          "selected item on enter: " + applications[selectedItem].name,
        );
        RunApplication(applications[selectedItem].name);
      }
    }
  };

  const ResultsBox = (props: ResultsBoxProps) => {
    if (props.items.length === 0) {
      return <></>;
    }

    return (
      <div>
        <ul className="bg-result-list-bg text-neutral-400 p-4">
          {props.items}
        </ul>
      </div>
    );
  };

  const handleSelectedItemChange = (event: any) => {
    let newSelectedItem = selectedItem;
    if (event.key == "ArrowDown") {
      if (selectedItem === undefined || selectedItem === listItems.length - 1) {
        newSelectedItem = 0;
      } else {
        newSelectedItem = selectedItem + 1;
      }
    }
    if (event.key == "ArrowUp") {
      if (selectedItem === undefined || selectedItem <= 0) {
        newSelectedItem = listItems.length - 1;
      } else {
        newSelectedItem = selectedItem - 1;
      }
    }
    setSelectedItem(newSelectedItem);
    event.preventDefault();
  };

  const ResultItem = (props: ResultItemProps) => {
    return (
      <li
        onMouseEnter={() => setSelectedItem(props.id)}
        className={
          props.id === selectedItem
            ? "bg-highlight-bg px-4 py-6 rounded-2xl text-highlight-fg text-neutral-300 text-3xl"
            : "px-4 py-6 rounded-2xl text-neutral-300 text-3xl"
        }
        onClick={() => console.log("Clicked: ", props.item)}
      >
        <div className="flex flex-row justify-between">
          <div>{props.item}</div>
          <ResultSelectionKeyCombination idx={props.id + 1} />
        </div>
      </li>
    );
  };

  const Footer = () => {
    return (
      <div className="p-1 w-full bg-neutral-900 rounded-b-2xl text-lg text-neutral-600 border-t-2 border-neutral-700 text-center">
        <div className="flex justify-center items-center py-1 gap-x-3">
          <UpKeyIcon />
          <DownKeyIcon />
          {"to navigate, "}
          <ReturnKeyIcon />
          {"to select, "}
          <EscapeKeyIcon />
          {"to dismiss"}
        </div>
      </div>
    );
  };

  interface KeyProps {
    child: JSX.Element;
  }

  const KbKeyIcon = (props: KeyProps) => {
    return (
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 text-neutral-400 drop-shadow-lg w-9 h-9">
        <div className="py-2 px-2">{props.child}</div>
      </div>
    );
  };

  const UpKeyIcon = () => {
    return <KbKeyIcon child={<ArrowUp size={18} />} />;
  };

  const DownKeyIcon = () => {
    return <KbKeyIcon child={<ArrowDown size={18} />} />;
  };

  const ReturnKeyIcon = () => {
    return <KbKeyIcon child={<CornerDownLeft size={18} />} />;
  };

  const EscapeKeyIcon = () => {
    return <KbKeyIcon child={<CircleArrowOutUpLeft size={18} />} />;
  };

  const AltKeyIcon = () => {
    return <KbKeyIcon child={<Option size={18} />} />;
  };

  const ResultSelectionKeyCombination = ({ idx }: { idx: number }) => {
    return (
      <div className="flex justify-center items-center text-neutral-400 text-sm gap-x-2">
        <AltKeyIcon />
        <div className="text-lg">+</div>
        <KbKeyIcon child={<div className="text-center">{idx}</div>} />
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
