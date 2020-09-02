import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { ContextProps, ContextStore, City } from '../constants/types';
import initialCity from '../constants/modals';

export const WeatherContext = createContext<Partial<ContextStore>>({ cities: initialCity });

const WeatherContextProvider = ({ children } : ContextProps) => {
  const [cities, setCities] = useState<City[]>(initialCity);

  useEffect(() => {
    const fetchData = async () => {
      const weatherInfo: City[] = await Promise.all(cities.map(async (city: City) => {
        const { data }: any = await axios.get(`http://api.weatherstack.com/current?access_key=21df9ceebde4c15e5764d558bf8daf60&query=${city.name}`);
        const weather: City = {
          name: city.name,
          weather: {
            temperature: data.current.temperature,
            description: data.current.weather_descriptions[0],
            icon: data.current.weather_icons[0],
          },
          country: city.country,
          time: data.location.localtime,
          observation_time: data.current.observation_time,
        };
        return weather;
      }));
      setCities(weatherInfo);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <WeatherContext.Provider value={{ cities }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
