import React from 'react';
import Die from './components/Die';
import Timer from './components/Timer';
import './styles.css';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

function App() {

    //our state for dice objects. This array of objects will hold information we can use to build our dice components. 
    const [dice, setDice] = React.useState(randomArray())

    //our state that changes when the game ends. 
    const [tenzies, setTenzies] = React.useState(false)

    //state to display timer
    const [displayTimer, setDisplayTimer] = React.useState(false)

    //issues
    // clearInterval does not seem to be stopping my timer
    // figure out which button will do what. Do we need another button to show the time?
  
  //TIMER CODE   

    //two states to hold time when game starts and when game finishes
    const [time, setTime] = React.useState(0)
    const [start, setStart] = React.useState(false)
 
    //useRef will help us run a timer without rerendering our entire component
    // const intervalRef = React.useRef(null)


    React.useEffect(() => {
      let interval
      if (start) {
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 10)
        }, 10)
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval)
    }, [start])

    function startGame() {
      setStart(true)
    }

    function gameWon() {
      setStart(false)
    }

    function endGame() {
      setStart(false)
      setTime(0)
    }

    // function startGame() {
    //   setTime(Date.now())
    //   setNow(Date.now())
    //   stopTimer = setInterval(() => (
    //       setTime(Date.now())
    //   ), 10);
    // } 

  
    //useEffect in order to keep our two states in sync 
    React.useEffect(() => {
      const firstValue = dice[0].value 
      const isAllHeld = dice.every((die) => (die.isHeld === true))
      const isAllSame = dice.every((die) => (die.value === firstValue))
      if (isAllHeld && isAllSame) {
          setTenzies(true)
        } 
      } 
      , [dice])

    //function to give us an array of objects to set to state. Uses for loop to create 10 objects. 
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
    
    //function for button to reset dice values
    function newDice() {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return (die.isHeld === true ? die : {...die, value: Math.ceil(Math.random() * 6)})
        })
      })
    }

    //function to click on dice. clicking dice will change the isHeld value. 
    function holdDice(id) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return (
            die.id === id ? {...die, isHeld: !die.isHeld} : die
          )
        })
      })  
    }

    //function to reset the game 
    function newGame() {
      setTenzies(false)
      setDice((prevDice) => {
        return (
          prevDice.map((die) => (
          {
           value: Math.ceil(Math.random() * 6),
           isHeld: false,
           id: nanoid()
          }
          ))
        )
      })

      setDisplayTimer((prevState) => (!prevState))
    }

    //mapping over state to turn our array of objects into JSX elements
    const diceArray = dice.map((die) => (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>))


  return (
    <div>
    <main className="main">
    <h1 className="header">Tenzies</h1>
      <h3 className="header-instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
      {tenzies && <Confetti></Confetti>}
      <div className="die-container">
        {diceArray}
      </div>
   
        <h3>
          <span>{("0" + Math.floor(time / 60000) % 60).slice(-2)}</span>
          <span>{("0" + Math.floor(time / 1000) % 60).slice(-2)}</span>
          <span>{("0" + (time / 10) % 1000).slice(-2)}</span>
        </h3>
    
      <div className="button-container">
          <button className="button-reroll" onlick={newDice}>Roll Again</button>
          <button className="button-reroll" onClick={startGame}> sStart Game </button>
          <button className="button-reroll" onClick={gameWon}>something</button>
      </div>
   
      {/* <h3 className="header-instructions-2">The game will start when you click your first die.</h3>  */}
      
    </main>
    </div>
  );
}

export default App;
