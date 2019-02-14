const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const InvitationSchema = new Schema ({
  invite_type: {
    type: String,
    required: true
  },
  league_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League"
  },
  invite_status: {
    type: String,
    default: "Created"
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  inviting_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  invited_email: {
    type: String,
    required: true,
    index: true
  }
});

module.exports = Invitation = mongoose.model("invitations", InvitationSchema);