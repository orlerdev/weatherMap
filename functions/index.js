import functions from 'firebase-functions';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));

// TIME
// app.get('/time', (req, res) => {
//   const currentTime = formatTime(new Date());
//   res.send(currentTime);
// });

app.get('/time-sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendTimeUpdate = () => {
    const currentTime = new Date().toString();
    res.write(`data: ${ currentTime }\n\n`);
  };

  const interval = setInterval(sendTimeUpdate, 1000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// WEATHER
app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const OPENWEATHER_API_KEY = functions.config().openweather.key;

  if (!lat || !lon) {
    return res.status(400).send('Latitude and longitude are required.');
  }

  try {
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${ lat }&lon=${ lon }&units=imperial&appid=${ OPENWEATHER_API_KEY }`);
    res.send(weatherResponse.data);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    res.status(500).send('Error fetching weather data.');
  }
});

// MAPBOX
app.get('/mapbox', async (req, res) => {
  const query = req.query.query;
  const MAPBOX_API_KEY = functions.config().mapbox.key;

  if (!query) {
    return res.status(400).send('Query parameter is required.');
  }

  const isCoordinate = /-?\d+\.\d+,-?\d+\.\d+/.test(query); // Coordinate REGEX check
  const mapboxURL = isCoordinate
    ? `https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?access_token=${ MAPBOX_API_KEY }`
    : `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(query) }.json?access_token=${ MAPBOX_API_KEY }`;

  try {
    const mapboxResponse = await axios.get(mapboxURL);
    res.send(mapboxResponse.data);
  } catch (err) {
    console.error('Error fetching mapbox data:', err.response ? err.response.data : err.message);
    res.status(500).send('Error fetching mapbox data.');
  }
});

app.get('/getMapboxToken', (req, res) => {
  const MAPBOX_API_KEY = functions.config().mapbox.key;
  res.send({ token: MAPBOX_API_KEY });
});

export const api = functions.https.onRequest(app);
