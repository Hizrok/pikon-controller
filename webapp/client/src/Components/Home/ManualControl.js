import React, {useState} from "react"
import { Button, Collapse } from "react-bootstrap"
import Slider from "../General/Slider"

function ManualControl() {

  const ws = new WebSocket("ws://localhost:3001")

  const [state, setState] = useState({
    xRotation: 0,
    zRotation: 0,
    focus: 0,
    canRotate: true,
    canFocus: true
  })
  const [open, setOpen] = useState(false)

  function handleChange(event) {
    const {name, value} = event.target
    if (name === "focus") {
      setState(prevState => {
        return {...prevState, [name]: value, canFocus: true}
      }
    )
    } else {
      setState(prevState => {
        return {...prevState, [name]: value, canRotate: true}
      }
    )
    }
  }
  function handleClick(event) {
    const {name} = event.target
    sendTask(name)
    if (name === "canRotate" || name === "canFocus") {
      setState(prevState => {
          return {...prevState, [name]: false}
        }
      )
    }
    
  }
  function sendTask(taskName) {
    let task = ""
    switch (taskName) {
      case "canRotate":
        task = `MANUAL,rotate,${state.xRotation},${state.zRotation}`
        break;
      case "canFocus":
          task = `MANUAL,focus,${state.focus}`
          break;
      case "photo":
        task = "MANUAL,photo"
        break;
      default:
        task = "this error is because default trigger in switch at manual control send task"
        break;
    }
    ws.send(task)
    return () => {
      ws.close()
    }
  }

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h3 className="card-title mb-0">Manual control</h3>
            <Button variant={open ? "primary" : "secondary"} onClick={() => setOpen(!open)}>{open ? "on" : "off"}</Button>           
          </div>
          <Collapse in={open}>
            <div>
              <Slider 
                title="X rotation" 
                name="xRotation" 
                handleChange={handleChange} 
                value={state.xRotation} 
              />    
              <Slider 
                title="Z rotation" 
                name="zRotation" 
                handleChange={handleChange} 
                value={state.zRotation} 
              /> 
              <Button name="canRotate" className="mt-2 mb-2" disabled={!state.canRotate} onClick={handleClick}>Rotate</Button>
              <Slider 
                title="Focus" 
                name="focus"
                max="100"
                step="1" 
                handleChange={handleChange} 
                value={state.focus} 
              />
              <Button name="canFocus" className="mt-2 mb-2" disabled={!state.canFocus} onClick={handleClick}>Focus</Button>
              <p className="mt-2 mb-0">Other</p>
              <Button name="photo" className="mt-3 mb-2 mr-2" onClick={handleClick}>Take photo</Button>
              <Button className="mt-3 mb-2 mr-2">Start streaming</Button>
            </div>
          </Collapse>
        </div>
      </div>
    </div>    
  )
}

export default ManualControl