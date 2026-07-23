import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML)
app.use(express.static(path.join(__dirname, "public")));

// API routes
import getPrice from "./api/getprice.js";
import checkout from "./api/checkout.js";

app.get("/api/get-price", getPrice);
app.post("/api/checkout", checkout);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
