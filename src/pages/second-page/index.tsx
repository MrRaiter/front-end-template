import React from 'react';
import { ThirdType, FourthType } from './types';
import './styles.css';

const SecondPage = () => {
  const mock3: ThirdType = {
    key5: 4,
    key6: 'hi',
  };

  const mock4: FourthType = {
    key7: true,
    key8: 12,
  };

  return (
    <div className="main-container">
      {mock3.key5}
      {mock4.key7}
    </div>
  );
};

export default SecondPage;
