import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
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
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

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

  function handleAddSavedMovies(data) {
    setIsLoading(true);
    mainApi
      .addMovie(data)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function handleMovieLike(movie) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = movie.likes.some(item => item._id === currentUser._id);
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   mainApi.toggleLike(movie._id, isLiked)
  //     .then((newMovie) => {
  //       setMovies((state) => state.map((c) => (c._id === movie._id ? newMovie : c)));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function handleGetUserInfo() {
    mainApi.getUser()
    .then((data) => {
      setLoggedIn(true);
      setCurrentUser(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleLogin(password, email) {
    if (!password || !email) {
      return;
    }
    auth
      .authorize(password, email)
      .then((data) => {
        // console.log(data)
        if (data.token) {
          // console.log(data.token);
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          handleGetUserInfo(data);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(name, password, email) {
    if ((name, password, email)) {
      auth
        .register(name, password, email)
        .then((res) => {
          if (res.data) {
            console.log(res);
            // setIfRegOk(true);
            history.push("/sign-in");
          }
        })
        .catch((err) => {
          // setIfRegOk(false);
          console.log(err);
        });
      // .finally(() => {
      //   handleTooltipPlaceClick();
      // })
    }
  }



  function handleUpdateUser(data) {
    // setIsLoading(true);
    mainApi.editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      // .finally(() => {
      //   setIsLoading(false);
      // })
  }

  function handleClickCheckbox() {
    setIsChecked(!isChecked);
  }



  useEffect(() => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem('token');
    if (jwt) {
      // здесь будем проверять токен
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {/* <main> */}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute 
          loggedIn={loggedIn}
          path="/saved-movies" 
          component={SavedMovies} />

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
          />

          <ProtectedRoute
           path="/profile"
           loggedIn={loggedIn}
           component={Profile}
           handleUpdateUser={handleUpdateUser}
          />

          <Route path="/sign-up">
          <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/sign-in" />}
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
