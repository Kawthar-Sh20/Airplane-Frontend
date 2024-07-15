const getData = async (table) => {
  console.log("Im here");
  const { data } = await axios(`http://localhost/api/${table}?limit=10`);
  console.log(data);
  return data;
};
