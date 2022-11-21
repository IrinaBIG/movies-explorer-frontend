import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';

function App() {

  return (

    <div className="body">
      <div className="page">

      <Header/>

        <Switch>
        <Main/>

          {/* <Route exact path="/main">
            component={Main}
          </Route> */}

          <Route path="/saved-movies">
          </Route>

          <Route path="/movies">

          </Route>

          <Route path="/profile">

          </Route>

          <Route path="/sign-up">
            {/* <Register /> */}
          </Route>

          <Route path="/sign-in">
            {/* <Login /> */}
          </Route>

          <Route exact path="/">
            {/* {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />} */}
          </Route>

        </Switch>
      </div>
    </div>
  );
}

export default App;
