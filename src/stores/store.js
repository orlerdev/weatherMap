// ZUSTAND
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
// FIREBASE
import { storage } from '@firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
// AXIOS
import axios from 'axios';
// LOCAL
import { staticWeather, weatherTypes } from '@data/staticWeather';
import { states } from '@data/states';
import { formatLocation, randomNumRange, getPhotoTitle } from '@utils/utils';

const useStore = create((set) => ({
  // MAP STATE
  lon: -98.48527,
  setLon: (lon) => set({ lon }),
  lat: 29.423017,
  setLat: (lat) => set({ lat }),
  zoom: 9,
  setZoom: (zoom) => set({ zoom }),
  mapLocation: '',
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
  updateIcon: async () => {
    const weather = get().weather();
    if (weather && weather.hourly[0]) {
      get().setWeatherIcon(`https://openweathermap.org/img/wn/${ weather.hourly[0].weather[0].icon }@2x.png`);
    }
  },
  weatherPhoto: '',
  setWeatherPhoto: (weatherPhoto) => set({ weatherPhoto }),
  updateWeatherPhoto: async () => {
    const weather = get().weather();
    if (weather && weather.daily[0]) {
      const title = getPhotoTitle(
        weatherTypes, get().weather().daily[0].weather[0].main
      );
      try {
        const folderRef = ref(storage, title);
        const { items } = await listAll(folderRef);
        const photoNum = randomNumRange(0, items.length - 1);
        const url = await getDownloadURL(items.at(photoNum));
        get().setWeatherPhoto(url);
      } catch (err) {
        console.error('Error fetching photo', err.message);
        get().error(err);
      }
    }
  }
}));
export default useStore;

