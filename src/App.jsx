import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  /**
   * Challenge: Tie off loose ends!
   * 1. If tenzies is true, Change the button text to "New Game"
   * 2. If tenzies is true, use the "react-confetti" package to
   *    render the <Confetti /> component 🎉
   *
   *    Hint: don't worry about the `height` and `width` props
   *    it mentions in the documentation.
   */

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const numberArray = [];
    for (var i = 0; i < 10; i++) {
      numberArray.push(generateNewDie());
    }
    return numberArray;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die, index) => (
    <Die
      value={die.value}
      key={index}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Confetti
        width={500}
        height={500}
        numberOfPieces={1000}
        recycle={false}
      />
    </main>
  );
}
