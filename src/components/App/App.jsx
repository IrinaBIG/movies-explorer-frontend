import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from "react";

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleBurgerMenuClick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <div className="body">
      <div className="page">
        <Header onBurgerMenu={handleBurgerMenuClick} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
            // onBurgerMenu={handleBurgerMenuClick}
            />
          </Route>

          <Route path="/movies">
            <Movies
            //  onBurgerMenu={handleBurgerMenuClick}
            />
          </Route>

          <Route path="/profile">
            <Profile
            // onBurgerMenu={handleBurgerMenuClick}
            />
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

        <BurgerMenu isOpen={isBurgerMenuOpen} isClose={closeBurgerMenu} />
      </div>
    </div>
  );
}

export default App;
