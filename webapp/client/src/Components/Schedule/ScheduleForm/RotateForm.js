import React from "react"
import Slider from "../../General/Slider"
import Button from "react-bootstrap/Button"

function RotateForm(props) {
  // props variables
  const {xRot, zRot, focus, handleChange, prevStep, nextStep} = props

  return(
    <div>
      <h3 className="mb-3" style={{textAlign: "center"}}>Rotation</h3> 
      <div>
        <Slider name="xRot" title="X rotation" max="360" step="0.01" value={xRot} handleChange={handleChange} />
        <Slider name="zRot" title="Z rotation" max="180" step="0.01" value={zRot} handleChange={handleChange} />
        <Slider name="focus" title="Focus" max="100" step="1" value={focus} handleChange={handleChange} />
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Button onClick={prevStep} className="mr-2">Back</Button>
        <Button onClick={nextStep}>Continue</Button>
      </div>
    </div>    
  )
}

export default RotateForm