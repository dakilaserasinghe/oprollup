import {Semaphore} from './semaphore.mjs';
import express from 'express';
const port = 4225;
const MAX_TRANSACTIONS = 5;
const app = express();
app.use(express.json());

async function updateResource(resource, newValue) {
    await resource.semaphore.acquire();
    try {
      console.log(`Updating resource to ${newValue}`);
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate a long operation
      resource.value = newValue;
      console.log(`Resource updated to ${newValue}`);
      return resource.value;
    } finally {
      resource.semaphore.release();
    }
  }

// Example usage:
const resource = { value: 0, semaphore: new Semaphore() };

setInterval(() => {
    updateResource(resource, 1);
}, 2000);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

app.post('/callUpdate', async (req, res) => {
    // grab the parameters from the front-end here
    const body = req.body;
    const response = await updateResource(resource, body.value);
    res.send({value : response});
  });