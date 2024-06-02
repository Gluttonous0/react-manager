// server.js
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: true }), express.urlencoded({ extended: true }))

app.post('/api/users/create', (req, res) => {
  const requestData = req.body // 获取请求体中的数据
  console.log(1)
  console.log(requestData)
  console.log('Received data:', requestData)
  // 这里可以根据需要处理数据，比如保存到数据库等
  // 假设处理成功，返回一个成功的响应
  res.status(200).json({ message: 'Data received successfully', data: requestData })
})

let deptList = [
  {
    id: '63bc31ae300732c27697f1f4',
    deptName: '大前端',
    createId: '10017',
    createTime: '2023-5-11',
    updateTime: '2023-5-12',
    parentId: '',
    userName: 'Admin',
    children: [
      {
        id: '63bc31ae300732c27697f1f5',
        deptName: '大前端一部',
        createId: '10018',
        createTime: '2023-5-11',
        updateTime: '2023-5-12',
        parentId: '63bc31ae300732c27697f1f4',
        userName: 'Admin'
      }
    ]
  }
]

app.get('/api/dept/list', (req, res) => {
  const deptName = req.query.deptName
  console.log(deptName)
  if (deptName) {
    let searchDeptList = deptList.map(item => {
      // console.log('itme,', item)
      if (item.deptName == deptName) {
        return item
      }
    })
    res.send({ code: 0, data: searchDeptList, msg: '' })
    return
  }
  res.send({ code: 0, data: deptList, msg: '' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
