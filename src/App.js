import React from 'react';
import Die from './components/Die';
import HighScore from './components/HighScore'
import './styles.css';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

function App() {

    //our state that displays the time
    const [time, setTime] = React.useState(0)

    //our state that starts and stops the timer. timer starts if true. 
    const [start, setStart] = React.useState(false)

    //our state for dice objects. This array of objects will hold information we can use to build our dice components. 
    const [dice, setDice] = React.useState(randomArray())

    //our state that changes when the game ends. 
    const [tenzies, setTenzies] = React.useState(false)
 
    //current highScore
    React.useEffect(() => {
      localStorage.setItem("score", JSON.stringify(123049))
      const minuteTest = JSON.parse(localStorage.getItem("score"))
      console.log(minuteTest)
    })  

      // React.useEffect(() => {

      //   if (tenzies && !start) {
      //     const highScoreMinutes = JSON.parse(localStorage.getItem("minuteScore"))
      //     const highScoreSeconds = JSON.parse(localStorage.getItem("secondScore"))
      //     const highScoreMilliSeconds = JSON.parse(localStorage.getItem("millSecondScore"))
        
      //     const currentMinutes = (0 + Math.floor(time / 60000) % 60).slice(-2)
      //     const currentSeconds = (0 + Math.floor(time / 1000) % 60).slice(-2)
      //     const currentMilliseconds = (0 + (time / 10) % 1000).slice(-2)
          
      //     if (highScoreMinutes >= currentMinutes && highScoreSeconds >= currentSeconds && highScoreMilliSeconds >= currentMilliseconds) {
      //       localStorage.setItem("minuteScore", JSON.stringify(currentMinutes))
      //       localStorage.setItem("secondScore", JSON.stringify(currentSeconds))
      //       localStorage.setItem("millisecondScore", JSON.stringify(currentMilliseconds))
      //     }
      //   } 
  
      //   }, [tenzies, time, start])


      React.useEffect(() => {

        if (tenzies && !start) {
          const highScore = JSON.parse(localStorage.getItem("score"))
      
          const score = time
          
          if (highScore >= score) {
            localStorage.setItem("minuteScore", JSON.stringify(score))
          }
        } 
  
        }, [tenzies, time, start])

    //useEffect checks every die for win condition. All dice must be held and have the same value.  
    React.useEffect(() => {
      const firstValue = dice[0].value 
      const isAllHeld = dice.every((die) => (die.isHeld === true))
      const isAllSame = dice.every((die) => (die.value === firstValue))
      if (isAllHeld && isAllSame) {
          setTenzies(true)
          setStart(false)
        } 
 
      } 
      , [dice])

    //this useEffect is super clever. Triggers when start changes. If timer = t, then we set the interval to add 10 to time every 10 milliseconds. 
    //If timer = f, we clear interval and stop the time from continuously adding.   
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


    //starts game. Goes on start game btn.
    function startGame() {
      setStart(true)
      setDice((prevDice) => {
        return (
          prevDice.map((die) => (
          {
           value: Math.ceil(Math.random() * 6),
           isHeld: false,
           id: nanoid(),
          }
          ))
        )
      })
    }

    //function to reset the game. Goes on new game btn. 
    function newGame() {
      setTime(0)
      setTenzies(false)
      setStart(false)
      setDice((prevDice) => {
        return (
          prevDice.map((die) => (
          {
           value: Math.ceil(Math.random() * 6),
           isHeld: false,
           id: nanoid(),
          }
          ))
        )
      })
    }

    //function to give us an array of objects to set to state. Uses for loop to create an array of 10 objects. We map over later. 
    function randomArray() {
      const diceValueArray = []
      for (let i = 0; i < 10; i++) {
        diceValueArray.push({
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid(),
        })
     }

     return diceValueArray
    }
    
    //function for button to reset dice values. Goes on Roll Again btn.
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

    //mapping over state to turn our array of objects into JSX elements
    const diceArray = dice.map((die) => (
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} checkTimer={start}/>
    ))

    const minutes = <span>{("0" + Math.floor(time / 60000) % 60).slice(-2)}</span>    
    const seconds = <span>{("0" + Math.floor(time / 1000) % 60).slice(-2)}</span>
    const milliSeconds = <span>{("0" + (time / 10) % 1000).slice(-2)}</span>     


      

  return (
    <div>
    <main className="main">
    <h1 className="header">Tenzies</h1>
      <h3 className="header-instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
      {tenzies && <Confetti></Confetti>}
      <div className="die-container">
        {diceArray}
      </div>
  
        <HighScore minutes={minutes} seconds={seconds} milliSeconds={milliSeconds}/>
        <h3 className="timer">
          {minutes}
          <span>.</span>
          {seconds}
          <span>.</span>
          {milliSeconds}
        </h3>

      <div className="button-container">
         {tenzies || start ? <button className="button-reroll" onClick={newGame}>New Game</button> :
          <button className="button-reroll" onClick={startGame}> Start Game </button>}
          <button className="button-reroll" onClick={start ? newDice : () => {}}>Roll Again</button>
      </div>   
    </main>
    </div>
  );
}

export default App;
