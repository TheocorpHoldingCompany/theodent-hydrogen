// External Imports
import { useEffect } from "react";

// Interal Imports
import { useApp } from "context";

const CDN_ROUTE = process.env.REACT_APP_CDN_ROUTE;

const Marker = ({ mapItem, icon = "", setLocationModal, setSelectedLocation, ...options }) => {
  const { map, mapZoom } = useApp();
  let geo = mapItem?.geometry?.coordinates || [];
  const loc = { lat: geo[1], lng: geo[0] };

  const sizes = {
    s0: new window.google.maps.Size(22, 22),
    s1: new window.google.maps.Size(22, 22),
    s2: new window.google.maps.Size(22, 22),
    s3: new window.google.maps.Size(22, 22),
    s4: new window.google.maps.Size(22, 22),
    s5: new window.google.maps.Size(30, 30),
    s6: new window.google.maps.Size(30, 30),
    s7: new window.google.maps.Size(30, 30),
    s8: new window.google.maps.Size(30, 30),
    s9: new window.google.maps.Size(30, 30),
    s10: new window.google.maps.Size(30, 30),
    s11: new window.google.maps.Size(30, 30),
    s12: new window.google.maps.Size(44, 44),
    s13: new window.google.maps.Size(44, 44),
    s14: new window.google.maps.Size(44, 44),
    s15: new window.google.maps.Size(54, 54),
    s16: new window.google.maps.Size(54, 54),
    s17: new window.google.maps.Size(54, 54),
    s18: new window.google.maps.Size(62, 62),
    s19: new window.google.maps.Size(62, 62),
    s20: new window.google.maps.Size(62, 62),
    s21: new window.google.maps.Size(62, 62),
    s22: new window.google.maps.Size(62, 62),
  }

  useEffect(() => {
    if (mapItem) {
      const iconSize = sizes[`s${mapZoom}`]
      const marker = new window.google.maps.Marker();

      const _options = {
        map: options.map,
        icon: {
          url: `${CDN_ROUTE}icons/${mapItem?.iconPath}`,
          scaledSize: iconSize
        },
      };

      marker.setOptions({ ..._options, position: loc, optimized: true });

      marker.addListener("click", () => {
        map.panTo(loc);
        setLocationModal(true);
        setSelectedLocation(mapItem)
      });

      return () => {
        if (marker) {
          setTimeout(() => marker.setMap(null), 50)
        }
      };
    }
    //eslint-disable-next-line
  }, [map, mapItem, icon, mapZoom]);

  return null;
};

export default Marker;
