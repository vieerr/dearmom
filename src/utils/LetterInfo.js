export const getUserLocationAndDate = () => {
  return new Promise((resolve, reject) => {
    const getCurrentDate = () => {
      const now = new Date();
      return {
        day: now.getDate(),
        month: now.toLocaleString("default", { month: "long" }),
        year: now.getFullYear(),
      };
    };

    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
        )
          .then((response) => response.json())
          .then((data) => {
            const address = data.address;
            const city =
              address.city ||
              address.town ||
              address.village ||
              address.county ||
              address.country ||
              "Unknown Location";

            const locationInfo = {
              city,
              ...getCurrentDate(),
            };

            resolve(locationInfo);
          })
          .catch((error) => {
            reject(
              new Error("Could not retrieve location details: " + error.message)
            );
          });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};
