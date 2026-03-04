import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import holiMusic from "./assets/holi.mp3";

function App() {
  const [name, setName] = useState("");
  const [showWish, setShowWish] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);

  // Start music on first click anywhere
  useEffect(() => {
    const startMusic = () => {
      if (!musicStarted && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setMusicStarted(true);
      }
    };

    window.addEventListener("click", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
    };
  }, [musicStarted]);

  // Confetti when wish appears
  useEffect(() => {
    if (showWish) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 },
        });
      }, 600);
    }
  }, [showWish]);

  const handleSubmit = () => {
    if (name.trim() !== "") {
      setShowWish(true);
    }
  };

  return (
    <div className="container">
      {!showWish ? (
        <div className="card">
          <h1>🌸 Warm Wishes on the Festival of Colors 🌸</h1>

          <p className="hint">
            🎶 Please click anywhere on the screen to enable music & colors
          </p>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="nameInput"
          />

          <button onClick={handleSubmit}>Reveal Wish 🎆</button>
        </div>
      ) : (
        <div className="wish">
          <h1>🌈 Happy Holi, {name}! 🌈</h1>

          <p>
            On this festival of colors, I sincerely wish you happiness,
            good health, and continued success in everything you do.
            May every color of Holi brighten your journey
            and bring positivity into every step you take. ✨
          </p>

          <br />
          <br />

          <p>
            May this celebration create beautiful memories,
            strengthen bonds, and open new doors of opportunity
            in the coming year.
          </p>

          <p className="signature">
            – With Respect and Warm Wishes, Dhruv 💻
          </p>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src={holiMusic} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;