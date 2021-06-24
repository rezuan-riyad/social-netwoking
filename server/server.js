const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const connectDB = require("./config/db")
const cors = require('cors')

dotenv.config({path : './server/config/.env'})
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

// route
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')




// mongodb connection
connectDB()

// app instance
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

// body parsing middleware
app.use(express.json())


app.use('/api', userRoutes)
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


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})