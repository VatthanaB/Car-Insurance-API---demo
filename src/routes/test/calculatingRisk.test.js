import { calculateRiskRating } from "../routes/calculatingRisk.js";

import { expect } from "chai";
describe("calculateRiskRating", () => {
  // TEST 1
  it("should return the correct risk rating when claim history contains keywords", () => {
    const claimHistory =
      "I had a collision and a scratch on my car in the past year.";
    const result = calculateRiskRating(claimHistory);
    expect(result).to.deep.equal({ risk_rating: 1 });
  });

  // TEST 2
  it("should return the minimum risk rating when claim history is empty", () => {
    const claimHistory = "";
    const result = calculateRiskRating(claimHistory);
    expect(result).to.deep.equal({ error: "Claim history cannot be empty" });
  });

  // TEST 3
  it("should return an error when claim history is not a string", () => {
    const claimHistory = 123; // Invalid input (not a string)
    const result = calculateRiskRating(claimHistory);
    expect(result).to.deep.equal({ error: "Invalid input" });
  });

  // TEST 4
  it("should return the maximum risk rating when claim history contains all keywords", () => {
    const claimHistory =
      "collide crash scratch bump smash collide crash scratch bump smash";
    const result = calculateRiskRating(claimHistory);
    expect(result).to.deep.equal({ risk_rating: 5 });
  });

  // TEST 5
  it("should return an error when claim history is undefined", () => {
    const claimHistory = undefined;
    const result = calculateRiskRating(claimHistory);
    expect(result).to.deep.equal({ error: "Invalid input" });
  });

  // TEST 6
  it("should return an error when claim history is null", () => {
    const claimHistory = null;
    const result = calculateRiskRating(claimHistory);
    expect(result).to.deep.equal({ error: "Invalid input" });
  });
});
