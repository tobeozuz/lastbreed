const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports.checkout = async function(price, currency) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency,
        product_data: { name: "Last Breed Product" },
        unit_amount: Math.round(price * 100)
      },
      quantity: 1
    }],
    mode: "payment",
    success_url: "https://your-site/success",
    cancel_url: "https://your-site/cancel"
  });

  return session.url;
};
