import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"


const app = express();



app.use(cors())
app.use(express.json())



app.use('/api/auth', userRoutes)
app.use('/api/auth',adminRoutes)




export default app;