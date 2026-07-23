import detectCountry from "./detect-country";
import convertPrice from "../services/currency";

const basePriceNGN = 25000; // example

export default async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // 1. Check cookie first
const store = req.cookies.store;

let currency;

if (store) {
  currency = store; // NGN, USD, GBP
} else {
  // 2. Fallback to auto-detection
  const country = await detectCountry(ip);

  if (country === "NG") currency = "NGN";
  else if (country === "GB") currency = "GBP";
  else currency = "USD";
}


  let price = basePriceNGN;

  if (currency !== "NGN") {
    price = await convertPrice(basePriceNGN, currency);
  }

  res.json({ currency, price });
};
