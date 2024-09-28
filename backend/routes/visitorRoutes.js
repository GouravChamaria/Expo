// routes/visitorRoutes.js
const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");

// Helper function to get the next serial number
const getNextSerialNumber = async () => {
  const lastVisitor = await Visitor.findOne().sort({ serialNumber: -1 });
  return lastVisitor ? lastVisitor.serialNumber + 1 : 1;
};

// Create a new visitor
router.post("/", async (req, res) => {
  try {
    const existingVisitor = await Visitor.findOne({ mobile: req.body.mobile });
    if (existingVisitor) {
      return res
        .status(400)
        .json({
          message:
            "Mobile number already exists. Please enter a different number.",
        });
    }
    const serialNumber = await getNextSerialNumber();
    const visitor = new Visitor({ serialNumber, ...req.body });
    await visitor.save();
    res.status(201).json(visitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all visitors
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ serialNumber: 1 });
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single visitor
router.get("/:id", getVisitor, (req, res) => {
  res.json(res.visitor);
});

// Update a visitor
router.put("/:id", getVisitor, async (req, res) => {
  Object.assign(res.visitor, req.body);
  try {
    await res.visitor.save();
    res.json(res.visitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a visitor
router.delete('/:id', getVisitor, async (req, res) => {
  try {
      const visitor = await Visitor.findByIdAndDelete(req.params.id);
      if (!visitor) {
          return res.status(404).send('Visitor not found');
      }

      // Reassign serial numbers
      const visitors = await Visitor.find().sort({ serialNumber: 1 });
      for (let i = 0; i < visitors.length; i++) {
          visitors[i].serialNumber = i + 1;
          await visitors[i].save();
      }

      res.status(200).send('Visitor deleted and serial numbers updated');
  } catch (error) {
      res.status(500).send('Server error');
  }
});


// Middleware to get visitor by ID
async function getVisitor(req, res, next) {
  let visitor;
  try {
    visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Cannot find visitor" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.visitor = visitor;
  next();
}

module.exports = router;
