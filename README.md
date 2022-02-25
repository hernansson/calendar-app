<div id="top"></div>
<br />
<div align="center" >
  <a href="https://git.jobsity.com/hernansson/react-calendar">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Hernan's Calendar</h3>

  <p align="center">
    A calendar mainly built with React.

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
    <ul>
      <a href="#about-the-project">About The Project</a>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#considerations">Considerations</a></li>
    </ul>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#commands">Commands</a></li>
      </ul>

</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A calendar built with React & co.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React.js](https://reactjs.org/) - Main
-   [Material-UI](https://mui.com/) - Styling/Functionality
-   [Yup](https://www.npmjs.com/package/yup) - Validating Forms
-   [Prettier](https://prettier.io/) - Sexy Code ;)
-   [EsLint](https://eslint.org/) - Code Formatter
-   [React-Router](https://reactrouter.com/) - Multiple pages
-   [React-Context](https://reactjs.org) - Small-medium scale state management
-   [Hook-Form](https://react-hook-form.com/) - Forms
-   [Axios](https://axios-http.com/docs/intro) - HTTP Requests

<p align="right">(<a href="#top">back to top</a>)</p>

### Considerations

1. I used [MetaWeather](https://www.metaweather.com/api/), in order to request the data correctly you need to enable cors.
   It does not support all cities (at least the free version) just use 'New York' - 'Buenos Aires' - 'Tokyo' - Or try to find another one.
2. In a real project I would you the Google Location API / Autocomplete - Just to make sure the location exists.
3. I tried 2 free API's in one of them I run out of request (only supported 50, big F), the other one did not let me use PUT/DELETE/POST - only GET. So finally I decided to go with [Mockapi](https://mockapi.io/). This let me do every HTTP Request, but limits the data tree... So the Calendar SHOULD work with all months if data is provided (But for now it will only show Feb, same as Day selection.)
4. I was told not to implement anything in the back, but if you wish I can make an API, and connect it to firebase, or a localDB
5. For state management I consider Context plays the perfect role for this type of projects. For complex ones, I do consider it could also be done, but maybe Redux its better in some cases ( or any other).
6. If time is given multi-language support with i18n could be implemented

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

1. You need to have node install in your PC (You can algo use Yarn)
   https://nodejs.org/en/download/

### Installation

1. Open Terminal
2. Clone the repo

```sh
git clone git@git.jobsity.com:hernansson/react-calendar.git
```

3. Navigate to 'react-calendar' folder

```sh
  cd react-calendar
```

4. Install NPM packages

```sh
npm install
```

4. Create an environment file .env & create an REACT_APP_MOCKAPI_KEY variable

```env
REACT_APP_MOCKAPI_KEY='ENTER YOUR API'
```

5. Where's the API KEY ? (This should NOT be here, but I need Job (?))

```js
  6211828901ccdac07424bfe7
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Commands

1. Start Project

```sh
  npm start
```

2. ESLint for consistency

```sh
  npm run lint
```

3. Prettier for making code sexier

```sh
  npm run prettier
```

4. Tests

```sh
  npm run test
```

<p align="right">(<a href="#top">back to top</a>)</p>
````
