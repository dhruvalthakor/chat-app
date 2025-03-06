const express = require('express');
const messagemodel = require('../model/Messagemodel');
const messagerouter = express.Router();

messagerouter.get("/",async (req, res) => {
    try {
      const message = await messagemodel.find();
      res.status(200).json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch carts", error: error.message });
    }
  });
  // Add message
  messagerouter.post("/addmessage", async (req, res) => {
    try {
      
      await messagemodel.create(req.body);
      res.status(201).json({ message: "message added successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Failed to add message" });
    }
  });
  
  // Delete message
  messagerouter.delete("/deletemessage/:id", async (req, res) => {
    try {
      const messageId = req.params.id;
      if (!messageId) {
        return res.status(400).json({ message: "message ID is required" });
      }
  
      const deletedmessage = await messagemodel.findByIdAndDelete(messageId);
      if (!deletedmessage) {
        return res.status(404).json({ message: "message not found" });
      }
  
      res.status(200).json({ message: "message deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete message" });
    }
  });
  
  // Edit message
  messagerouter.put("/editmessage/:id", async (req, res) => {
    try {
      const messageId = req.params.id;
      const updates = req.body;
  
      if (!messageId || !updates) {
        return res.status(400).json({ message: "message ID and updates are required" });
      }
  
      const updatedmessage = await messagemodel.findByIdAndUpdate(messageId, updates, { new: true });
      if (!updatedmessage) {
        return res.status(404).json({ message: "message not found" });
      }
  
      res.status(200).json({ message: "message updated successfully", message: updatedmessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update message" });
    }
  });


module.exports = messagerouter;
