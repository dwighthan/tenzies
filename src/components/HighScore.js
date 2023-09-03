import React from "react"

export default function HighScore(props) {

    const firstMinutes = <span>{("0" + Math.floor(props.highScore / 60000) % 60).slice(-2)}</span>    
    const firstSeconds = <span>{("0" + Math.floor(props.highScore / 1000) % 60).slice(-2)}</span>
    const firstMilliseconds = <span>{("0" + (props.highScore / 10) % 1000).slice(-2)}</span>   

    const secondMinutes = <span>{("0" + Math.floor(props.secondHighScore / 60000) % 60).slice(-2)}</span>    
    const secondSeconds = <span>{("0" + Math.floor(props.secondHighScore / 1000) % 60).slice(-2)}</span>
    const secondMilliseconds = <span>{("0" + (props.secondHighScore / 10) % 1000).slice(-2)}</span>     

    const thirdMinutes = <span>{("0" + Math.floor(props.thirdHighScore / 60000) % 60).slice(-2)}</span>    
    const thirdSeconds = <span>{("0" + Math.floor(props.thirdHighScore / 1000) % 60).slice(-2)}</span>
    const thirdMilliseconds = <span>{("0" + (props.thirdHighScore / 10) % 1000).slice(-2)}</span>     


    return(
        <div className="high-score-table">
            <ol className="scores">
            <h2 className="scores-header">High Scores</h2>    
                <li>
                    {firstMinutes}
                    <span>.</span>
                    {firstSeconds}
                    <span>.</span>
                    {firstMilliseconds}
                </li>
                <li>
                    {secondMinutes}
                    <span>.</span>
                    {secondSeconds}
                    <span>.</span>
                    {secondMilliseconds}
                </li>
                <li>
                    {thirdMinutes}
                    <span>.</span>
                    {thirdSeconds}
                    <span>.</span>
                    {thirdMilliseconds}
                </li>
            </ol>
        </div>
    )
}