import express from "express";

const app = express();





app.get("/", (req, res) => {
  res.send("Hello, TypeScript + ESM + Express!");
});




const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
