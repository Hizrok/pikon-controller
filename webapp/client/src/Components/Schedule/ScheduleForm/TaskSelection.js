import React from 'react'

function TaskSelection(props) {
  let classes = 'list-group-item list-group-item-action'

  return (
    <div>
      <p className='mb-1'>Task selection</p> 
      <div className='list-group mb-3'>
        <button name='rotate' className={props.task === 'rotate' ? classes.concat(' active') : classes} onClick={props.onSelect}>Rotate</button>
        <button name='photo' className={props.task === 'photo' ? classes.concat(' active') : classes} onClick={props.onSelect}>Take a photo</button>
        <button name='rotateAndPhoto' className={props.task === 'rotateAndPhoto' ? classes.concat(' active') : classes} onClick={props.onSelect}>Rotate and take a photo</button>
        <button name='livestream' className={props.task === 'livestream' ? classes.concat(' active') : classes} onClick={props.onSelect}>Livestream</button>
      </div>
    </div>
  )
}

export default TaskSelection