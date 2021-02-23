import React, {useState, useEffect} from "react"
import {Container, Dropdown, DropdownButton} from "react-bootstrap";
import Photo from "./Photos/Photo"

function Photos() {
  const [photos, setPhotos] = useState([])

  // useEffect
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`/api/photos`)
      const json = await data.json()
      json.photos.forEach(photo => {
        const date = new Date(photo.photo_date)        
        photo.photo_date = dateString(date)
      });
      setPhotos(json.photos)
    }
    fetchData()
  },[])

  function dateString(d) {
    let yyyy = d.getFullYear()
    let month = parseInt(d.getMonth()) + 1
    let mm = month < 10 ? "0" + month : month
    let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
    let HH = d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
    let MM = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
    let SS = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()
  
    return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`
  }

  return (
    <Container className="mt-3 mb-5">
      <DropdownButton title="Sort by">
        <Dropdown.Item>Newest</Dropdown.Item>
        <Dropdown.Item>Oldest</Dropdown.Item>
        <Dropdown.Item>Best</Dropdown.Item>
      </DropdownButton>
      <div className="card mt-3">
        <div className="card-body">
          <h4>Photos</h4>
          <div className="row mt-3">
            {
              photos.map(photo => {
                return <Photo key={photo.id} date={photo.photo_date} path={photo.photo_path} />
              })
            }   
          </div>
        </div>
      </div>      
    </Container>
  )
}

export default Photos