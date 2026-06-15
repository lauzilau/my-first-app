import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./App.css";

const questions = [
  { a: "Immer zu spät", b: "Immer zu früh" },
  { a: "Nie wieder Internet", b: "Nie wieder Handy" },
  { a: "Unsichtbar sein", b: "Gedanken lesen können" },
  { a: "Immer ehrlich sein müssen", b: "Nie ein Geheimnis behalten können" },
  { a: "Im Sommer frieren", b: "Im Winter schwitzen" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [votes, setVotes] = useState(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  useEffect(() => {
    setChosen(null);
    setVotes(null);
  }, [index]);

  async function choose(side) {
    setChosen(side);

    // Save vote to Supabase
    await supabase.from("votes").insert({ question_index: index, side });

    // Fetch all votes for this question
    const { data } = await supabase
      .from("votes")
      .select("side")
      .eq("question_index", index);

    const total = data.length;
    const aCount = data.filter((v) => v.side === "a").length;
    const bCount = total - aCount;

    setVotes({
      a: total ? Math.round((aCount / total) * 100) : 50,
      b: total ? Math.round((bCount / total) * 100) : 50,
    });
  }

  function next() {
    setIndex(index + 1);
  }

  function restart() {
    setIndex(0);
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