const axios = require('axios');

const serverUrl = 'http://localhost:4225';

async function main() {
  const { data: value } = await axios.post(`${serverUrl}/callUpdate`, {value : 4});
  console.log(value);
}

main();