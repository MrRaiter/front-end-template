import React from 'react';
import './CommonComp.styles';

type Props = {
  smnumber: number;
};

const CommonComp = ({ smnumber }: Props) => (
  <div className="weather-card-single w-a-small">
    {smnumber}
  </div>
);

export default CommonComp;
