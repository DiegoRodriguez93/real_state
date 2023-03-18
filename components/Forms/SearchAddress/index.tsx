import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';

import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import { ExternalGeocoder } from './ExternalGeocoder';

import L from 'leaflet';

const myIcon = new L.Icon({
  iconUrl: '/images/marker-icon-2x-black.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const SearchAddress = () => {
  const mapRef: any = useRef(null);
  const inputRef: any = useRef(null);
  const provider = new OpenStreetMapProvider();

  const [isConfigReady, setIsConfigReady] = useState(false);
  const [results, setResults] = useState<Array<any>>([]);
  const [marketPosition, setMarketPosition] = useState<any>([51.505, -0.09]);

  const redirectToGoogleMaps = () => {
    const lat = marketPosition[0];
    const lng = marketPosition[1];
    const zoom = 20;
    const url = `https://www.google.com/maps/@${lat},${lng},${zoom}z`;
    window.open(url);
  };

  const searchAddress = async (address: string) => {
    if (address) {
      try {
        const results = await provider.search({ query: address });
        if (results && results.length > 0) {
          setResults(results);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    }
  };

  const handleSearchAddress = debounce((value: string) => {
    searchAddress(value);
  }, 350);

  const setAddress = (index: number) => {
    try {
      inputRef.current.value = results[index].label;
      const { x, y } = results[index];
      const address: any = [y, x];
      mapRef?.current?.flyTo(address, 16);
      setMarketPosition(address);
      setResults([]);
    } catch (error) {
      console.error('Unable to set address');
    }
  };

  useEffect(() => {
    const initializeLeafletGeoCoder = async () => {
      setIsConfigReady(true);

      const l: any = await import('esri-leaflet-geocoder');
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

  function handleOnSearchResuts(data: any) {}

  return (
    <>
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
          <Marker position={marketPosition} icon={myIcon}>
            <Popup keepInView>{inputRef?.current?.value ?? '-'}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <ExternalGeocoder results={results} onSubmit={handleSearchAddress} ref={inputRef} setAddress={setAddress} />
    </>
  );
};

export default SearchAddress;
