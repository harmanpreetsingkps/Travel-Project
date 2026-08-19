import express from "express";
import router from "./route/user.route.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import logRouter from "./route/error.logs.route.js";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(cookieParser())

// app.use(cors())
// app.options('*', cors())

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use("/user", router);
app.use("/file", logRouter);
app.use("/logs", express.static("./error-logs/errorlog.txt"))

app.get('/', (req , res)=>{
    res.status(200).send(
        "<h1>The server is running fine</h1>"
    )
})


app.use(errorHandler)
export default app;