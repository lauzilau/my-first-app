import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth";
import NotInvited from "./NotInvited";
import "./App.css";

const questions = [
  { a: "Immer zu spät", b: "Immer zu früh" },
  { a: "Nie wieder Internet", b: "Nie wieder Handy" },
  { a: "Unsichtbar sein", b: "Gedanken lesen können" },
  { a: "Immer ehrlich sein müssen", b: "Nie ein Geheimnis behalten können" },
  { a: "Im Sommer frieren", b: "Im Winter schwitzen" },
];

export default function App() {
  const [session, setSession] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [votes, setVotes] = useState(null);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) checkIfVoted();
    setChosen(null);
    setVotes(null);
  }, [index, session]);

  async function checkIfVoted() {
    const { data } = await supabase
      .from("votes")
      .select("side")
      .eq("question_index", index)
      .eq("user_id", session.user.id);

    if (data && data.length > 0) {
      setAlreadyVoted(true);
      fetchVotes();
    } else {
      setAlreadyVoted(false);
    }
  }

  async function fetchVotes() {
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

  async function choose(side) {
    if (alreadyVoted) return;
    setChosen(side);

    const { error: insertError } = await supabase.from("votes").insert({
      question_index: index,
      side,
      user_id: session.user.id,
    });
    console.log("insert error:", insertError);

    const { data, error: selectError } = await supabase
      .from("votes")
      .select("side")
      .eq("question_index", index);
    console.log("votes data:", data, "select error:", selectError);

    const total = data?.length || 0;
    const aCount = data?.filter((v) => v.side === "a").length || 0;
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

  if (session === undefined) return null;
  if (session === null) return <Auth />;
  if (!session.user.email_confirmed_at) return <NotInvited />;

  const question = questions[index];
  const isLast = index === questions.length - 1;

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
          className={`card left ${chosen === "a" || alreadyVoted ? "chosen" : ""} ${chosen || alreadyVoted ? "locked" : ""}`}
          onClick={() => !chosen && !alreadyVoted && choose("a")}
        >
          {question.a}
          {votes && <span className="vote">{votes.a}%</span>}
        </button>

        <span className="oder">ODER</span>

        <button
          className={`card right ${chosen === "b" || alreadyVoted ? "chosen" : ""} ${chosen || alreadyVoted ? "locked" : ""}`}
          onClick={() => !chosen && !alreadyVoted && choose("b")}
        >
          {question.b}
          {votes && <span className="vote">{votes.b}%</span>}
        </button>
      </div>

      {(chosen || alreadyVoted) && (
        <button className="next-btn" onClick={isLast ? restart : next}>
          {isLast ? "Nochmal spielen" : "Nächste Frage →"}
        </button>
      )}
    </div>
  );
}