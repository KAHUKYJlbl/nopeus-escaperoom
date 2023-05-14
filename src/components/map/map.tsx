import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { BookingInfo } from '../../types/booking/booking';
import { Location } from '../../types/my-quests/my-quests';
import useMap from '../../hooks/use-map/use-map';

type CityMapProps = {
  location: Location;
  bookings: BookingInfo[];
  currentBookingId: string | null;
}

export default function CityMap ({location, bookings, currentBookingId}: CityMapProps): JSX.Element {
  const mapRef = useRef(null);

  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: location.coords[0],
          lng: location.coords[1],
        },
        12,
      );
    }
  }, [map, location]);

  useEffect(() => {
    const markersLayer = leaflet.layerGroup([]);

    const defaultCustomIcon = leaflet.icon({
      iconUrl: '/img/svg/pin-default.svg',
      iconSize: [23, 42],
      iconAnchor: [12, 42],
    });

    const currentCustomIcon = leaflet.icon({
      iconUrl: '/img/svg/pin-active.svg',
      iconSize: [23, 42],
      iconAnchor: [12, 42],
    });

    if (map) {
      bookings.forEach((booking) => {
        leaflet
          .marker({
            lat: booking.location.coords[0],
            lng: booking.location.coords[1],
          }, {
            icon:
              booking.id === currentBookingId
                ? currentCustomIcon
                : defaultCustomIcon,
          })
          .addTo(markersLayer);
      });
      if (bookings.length === 0) {
        leaflet
          .marker({
            lat: location.coords[0],
            lng: location.coords[1],
          }, {
            icon: currentCustomIcon,
          })
          .addTo(markersLayer);
      }
      markersLayer.addTo(map);

      return () => {
        map.removeLayer(markersLayer);
      };
    }
  }, [map, bookings, currentBookingId]);

  return (
    <div className="map__container" ref={mapRef}>
    </div>
  );
}
