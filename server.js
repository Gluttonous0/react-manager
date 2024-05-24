// server.js
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: true }))

app.post('/api/users/create', (req, res) => {
  const requestData = req.body // 获取请求体中的数据
  console.log(1)
  console.log(requestData)
  console.log('Received data:', requestData)

  // 这里可以根据需要处理数据，比如保存到数据库等
  // 假设处理成功，返回一个成功的响应
  res.status(200).json({ message: 'Data received successfully', data: requestData })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
