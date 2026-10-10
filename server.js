
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

app.get("/api/xauusd", async (req, res) => {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "API key belum ditetapkan dalam Render"
    });
  }

  try {
    const url = new URL("https://api.twelvedata.com/price");
    url.searchParams.set("symbol", "XAU/USD");
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === "error" || !data.price) {
      return res.status(502).json({
        error: "Data XAUUSD tidak berjaya diperoleh",
        details: data.message || data.code || "Semak simbol dan akses API"
      });
    }

    res.json({
      symbol: "XAU/USD",
      price: data.price,
      source: "Twelve Data",
      note: "Semak status data dan kelewatan sebelum digunakan."
    });
  } catch (error) {
    res.status(500).json({
      error: "Gagal menghubungi penyedia data"
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`VOID FX backend running on ${port}`);
});

