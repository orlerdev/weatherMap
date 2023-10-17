import { create } from 'zustand';
import axios from 'axios';
import { staticWeather, weatherTypes } from '@data/staticWeather';
import { states } from '@data/states';
import { formatLocation, randomNumRange, getPhotoTitle } from '@utils/utils';
import { storage } from '@firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';


const useStores = create((set) => ({

  // Weather-related state
  weather: staticWeather,
  weatherIcon: `https://openweathermap.org/img/wn/${ staticWeather.hourly[0].weather[0].icon }@2x.png`,
  weatherPhoto: '',
  weatherLoading: false,
  weatherError: null,
  setWeatherPhoto: (newPhoto) => set({ weatherPhoto: newPhoto }),
  setWeather: (data) => {
    set({ weather: data });
    get().updateWeatherIcon();
    get().updateWeatherPhoto();
  },
  setWeatherLoading: (isLoading) => set({ weatherLoading: isLoading }),
  setWeatherError: (err) => set({ weatherError: err }),

  // Map-related state
  lon: -98.48527,
  lat: 29.423017,
  mapLocation: null,
  search: null,
  searchResult: null,
  mapLoading: false,
  mapError: null,

  // Weather-related actions
  fetchWeatherData: async () => {
    const { lat, lon } = useStores.getState();
    if (lat && lon) {
      try {
        set({ weatherLoading: true });
        const res = await axios.get(
          `https://us-central1-weathermap-90bca.cloudfunctions.net/api/weather`,
          {
            params: { lat, lon },
          }
        );
        setWeather(res.data);
        set({ weatherLoading: false });
      } catch (err) {
        console.error('Error fetching weather data.', err);
        setWeatherError(err);
        set({ weatherLoading: false });
      }
    }
  },

  // Map-related actions
  getUserLocation: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.error('Error retrieving user location.', err);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  },

  setSearch: (newSearch) => set({ search: newSearch }),

  updateWeatherIcon: () => {
    const weather = get().weather;
    if (weather && weather.hourly && weather.hourly[0] && weather.hourly[0].weather && weather.hourly[0].weather[0]) {
      const newIcon = `https://openweathermap.org/img/wn/${ weather.hourly[0].weather[0].icon }@2x.png`;
      set({ weatherIcon: newIcon });
    }
  },

  updateWeatherPhoto: () => {
    const weather = get().weather;
    if (weather && weather.daily[0]) {
      (async () => {
        const title = getPhotoTitle(
          weatherTypes,
          weather.daily[0].weather[0].main
        );
        try {
          const folderRef = ref(storage, title);
          const { items } = await listAll(folderRef);
          const photoNum = randomNumRange(0, items.length - 1);
          const url = await getDownloadURL(items.at(photoNum));
          set({ weatherPhoto: url });
        } catch (err) {
          console.error('Error retrieving weather photo', err.message);
        }
      })();
    }
  },

  fetchLocationData: async () => {
    const { lat, lon, search } = useStores.getState();

    if (search) {
      try {
        set({ mapLoading: true });
        const res = await axios.get(
          `https://us-central1-weathermap-90bca.cloudfunctions.net/api/mapbox`,
          {
            params: { query: search },
          }
        );
        set({
          searchResult: res.data,
          mapLocation: formatLocation(
            res.data.features[3].place_name,
            states
          ),
          lon: res.data.features[0].center[0],
          lat: res.data.features[0].center[1],
          mapLoading: false,
        });
      } catch (err) {
        console.error('Error retrieving location.', err);
        set({ mapError: err, mapLoading: false });
      }
    } else if (lat && lon) {
      try {
        set({ mapLoading: true });
        const res = await axios.get(
          `https://us-central1-weathermap-90bca.cloudfunctions.net/api/mapbox`,
          {
            params: { query: `${ lon }, ${ lat }` },
          }
        );
        set({
          searchResult: res.data,
          mapLocation: formatLocation(
            res.data.features[3].place_name,
            states
          ),
          mapLoading: false,
        });
      } catch (err) {
        console.error('Error retrieving coordinates.', err);
        set({ mapError: err, mapLoading: false });
      }
    }
  },
}));

// Export the combined store
export default useStores;