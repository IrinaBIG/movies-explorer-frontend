import { useState, useEffect, useCallback, useMemo } from "react";
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
// import { useMemo } from "react";

function App() {
  // const [searchWord, setSearchWord] = useState("");
  
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState(savedMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState( {} );
  const [loggedIn, setLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(false);
  const [btnMoreMovies, setBtnMoreMovies] = useState(0);
  const [serverError, setSeverError] = useState(false);
  const [isNotChecked, setIsNotChecked] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const [widthOfScreen, setWidthOfScreen] = useState(window.innerWidth);


  function handleFindMovieFromApi(word) {
    console.log(word)
    setIsLoading(true);
    moviesApi
      .getMoviesFromApi(isChecked)
      .then((res) => {
        const moviesApiSearch = res.filter((item) => {
          return item.nameRU.toLowerCase().includes(word.toLowerCase());
        });
        const findMovies = isChecked
          ? moviesApiSearch.filter((item) => item.duration <= 40)
          : moviesApiSearch;
        localStorage.setItem("findMovies", JSON.stringify(findMovies));
        setMovies(findMovies);
        setIsLoading(false);
        localStorage.setItem("search", word);
        localStorage.setItem("checkBoxStatus", isChecked);
        handleChangeWidthOfScreen();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setSeverError(true);
      });
  }

  function handleFindSavedMovie(search) {
    setIsLoading(true);
    console.log(savedMovies);
    const foundSavedMovies = savedMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    console.log(foundSavedMovies);
    const savedMoviesCheckbox = isCheckedSavedMovies
      ? foundSavedMovies.filter((item) => item.duration <= 40)
      : foundSavedMovies;
      localStorage.setItem("savedMoviesSearch", search);
      localStorage.setItem("checkBoxStatusSavedMovies", isCheckedSavedMovies);
      setSearchSavedMovies(savedMoviesCheckbox);
      console.log(savedMoviesCheckbox);
      console.log(searchSavedMovies);
      setIsLoading(false);
  }

  console.log(searchSavedMovies);

  function handleSavedAndLikesMovies(movie) {
    // setIsLoading(true);
     mainApi
      .addMovie(movie)
      .then((res) => {
        console.log(res);
         const newSavedMovie = [...savedMovies, res.data];
         console.log(newSavedMovie);
        setSavedMovies(newSavedMovie);
        // handleCardLike(movie);
        // setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setLoggedIn(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsNotChecked(false);
      });
  }

  function handleCardLike(movie) {
    return savedMovies.some(item => item.movieId === movie.id && item.owner === currentUser._id);
    // return savedMovies.some(item => item.movieId === movie.id);
  }

  function handleDislikeAndDeleteMovie(c) {
    const movie = savedMovies.find(item => item.movieId === (c.id || c.moveId));
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(
          savedMovies.filter(res => res._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setLoggedIn(false);
        }
      })
  }

  function handleDeleteSavedMovie(c) {
    mainApi
      .deleteMovie(c._id)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((res) => {
            return res._id !== c._id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setLoggedIn(false);
        }
      });
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        // setIfRegOk(true);
        console.log(res);
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
        if (data.token) {
          console.log(data.token);
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSwowMoreMovies () {
    const foundMovies = JSON.parse(localStorage.getItem("findMovies"));
    setMovies(foundMovies.slice(0, movies.length + btnMoreMovies))
  }

 function handleWindowWidth() {
     setWidthOfScreen(window.innerWidth)
 }

  const handleChangeWidthOfScreen = useCallback(() => {
  // useEffect(() => {

    // function handleChangeWidthOfScreen() {
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
      // window.addEventListener("resize", handleWindowWidth);
      // return () => {
      //   document.removeEventListener("resize", handleWindowWidth);
      // }
    // }
  }, [widthOfScreen]);

   useEffect(() => {
    handleChangeWidthOfScreen();
    window.addEventListener("resize", handleWindowWidth);
    return () => {
      document.removeEventListener("resize", handleWindowWidth);
    }
    }, [handleChangeWidthOfScreen])

  function handleUpdateUser(data) {
    setIsLoading(true);
    if (loggedIn) {
      // console.log(data)
    mainApi
      .editUserInfo(data)
      .then((res) => {
        // console.log({name: res.data.name, email: res.data.email});
        setCurrentUser({name: res.data.name, email: res.data.email});
        // setCurrentUser(res);
        // console.log(currentUser);
        // setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setLoggedIn(false);
        }
      })
      .finally(() => {
        setIsNotChecked(false);
        setIsLoading(false);
      });
    }
  }
  // console.log(currentUser);
  // function handleClickCheckbox() {
  //   setIsChecked(isChecked
  //         ? moviesApi.filter((item) => item.duration <= 40)
  //         : moviesApi);
  // }

  // function handleClickCheckbox() {
  //   setIsChecked(!isChecked);
  // }

  function handleClickCheckbox() {
    setIsChecked(!isChecked);
    const movies = location.pathname === "/movies";
    const foundMovies = JSON.parse(localStorage.getItem("findMovies"));

    if (!isChecked)
      { movies
      ? (foundMovies.filter((item) => item.duration <= 40))
      : (savedMovies.filter((item) => item.duration <= 40))
    }
  }

  // function handleSearchCheckbox () {
  //   const movies = location.pathname === "/movies";
  //   const foundMovies = JSON.parse(localStorage.getItem("findMovies"));

  //   if (!isChecked)
  //     { movies
  //     ? (foundMovies.filter((item) => item.duration <= 40))
  //     : (savedMovies.filter((item) => item.duration <= 40))
  //   }
  // }
  function onSignOut() {
    localStorage.removeItem("token");
    // localStorage.removeItem("findMovies");
    // localStorage.removeItem("search");
    // localStorage.clear();
    setCurrentUser({});
    history.push("/");
  }

 useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        })
        // .finally(() => {
        //   setIsNotChecked(false);
        // })
    }
  }, [history, loggedIn]);

// function handleGetAllSavedMovies () {
//   mainApi.getMovies()
//       .then(({ data: savedMovies }) => {
//         setSavedMovies(savedMovies);
//         setLoggedIn(true);
//         // handleChangeWidthOfScreen();
//         // history.push(location.pathname);
//       })
//       .catch((err) => {
//         console.log(err);
//         history.push("/signin");
//       })
//       .finally(() => {
//         setIsNotChecked(false);
//       });
// }
  
  
  useMemo(() => {

    Promise.all([mainApi.getUser(), mainApi.getMovies()])
      .then(([profile, { data: savedMovies }]) => {
        setCurrentUser(profile);
        // console.log(profile);
        setSavedMovies(savedMovies);
        setLoggedIn(true);
        // handleChangeWidthOfScreen();
        // history.push(location.pathname);
      })
      .catch((err) => {
        console.log(err);
        history.push("/signin");
      })
      .finally(() => {
        setIsNotChecked(false);
      });
  }, [history]);


  // useEffect(() => {

  //   Promise.all([mainApi.getUser(), mainApi.getMovies()])
  //     .then(([profile, { data: savedMovies }]) => {
  //       setCurrentUser(profile);
  //       // console.log(profile);
  //       setSavedMovies(savedMovies);
  //       setLoggedIn(true);
  //       // handleChangeWidthOfScreen();
  //       // history.push(location.pathname);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       history.push("/signin");
  //     })
  //     .finally(() => {
  //       setIsNotChecked(false);
  //     });
  // }, [history, loggedIn]);

  if (isNotChecked) {
    return ( <Preloader /> );
    };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            // onInput={onInput}
            searchNameMovies={localStorage.getItem("search")}
            handleFindMovieFromApi={handleFindMovieFromApi}
            isLoading={isLoading}
            isChecked={isChecked}
            isCheckbox={handleClickCheckbox}
            isSaveMovieLike={handleSavedAndLikesMovies}
            isLiked={handleCardLike}
            isDeleteMovies={handleDislikeAndDeleteMovie}
            handleSwowMoreMovies={handleSwowMoreMovies}
            serverError={serverError}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            // onInput={onInput}
            savedMovies={savedMovies}
            // savedMovies={searchSavedMovies}
            isLoading={isLoading}
            isChecked={isChecked}
            isCheckbox={handleClickCheckbox}
            isSaveMovieLike={handleSavedAndLikesMovies} // тут нужен? убрать везде
            isDeleteMovies={handleDeleteSavedMovie}
            handleFindSavedMovie={handleFindSavedMovie}
            isLiked={handleCardLike}
            searchSavedMovies={searchSavedMovies}
            searchNameSavedMovies={localStorage.getItem("savedMoviesSearch")}
            // search={searchWord}
            // handleGetAllSavedMovies={handleGetAllSavedMovies}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            handleUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
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
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
