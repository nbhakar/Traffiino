var express = require("express");
var app = express();
var Ride = require("../model/ride");
var Rider = require("../model/rider");
var User = require("../model/user");
var UserDoc = require("../model/userDocs");
var Razorpay = require("razorpay");
var cors = require("cors");
var crypto = require("crypto");
const axios = require("axios");
var path = require("path");
var favicon = require("serve-favicon");
var passport = require("passport");
var flash = require("connect-flash");
var logger = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
var passport = require("passport");

var configDB = require("../config/db");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const instance = new Razorpay({
  key_id: "rzp_test_xo0lZvZGRx3yOW",
  key_secret: "yN6wqxDmV6FEF8DlXmktEYhg",
});

// required for passport
require("../config/passport").setupPassport(passport);
app.use(
  session({
    secret: "ilovescotch",
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.listen(port, () => {
  console.log(`port is running at ${port}`);
});

// const CHAT_ENGINE_PROJECT_ID = "6f5c7e9c-bf7f-43ac-bd2f-916fac088015";
// const CHAT_ENGINE_PRIVATE_KEY = "81f10bf7-8661-43fc-ae06-954b4dfa1d5a";
const CHAT_ENGINE_PROJECT_ID = "efaecc72-d17e-4128-b3ec-ecefb34b40be";
const CHAT_ENGINE_PRIVATE_KEY = "1898fdde-6788-4682-a263-8bdf6083980f";

app.post("/loginUser", passport.authenticate("local-login"), (req, res) => {
  res.status(200).send(req.user);
});
app.post("/registerUser", passport.authenticate("local-signup"), (req, res) => {
  res.status(200).send(req.user);
});

app.post("/getDocuments", async (req, res) => {
  try {
    const docs = await UserDoc.findOne({ userId: req.body.id });
    if (docs) res.status(200).send(docs);
    else res.status(200).send({ Status: "incomplete" });
  } catch (error) {
    res.status(400).send("error");
  }
});

app.post("/riderBooking", async (req, res) => {
  try {
    const rideRes = await Ride.findOne({ _id: req.body.id });
    if (rideRes.seats < req.body.bookSeats) {
      res.status(400).send("seats available are less");
    }
    await Ride.updateOne(
      { _id: req.body.id },
      {
        seats: Number(rideRes.seats) - Number(req.body.bookSeats),
        $push: { riders: req.body.riderId },
      }
    );
    res.status(200).send("successful");
  } catch (error) {
    res.status(400);
  }
});
app.post("/addRide", async (req, res) => {
  try {
    // console.log(req.body);
    Ride.addRide(req.body);
    res.status(200).send("added");
  } catch (error) {
    console.log("error");
  }
});

app.post("/searchRides", async (req, res) => {
  try {
    const result = [];
    const docs = await Ride.find({
      driverId: { $ne: req.body.id },
      sCity: req.body.scity,
      date: req.body.datee,
      status: "yet to start",
      seats: { $ne: 0 },
    });
    for (var i = 0; i < docs.length; i++) {
      console.log(docs[i]);
      const temp = await Rider.find({
        rideId: docs[i]._id,
        riderId: req.body.id,
      });
      console.log(temp.length === 0);
      if (temp.length === 0) {
        result.push(docs[i]);
      }
    }
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
app.post("/saveUserDocs", async (req, res) => {
  try {
    const checkAv = await UserDoc.findOne({
      userId: req.body.id,
      status: "incomplete",
    });
    if (checkAv) {
      const newDocs = await UserDoc.updateOne(
        { userId: req.body.id },
        {
          govtId: [req.body.doct, req.body.govt],
          DL: req.body.dl,
          Insurance: req.body.insurance,
        }
      );
      res.status(200).send("successful");
    } else {
      const newDocs = new UserDoc({
        userId: req.body.id,
        govtId: [req.body.type, req.body.govt],
        DL: req.body.dl,
        Insurance: req.body.insurance,
        Status: "pending",
      });
      newDocs
        .save()
        .then((e) => {
          res.send(200).send("successful");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.post("/getUserDetailById", async (req, res) => {
  try {
    const id = req.body.id;
    const docs = await User.findOne({ _id: id });
    res.status(200).send(docs);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
app.post("/saveDetailsById", async (req, res) => {
  try {
    const id = req.body.id;
    const docs = await User.updateOne(
      { _id: id },
      {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        dateOfBirth: req.body.dob,
        mobileNum: req.body.pnum,
        bio: req.body.bio,
        imgURL: req.body.proImg,
      }
    );
    // docs.first_name = req.body.fname;

    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/getAllRiderRides", async (req, res) => {
  try {
    const docs = await Rider.find({ riderId: req.body.id });
    let array = [];
    docs.map((e) => {
      array.push(e.rideId);
    });
    res.status(200).send(array);
  } catch (error) {
    res.status(400).send("error");
  }
});

app.post("/getAllRides", async (req, res) => {
  try {
    const docs = await Ride.find({ _id: req.body.id });
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/updateRating", async (req, res) => {
  try {
    const id = req.body.id;
    let docs = await User.findOne({ _id: id });
    console.log(req.body.addRating);
    let newRat;
    if (docs.rideCompleted === 0) newRat = req.body.addRating;
    else newRat = (req.body.addRating + docs.rating) / 2;
    console.log(newRat);
    docs = await User.updateOne({ _id: id }, { rating: newRat });
    res.status(200).send("successfull");
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

app.post("/addRider", async (req, res) => {
  try {
    // console.log(req.body);
    Rider.addRide(req.body);
    res.status(200).send("successfull");
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});
app.post("/changePassword", async (req, res) => {
  try {
    const id = req.body.id;
    const docs = await User.findOne({ _id: id });
    if (docs.validPassword(prevPassword)) {
      const newpass = docs.generateHash(newPassword);
      const temp = await User.updateOne({ _id: id }, { password: newpass });
      // console.log(temp);
      res.status(200).send(temp);
    } else {
      res.status(400).send("invalid password");
    }
  } catch (error) {
    res.status(400).send("error");
  }
});
app.post("/getRideDetailById", async (req, res) => {
  try {
    const docs = await Ride.find({ driverId: req.body.id });
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/rideCompleted", async (req, res) => {
  try {
    const completed = "completed";
    const respo = await Ride.find({ _id: req.body.id });
    // console.log(respo);
    console.log(respo);
    console.log(respo[0].sCity);

    var docs = await Ride.updateOne(
      { _id: req.body.id },
      { status: completed }
    );
    docs = await User.findOne({ _id: respo[0].driverId });
    console.log(docs.rideCompleted);
    const prev = Number(docs.rideCompleted) + 1;
    docs = await User.updateOne(
      { _id: respo[0].driverId },
      { rideCompleted: prev }
    );

    console.log(docs);
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/rideStarted", async (req, res) => {
  try {
    const completed = "ride started";
    const respo = await Ride.find({ _id: req.body.id });
    console.log(respo);
    const docs = await Ride.updateOne(
      { _id: req.body.id },
      { status: completed }
    );
    console.log(docs);
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/updateLiveLocation", async (req, res) => {
  try {
    const docs = await Ride.updateMany(
      { driverId: req.body.id, status: "ride started" },
      { liveLocation: req.body.coordinates }
    );
    console.log(docs);
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/fetchLiveLocation", async (req, res) => {
  try {
    const respo = await Ride.find({ _id: req.body.id });
    console.log(respo.liveLocation);
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.post("/paymentVerification", async (req, res) => {
  // console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "yN6wqxDmV6FEF8DlXmktEYhg")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    // await Payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });
    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    res.redirect(`http://localhost:3000/`);

    // res.status(200).send();
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: "rzp_test_xo0lZvZGRx3yOW" })
);

app.post("/chatLogin", async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/chatSignup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;
  // console.log(req.body);
  // console.log(CHAT_ENGINE_PRIVATE_KEY);

  // Store a user-copy on Chat Engine!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
    );
    console.log(r.data);
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(401).send(e);
  }
});
module.exports = app;
