import React from 'react';
import { FirstPageContainer, TextInside } from './styles';
import { FirstType, SecondType } from './types';

const FirstPage = () => {
  const mock1: FirstType = {
    key1: 1,
    key2: 'boy',
  };

  const mock2: SecondType = {
    key3: false,
    key4: 12,
  };

  return (
    <FirstPageContainer>
      <TextInside>
        {mock1.key1}
        {mock2.key4}
      </TextInside>
    </FirstPageContainer>
  );
};
export default FirstPage;
