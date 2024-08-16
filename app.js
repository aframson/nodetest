const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://randomuser.me/api/';

axios.get(apiUrl)
  .then(response => {
    const newUser = response.data.results[0];

    // Read the existing data from the file
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err && err.code !== 'ENOENT') {
        console.error('Error reading file', err);
        return;
      }

      const existingData = data ? JSON.parse(data) : [];

      // Append the new user data
      existingData.push(newUser);

      // Write the updated data back to the file
      fs.writeFile('data.json', JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to file', err);
        } else {
          console.log('Data successfully appended to data.json');
        }
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data from API', error);
  });
