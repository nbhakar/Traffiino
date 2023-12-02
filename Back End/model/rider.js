const mongoose = require("mongoose"); //.set('debug', true);
const Schema = mongoose.Schema;

const riderSchema = new Schema({
  rideId: Schema.ObjectId,
  riderId: Schema.ObjectId,
  status: String,
});

riderSchema.statics.addRide = function (riderRequest) {
  var rider = new Rider({
    rideId: riderRequest.rideeId,
    riderId: riderRequest.riderrId,
    status: "incomplete",
  });
  //   const docs = Rider.updateOne(
  //     { riderId: riderRequest.riderrId },
  //     { $push: { rideId: riderRequest.rideeId } }
  //   );
  //   console.log(docs);
  rider.save();
};

var Rider = mongoose.model("Rider", riderSchema);
module.exports = mongoose.model("Rider", riderSchema);
