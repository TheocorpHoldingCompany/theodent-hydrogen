// External Imports
import React, { useRef, useEffect } from "react";

// Internal Imports

const GoogleWrapper = ({ children, map, setMap, setMapZoom, setMapCenter, style, ...options }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const mapInstance = new window.google.maps.Map(ref.current);
      mapInstance.setOptions(options);

      mapInstance.addListener("idle", () => {
        const zoom = mapInstance.getZoom();
        setMapZoom(zoom);
        const center = mapInstance.getCenter()?.toJSON();
        setMapCenter(center);
      });

      setMap(mapInstance);
    }
    // eslint-disable-next-line
  }, [ref.current]);

  // useEffect(() => {
  //   if (map) {
  //     const updateUserLocation = async () => {
  //       const location = await Geolocation.getCurrentPosition().catch((err) => {
  //         console.error("Geolocation Error:", err);
  //       });
  //       if (location) {
  //         const locationCenter = {
  //           lat: location.coords.latitude,
  //           lng: location.coords.longitude,
  //         };
  //
  //         if (isValidCenter(locationCenter)) {
  //           setUserLocation(locationCenter);
  //           if (!locationCenter) {
  //             map.setCenter(locationCenter);
  //           }
  //
  //           // if (mapItems && mapItems.length === 0) {
  //           //   let newBounds = createSearchBounds(locationCenter);
  //           //   onBoundsChange && onBoundsChange(newBounds);
  //           // }
  //         }
  //       }
  //     };
  //
  //     updateUserLocation(map);
  //   }
  //
  //   // eslint-disable-next-line
  // }, [map]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default GoogleWrapper;
