import chai from "chai";
import axios from "axios";
import { expect } from "chai";

// using chai :
// describe keyword = group of tests
// it keyword = individual test
// expect keyword = assertion

// // TEST API 1 - Calculate car value 🚩

// The describe function is used to group related tests. The first argument is a string that describes the group of tests. In this case, the string is "Car Value API", indicating that the tests inside this describe block are all related to the Car Value API.
// The second argument is a function that contains the tests. The function is called a callback function. The callback function is executed when the test is run.
describe("Car Value API", () => {
  const apiUrl = "http://localhost:5000";

  // TEST 1
  it("should calculate car value correctly", async () => {
    const inputData = {
      model: "Civic",
      year: 2014,
    };

    const response = await axios.post(
      `${apiUrl}/calculate_car_value`,
      inputData
    );

    // The expect function is used to make assertions. The first argument is the actual value, and the second argument is the expected value.
    // The expect function is provided by the chai library. The chai library is a popular assertion library that provides a set of functions to make assertions.

    // Expect the status code to be 200
    expect(response.status).to.equal(200);
    // Expect the response data to have a property called car_value
    expect(response.data).to.have.property("car_value");
    // Expect the car value to be 6614
    expect(response.data.car_value).to.equal(6614);
  });

  // TEST 2
  it("should handle invalid model input ", async () => {
    const inputData = {
      model: "123", // Invalid model name
      year: 2014, // Valid year
    };

    const response = await axios.post(
      `${apiUrl}/calculate_car_value`,
      inputData,
      // The validateStatus function is used to check the status code of the response. If the status code is less than 500, the promise is resolved. Otherwise, the promise is rejected.
      // This to override the default behavior of axios, which rejects the promise if the status code is not 200.
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Invalid model");
  });

  // TEST 3
  it("should handle invalid year input ", async () => {
    const inputData = {
      model: "Civic", // Valid model
      year: "invalid", // Invalid year format
    };

    const response = await axios.post(
      `${apiUrl}/calculate_car_value`,
      inputData,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Invalid year");
  });

  // TEST 4
  it("should handle valid input ", async () => {
    const inputData = {
      model: "Corolla", // Valid model name
      year: "2020", // Valid year
    };

    const response = await axios.post(
      `${apiUrl}/calculate_car_value`,
      inputData,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("car_value");
    expect(response.data.car_value).to.be.a("number"); // Check if the car value is a number
  });

  // TEST 5
  it("should handle an empty model ", async () => {
    const inputData = {
      model: "", // Empty model name
      year: "2010", // Valid year
    };

    const response = await axios.post(
      `${apiUrl}/calculate_car_value`,
      inputData,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400); // Expect a 400 Bad Request status code
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Model is required");
  });

  // TEST 6
  it("should handle a negative year ", async () => {
    const inputData = {
      model: "Accord", // Valid model name
      year: "-1999", // Negative year
    };

    const response = await axios.post(
      `${apiUrl}/calculate_car_value`,
      inputData,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400); // Expect a 400 Bad Request status code
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Year cannot be negative");
  });
});

// TEST API  2 - Claim History to Risk Rating  🚩
describe("Claim History to Risk Rating API", () => {
  const apiUrl = "http://localhost:5000";

  // TEST 1
  it("should calculate risk rating correctly", async () => {
    const inputData = {
      claimHistory:
        "My only claim was a crashed into my house's garage door that left a scratching on my car. There are no other crash just a bump.",
    };

    const response = await axios.post(
      `${apiUrl}/calculate_risk_rating`,
      inputData
    );

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("risk_rating");
    expect(response.data.risk_rating).to.equal(3);
  });

  // TEST 2
  it("should handle invalid input ", async () => {
    const invalidInput = {
      claimHistory: 123, // Invalid input (not a string)
    };

    const response = await axios.post(
      `${apiUrl}/calculate_risk_rating`,
      invalidInput,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Invalid input");
  });

  // TEST 3
  it("should calculate minimum risk rating correctly", async () => {
    const inputData = {
      claimHistory: "No claims in the last 3 years.",
    };

    const response = await axios.post(
      `${apiUrl}/calculate_risk_rating`,
      inputData
    );

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("risk_rating");
    expect(response.data.risk_rating).to.equal(1);
  });

  // TEST 4
  it("should calculate maximum risk rating correctly", async () => {
    const inputData = {
      claimHistory:
        "collide crash scratch bump smash collide crash scratch bump smash",
    };

    const response = await axios.post(
      `${apiUrl}/calculate_risk_rating`,
      inputData
    );

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("risk_rating");
    expect(response.data.risk_rating).to.equal(5);
  });

  //  TEST 5
  it("should handle an empty claim history ", async () => {
    const inputData = {
      claimHistory: "",
    };

    const response = await axios.post(
      `${apiUrl}/calculate_risk_rating`,
      inputData,
      { validateStatus: (status) => status >= 200 && status < 500 }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Claim history cannot be empty");
  });

  // TEST 6
  it("should handle multiple occurrences of keywords ", async () => {
    const inputData = {
      claimHistory:
        "I had multiple collide,collide,collide,  and smashes in the past three years.",
    };

    const response = await axios.post(
      `${apiUrl}/calculate_risk_rating`,
      inputData
    );

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("risk_rating");
    expect(response.data.risk_rating).to.equal(2);
  });
});

// TEST API 3 - Risk Rating to Premium with chai http  🚩

describe("Car Value and Risk Rating to Quote API", () => {
  const apiUrl = "http://localhost:5000"; // Adjust the URL to match the API's endpoint

  // TEST 1
  it("should calculate quote correctly", async () => {
    const inputData = {
      carValue: 6614,
      riskRating: 5,
    };

    const response = await axios.post(`${apiUrl}/calculate_quote`, inputData);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("monthly_premium");
    expect(response.data).to.have.property("yearly_premium");
    expect(response.data.monthly_premium).to.equal("27.56");
    expect(response.data.yearly_premium).to.equal("330.70");
  });

  // TEST 2
  it("should handle carValue is not a number", async () => {
    const invalidInput = {
      carValue: "InvalidValue", // Invalid carValue
      riskRating: 3,
    };

    const response = await axios.post(
      `${apiUrl}/calculate_quote`,
      invalidInput,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Invalid car value");
  });

  // TEST 3
  it("should handle riskRating is not a number", async () => {
    const invalidInput = {
      carValue: 7500,
      riskRating: "InvalidRating", // Invalid riskRating
    };

    const response = await axios.post(
      `${apiUrl}/calculate_quote`,
      invalidInput,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Invalid risk rating");
  });

  // TEST 4
  it("should handle riskRating out of range", async () => {
    const invalidInput = {
      carValue: 8000,
      riskRating: 0, // Invalid riskRating (out of range)
    };

    const response = await axios.post(
      `${apiUrl}/calculate_quote`,
      invalidInput,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Risk rating must be between 1 and 5");
  });

  // TEST 5
  it("should calculate minimum quote correctly", async () => {
    const inputData = {
      carValue: 5000,
      riskRating: 1, // Minimum risk rating
    };

    const response = await axios.post(`${apiUrl}/calculate_quote`, inputData);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("monthly_premium");
    expect(response.data).to.have.property("yearly_premium");
    expect(response.data.monthly_premium).to.equal("4.17");
    expect(response.data.yearly_premium).to.equal("50.00");
  });

  // TEST 6
  it("should calculate maximum quote correctly", async () => {
    const inputData = {
      carValue: 10000,
      riskRating: 5, // Maximum risk rating
    };

    const response = await axios.post(`${apiUrl}/calculate_quote`, inputData);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("monthly_premium");
    expect(response.data).to.have.property("yearly_premium");
    expect(response.data.monthly_premium).to.equal("41.67");
    expect(response.data.yearly_premium).to.equal("500.00");
  });

  // TEST 7
  it("should handle riskRating out of range", async () => {
    const invalidInput = {
      carValue: 8000,
      riskRating: 6, // Invalid riskRating (out of range)
    };

    const response = await axios.post(
      `${apiUrl}/calculate_quote`,
      invalidInput,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        },
      }
    );

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property("error");
    expect(response.data.error).to.equal("Risk rating must be between 1 and 5");
  });
});
