const express = require("express");
const app = express;
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)

app.listen(process.env.PORT, () => console.log("Listening to port")
)