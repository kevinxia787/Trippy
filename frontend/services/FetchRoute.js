export const fetchRoutes = (start, dest) => {
  const URL=`http://155.41.105.161:3000/directions/${start}/${dest}`;
  console.log(URL);
  return fetch(URL).then((res) => res.json());
}