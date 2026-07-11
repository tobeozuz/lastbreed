import detectCountry from "../api/detect-country";
import convertPrice from "../services/currency";

const basePriceNGN = 25000; // example

export default async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const country = await detectCountry(ip);

  let currency = "USD";
  if (country === "NG") currency = "NGN";
  if (country === "GB") currency = "GBP";
  if (["FR", "DE", "NL", "ES", "IT"].includes(country)) currency = "EUR";

  let price = basePriceNGN;

  if (currency !== "NGN") {
    price = await convertPrice(basePriceNGN, currency);
  }

  res.json({ currency, price });
};
