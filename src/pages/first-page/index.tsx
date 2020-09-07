import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FirstPageContainer, TextInside, UserContainer, MockContainer, RedirectButton,
} from './styles';
import { FirstType, SecondType } from './types';
import { useUserContext } from '../../context/UserContext';

const FirstPage = () => {
  const { user } = useUserContext();
  const history = useHistory();

  const redirectToSecondPage = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/user');
  };

  const mock1: FirstType = {
    key1: 7,
    key2: 'Some mock data',
  };

  const mock2: SecondType = {
    key3: false,
    key4: 13,
  };

  return (
    <FirstPageContainer>
      <TextInside>
        <h1>
          Hello! It is template
        </h1>
        <h1>
          On this page we can see user that we got from our context:
        </h1>
        <UserContainer>
          <span>{`Name: ${user!.name}`}</span>
          <span>{`Age: ${user!.age}`}</span>
        </UserContainer>
        <MockContainer>
          <span>{`${mock1.key2} for example ${mock1.key1} or boolean: ${mock2.key3} or ${mock2.key4}`}</span>
        </MockContainer>
      </TextInside>
      <RedirectButton onClick={redirectToSecondPage}>Redirect To Second Page</RedirectButton>
    </FirstPageContainer>
  );
};
export default FirstPage;
