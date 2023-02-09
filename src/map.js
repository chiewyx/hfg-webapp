import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

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

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_API);

  const [results, setResults] = useState([]);
  const [markers, setMarkers] = useState([]);

  //name is either S3Mur4yOTYsjtzOew0Ls or rc4
  //docSnap.data() is the data

  const getReview = async () => {
    const colRef = collection(db, "reviews");
    try {
      const docsSnap = await getDocs(colRef);
      if (docsSnap.docs.length > 0) {
        const reviews = [];
        docsSnap.forEach((doc) => {
          reviews.push(doc.data());
          console.log(doc.data());
        });
        setResults(reviews);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  /*
  Geocode.fromAddress("49 Hume Ave Singapore").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );
  
  useEffect(() => {
    const promises = results.map((result) =>
      Geocode.fromAddress(result.postal_code)
    );

    Promise.all(promises).then((responses) => {
      const markerArray = responses.map((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        return <Marker lat={lat} lng={lng} />;
      });

      setMarkers(markerArray);
    });
  }, [results]);
  */

  useEffect(() => {
    const markerArray = [];
    results.forEach((result) => {
      Geocode.fromAddress(result.postal_code).then((response) => {
        const obj = response.results[0].geometry.location;
        markerArray.push(
          <Marker
            improvement={result.improvement}
            lat={obj.lat}
            lng={obj.lng}
            address1={result.address1}
            postalcode={result.postal_code}
            fault={result.problem}
          />
        );
        if (markerArray.length === results.length) {
          setMarkers(markerArray);
        }
        //console.log(obj.lat);
      });
    });

    //setMarkers(markerArray);
  }, [results]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}
