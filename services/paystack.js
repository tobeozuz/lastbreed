const Paystack = require("paystack")(process.env.PAYSTACK_SECRET);

module.exports.checkout = async function(price, currency) {
  const response = await Paystack.transaction.initialize({
    amount: Math.round(price * 100),
    email: "customer@example.com",
    currency
  });

  return response.data.authorization_url;
};
