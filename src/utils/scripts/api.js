const getData = async (table) => {
  console.log("Im here");
  const { data } = await axios(`http://localhost/api/${table}?limit=10`);
  console.log(data);
  return data;
};

const registerUser = async (data) => {
  const { data: response } = await axios.post("http://localhost/api/users", data);
  return response;
}