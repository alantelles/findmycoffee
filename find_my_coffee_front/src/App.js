import React, { Fragment, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import EstablishmentsServices from './services/establishment_service';
import Establishment from './components/Establishment';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState({});

  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        loadCoffeeShops()
      }, function (error) {
        alert('Habilite localização para usar este app')
      }
    )
  }
  useEffect(() => {    
    setCurrentLocation() 
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function loadCoffeeShops() {
    const response = await EstablishmentsServices.index(latitude, longitude);
    setLocations(response.data.results);
  }

  

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={{height: "100vh", width: "100%"}}
          zoom={17}
          center={{lat: latitude, lng: longitude}}
        >
          {
            locations.map((item, index) => {
              return (
                <Marker 
                  key={index}
                  icon="/images/coffee-pin.png"
                  title={item.name}
                  animation="4"
                  onClick={() => setSelected(item)}
                  position={{
                    lat: item.geometry.location.lat, 
                    lng: item.geometry.location.lng
                  }}
                />
              )
            })
          }
          {
            selected.place_id && (
              <Establishment place={selected}/>
            )
          }
          <Marker 
            key="my_loc"
            icon="/images/my-location-pin.png"
            title="Seu local"
            animation="2"
            position={{lat: latitude, lng: longitude}}
          />
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;
