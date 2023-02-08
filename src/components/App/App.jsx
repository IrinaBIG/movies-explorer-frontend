import { useState, useEffect, useCallback } from "react";
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
import Preloader from "../Preloader/Preloader";

function App() {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("moviesSaved") || "[]") 
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("checkBoxStatus") === "true"
  );
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(
    localStorage.getItem("checkBoxStatusSavedMovies") === "true"
  );
  const [btnMoreMovies, setBtnMoreMovies] = useState(0);
  const [isServerError, setIsServerError] = useState(false);
  const [isNotChecked, setIsNotChecked] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const [widthOfScreen, setWidthOfScreen] = useState(window.innerWidth);
  const [isUpdate, setIsUpdate] = useState(null);
  const [errorTextProfile, setErrorTextProfile] = useState("");
  const moviesPath = location.pathname === "/movies";
  const moviesSavedPath = location.pathname === "/saved-movies";

  const handleFiltredCheckbox = (e) => {
    if (moviesPath) {
      setIsChecked(e.target.checked);
      localStorage.setItem("checkBoxStatus", e.target.checked);
    } else if (moviesSavedPath) {
      setIsCheckedSavedMovies(e.target.checked);
      localStorage.setItem("checkBoxStatusSavedMovies", e.target.checked);
    }
  };

  function handleFindMovieFromApi(word) {
    setIsLoading(true);
    if ("allBeatfilmMovies" in localStorage) {
      setIsLoading(false);
      const beatfilmMoviesArr = JSON.parse(
        localStorage.getItem("allBeatfilmMovies")
      );
      setIsChecked(localStorage.getItem("checkBoxStatus") === "true");
      const moviesApiSearch = beatfilmMoviesArr.filter((item) => {
        const isSearchedName = item.nameRU
          .toLowerCase()
          .includes(word.toLowerCase());
        const isShorts = isChecked ? item.duration <= 40 : true;
        return isSearchedName && isShorts;
      });
      setMovies(moviesApiSearch);
      localStorage.setItem("findMovies", JSON.stringify(moviesApiSearch));
      setIsLoading(false);
      localStorage.setItem("search", word);
      localStorage.setItem("checkBoxStatus", isChecked);
      handleChangeWidthOfScreen();
    } else {
      moviesApi
        .getMoviesFromApi()
        .then((res) => {
          const allBeatfilmMovies = res;
          const moviesFromApiSearch = allBeatfilmMovies.filter((item) => {
            const isSearchedName = item.nameRU
              .toLowerCase()
              .includes(word.toLowerCase());
            const isShorts = isChecked ? item.duration <= 40 : true;
            return isSearchedName && isShorts;
          });
          setMovies(moviesFromApiSearch);
          localStorage.setItem(
            "findMovies",
            JSON.stringify(moviesFromApiSearch)
          );
          setIsLoading(false);
          localStorage.setItem(
            "allBeatfilmMovies",
            JSON.stringify(allBeatfilmMovies)
          );
          localStorage.setItem("search", word);
          localStorage.setItem("checkBoxStatus", isChecked);
          handleChangeWidthOfScreen();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          if (err.statusCode === 500) {
            setIsServerError(true);
          }
        })
        .finally(() => {
          setIsNotChecked(false);
          setIsLoading(false);
        });
    }
  }

  function handleFindSavedMovie(search) {
    setIsLoading(true);
    const allSavedMovies = JSON.parse(localStorage.getItem("allSavedMovies"));
    setIsChecked(localStorage.getItem("checkBoxStatusSavedMovies") === "true");
    setIsLoading(false);
    const savedMoviesSearch = allSavedMovies.filter((item) => {
      const isSearchedName = item.nameRU
        .toLowerCase()
        .includes(search.toLowerCase());
      const isShorts = isCheckedSavedMovies ? item.duration <= 40 : true;
      return isSearchedName && isShorts;
    });
    setSavedMovies(savedMoviesSearch);
    setIsLoading(false);
    localStorage.setItem("savedMoviesSearch", search);
    localStorage.setItem("checkBoxStatusSavedMovies", isCheckedSavedMovies);
  }

  function handleSavedAndLikesMovies(movie) {
    mainApi
      .addMovie(movie)
      .then((res) => {
        const newSavedMovie = [...savedMovies, res.data];
        setSavedMovies(newSavedMovie);
        localStorage.setItem("allSavedMovies", JSON.stringify(newSavedMovie));
      })
      .catch((err) => {
        if (err.code === 401) {
          setIsLoggedIn(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsNotChecked(false);
      });
  }

  function handleCardLike(movie) {
    const allSavedMovies = JSON.parse(localStorage.getItem("allSavedMovies"));
    return allSavedMovies.some(
      (item) => item.movieId === movie.id && item.owner === currentUser._id
    );
  }

  function handleDislikeAndDeleteMovie(c) {
    const movie = savedMovies.find(
      (item) => item.movieId === (c.id || c.moveId)
    );
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const arrWithouthDelMovies = savedMovies.filter(
          (res) => res._id !== movie._id
        );
        setSavedMovies(arrWithouthDelMovies);
        localStorage.setItem(
          "allSavedMovies",
          JSON.stringify(arrWithouthDelMovies)
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setIsLoggedIn(false);
        }
      });
  }

  function handleDeleteSavedMovie(c) {
    mainApi
      .deleteMovie(c._id)
      .then(() => {
        const arrWithouthDelMovies = savedMovies.filter((res) => {
          return res._id !== c._id;
        });
        setSavedMovies(arrWithouthDelMovies);
        localStorage.setItem(
          "allSavedMovies",
          JSON.stringify(arrWithouthDelMovies)
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setIsLoggedIn(false);
        }
      });
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res.name) {
          setCurrentUser(res);
          return auth.authorize(password, email);
        } else { return}
      })
      .then((res) => {
        if (!res) {
          return
        } else {
          setIsLoggedIn(true);
            localStorage.setItem("token", res.token);
            history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsNotChecked(false);
        });
    }
  }, [isLoggedIn]);

  function handleLogin(password, email) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          localStorage.setItem("token", data.token);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser({ name: res.data.name, email: res.data.email });
        setIsUpdate(true);
        setTimeout(setIsUpdate, 700);
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          setIsLoggedIn(false);
        }
        if (err.statusCode === 409) {
          setIsServerError(true);
          setErrorTextProfile(err.message);
          setTimeout(setErrorTextProfile, 700);
          setIsUpdate(false);
          setTimeout(setIsUpdate, 700);
        }
      })
      .finally(() => {
        setIsNotChecked(false);
        setIsLoading(false);
      });
  }

  function handleSwowMoreMovies() {
    const foundMovies = JSON.parse(localStorage.getItem("findMovies"));
    setMovies(foundMovies.slice(0, movies.length + btnMoreMovies));
  }

  function handleWindowWidth() {
    setWidthOfScreen(window.innerWidth);
  }

  const handleChangeWidthOfScreen = useCallback(() => {
    const foundMovies = JSON.parse(localStorage.getItem("findMovies"));
    if (foundMovies === null) {
      return;
    }
    if (widthOfScreen >= 1280) {
      setMovies(foundMovies.slice(0, 16));
      setBtnMoreMovies(4);
    } else if (widthOfScreen >= 768 && widthOfScreen <= 1279) {
      setMovies(foundMovies.slice(0, 8));
      setBtnMoreMovies(2);
    } else if (widthOfScreen >= 320 && widthOfScreen <= 767) {
      setMovies(foundMovies.slice(0, 5));
      setBtnMoreMovies(2);
    }
  }, [widthOfScreen]);

  useEffect(() => {
    handleChangeWidthOfScreen();
    window.addEventListener("resize", handleWindowWidth);
    return () => {
      document.removeEventListener("resize", handleWindowWidth);
    };
  }, [handleChangeWidthOfScreen]);

  function onSignOut() {
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    history.push("/");
    setIsLoggedIn(false);
    setIsChecked(false);
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then(({ data: savedMovies }) => {
        setSavedMovies(savedMovies);
        localStorage.setItem("allSavedMovies", JSON.stringify(savedMovies));
        localStorage.setItem("savedMoviesSearch", "");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsNotChecked(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      mainApi
        .getUser()
        .then((profile) => {
          setIsLoggedIn(true);
          setCurrentUser(profile);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsNotChecked(false);
        });
    }
  }, [isLoggedIn]);

  if (isNotChecked) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={isLoggedIn} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={isLoggedIn}
            handleFiltredCheckbox={handleFiltredCheckbox}
            component={Movies}
            movies={movies}
            searchNameMovies={localStorage.getItem("search")}
            handleFindMovieFromApi={handleFindMovieFromApi}
            isLoading={isLoading}
            isChecked={isChecked}
            onSaveMovieLike={handleSavedAndLikesMovies}
            handleCardLike={handleCardLike}
            handleDeleteMovies={handleDislikeAndDeleteMovie}
            handleSwowMoreMovies={handleSwowMoreMovies}
            serverError={isServerError}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={isLoggedIn}
            component={SavedMovies}
            movies={savedMovies}
            isLoading={isLoading}
            isCheckedSave={isCheckedSavedMovies}
            onSaveMovieLike={handleSavedAndLikesMovies}
            handleFiltredCheckbox={handleFiltredCheckbox}
            handleDeleteSavedMovies={handleDeleteSavedMovie}
            handleFindSavedMovie={handleFindSavedMovie}
            handleCardLike={handleCardLike}
            searchNameSavedMovies={localStorage.getItem("savedMoviesSearch")}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={isLoggedIn}
            component={Profile}
            handleUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
            errorTextProfile={errorTextProfile}
            isServerError={isServerError}
            isUpdate={isUpdate}
          />

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>

          <Route patch="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
