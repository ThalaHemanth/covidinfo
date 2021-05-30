import { Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';

import { useApiContext } from './contexts/api';
import Navbar from './components/Navbar';
import TweetFeed from './components/pages/TweetFeed';
import SearchResults from './components/pages/SearchResults';
import NoSearchResults from './components/pages/NoSearchResults';
import Links from './components/pages/Links';

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
        <Route path="/search" component={SearchResults} />
        <Route path="/nosearchresults" component={NoSearchResults} />
        <Route path="/links" component={Links} />
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
