import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet, { Map } from 'leaflet';
import { Location } from '../../types/my-quests/my-quests';

const TileLayer = {
  MAP: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
  ATTRIBUTION: [
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    'contributors',
    '&copy; <a href="https://carto.com/attributions">CARTO</a>'
  ],
};

export default function useMap(mapRef: MutableRefObject<null>, location: Location): leaflet.Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.coords[0],
          lng: location.coords[1],
        },
        zoom: 10,
      });

      leaflet
        .tileLayer(
          TileLayer.MAP,
          {
            attribution: TileLayer.ATTRIBUTION.join(' '),
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef]);

  return map;
}
