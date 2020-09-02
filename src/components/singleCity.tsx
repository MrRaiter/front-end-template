import React from 'react';
import { useHistory } from 'react-router-dom';
import { City } from '../constants/types';
import './singleCity.css';

export interface Props {
  city: City
}

const SingleCity = ({ city }: Props) => {
  const history = useHistory();
  const onClickHandler = () => {
    history.push(`/${city.name}`);
  };

  return (
    <div className="weather-card-single w-a-small" onClick={onClickHandler}>
      <p className="bold white">{city.name}</p>
      <div>
        <img alt="weather" src={city.weather.icon} />
      </div>
      <div>
        <p>
          <span>{city.weather.temperature}</span>
          <span>&#176;</span>
        </p>
        <p>{city.weather.description}</p>
      </div>
    </div>
  );
};

export default SingleCity;
