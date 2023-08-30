import React from 'react'

export default function Time({...props}) {

    const [time, setTime] = React.useState()
    const [now, setNow] = React.useState()

    const intervalRef = React.useRef()

    function handleStart() {
        setTime(Date.now())
        setNow(Date.now())
        intervalRef.current = setInterval(() => {
            setTime(Date.now())
        }, 10);
    }

    function handleStop() {
        clearInterval(intervalRef.current)
    }

    let timePassed = (time - now) / 1000;

    return(
        <div>
            <h2>Time: {timePassed.toFixed(3)}</h2>
            <div>
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
            </div>
        </div>
    )
}