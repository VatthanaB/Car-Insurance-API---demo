Car Insurance API
This is a simple Express.js application that provides APIs for calculating car value, risk rating based on claim history, and insurance premium quote.

Setup
Install Node.js
Clone this repository
Install dependencies with npm install
Start the server with npm start
API Endpoints
POST /calculate_car_value
Calculates the value of a car based on its model and year.

Request body should be a JSON object with the following properties:

model: The model of the car (string)
year: The year the car was made (number)
POST /calculate_risk_rating
Calculates a risk rating based on a string of claim history.

Request body should be a JSON object with the following properties:

claimHistory: A string of claim history (string)
POST /calculate_quote
Calculates an insurance premium quote based on the car value and risk rating.

Request body should be a JSON object with the following properties:

carValue: The value of the car (number)
riskRating: The risk rating (number)
Running the Server
The server can be started with npm start. By default, it runs on port 5000, but this can be changed by modifying the port variable in server.js.
