const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const userRouter = require("./routes/userRoutes");
const bookRouter = require('./routes/bookRoutes');
const adminRouter = require('./routes/adminRoutes');


require('dotenv').config()
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/book', bookRouter);
app.use('/api/admin', adminRouter)


app.listen(process.env.PORT, () => console.log("Listening to port " + process.env.PORT))