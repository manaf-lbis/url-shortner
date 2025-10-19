import express from "express";
import dotenv from "dotenv";
import appRouter from "./router/appRoute"
import errorHandler from "./middleware/errorHandler";



const app = express();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);
app.use("/auth", appRouter);



app.use(errorHandler);


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
