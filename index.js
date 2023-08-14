const express = require("express")
const { connection } = require("./config/db")
const { userRoute } = require("./route/user.route")
const { flightRoute } = require("./route/flight.route")
const { bookingRoute } = require("./route/booking.route")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Air Booking App',
        version: '1.0.0',
      },
    },
    apis: ['./route*.js'], // files containing annotations as above
  };

  const openapiSpecification = swaggerJsdoc(options);


  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/",userRoute)
app.use("/",flightRoute);
app.use("/",bookingRoute)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`Database connected to the server on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
        console.log("DB not connected to server")
    }
})