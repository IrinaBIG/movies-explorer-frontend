import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [btnMoreMovies, setBtnMoreMovies] = useState(0);
  const [widthOfScreen, setWidthOfScreen] = useState(window.innerWidth);
  // const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();
  const location = useLocation();

  function onInput(evt) {
    setSearch(evt.target.value);
  }

  function handleFindMovieFromApi(evt) {
    evt.preventDefault();
    setIsLoading(true);
    moviesApi
      .getMoviesFromApi(search, isChecked)
      .then((res) => {
        // console.log(res);
        const moviesApi = res.filter((item) => {
          return item.nameRU.toLowerCase().includes(search.toLowerCase());
        });
        const findMovies = isChecked
          ? moviesApi.filter((item) => item.duration <= 40)
          : moviesApi;
        console.log(findMovies);
        setMovies(findMovies);
        setIsLoading(false);
        localStorage.setItem("search", search);
        localStorage.setItem("findMovies", JSON.stringify(findMovies));
        localStorage.setItem("checkBoxStatus", isChecked);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddSavedMovies(movie) {
    // setIsLoading(true);
    mainApi
      .addMovie(movie)
      .then((res) => {
        console.log(res);
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function handleMovieLike(movie) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   // const isLiked = movie.likes.some(item => item._id === currentUser._id);
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   mainApi.toggleLike(movie)
  //     .then((newMovie) => {
  //       setMovies((state) => state.map((c) => (c.id === movie ? newMovie : c)));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function handleGetUserInfo() {
    if (loggedIn)
      mainApi
        .getUser()
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleRegister(name, email, password) {
    // if ((name, email, password)) {
    auth
      .register(name, email, password)
      .then((res) => {
        // if (res.data) {
        // console.log(res);
        console.log(res);
        // setIfRegOk(true);
        history.push("/signin");
        // }
      })
      .catch((err) => {
        // setIfRegOk(false);
        console.log(err);
      });
    // .finally(() => {
    //   handleTooltipPlaceClick();
    // })
    // }
  }

  function handleLogin(password, email) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          console.log(data.token);
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          handleGetUserInfo(data);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleChangeResize() {
    setWidthOfScreen(window.innerWidth);
  }

  function handleChangeWidthOfScreen() {
    const findMovies = JSON.parse(localStorage.getItem("findMovies"));
    console.log(findMovies);
    if (findMovies === null) {
      return;
    }
    if (widthOfScreen <= 1280) {
      setMovies(findMovies.slice(0, 16));
      setBtnMoreMovies(4);
    } else if (widthOfScreen === 768) {
      setMovies(findMovies.slice(0, 8));
      setBtnMoreMovies(2);
    } else if (widthOfScreen >= 320 && widthOfScreen <= 480) {
      setMovies(findMovies.slice(0, 5));
      setBtnMoreMovies(2);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeResize);
    handleChangeWidthOfScreen();
  }, []);

  function handleUpdateUser(data) {
    if (loggedIn)
    setIsLoading(true);
    mainApi
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickCheckbox() {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem("token");
    if (jwt) {
      // здесь будем проверять токен
      auth
        .checkToken(jwt)
        .then((res) => {
          // console.log(res);
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            isChecked={isChecked}
            isCheckbox={handleClickCheckbox}
          />

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            onInput={onInput}
            handleFindMovieFromApi={handleFindMovieFromApi}
            isLoading={isLoading}
            isChecked={isChecked}
            isCheckbox={handleClickCheckbox}
            onMovieLike={handleAddSavedMovies}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            handleUpdateUser={handleUpdateUser}
          />

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>

          <Route patch="*">
            <NotFound />
          </Route>
        </Switch>
        {/* </main> */}
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
