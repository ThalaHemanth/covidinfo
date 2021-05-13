import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import Home from './components/pages/Home';

import { ApiContextProvider, ApiProvider, useApiContext } from './contexts/api';
import Navbar from './components/Navbar';
import TweetFeed from './components/pages/TweetFeed';

function App() {
  const { city, rem } = useApiContext();
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home data={city} />
        </Route>
        <Route path="/tweets" component={TweetFeed} />
        <Route path="/remdesivir">
          <Home data={rem} />
        </Route>
      </Switch>
    </>
  );
}

export default App;

/*
    Active Table data. { set it by looking at the route url }
    Manipulate Active data.
    Total Pages
    Current Page
    Prev Page
    Next Page

    last index: pagelimit * currentPage - 1
    first index: pagelimit * currentPage - pageLimit
 */
