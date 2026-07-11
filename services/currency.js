const fetch = require("node-fetch");

module.exports = async function convertPrice(amountNGN, currency) {
  const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=YOUR_KEY&base_currency=NGN`);
  const data = await res.json();
  const rate = data.data[currency].value;
  return amountNGN * rate;
};
