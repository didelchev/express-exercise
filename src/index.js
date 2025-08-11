import express from 'express';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import routes from './routes.js';
import cookieParser from "cookie-parser";
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

const port = 3000;

const dbUrl = "mongodb://localhost:27017";

mongoose
    .connect(dbUrl, {dbName: 'practice'})
    .then(() => console.log('DB connected successfully !'))
    .catch((err) => console.log(`DB Failed to connect ${err}`))


app.engine(
    "hbs",
    handlebars.engine({
        extname: 'hbs'
    })
)

app.set("views", "src/views")

app.set("view engine", "hbs")

app.use("/styles", express.static("src/public"))

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(authMiddleware)

app.use(routes)

app.listen(port, ()=> {
    console.log(`Server is listening on http://localhost:${port} ...`)
})