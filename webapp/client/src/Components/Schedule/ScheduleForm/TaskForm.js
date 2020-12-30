import React from 'react'
import Button from 'react-bootstrap/Button'

function TaskForm(props) {
  // variables
  const {task, onSelect, nextStep} = props
  const classes = 'list-group-item list-group-item-action'

  return (
    <div>
      <p className='mb-1'>Task selection</p> 
      <div className='list-group mb-3'>
        <button name='rotate' className={task === 'rotate' ? classes.concat(' active') : classes} onClick={onSelect}>Rotate</button>
        <button name='photo' className={task === 'photo' ? classes.concat(' active') : classes} onClick={onSelect}>Take a photo</button>
        <button name='rotateAndPhoto' className={task === 'rotateAndPhoto' ? classes.concat(' active') : classes} onClick={onSelect}>Rotate and take a photo</button>
      </div>
      <div className='mt-3'>
        <Button className='mr-2' disabled>Back</Button>
        <Button onClick={nextStep}>Continue</Button>
      </div>
    </div>
  )
}

export default TaskForm