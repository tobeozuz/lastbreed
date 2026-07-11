import paystack from "../services/paystack";
const stripe = require("../services/stripe");

module.exports = async (req, res) => {
  const { currency, price } = req.body;

  if (currency === "NGN" || currency === "USD") {
    const url = await paystack.checkout(price, currency);
    return res.json({ checkoutUrl: url });
  }

  if (currency === "GBP" || currency === "EUR") {
    const url = await stripe.checkout(price, currency);
    return res.json({ checkoutUrl: url });
  }
};
