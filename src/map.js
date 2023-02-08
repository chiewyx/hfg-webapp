import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

/*
var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
*/

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 1.3521,
      lng: 103.8198,
    },
    zoom: 12,
  };

  const [results, setResults] = useState([]);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_API);

  async function getResult() {
    
  }

  useEffect(() => {
    getResult();
  }, []);

  Geocode.fromAddress("49 Hume Ave Singapore").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker key="1" text="singapore" lat={1.3521} lng={103.8198} />
        <Marker key="1" text="singapore" lat={1.37} lng={103.8198} />
      </GoogleMapReact>
    </div>
  );
}
