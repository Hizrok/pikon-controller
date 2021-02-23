import React, {useState, useEffect} from "react"
import {Button} from "react-bootstrap"

function DateForm(props) {

  const [days, setDays] = useState([])
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  const [selected, setSelected] = useState(-1)
  const [empty, setEmpty] = useState()

  useEffect(() => {    
    generateDays()
  }, [currentDate])

  function generateDays() {    
    const date = new Date()
    const constDay = date.getDate()
    const constMonth = date.getMonth()
    const constYear = date.getFullYear()
    date.setMonth(currentDate.month)
    date.setFullYear(currentDate.year)
    date.setDate(1)
    const emptyDays = date.getDay() === 0 ? 6 : date.getDay()-1
    setEmpty(emptyDays)
    const dayCount = daysInMonth(date.getMonth()+1, date.getFullYear())
    setDays(() => {
      const newDays = []
      for (let i = 0; i < Math.ceil((dayCount+emptyDays)/7)*7; i++) {        
        let disabled = false
        let past = false
        // if it's a day that already happened
        if ((i+1) - emptyDays < constDay && date.getMonth() === constMonth && date.getFullYear() === constYear) {
          disabled = true
          past = true
        }
        if ((i+1) - emptyDays < 1 || (i+1) - emptyDays > dayCount) disabled = true
        if (i !== 0) {
          if (newDays[i-1].disabled && disabled === false) {
            setSelected(i)
          }
        } else {
          if (disabled === false) {
            setSelected(i)
          }
        }       
        const name = `${(i+1) - emptyDays}-${date.getMonth()}-${date.getFullYear()}`
        const newDay = {id: i, disabled, past, name, number: (i+1) - emptyDays}
        newDays.push(newDay)
      }
      return newDays
    })
  }
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }
  function nextMonth() {
    setCurrentDate(() => {            
      let newMonth = currentDate.month + 1
      let newYear = currentDate.year
      if (newMonth === 12) {
        newMonth = 0
        newYear++
      }           
      return {month: newMonth, year: newYear}
    })
  }
  function prevMonth() {
    setCurrentDate(() => {            
      let newMonth = currentDate.month - 1
      let newYear = currentDate.year
      if (newMonth === -1) {
        newMonth = 11
        newYear--
      }      
      return {month: newMonth, year: newYear}
    })
  }
  function sendData() {
    console.log(empty)
    const data = `${selected+1-empty}-${currentDate.month}-${currentDate.year}`
    props.dateClicked(data)
    props.nextStep()
  }

  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

  return (    
    <div>
      <h3 className="mb-3" style={{textAlign: "center"}}>Date</h3>
      <div className="mt-2 mb-3 d-flex justify-content-around">
        <Button variant="primary" disabled={!(new Date().getMonth() < currentDate.month || new Date().getFullYear() < currentDate.year)} onClick={prevMonth}>prev</Button>
        <h4 className="date">{`${months[currentDate.month]} ${currentDate.year}`}</h4>
        <Button variant="primary" onClick={nextMonth}>next</Button>
      </div>
      <div className="month">
        {
          days.map(day => {
            if (day.disabled) {
              return <div key={day.id} className="day disabled">{day.past ? day.number : ""}</div>
            }
            return <div key={day.id} name={day.name} className={day.id === Number(selected) ? "day selected" : "day"} onClick={() => setSelected(day.id)} >{day.number}</div>
          })
        }
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Button className="mr-2" onClick={props.prevStep}>Back</Button>
        <Button onClick={sendData}>Continue</Button>
      </div>
    </div>
  )
}

export default DateForm