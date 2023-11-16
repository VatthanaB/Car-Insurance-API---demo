import express from "express";
import bodyParser from "body-parser";
import CarValueAPI from "./routes/calculateCarValue.js";
import RiskRatingAPI from "./routes/calculatingRisk.js";
import QuoteAPI from "./routes/calculateQuote.js";

const app = express();
const router = express.Router();
const port = 5000;

app.use(bodyParser.json());

// API 1. Calculate car value
app.use("/calculate_car_value", CarValueAPI);

// API 2. Convert "Claim History" to a "Risk Rating"
app.use("/calculate_risk_rating", RiskRatingAPI);

// API 3. Calculate the "Premium" based on the "Risk Rating"
app.use("/calculate_quote", QuoteAPI);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
