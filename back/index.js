import express from 'express';
import cors from "cors";

import utmRoutes from './routes/utmRoutes.js';

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api", utmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
