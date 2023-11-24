"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculatingRisk_1 = require("../calculatingRisk");
const chai_1 = require("chai");
describe("calculateRiskRating", () => {
    // TEST 1
    it("should return the correct risk rating when claim history contains keywords", () => {
        const claimHistory = "I had a collision and a scratch on my car in the past year.";
        const result = (0, calculatingRisk_1.calculateRiskRating)(claimHistory);
        (0, chai_1.expect)(result).to.deep.equal({ risk_rating: 1 });
    });
    // TEST 2
    it("should return the minimum risk rating when claim history is empty", () => {
        const claimHistory = "";
        const result = (0, calculatingRisk_1.calculateRiskRating)(claimHistory);
        (0, chai_1.expect)(result).to.deep.equal({ error: "Claim history cannot be empty" });
    });
    // TEST 4
    it("should return the maximum risk rating when claim history contains all keywords", () => {
        const claimHistory = "collide crash scratch bump smash collide crash scratch bump smash";
        const result = (0, calculatingRisk_1.calculateRiskRating)(claimHistory);
        (0, chai_1.expect)(result).to.deep.equal({ risk_rating: 5 });
    });
    // TEST 6
    it("should return the correct risk rating when claim history contains only one keyword", () => {
        const claimHistory = "scratch";
        const result = (0, calculatingRisk_1.calculateRiskRating)(claimHistory);
        (0, chai_1.expect)(result).to.deep.equal({ risk_rating: 1 });
    });
    // TEST 7
    it("should return the correct risk rating when claim history contains repeated keywords", () => {
        const claimHistory = "scratch scratch scratch scratch scratch";
        const result = (0, calculatingRisk_1.calculateRiskRating)(claimHistory);
        (0, chai_1.expect)(result).to.deep.equal({ risk_rating: 5 });
    });
});
