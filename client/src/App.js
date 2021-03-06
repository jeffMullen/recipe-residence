import logo from './logo.svg';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import './scss/index.scss';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile';
import SingleRecipe from './pages/SingleRecipe/SingleRecipe';

const link = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/profile' component={Profile} />
              <Route path='/recipes/:recipeId' component={SingleRecipe} />
            </Switch>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
