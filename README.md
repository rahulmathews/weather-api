# weather-api
An API service that uses a free weather API and stores hourly forecast and analyses most similiar patterns between two cities.

Steps To follow:<br>
1) Update the Open Weather API Key in the `config/config.env`.<br>
2) Update the `latitude` and `longitude` in the `config/info.json` which are taken as array of arrays. Each pair of city is represented as `[latitude, longitude]`.<br>
3) Now use `npm i` to install all the projects required for the project.<br>
4) Start the server using `node index.js` from the root folder.<br>
5) You can check the api-docs at `localhost:{port}/docs`.<br>
6) To check the task, please follow the below steps:<br>
  a) First you have to register an account for testing any API using `/api/auth/register` using `{email: "email", password: "password"}` as request body. <br>
  b) Use the creds to login using `/api/auth/login`. <br>
  c) You will have to fire two api's at this stage: <br>
  &nbsp;&nbsp;&nbsp;&nbsp;i) `api/weather/update` : This API will update the data in the database from the cities location using the open weather API. <br>
  &nbsp;&nbsp;&nbsp;&nbsp;ii) `api/weather/compare` : This API will return the latitudes and longitudes of two cities with similiar weather patterns. <br>
