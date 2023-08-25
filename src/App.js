import React from 'react';
import Die from './components/Die';
import './styles.css';
import { nanoid } from 'nanoid'

function App() {

    //our state for dice values
    const [dice, setDice] = React.useState(randomArray())

    //function to give us an array of objects to set to state. Gives us random number. 
    function randomArray() {
      const diceValueArray = []
      for (let i = 0; i < 10; i++) {
        diceValueArray.push({
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        })
     }

     return diceValueArray
    }
    
    //function for button to reset dice
    function newDice() {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return (die.isHeld === true ? die : {...die, value: Math.ceil(Math.random() * 6)})
        })
      })
    }

    function holdDice(id) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return (
            die.id === id ? {...die, isHeld: !die.isHeld} : die
          )
        })
      })  
    }

    //mapping over state to turn into JSX elements
    const diceArray = dice.map((die) => (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>))

  return (
    <main className="main">
      <h1 className="header">Tenzies</h1>
      <h3 className="header-instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
      <div className="die-container">
        {diceArray}
        <button className="button-reroll" onClick={newDice}>Roll Again</button>
      </div>
    </main>
  );
}

export default App;
