import { useEffect, useRef, useMemo } from 'react';
import L, { Icon, LayerGroup, Map as LeafletMap } from 'leaflet';
import type { City, Offer } from '../../types/offer';

type MapProps = {
  city: City;
  offers: Offer[];
  activeOfferId?: string | null;
};

const DEFAULT_ZOOM = 12;

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, offers, activeOfferId }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const cityLocation = useMemo(() => ({
    lat: city.location.latitude,
    lng: city.location.longitude,
    zoom: city.location.zoom ?? DEFAULT_ZOOM,
  }), [city.location.latitude, city.location.longitude, city.location.zoom]);

  useEffect(() => {
    if (mapContainerRef.current !== null && mapRef.current === null) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: {
          lat: cityLocation.lat,
          lng: cityLocation.lng,
        },
        zoom: cityLocation.zoom,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }
  }, [cityLocation]);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    const markersLayer: LayerGroup = L.layerGroup().addTo(mapRef.current);

    offers.forEach((offer) => {
      const isActive = offer.id === activeOfferId;

      L.marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: isActive ? activeCustomIcon : defaultCustomIcon,
        }
      ).addTo(markersLayer);
    });

    return () => {
      mapRef.current?.removeLayer(markersLayer);
    };
  }, [offers, activeOfferId]);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    mapRef.current.setView(
      {
        lat: cityLocation.lat,
        lng: cityLocation.lng,
      },
      cityLocation.zoom
    );
  }, [cityLocation]);

  return <div ref={mapContainerRef} style={{ height: '100%' }} />;
}

export default Map;
