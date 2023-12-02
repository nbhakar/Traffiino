import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import pin from "../../utilites/MapPin2.png";
import live from "../../utilites/liveIcon.png";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const dummy = [
  [18.572384401114586, 73.9548040783595],
  [18.761783756004597, 73.42613684672403],
];

const iconEnd = L.icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/location-pointer/100/map_pointer_pin_marker_location-02-512.png",
  iconSize: [38, 38],
});

const position = [20.5937, 78.9629];

function ResetCenterView1(props) {
  const { pin1 } = props;
  const map = useMap();

  useEffect(() => {
    if (pin1) {
      map.setView(L.latLng(pin1?.lat, pin1?.lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [pin1]);

  return null;
}
function ResetCenterView2(props) {
  const { pin2 } = props;
  const map = useMap();

  useEffect(() => {
    if (pin2) {
      map.setView(L.latLng(pin2?.lat, pin2?.lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [pin2]);

  return null;
}

const Map = (props) => {
  // var map = new L.map();
  const iconStart = L.icon({
    iconUrl: props.icon === "live" ? live : pin,
    iconSize: props.icon === "live" ? [18, 18] : [38, 38],
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  // L.polyline(routeCoordinates).addTo(map);
  useEffect(() => {
    const startPoint = `${props.pin1?.lon},${props.pin1?.lat}`;
    // console.log(props.pin1);
    const endPoint = `${props.pin2?.lon},${props.pin2?.lat}`;
    // console.log(endPoint);
    // console.log(props.pin1.lon, props.pin2.lon);

    // console.log(startPoint);
    // console.log(endPoint);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248198c57588dfc433abab8037f234ffecc&start=${startPoint}&end=${endPoint}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result).features[0].geometry.coordinates;
        var temp = [];
        res.map((e) => {
          var xy = [e[1], e[0]];
          temp.push(xy);
        });
        setRouteCoordinates(temp);
      })
      .catch((err) => {
        console.log(err);
        setRouteCoordinates([]);
      });
  }, [props.pin1, props.pin2]);

  const l1 = [props.pin1?.lat, props.pin1?.lon];
  const l2 = [props.pin2?.lat, props.pin2?.lon];
  return (
    <MapContainer
      center={position}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=INhIiarNdRvjpXL4KRsE"
      />
      {dummy && <Polyline positions={routeCoordinates} color="green" />}
      {props.pin1 && (
        <Marker position={l1} icon={iconStart}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      {props.pin2 && (
        <Marker position={l2} icon={iconEnd}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView1 pin1={props.pin1} />
      <ResetCenterView2 pin2={props.pin2} />
    </MapContainer>
  );
};

export default Map;
