import "./App.css";
import HomePage from "./components/Homepage/HomePage";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PublishRide from "./components/publish ride/PublishRide";
import Footer from "./UI/footer/Footer";
import FaqList from "./components/Homepage/faq/Faqlist";
import RideResult from "./components/ride res/RideResult";
import WhatCarpool from "./components/Homepage/what is carpool/WhatCarpool";
import WhyCarpool from "./components/Homepage/why carpool/WhyCarpool";
import CarouselComp from "./UI/carousel/CarouselComp";
import ProfilePage from "./components/Homepage/profile page/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import Fname from "./components/Homepage/profile page/personal/update detail/Fname";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AuthContext from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import Bookride from "./components/booking/Bookride";
import MyRides from "./components/Homepage/my rides/MyRides";
import BasicRating from "./UI/rating/rating";
import RatingModal from "./UI/modal/RatingModal";
import PaymentSuccess from "./components/ride res/PaymentSuccess";
import ChatsPage from "./chats/chatPage";
import axios from "axios";
import ErrorPage from "./UI/error page/ErrorPage";

function App() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [liveCoordinates, setLiveCoordinates] = useState({ lon: "", lat: "" });

  useEffect(() => {
    setIsLoading(true);
    authCtx.authCheck();

    if (navigator?.geolocation) {
      navigator.geolocation.watchPosition((locn) => {
        if (locn)
          setLiveCoordinates({
            lon: locn.coords.longitude,
            lat: locn.coords.latitude,
          });
        console.log(locn);
        updateLiveLocation({
          lon: locn.coords.longitude,
          lat: locn.coords.latitude,
        });
      });
    }

    setIsLoading(false);
  }, []);

  const updateLiveLocation = async (coords) => {
    const token = localStorage.getItem("token");
    console.log(liveCoordinates);
    await axios.post("http://localhost:4000/updateLiveLocation", {
      id: token,
      coordinates: coords,
    });
  };

  return (
    <>
      {!isLoading && (
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/ridesurf" component={PublishRide} />
            <Route path="/faq" component={FaqList} />
            <ProtectedRoute path="/searchRes" component={RideResult} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <ProtectedRoute path="/myRides" component={MyRides} />
            <ProtectedRoute path="/chatBox" component={ChatsPage} />
            <ProtectedRoute
              path="/paymentsuccess/:id"
              component={PaymentSuccess}
            />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
          {/* <Bookride /> */}
          {/* <BasicRating /> */}
        </div>
      )}
    </>
  );
}

export default App;
