import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { BookingInfo } from '../../types/booking/booking';
import { Location } from '../../types/my-quests/my-quests';
import useMap from '../../hooks/use-map/use-map';
import { getBookingSlotsByLocations } from '../../utils/booking-slots-by-location';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { changeCurrentBookingId } from '../../store/booking/booking-slice';
import ChooseQuestPopup from '../choose-quest-popup/choose-quest-popup';

type MapProps = {
  location: Location;
  bookings: BookingInfo[];
  currentBookingId: string | null;
}

export default function Map ({location, bookings, currentBookingId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const dispatch = useAppDispatch();
  const [popupQuests, setPopupQuests] = useState<BookingInfo[]>([]);
  const [tempCurrentBookingId, setTempCurrentBookingId] = useState<string | null>(null);
  const map = useMap(mapRef, location);

  const bookingsByLocations = getBookingSlotsByLocations(bookings);

  const onMarkerClick = (bookings: BookingInfo[]) => {
    if (bookings.length === 1) {
      onQuestChoose(bookings[0].id);
    } else {
      setTempCurrentBookingId(bookings[0].id);
      setPopupQuests(bookings);
    }
  };

  const onQuestChoose = (questID: string) => {
    dispatch( changeCurrentBookingId(questID) );
    onPopupClose();
  }

  const onPopupClose = () => {
    setPopupQuests([]);
    setTempCurrentBookingId(null);
  }

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: location.coords[0],
          lng: location.coords[1],
        },
        10,
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
      Object.keys(bookingsByLocations).forEach((location) => {
        leaflet
          .marker({
            lat: bookingsByLocations[location][0].location.coords[0],
            lng: bookingsByLocations[location][0].location.coords[1],
          }, {
            icon:
              bookingsByLocations[location].some((booking) => booking.id === (tempCurrentBookingId ? tempCurrentBookingId : currentBookingId))
                ? currentCustomIcon
                : defaultCustomIcon,
            title: `квестов по этому адресу: ${bookingsByLocations[location].length}`
          })
          .on('click', () => onMarkerClick(bookingsByLocations[location]))
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
  }, [map, bookings, currentBookingId, tempCurrentBookingId]);

  return (
    <>
      <div ref={popupRef} style={{position: 'absolute', left: '50%', top: '50%', zIndex: popupQuests.length * 500}}>
        <ChooseQuestPopup onQuestChoose={onQuestChoose} popupQuests={popupQuests} onCloseButtonClick={onPopupClose} />
      </div>
      <div className="map__container" ref={mapRef}>
      </div>
    </>
  );
}
