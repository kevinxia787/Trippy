export const fetchVenues = (location, category) => {
  const URL = `http://155.41.105.161:3000/suggestions/${location}/${category}`;
  console.log(URL);
  return fetch(URL).then((res) => res.json());
} 