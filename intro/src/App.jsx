import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Main from "./Components/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Main />
      <footer className="w-full flex justify-center items-center text-[0.8rem] text-center m-1">
        <p class="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="https://www.frontendmentor.io/profile/IndranjanaChatterjee">Indranjana Chatterjee</a>.
        </p>
      </footer>
    </>
  );
}

export default App;
