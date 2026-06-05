import express from "express";
const app = express();

// Change the endpoint from /ping to /hello, and return 'Hello Full Stack!'
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
