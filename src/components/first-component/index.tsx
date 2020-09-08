import React from 'react';
import { CommonContainer, Text } from './CommonComp.styles';

type Props = {
  smnumber: number;
};

const CommonComp = ({ smnumber }: Props) => (
  <CommonContainer>
    <Text>{smnumber}</Text>
  </CommonContainer>
);

export default CommonComp;
