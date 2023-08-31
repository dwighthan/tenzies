import React from "react"

export default function HighScore(props) {

    const [highScore, setHighScore] = ("")

    React.useEffect(() => {
        localStorage.setItem("highScore", highScore)
      })

    return(
        <div>
        <h3 className="timer">
          {props.minutes}
          <span>.</span>
          {props.seconds}
          <span>.</span>
          {props.milliSeconds}
        </h3>
            
        </div>
    )
}