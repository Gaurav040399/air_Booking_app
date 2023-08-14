const express = require("express")
const bookingRoute = express.Router();
const {BookingModel} = require("../model/booking.model")


// This point should list all the bookings so far with the user and flight details. (Populate the entire flight and user data, and not just id’s
bookingRoute.get("/api/dashboard",async(req,res)=>{
    try {
        const data = await BookingModel.find()
        res.status(200).send({msg:"All Booking Data", data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in booking route", error:error.message})
    }
})

// This endpoint should allow the user to book flights.
bookingRoute.get("/api/booking",async(req,res)=>{
    try {
        const newBooking = new BookingModel({...req.body});
        await newBooking.save();
        res.status(201).send({msg:"Booking Successful",data:newBooking})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in booking route", error:error.message})
    }
})


// This endpoint should allow the user to edit / update a booking.
bookingRoute.patch("/api/dashboard/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await BookingModel.findByIdAndUpdate({_id:id},{...req.body});
        res.status(204).send({msg:"Data Update Successful", data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in booking route", error:error.message})
    }
})

// This endpoint should allow the user to delete a booking
bookingRoute.delete("/api/dashboard/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await BookingModel.findByIdAndDelete({_id:id});
        res.status(202).send({msg:"Data Delete Successful", data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in booking route", error:error.message})
    }
})


module.exports = {bookingRoute}