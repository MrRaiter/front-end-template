import { createGlobalStyle } from 'styled-components';

/**
 * This file contains Global styles for the whole project
 *
 * I recommend that you do not add styles here and, instead, add styles via
 * style guide for each component.
 */
export default createGlobalStyle`
  body {
    /*
    * Something impressive about body
    */
  }
  html {
    /*
    * Something more impressive
    */
  }
  html, body, #root {
  font: 0.9rem sans-serif;
  height: 100%;
  margin: 0;
}
`;
