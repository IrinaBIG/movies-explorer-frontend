import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer'
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from '../NotFound/NotFound'

function App() {

  return (

    <div className="body">
      <div className="page">

      <Header />

        <Switch>
        
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/profile">
            <Profile />

          </Route>

          <Route path="/sign-up">
            <Register />
          </Route>

          <Route path="/sign-in">
            <Login />
          </Route>


          <Route exact path="/">
            {/* {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />} */}
          </Route>

          <Route patch="*">
            <NotFound />
          </Route>
          
        </Switch>

        <Footer />

      </div>
    </div>
  );
}

export default App;
