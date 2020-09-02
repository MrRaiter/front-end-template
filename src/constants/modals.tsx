import { City } from './types';

const initialCity: City[] = [{
  name: 'san francisco',
  weather: {
    temperature: 0,
    description: 'unknown',
    icon: '01n',
  },
  country: 'US',
  time: new Date(),
  observation_time: '00 00 am',
}, {
  name: 'london',
  weather: {
    temperature: 0,
    description: 'unknown',
    icon: '01n',
  },
  country: 'UK',
  time: new Date(),
  observation_time: '00 00 am',
}, {
  name: 'moscow',
  weather: {
    temperature: 0,
    description: 'unknown',
    icon: '01n',
  },
  country: 'RU',
  time: new Date(),
  observation_time: '00 00 am',
},
];

export default initialCity;
