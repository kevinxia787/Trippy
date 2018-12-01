export const fetchVenues = (location, category) => {
  const URL = `http://155.41.48.24:3000/${location}/${category}`;
  console.log(URL);
  return fetch(URL).then((res) => res.json());
} 