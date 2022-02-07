const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const validator = require("validator");

const EventSchema = new Schema(
  {
    organizer: {
      type: String,
      maxlength: 20,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      // validate: {
      //   validator: function (v) {
      //     if (v.include("event")) {
      //       return v; // check that there is a name object
      //     }
      //   },
      //   message: "Name can't contain the word event in it.",
      // },
    },
    email: {
      type: String,
      validate: validator.isEmail,
      required: true,
      isAsync: false,
    },
    image: {
      type: String,
      required: true,
    },
    numOfSeats: {
      type: Number,
      min: 5,
    },
    bookedSeats: {
      type: Number,
      default: 0,
      max: 10,
    },
    startDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return (
            v && // check that there is a date object
            v.getTime() > Date.now() + 24 * 60 * 60 * 1000
          );
        },
        message: "An event must be at least 1 day from now",
      },
    },
    endDate: {
      type: Date,
      min: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", EventSchema);
