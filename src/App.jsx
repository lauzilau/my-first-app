import { useState } from "react";
import "./App.css";

const questions = [
  { a: "Immer zu spät", b: "Immer zu früh" },
  { a: "Nie wieder Internet", b: "Nie wieder Handy" },
  { a: "Unsichtbar sein", b: "Gedanken lesen können" },
  { a: "Immer ehrlich sein müssen", b: "Nie ein Geheimnis behalten können" },
  { a: "Im Sommer frieren", b: "Im Winter schwitzen" },
];

function getRandomVote() {
  const a = Math.floor(Math.random() * 40) + 30;
  return { a, b: 100 - a };
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [votes, setVotes] = useState(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function choose(side) {
    setChosen(side);
    setVotes(getRandomVote());
  }

  function next() {
    setIndex(index + 1);
    setChosen(null);
    setVotes(null);
  }

  function restart() {
    setIndex(0);
    setChosen(null);
    setVotes(null);
  }

  if (index >= questions.length) {
    return (
      <div className="container">
        <h1>Fertig! 🎉</h1>
        <button className="next-btn" onClick={restart}>Nochmal spielen</button>
      </div>
    );
  }

  return (
    <div className="container">
      <p className="counter">{index + 1} / {questions.length}</p>
      <h1 className="headline">Entweder Oder</h1>

      <div className="cards">
        <button
          className={`card left ${chosen === "a" ? "chosen" : ""} ${chosen ? "locked" : ""}`}
          onClick={() => !chosen && choose("a")}
        >
          {question.a}
          {votes && <span className="vote">{votes.a}%</span>}
        </button>

        <span className="oder">ODER</span>

        <button
          className={`card right ${chosen === "b" ? "chosen" : ""} ${chosen ? "locked" : ""}`}
          onClick={() => !chosen && choose("b")}
        >
          {question.b}
          {votes && <span className="vote">{votes.b}%</span>}
        </button>
      </div>

      {chosen && (
        <button className="next-btn" onClick={isLast ? restart : next}>
          {isLast ? "Nochmal spielen" : "Nächste Frage →"}
        </button>
      )}
    </div>
  );
}