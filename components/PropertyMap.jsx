// PropertyMap.js
"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerPng from "@/assets/images/location.png";

import Spinner from "./Spinner"; // Assuming you have a Spinner component

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Make sure to set this in your environment variables

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`
          )}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch geocode data");
        }

        const data = await response.json();

        if (data.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = data.results[0].geometry; // Use the lat and lng from OpenCage data
        setLat(lat);
        setLng(lng);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property, apiKey]);

  if (loading) return <Spinner loading={true} />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[lat, lng]}
        icon={L.icon({ iconUrl: markerPng.src, iconSize: [40, 40] })}
      >
        <Popup>
          <span>{property.name}</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
