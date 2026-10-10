
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    name: "VOID FX",
    status: "online",
    message: "Backend berjaya berjalan",
    aiConnected: false,
    marketDataConnected: false
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`VOID FX backend running on ${port}`);
});
