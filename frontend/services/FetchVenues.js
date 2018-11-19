export const fetchVenues = (location, category) => {
  const URL = `http://168.122.15.87:3000/${location}/${category}`;
  console.log(URL);
  return fetch(URL).then((res) => res.json());
} 