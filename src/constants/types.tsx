import { ReactNode } from 'react';

export type ContextProps = {
  children: ReactNode
};

export type Weather = {
  temperature: number,
  description: string,
  icon: string,
};

export type City = {
  name: string,
  weather: Weather,
  country: string,
  time: Date,
  observation_time: string,
};

export type ContextStore = {
  cities: City[],
};
