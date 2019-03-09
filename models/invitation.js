const mongoose = require("mongoose");

const { Schema } = mongoose;

// create schema
const InvitationSchema = new Schema({
  invite_type: {
    type: String,
    required: true,
  },
  league_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leagues",
  },
  invite_status: {
    type: String,
    default: "Created",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  inviting_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  invited_email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true,
  },
});

const Invitation = mongoose.model("invitations", InvitationSchema);

module.exports = Invitation;
