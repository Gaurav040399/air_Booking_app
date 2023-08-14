const express = require("express")
const flightRoute = express.Router()
const {FlightModel} = require("../model/flight.model")

// This endpoint should return a list of all available flights.
flightRoute.get("/api/flights",async(req,res)=>{
    try {
        let flight = await FlightModel.find()
        res.status(200).send({msg:"All Flights", data:flight})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in flight get route", error:error.message})
    }
})

// This endpoint should return the details of a specific flight identified by its ID.
flightRoute.get("/api/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params
        let flight = await FlightModel.find({_id:id})
        res.status(200).send({msg:"Your Flight", data:flight})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in flight route", error:error.message})
    }
})

// This endpoint should return the details of a specific flight identified by its ID.
flightRoute.post("/api/flights",async(req,res)=>{
    try {
        let newFlight = new FlightModel({...req.body})
        await newFlight.save()
        res.status(201).send({msg:"Add new Flight", flight:newFlight})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in flight post route", error:error.message})
    }
})

// This endpoint should allow users to update the details of a specific flight identified by its ID.
flightRoute.patch("/api/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        let update =await FlightModel.findOneAndUpdate({_id:id},{...req.body})
        
        res.status(204).json({msg:"Flight has been Updated", data:update})

    } catch (error) {
        res.status(400).send({msg:"Something went wrong in flight patch route", error:error.message})
    }
})

// This endpoint should allow users to delete a specific flight identified by its ID.
flightRoute.delete("/api/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        let deleteData =await FlightModel.findByIdAndDelete({_id:id})

        res.status(202).send({msg:"Flight has been Deleted", data:deleteData})

    } catch (error) {
        res.status(400).send({msg:"Something went wrong in flight delete route", error:error.message})
    }
})

module.exports = {flightRoute}