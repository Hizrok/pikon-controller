import React from 'react'

function Photo(props) {
  return (
    <div className='col-3 mb-3'>
      <div style={{margin: '0 auto', width: '200px', height: '200px', backgroundColor:'black', overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>  
        <img src={`http://localhost:3001${props.path}`} alt='alt' style={{maxHeight: '100%', objectFit: 'contain'}} />    
      </div>
      <h6 style={{textAlign: 'center'}} className='mt-2'>{props.date}</h6>
    </div>    
  )
}

export default Photo