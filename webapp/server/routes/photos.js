const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', (req, res, next) => {
  // query for all photos or return an error
  pool
    .query("SELECT * FROM photos;")
    .then(response => {
      res.status(200).json({
        message: 'Photos returned from the database',
        photos: response.rows
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to return photos from the database',
        error: e
      })
    })
})

router.post('/', (req, res, next) => {
  // query for all photos or return an error
  const {photoDate, photoPath} = req.body
  pool
    .query(
      'INSERT INTO photos (photo_date, photo_path) VALUES ($1, $2);',
      [photoDate, photoPath]
    )
    .then(response => {
      res.status(201).json({
        message: 'Photo created'
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to create a photo',
        error: e
      })
    })
})

router.put('/:photoId', (req, res, next) => {
  // create updatedPhoto for debug, query UPDATE SET command, return error if it fails
  const id = req.params.photoId
  const {photoDate, photoPath} = req.body
  const updatedPhoto = {id, photoDate, photoPath}
  pool
    .query(
      'UPDATE photos SET photo_date=$1, photo_path=$2 WHERE id=$3;',
      [photoDate, photoPath, id]
    )
    .then(response => {
      res.status(200).json({
        message: 'Photo updated in the database',
        updatedPhoto
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to update the photo',
        error: e
      })
    })
})
 
router.delete('/:photoId', (req, res, next) => {
  // get id from request params, DELETE from db, return error if it fails
  const id = req.params.photoId
  pool
    .query('DELETE FROM photos WHERE id=$1;', [id])
    .then(response => {
      res.status(200).json({
        message: 'Photo deleted from the database',
        id
      })
    })
    .catch(e => {
      console.log(e.stack)
      res.status(500).json({
        message: 'Failed to delete the photo',
        error: e
      })
    })
})


module.exports = router