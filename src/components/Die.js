import { React } from "react"
import "../styles.css"

export default function Die(props) {
    
    //color change when die is clicked
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFF"
    }

    //didnt know how to create conditional die faces based on die number value in CSS. 
    //Decided to write the code using Conditional Styling in my component.

    //declaration of CSS Grid Variables
    let dot
    let dotTypeA
    let dotTypeB
    let dotTypeC
    let dotTypeD
    let dotTypeE
    let dotTypeF
    let dotTypeG

    //conditional to style dice based on value
    if (props.value === 1) {
        return (
                dotTypeD = {gridArea: "d"},

                dot = <div className="die-face" style={styles} onClick={props.checkTimer ? props.holdDice : () => {}}>
                        <span style={dotTypeD} className="dot"></span>
                      </div>
                )
    } else if (props.value === 2) {
        return (
                dotTypeA = {gridArea: "a"}, dotTypeG = {gridArea: "g"},

                dot = <div className="die-face" style={styles} onClick={props.checkTimer ? props.holdDice : () => {}}>
                        <span style={dotTypeA} className="dot"></span>
                        <span style={dotTypeG} className="dot"></span>
                      </div>
                )
    } else if (props.value === 3) {
        return (
                dotTypeA = {gridArea: "a"}, dotTypeD = {gridArea: "d"}, dotTypeG = {gridArea: "g"}, 

                dot = <div className="die-face" style={styles} onClick={props.checkTimer ? props.holdDice : () => {}}>
                         <span style={dotTypeA} className="dot"></span>
                         <span style={dotTypeD} className="dot"></span>
                         <span style={dotTypeG} className="dot"></span>
                      </div>
                )
    } else if (props.value === 4) {
        return (
                dotTypeA = {gridArea: "a"}, dotTypeB = {gridArea: "b"},  dotTypeF = {gridArea: "f"},  dotTypeG = {gridArea: "g"},

                dot = <div className="die-face" style={styles} onClick={props.checkTimer ? props.holdDice : () => {}}>
                        <span style={dotTypeA} className="dot"></span>
                        <span style={dotTypeB} className="dot"></span>
                        <span style={dotTypeF} className="dot"></span>
                        <span style={dotTypeG} className="dot"></span>
                      </div>
                )
    } else if (props.value === 5) {
        return (
                dotTypeA = {gridArea: "a"}, dotTypeB = {gridArea: "b"},  dotTypeD = {gridArea: "d"}, dotTypeF = {gridArea: "f"},
                dotTypeG = {gridArea: "g"},
                

                dot = <div className="die-face" style={styles} onClick={props.checkTimer ? props.holdDice : () => {}}>
                        <span style={dotTypeA} className="dot"></span>
                        <span style={dotTypeB} className="dot"></span>
                        <span style={dotTypeD} className="dot"></span>
                        <span style={dotTypeF} className="dot"></span>
                        <span style={dotTypeG} className="dot"></span>
                      </div>
                )
    } else if (props.value === 6) {
        return (
                dotTypeA = {gridArea: "a"}, dotTypeB = {gridArea: "b"},  dotTypeC = {gridArea: "c"},  dotTypeE = {gridArea: "e"},
                dotTypeF = {gridArea: "f"}, dotTypeG = {gridArea: "g"},

                dot = <div className="die-face" style={styles} onClick={props.checkTimer ? props.holdDice : () => {}}>
                        <span style={dotTypeA} className="dot"></span>
                        <span style={dotTypeB} className="dot"></span>
                        <span style={dotTypeC} className="dot"></span>
                        <span style={dotTypeE} className="dot"></span>
                        <span style={dotTypeF} className="dot"></span>
                        <span style={dotTypeG} className="dot"></span>
                      </div>
                )
    }


    //render dot variable which will carry our JSX element
    return (
        {dot}
    )    
}

// return (
//     <div className="die-face" style={styles} onClick={props.holdDice}>
//         <h2 className="die-number">{props.value}</h2>
//     </div>
// )    