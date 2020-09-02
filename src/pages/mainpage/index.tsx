import React, { useContext } from 'react';
import { WeatherContext } from '../../context/index';
import SingleCity from '../../components/singleCity';
import { City } from '../../constants/types';
import './styles.css';

const MainPage = () => {
  const { cities } = useContext(WeatherContext);

  return (
    <div className="main-app">
      <div className="container">
        <h1 className="grey py-2">Multi Cities Weather App</h1>
        <div className="weather-container weather-container-small">
          {cities?.map((city: City, index: number) => <SingleCity key={index} city={city} />)}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
