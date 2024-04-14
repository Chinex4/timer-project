import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  const inputPlayerNameRef = useRef(null)
  
  const handleClick = () => {
    if (inputPlayerNameRef.current.value !== '') {
      setPlayerName(inputPlayerNameRef.current.value);
    }
    inputPlayerNameRef.current.value = '';
  }
  return (
    <section id="player">
      <h2>Welcome {playerName ?? "Player 1"}</h2>
      <p>
        <input ref={inputPlayerNameRef} type="text" />
        <button onClick={handleClick}>Set Name </button>
      </p>
    </section>
  );
}
