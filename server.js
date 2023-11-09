const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000; // You can change the port if needed

app.use(bodyParser.json());

//  API 1 - Calculate car value

// This function will calculate the car value based on the model and year
function calculateCarValue(model, year) {
  try {
    if (!model) {
      return { error: "Model is required" };
    }

    if (year < 0) {
      return { error: "Year cannot be negative" };
    }

    // Remove spaces and convert the model name to uppercase
    model = model.replace(/ /g, "").toUpperCase();

    // Check for empty model or year
    if (model.length === 0 || year.length === 0) {
      return { error: "Invalid input" };
    }
    // Check for invalid model or year
    // So, this regular expression will match any string that consists only of one or more uppercase letters and nothing else like "HELLO" not " HELLO12"
    if (!model.match(/^[A-Z]+$/) || isNaN(year)) {
      // Check for invalid model
      if (!model.match(/^[A-Z]+$/)) {
        return { error: "Invalid model" };
        // Check for invalid year
      } else {
        return { error: "Invalid year" };
      }
    }

    // Calculate the value based on the business rules
    const value =
      model
        .split("")
        .map((char) => char.charCodeAt(0) - "A".charCodeAt(0) + 1)
        .reduce((acc, curr) => acc + curr, 0) *
        100 +
      parseInt(year);

    // Return the value as an object
    return { car_value: value };
  } catch (e) {
    return { error: "There is an error" };
  }
}

app.post("/calculate_car_value", (req, res) => {
  try {
    const { model, year } = req.body;
    const result = calculateCarValue(model, year);

    // Check if there is an error in the result object
    if ("error" in result) {
      return res.status(400).json(result);
    }

    //  if there is no error, return the result as a json object
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: "An error occurred" });
  }
});

// API 2. Convert "Claim History" to a "Risk Rating"

// This function will calculate the risk rating based on the claim history
function calculateRiskRating(claimHistory) {
  try {
    // Check for invalid input
    if (typeof claimHistory !== "string") {
      return { error: "Invalid input" };
    }
    // Check for empty input
    if (claimHistory === "") {
      return { error: "Claim history cannot be empty" };
    }

    // Convert the claim history to lowercase
    claimHistory = claimHistory.toLowerCase();

    // Calculate the risk rating based on the business rules (keywords)
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];

    // Set the initial risk rating to 0
    let riskRating = 0;

    for (const keyword of keywords) {
      const keywordRegex = new RegExp(keyword, "gi");
      const matches = claimHistory.match(keywordRegex);
      if (matches) {
        riskRating += 1;
      }
    }

    // The risk rating cannot be more than 5 or less than 1
    if (riskRating > 5) {
      riskRating = 5;
    }
    if (riskRating < 1) {
      riskRating = 1;
    }

    // Return the risk rating as an object
    return { risk_rating: riskRating };
  } catch (e) {
    return { error: "There is an error" };
  }
}

app.post("/calculate_risk_rating", (req, res) => {
  try {
    const { claimHistory } = req.body;

    const result = calculateRiskRating(claimHistory);

    // Check if there is an error in the result object
    if ("error" in result) {
      return res.status(400).json(result);
    }

    // if there is no error, return the result as a json object
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: "An error occurred" });
  }
});

// API 3. Calculate the "Premium" based on the "Risk Rating"

// This function will calculate the premium based on the car value and risk rating
function calculateQuote(carValue, riskRating) {
  try {
    // Check for invalid input
    if (isNaN(carValue)) {
      return { error: "Invalid car value" };
    }
    // Check for invalid input
    if (isNaN(riskRating)) {
      return { error: "Invalid risk rating" };
    }
    // Check for empty input
    if (riskRating < 1 || riskRating > 5) {
      return { error: "Risk rating must be between 1 and 5" };
    }

    const yearlyPremium = (carValue * riskRating) / 100;
    const monthlyPremium = yearlyPremium / 12;

    // Return the premium as an object with 2 decimal places
    return {
      monthly_premium: monthlyPremium.toFixed(2),
      yearly_premium: yearlyPremium.toFixed(2),
    };
  } catch (e) {
    return { error: "There is an error" };
  }
}

app.post("/calculate_quote", (req, res) => {
  try {
    // extract the car value and risk rating from the request body using destructuring
    const { carValue, riskRating } = req.body;

    // calculate the quote
    const result = calculateQuote(carValue, riskRating);

    // Check if there is an error in the result object
    if ("error" in result) {
      return res.status(400).json(result);
    }

    // if there is no error, return the result as a json object
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: "An error occurred" });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
