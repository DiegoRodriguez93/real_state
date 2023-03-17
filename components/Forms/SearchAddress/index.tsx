import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

const SearchAddress = () => {
  const mapRef: any = useRef(null);
  const [isConfigReady, setIsConfigReady] = useState(false);

  useEffect(() => {
    const initializeLeafletGeoCoder = async () => {
      const l: any = await import('esri-leaflet-geocoder');
      console.log('l :>> ', l);
      const control = l.geosearch({
        providers: [
          l.arcgisOnlineProvider({
            // API Key to be passed to the ArcGIS Online Geocoding Service
            apikey: 'AAPK920e9e5ec7a84b0093b50a08a5d2ec22qLfAlNEGS8y6eCxEzkKOqGNNJ8VlYFgSvwVWQDigbZ1kqdytkO4u9PXkHZPRzoBg',
          }),
        ],
      });

      control.addTo(mapRef.current);

      control.on('results', handleOnSearchResuts);

      setIsConfigReady(true);

      try {
        mapRef.current.scrollWheelZoom.disable();
        mapRef.current.dragging.disable();
        mapRef.current.touchZoom.disable();
        mapRef.current.doubleClickZoom.disable();
        mapRef.current.boxZoom.disable();
        mapRef.current.keyboard.disable();
        mapRef.current.zoomControl.disable();
        if (mapRef.current.tap) mapRef.current.tap.disable();
      } catch (error) {}

      return () => {
        control.off('results', handleOnSearchResuts);
      };
    };

    if (mapRef.current && !isConfigReady) {
      initializeLeafletGeoCoder();
    }
  }, [mapRef.current]);

  function handleOnSearchResuts(data: any) {
    console.log('mapRef.current :>> ', mapRef.current);
    try {
      /*       setTimeout(() => {
        mapRef.current.setView([40.73547, -73.987856]);
      }, 250); */
    } catch (error) {}
    console.log('Search results', data);
  }

  return (
    <div id="map">
      <MapContainer
        style={{ height: '250px' }}
        ref={mapRef}
        center={[-32.85390999114789, -56.21679997826777]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SearchAddress;
