const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const Appointment = require("../models/appointmentModel");

router.get("/get-doctor-profile/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "fname lname email profilePicture"
    );

    if (!doctor) {
      return res
        .status(404)
        .send({ message: "Doctor not found", success: false });
    }
    res.status(200).send({ success: true, data: doctor });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching doctor profile", error: error.message });
  }
});

router.get("/doctor-profile/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.params.id }).populate(
      "userId",
      "fname lname email profilePicture"
    );

    if (!doctor) {
      return res
        .status(404)
        .send({ success: false, message: "Doctor not found" });
    }

    res.status(200).send({ success: true, data: doctor });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching doctor profile",
      error: error.message,
    });
  }
});

router.get("/fetch-doctor-profile", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const doctor = await Doctor.findOne({ userId }).populate(
      "userId", "fname lname email profilePicture");
    if (!doctor) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
        console.log('dd', doctor)

    res.status(200).send({ success: true, data: doctor });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching user profile", error: error.message });
  }
});

router.put("/edit-profile", auth, async (req, res) => {
  try {
    const userId = req.userId; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const userUpdates = {
      fname: req.body.fname || user.fname,
      lname: req.body.lname || user.lname,
      email: req.body.email || user.email,
      gender: req.body.gender || user.gender,
      profilePicture: req.body.profilePicture || user.profilePicture,
    };

    await User.findByIdAndUpdate(userId, userUpdates, { new: true });

    if (user.isDoctor) {
      const doctor = await Doctor.findOne({ userId });

      if (!doctor) {
        return res.status(404).send({ success: false, message: "Doctor profile not found" });
      }

      const doctorUpdates = {
        phone: req.body.phone || doctor.phone,
        website: req.body.website || doctor.website,
        location: req.body.location || doctor.location,
        specialization: req.body.specialization || doctor.specialization,
        experience: req.body.experience || doctor.experience,
        consultationFees: req.body.consultationFees || doctor.consultationFees,
        workingHours: req.body.workingHours || doctor.workingHours,
      };

      await Doctor.findOneAndUpdate({ userId }, doctorUpdates, { new: true });
    }

    res.status(200).send({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).send({ success: false, message: "Server error", error: error.message });
  }
});

router.post("/confirm-appointment", auth, async (req, res) => {
  const { appointmentId } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "confirmed" },
      { new: true }
    );

    if (!appointment) {
      return res
        .status(404)
        .send({ success: false, message: "Appointment not found" });
    }

    const user = await User.findById(appointment.userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    user.unseenNotifications.push({
      type: "Appointment Confirmed",
      message: `Your appointment on ${appointment.date} at ${appointment.time} has been confirmed.`,
      onClickPath: user.isDoctor? "/doctor/appointments" : "/user/appointments",
      data: {
        appointmentId,
      },
    });

    await user.save();

    res.send({ success: true, message: "Appointment confirmed" });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Could not confirm appointment" });
  }
});

module.exports = router;
