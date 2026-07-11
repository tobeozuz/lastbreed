const fetch = require("node-fetch");

module.exports = async function detectCountry(ip) {
  const res = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await res.json();
  return data.country_code;
};
