import { useEffect } from "react";

export function useApp() {
  // Save the current location before exiting the website
  // reload the previous one when coming back, e.g. after
  // a login or logout we are brought to the previous page
  // otherwise we would land back on the home page.
  useEffect(() => {
    const saveCurrentLocation = () => {
      localStorage.setItem("currentLocation", window.location.href);
    };

    const oldLocation = localStorage.getItem("currentLocation");
    localStorage.removeItem("currentLocation");

    if (
      oldLocation &&
      window.location.href !== oldLocation &&
      window.location.pathname.startsWith("/ui")
    ) {
      window.location.href = oldLocation;
    }

    window.addEventListener("beforeunload", saveCurrentLocation);

    return () => {
      window.removeEventListener("beforeunload", saveCurrentLocation);
      saveCurrentLocation();
    };
  }, []);
}
