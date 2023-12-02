const mongoose = require("mongoose"); //.set('debug', true);
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  sLoc: String,
  sLocPoint: [String],
  sCity: String,
  eLoc: String,
  eLocPoint: [String],
  date: String,
  stime: String,
  etime: String,
  seats: String,
  price: Number,
  driverId: Schema.ObjectId,
  riders: [String],
  status: String,
  liveLocation: Object,
});

rideSchema.statics.addRide = function (riderRequest) {
  const distance = getDistanceFromLatLonInKm(
    riderRequest.slocPoint[0],
    riderRequest.slocPoint[1],
    riderRequest.elocPoint[0],
    riderRequest.elocPoint[1]
  );
  const pricee = distance * 3;
  var ride = new Ride({
    sLoc: riderRequest.sloc,
    sLocPoint: riderRequest.slocPoint,
    eLocPoint: riderRequest.elocPoint,
    sCity: riderRequest.scity,
    eLoc: riderRequest.eloc,
    date: riderRequest.ddate,
    stime: riderRequest.sttime,
    etime: riderRequest.ettime,
    seats: riderRequest.sseats,
    price: pricee,
    driverId: riderRequest.ddriverId,
    riders: [],
    imgURL: "",
    status: "yet to start",
    liveLocation: "",
  });
  //   console.log(riderRequest);
  ride.save();
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  //haversine formula
  // console.log(lat1, lon1, lat2, lon2);
  var R = 6371; // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d > 1) return Math.round(d);
  else if (d <= 1) return Math.round(d * 1000);
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

var Ride = mongoose.model("Ride", rideSchema);
module.exports = mongoose.model("Ride", rideSchema);
