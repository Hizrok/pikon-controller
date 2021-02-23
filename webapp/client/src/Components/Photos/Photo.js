import React from "react"

function Photo(props) {
  return (
    <div className="col-3">
      <div style={{margin: "0 auto", width: "200px", height: "200px", backgroundColor:"black", overflow: "hidden", display: "flex", justifyContent: "center"}}>  
        <img src={`http://localhost:3001${props.path}`} style={{maxHeight: "100%", objectFit: "contain"}} />    
      </div>
      <h5 style={{textAlign: "center"}} className="mt-1 mb-4">{props.date}</h5>
    </div>    
  )
}

export default Photo