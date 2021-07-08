const dotenv = require('dotenv')
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const connectDB = require("./config/db")
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config({ path: './server/config/.env' })
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const { headers } = require('./middlewares/headers')

// route
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const authRoutes = require('./routes/auth.routes')




// mongodb connection
connectDB()

// app instance
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({ origin: 'https://localhost:8080', credentials: true }))


// body parsing middleware
app.use(express.json())
// cookie parser
app.use(cookieParser())

// app.use(headers)

app.get('/ssl', (req, res) => {
  res.send('Hello')
})

app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api/post', postRoutes)

app.use(notFound)
app.use(errorHandler)


// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('../client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'cert.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt'))
  },
  app
)

server.listen(PORT, () => {
  console.log(`HTTPS server listening on port ${PORT}`)
})