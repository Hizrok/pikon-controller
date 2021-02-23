import React, {useState, useEffect} from "react"
import {Form, Button} from "react-bootstrap"

function TimeForm(props) {
  // variables
  const {value, timeSet, nextStep, prevStep} = props
  const [error, setError] = useState({
    invalid: false,
    message: ""
  })
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00"
  })

  useEffect(() => {
    let split = value.split(" ")[1].split(":")
    setTime(() => {
      return {hours: split[0], minutes: split[1], seconds: split[2]}
    })
  }, [])
  
  function increase(e) {
    const name = e.target.name
    let data = Number(time[name])
    data = format(data, name, true)
    setTime((prevTime) => {
      return {...prevTime, [name]: data}
    })
  }
  function decrease(e) {
    const name = e.target.name
    let data = Number(time[name])
    data = format(data, name, false)
    setTime((prevTime) => {
      return {...prevTime, [name]: data}
    })
  }
  function format(number, timeFormat, increasing) {
    const min = 0
    const max = timeFormat === "hours" ? 23 : 59
    if (increasing) {
      number++
      if (number > max) number = min
    } else {
      number--
      if (number < min) number = max-1
    }
    return number < 10 ? String(`0${number}`) : String(number)
  }
  // validation
  function validate() {
    const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
    const input = `${value.split(" ")[0]} ${time.hours}:${time.minutes}:${time.seconds}`
    let check = true
    if (input.match(regex)) {
      const timestamp = new Date(input)
      const now = new Date()
      if (timestamp < now) {
        setError({invalid: true, message: "past date"})
        check = false
      } else {
        async function post(time) {
          const data = await fetch("/api/tasks/validate", {
            method:"POST",
            body: JSON.stringify({time}), 
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          const json = await data.json()
          if (json.valid) {
            setError({invalid: false})
          } else {
            setError({invalid: true, message: "date already in the database"})   
            check = false         
          }
        }
        post(input)
      }
    } else {
      setError({invalid: true, message: "invalid date"})
      check = false
    }
    if (check) {
      timeSet(input)
      nextStep()
    }
  }

  return (
    <div>
      <h3 className="mb-3" style={{textAlign: "center"}}>Time</h3> 
      <div className="d-flex justify-content-center">
        <div className="timer-part">
          <Button name="hours" onClick={increase}>up</Button>
          <p className="mb-1 mt-1">{time.hours}</p>
          <Button name="hours" onClick={decrease}>down</Button>
        </div>
        <div className="timer-colon">:</div>
        <div className="timer-part">
          <Button name="minutes" onClick={increase}>up</Button>
          <p className="mb-1 mt-1">{time.minutes}</p>
          <Button name="minutes" onClick={decrease}>down</Button>
        </div>
        <div className="timer-colon">:</div>
        <div className="timer-part">
          <Button name="seconds" onClick={increase}>up</Button>
          <p className="mb-1 mt-1">{time.seconds}</p>
          <Button name="seconds" onClick={decrease}>down</Button>
        </div>
      </div>
      {
        error.invalid && <div className="mt-3 alert alert-danger" role="alert">{error.message}</div> 
      }
      
      <div className="mt-4 d-flex justify-content-center">
        <Button onClick={prevStep} className="mr-2">Back</Button>
        <Button onClick={validate}>Continue</Button>
      </div>
    </div>    
  )
}

export default TimeForm