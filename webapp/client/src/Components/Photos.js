import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Photo from './Photos/Photo'

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
    <Container className='mt-3'>
      <h4 className='mb-3'>Photos</h4>
      <div className='row'>
        {
          photos.map(photo => {
            return <Photo key={photo.id} date={photo.photo_date} path={photo.photo_path} />
          })
        }   
      </div>
    </Container>
  )
}

export default Photos