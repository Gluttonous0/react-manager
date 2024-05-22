// server.js
import express from 'express'
import multer from 'multer'
import cors from 'cors'

const app = express()
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).send({ message: 'Image uploaded successfully.' })
  } catch (error) {
    res.status(500).send(error)
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
