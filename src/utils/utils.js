export const randomNumRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const convertTime = (currentTime) => currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const formatTime = (unix) => {
  const date = new Date(unix * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  return (hours % 12 || 12) + ':' + minutes.slice(-2) + ' ' + ampm;
};

export const formatWindDeg = (deg) => {
  const val = Math.floor((deg / 22.5) + 0.5);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[val % 8];
};

export const formatDate = (date) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${ month } ${ day }, ${ year }`;
};

export const formatForecastDate = (unix) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const currentDate = new Date();
  const targetDate = new Date(unix * 1000);

  let dayName = dayNames[targetDate.getDay()];
  const month = monthNames[targetDate.getMonth()];
  const day = targetDate.getDate();

  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);

  if (targetDate.toDateString() === currentDate.toDateString()) {
    dayName = 'Today';
  } else if (targetDate.toDateString() === tomorrow.toDateString()) {
    dayName = 'Tomorrow';
  }

  return (
    <>
      <div style={ { fontSize: '1.2rem' } }>{ dayName }</div>
      <div style={ { fontSize: '2.5rem' } }>{ month }</div>
      <div style={ { fontSize: '2.5rem' } }>{ day }</div>
    </>
  );
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatLocation = (location, usStates) => {
  const parts = location.split(',').map(part => part.trim());
  const city = parts[0];
  const state = usStates[parts[1]];
  return `${ city }, ${ state }`;
};

export const formatMoonPhase = (moonPhase) => {
  if (moonPhase === 0 || moonPhase === 1) {
    return 'New Moon';
  } else if (moonPhase > 0 && moonPhase < 0.25) {
    return 'Waxing Crescent';
  } else if (moonPhase === 0.25) {
    return 'First Quarter Moon';
  } else if (moonPhase > 0.25 && moonPhase < 0.5) {
    return 'Waxing Gibbous';
  } else if (moonPhase === 0.5) {
    return 'Full Moon';
  } else if (moonPhase > 0.5 && moonPhase < 0.75) {
    return 'Waning Gibbous';
  } else if (moonPhase === 0.75) {
    return 'Last Quarter Moon';
  } else if (moonPhase > 0.75 && moonPhase < 1) {
    return 'Waning Crescent';
  } else {
    return 'Invalid Moon Phase';
  }
};

export const formatTemp = (temp) => `${ Math.round(temp) }º F`;
;

export const detailFormats = {
  'Sunrise': { func: formatTime },
  'Sunset': { func: formatTime },
  'Humidity': { unit: '%' },
  'Pressure': { unit: 'hPa ' },
  'Dew Point': { func: formatTemp },
  'Wind Speed': { unit: 'mph' },
  'Wind Gust': { unit: 'mph' },
  'UV Index': {},
  'Moon Phase': { func: formatMoonPhase }
};
export const formatDetail = (name, value) => {
  const format = detailFormats[name];
  if (format.func) {
    return format.func(value);
  } else if (format.unit) {
    return `${ value } ${ format.unit }`;
  } else {
    return value;
  }
};

export const mapNameToProp = (name) => {
  switch (name) {
    case 'UV Index':
      return 'uvi';
    default:
      return name.replace(' ', '_').toLowerCase();
  }
};

export const getPhotoTitle = (weatherTypes, title) => weatherTypes[title.toLowerCase()];