const daysOfWeek = [
  {
    index: 0,
    name: 'Domingo'
  },
  {
    index: 1,
    name: 'Lunes'
  },
  {
    index: 2,
    name: 'Martes'
  },
  {
    index: 3,
    name: 'Miércoles'
  },
  {
    index: 4,
    name: 'Jueves'
  },
  {
    index: 5,
    name: 'Viernes'
  },
  {
    index: 6,
    name: 'Sábado'
  }
];

export const getTimeFormatFromDate = date => {
  let dateToParse = new Date(date);
  let hour = dateToParse.getHours();
  let minutes = dateToParse.getMinutes();

  return getTime12Format(hour, minutes);
};

export const getTime12Format = (hour, minutes) => {
  let stripe = 'a.m';

  if (hour > 12) {
    stripe = 'p.m';
    hour = hour - 12;
  }

  if (hour.toString().length < 2) hour = '0' + hour;
  if (minutes.toString().length < 2) minutes = '0' + minutes;

  return hour + ':' + minutes + ' ' + stripe;
};

export const getDateFormatFromDateString = date => {
  let dateToFormat = new Date(date);

  return dateToFormat
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');
};

//formatos

export const getDaysFromIndex = days => {
  let daysToFormat = daysOfWeek
    .filter(day => {
      return days.includes(day.index);
    })
    .map(day => day.name);
  console.log('formato', daysToFormat);

  return daysToFormat.join(', ');
};
