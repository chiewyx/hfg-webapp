import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 1.3521,
      lng: 103.8198,
    },
    zoom: 11,
  };

  const apiURL = process.env.GOOGLE_MAPS_API;
  console.log(apiURL)

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker key="1" text="singapore" lat="1.3521" lng="103.8198" />
      </GoogleMapReact>
    </div>
  );
}
