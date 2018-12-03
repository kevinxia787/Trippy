export const fetchLatLng = (address) => {
  const URL = `http://155.41.48.24:3000/geocoding/${address}`;
  console.log(URL);
  return fetch(URL).then((res) => res.json());
} 