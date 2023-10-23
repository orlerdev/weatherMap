// ZUSTAND
import { create } from 'zustand';
// FIREBASE
import { storage } from '@firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
// AXIOS
import axios from 'axios';
// LOCAL
import { staticWeather, weatherTypes } from '@data/staticWeather';
import { states } from '@data/states';
import { formatLocation, randomNumRange, getPhotoTitle } from '@utils/utils';

const useStore = create((set, get) => ({
  // MAP STATE
  lon: -98.48527,
  setLon: (lon) => set({ lon }),
  lat: 29.423017,
  setLat: (lat) => set({ lat }),
  zoom: 9,
  setZoom: (zoom) => set({ zoom }),
  mapLocation: formatLocation(states, 'San Antonio, Texas'),
  setMapLocation: (mapLocation) => set({ mapLocation }),
  search: null,
  setSearch: (search) => set({ search }),
  searchResult: null,
  setSearchResult: (searchResult) => set({ searchResult }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),

  // WEATHER STATE
  weather: staticWeather,
  setWeather: (weather) => set({ weather }),
  weatherIcon: `https://openweathermap.org/img/wn/${ staticWeather.hourly[0].weather[0].icon }@2x.png`,
  setWeatherIcon: (weatherIcon) => set({ weatherIcon }),
  weatherPhoto: '',
  setWeatherPhoto: (weatherPhoto) => set({ weatherPhoto }),
  forecastDT: [],
  setForecastDT: (forecastDT) => set({ forecastDT }),
  activeCard: 0,
  setActiveCard: (activeCard) => set({ activeCard }),
  // DATA FETCHING
  fetchUserLocation: async () => {
    const search = get().search();
    const lon = get().lon();
    const lat = get().lat();
    if (search) {
      try {
        get().setLoading(true);
        const res = await axios.get(
          `https://us-central1-weathermap-90bca.cloudfunctions.net/api/mapbox`,
          {
            params: { query: search }
          }
        );
        get().setSearchResults(res.data);
        get().setMapLocation(formatLocation(search.features[0].place_name), states);
        get().setLon(get().searchResults().features[0].center[0]);
        get().setLat(get().searchResults().features[0].center[1]);
        get().setLoading(false);
      } catch (err) {
        console.error('Error fetching search value', err.message);
        get().setError(err);
        get().setLoading(false);
      }
    } else if (lon && lat) {
      try {
        get().setLoading(true);
        const res = await axios.get(`https://us-central1-weathermap-90bca.cloudfunctions.net/api/mapbox`,
          {
            params: { query: `${ lon }, ${ lat }` }
          }
        );
        get().setSearchResults(res.data);
        get().setMapLocation(formatLocation(search.features[0].place_name), states);
        get().setLoading(false);
      } catch (err) {
        console.error('Error fetching coordinates', err.message);
        get().setError(err.message);
        get().setLoading(false);
      }
    }
  },

  fetchWeatherData: async () => {
    const lon = get().lon;
    const lat = get().lat;
    if (lon && lat) {
      try {
        get().setLoading(true);
        const res = await axios.get(`https://us-central1-weathermap-90bca.cloudfunctions.net/api/weather`,
          {
            params: { lon, lat }
          });
        get().setWeather(res.data);
        const weather = get().weather;
        get().setWeatherIcon(`https://openweathermap.org/img/wn/${ weather.hourly[0].weather[0].icon }@2x.png`);
        get().fetchWeatherPhoto(weather);
        get().fetchForecastDT(weather);
        get().setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data: ', err.message);
        get().setError(err);
        get().setLoading(false);
      }
    }
  },
  fetchWeatherPhoto: async () => {
    const weather = get().weather;
    if (weather && weather.daily[0]) {
      const title = getPhotoTitle(
        weatherTypes, weather.daily[0].weather[0].main
      );
      try {
        const folderRef = ref(storage, title);
        const { items } = await listAll(folderRef);
        const photoNum = randomNumRange(0, items.length - 1);
        const url = await getDownloadURL(items.at(photoNum));
        set({ weatherPhoto: url });
      } catch (err) {
        console.error('Error fetching photo: ', err.message);
        get().setError(err);
      }
    }
  },
  fetchForecastDT: () => {
    const weather = get().weather;
    if (weather && weather.daily) {
      const firstFive = weather.daily.slice(0, 5);
      get().setForecastDT(firstFive.map((day) => day.dt));
    }
  }
}));
useStore.getState().fetchWeatherData();
export default useStore;

