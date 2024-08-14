const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const userRouter = require("./routes/userRoutes");
const bookRouter = require('./routes/bookRoutes');


require('dotenv').config()
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/book', bookRouter);


app.listen(process.env.PORT, () => console.log("Listening to port " + process.env.PORT))