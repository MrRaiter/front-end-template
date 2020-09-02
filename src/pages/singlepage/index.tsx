import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { WeatherContext } from '../../context/index';
import { City } from '../../constants/types';
import './styles.css';

const SingleCityPage = () => {
  const { name } = useParams();
  const history = useHistory();
  const { cities } = useContext(WeatherContext);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    history.push('/');
  };

  const city: City | undefined = cities?.find((cityInArray: City) => cityInArray.name === name);
  return (
    <div className="main-container">
      <div className="weather-card weather-card-small">
        <h1 className="bold white">{city?.name}</h1>
        <div>
          <img alt="weather" src={city?.weather.icon} />
        </div>
        <div className="my-2 border-bottom">
          <p>
            <span className="bold white">{`Temperature: ${city?.weather.temperature}`}</span>
            <span className="bold white">&#176;</span>
          </p>
          <p className="bold white">{`Observation Time: ${city?.observation_time}`}</p>
          <p className="bold white">{`Description: ${city?.weather.description}`}</p>
        </div>
        <div>
          <p className="bold white">{`Local time: ${city?.time.toString()}`}</p>
          <p className="bold white">{`Country: ${city?.country}`}</p>
        </div>
        <button type="button" onClick={handleSubmit}> Get Back </button>
      </div>
    </div>
  );
};

export default SingleCityPage;
