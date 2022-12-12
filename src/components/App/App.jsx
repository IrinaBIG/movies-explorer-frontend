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

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState( { name: '', email: '' } );
  const [loggedIn, setLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [btnMoreMovies, setBtnMoreMovies] = useState(0);
  const [serverError, setSeverError] = useState(false);
  const history = useHistory();
  const location = useLocation();
 
  const [widthOfScreen, setWidthOfScreen] = useState(window.innerWidth);

  function onInput(evt) {
    setSearch(evt.target.value);
  }

  function handleFindMovieFromApi() {
    setIsLoading(true);
    moviesApi
      .getMoviesFromApi(search, isChecked)
      .then((res) => {
        const moviesApiSearch = res.filter((item) => {
          return item.nameRU.toLowerCase().includes(search.toLowerCase());
        });
        const findMovies = isChecked
          ? moviesApiSearch.filter((item) => item.duration <= 40)
          : moviesApiSearch;
        localStorage.setItem("findMovies", JSON.stringify(findMovies));
        setMovies(findMovies);
        setIsLoading(false);
        localStorage.setItem("search", search);
        localStorage.setItem("checkBoxStatus", isChecked);
        handleChangeWidthOfScreen();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setSeverError(true);
      });
  }

  function handleFindSavedMovie() {
    setIsLoading(true);
    const foundSavedMovies = savedMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    console.log(foundSavedMovies);
    const savedMoviesCheckbox = isChecked
      ? foundSavedMovies.filter((item) => item.duration <= 40)
      : foundSavedMovies;
    setIsLoading(false);
    setSearchSavedMovies(savedMoviesCheckbox);
  }



  // function handleGetAllSavedMovies(){
  //   // if (loggedIn) {
  //     mainApi.getMovies()
  //     .then((res) => {
  //       // console.log(res)
  //       setSavedMovies(res)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       if (err.code === 401) {
  //         setLoggedIn(false);
  //       }
  //     });
  //   // }
  // }

  // useEffect(() => {
  //   if (loggedIn) 
  //   mainApi.getUser()
  //     .then((profile) => {
  //       setLoggedIn(true)
  //       setCurrentUser(profile);
  //       handleGetAllSavedMovies();
  //       // handleChangeWidthOfScreen();
  //       history.push(location.pathname);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoggedIn(false)
  //       history.push("/signin");
  //     });
    
  // }, [history, loggedIn]);

  function handleSavedAndLikesMovies(movie) {
    setIsLoading(true);
     mainApi
      .addMovie(movie)
      .then((res) => {
        // console.log(res);
        setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setLoggedIn(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteSavedMoviePatchMovies(c) {
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

  function handleCardLike(movie) {
    console.log(savedMovies)
    // return savedMovies.some(item => item.movieId === movie.id && item.owner === currentUser._id);
    return savedMovies.some(item => item.movieId === movie.id);
  }

  

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
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
    if (loggedIn) {
    mainApi
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        // setIsLoading(true);
        console.log(currentUser)
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 401) {
          setLoggedIn(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }

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
    localStorage.removeItem('token');
    // localStorage.clear();
    history.push("/");
  }
  
 useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          console.log(res);
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
          history.push(location.pathname);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          // localStorage.clear();
        });
    }
  }, [history]);


  useEffect(() => {
    // if (loggedIn) {
    Promise.all([mainApi.getUser(), mainApi.getMovies()])
      .then(([profile, { data: savedMovies }]) => {
        setCurrentUser(profile);
        setSavedMovies(savedMovies);

        // setLoggedIn(true);
        // handleChangeWidthOfScreen();
        // history.push(location.pathname);
      })
      .catch((err) => {
        console.log(err);
        history.push("/signin");
      });
    // }
  }, [history, loggedIn]);

 
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
            onInput={onInput}
            serchNameMovies={localStorage.getItem("search")}
            handleFindMovieFromApi={handleFindMovieFromApi}
            isLoading={isLoading}
            isChecked={isChecked}
            isCheckbox={handleClickCheckbox}
            isSaveMovieLike={handleSavedAndLikesMovies}
            isLiked={handleCardLike}
            isDeleteMovies={handleDeleteSavedMoviePatchMovies}
            handleSwowMoreMovies={handleSwowMoreMovies}
            serverError={serverError}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            onInput={onInput}
            savedMovies={savedMovies}
            isLoading={isLoading}
            isChecked={isChecked}
            isCheckbox={handleClickCheckbox}
            isDeleteMovies={handleDeleteSavedMovie}
            handleFindSavedMovie={handleFindSavedMovie}
            isLiked={handleCardLike}
            searchSavedMovies={searchSavedMovies}
            search={search}
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

// до
// import { useState, useEffect } from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
// import { useHistory, useLocation } from "react-router";
// import Header from "../Header/Header";
// import Main from "../Main/Main";
// import Footer from "../Footer/Footer";
// import Login from "../Login/Login";
// import Register from "../Register/Register";
// import Movies from "../Movies/Movies";
// import SavedMovies from "../SavedMovies/SavedMovies";
// import Profile from "../Profile/Profile";
// import NotFound from "../NotFound/NotFound";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import moviesApi from "../../utils/MoviesApi";
// import mainApi from "../../utils/MainApi";
// import * as auth from "../../utils/auth";
// import ProtectedRoute from "../ProtectedRoute";

// function App() {
//   const [search, setSearch] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [btnMoreMovies, setBtnMoreMovies] = useState(0);
//   const [widthOfScreen, setWidthOfScreen] = useState(window.innerWidth);
//   // const [isAuth, setIsAuth] = useState(false);
//   const history = useHistory();
//   const location = useLocation();

//   function onInput(evt) {
//     setSearch(evt.target.value);
//   }

//   // function handleFindMovieFromApi(evt) {
//   //   evt.preventDefault();
//   //   setIsLoading(true);
//   //   moviesApi
//   //     .getMoviesFromApi(search, isChecked)
//   //     .then((res) => {
//   //       console.log(res);
//   //       const allMoviesFromApi = res;
//   //       localStorage.setItem("allMoviesFromApi", JSON.stringify(allMoviesFromApi));
//   //       const allMovies = JSON.parse(localStorage.getItem("allMoviesFromApi"));
//   //       const moviesApi = allMovies.filter((item) => {
//   //         return item.nameRU.toLowerCase().includes(search.toLowerCase());
//   //       });
//   //       const findMovies = isChecked
//   //         ? moviesApi.filter((item) => item.duration <= 40)
//   //         : moviesApi;
//   //       console.log(findMovies);
//   //       setMovies(findMovies);
//   //       setIsLoading(false);
//   //       localStorage.setItem("search", search);

//   //       localStorage.setItem("findMovies", JSON.stringify(findMovies));
//   //       localStorage.setItem("checkBoxStatus", isChecked);
//   //       handleChangeWidthOfScreen();
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       setIsLoading(false);
//   //     });
//   // }

//   // function getMoviesFromApi () {
//   //   // evt.preventDefault();
//   //   // setIsLoading(true);
//   //   moviesApi
//   //     .getMoviesFromApi(search, isChecked)
//   //     .then(res => {
//   //       console.log(res);
//   //       // const allMoviesFromApi = res;
//   //       res.localStorage.setItem("allMoviesFromApi", JSON.stringify(allMoviesFromApi))
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       setIsLoading(false);
//   //     });
//   // }

//   function handleFindMovieFromApi(evt) {
//     evt.preventDefault();
//     setIsLoading(true);
//     moviesApi
//       .getMoviesFromApi(search, isChecked)
//       .then((res) => {
//         console.log(res);

//         const moviesApi = res.filter((item) => {
//           return item.nameRU.toLowerCase().includes(search.toLowerCase());
//         });
//         const findMovies = isChecked
//           ? moviesApi.filter((item) => item.duration <= 40)
//           : moviesApi;
//         console.log(findMovies);
//         setMovies(findMovies);
//         setIsLoading(false);
//         localStorage.setItem("search", search);
//         localStorage.setItem("findMovies", JSON.stringify(findMovies));
//         localStorage.setItem("checkBoxStatus", isChecked);
//         handleChangeWidthOfScreen();
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsLoading(false);
//       });
//   }

//   function handleGetSavedMovies() {
//     mainApi
//       .getMovies()
//       .then((res) => {
//         console.log(res);
//         setSavedMovies(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

// function handleSavedAndLikesMovies(movie) {
//   // setIsLoading(true);
//   mainApi
//     .addMovie(movie)
//     .then((res) => {
//       console.log(res);
//       setSavedMovies([res, ...savedMovies]);
//       // console.log(savedMovies)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//   const test = () => {
//     console.log(savedMovies);
//   }
//   test();
//   // function handleDeleteSavedMovies(movie) {
//   //   e.preventDefault();
//   //   const isOwn = removeCard.owner._id === currentUser._id;
//   //   mainApi
//   //     .deleteMovie(removeCard._id, !isOwn)
//   //     .then((res) => {
//   //       console.log(res);
//   //       setCards((state) => state.filter((res) => res._id !== removeCard._id));
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }

//   // function handleMovieLike(movie) {
//   //   // Снова проверяем, есть ли уже лайк на этой карточке
//   //   // const isLiked = movie.likes.some(item => item._id === currentUser._id);
//   //   // Отправляем запрос в API и получаем обновлённые данные карточки
//   //   mainApi.toggleLike(movie)
//   //     .then((newMovie) => {
//   //       setMovies((state) => state.map((c) => (c.id === movie ? newMovie : c)));
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }

//   function handleGetUserInfo() {
//     if (loggedIn)
//       mainApi
//         .getUser()
//         .then((data) => {
//           setLoggedIn(true);
//           setCurrentUser(data);
//           console.log(data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//   }

//   function handleRegister(name, email, password) {
//     // if ((name, email, password)) {
//     auth
//       .register(name, email, password)
//       .then((res) => {
//         // if (res.data) {
//         // console.log(res);
//         console.log(res);
//         // setIfRegOk(true);
//         history.push("/signin");
//         // }
//       })
//       .catch((err) => {
//         // setIfRegOk(false);
//         console.log(err);
//       });
//     // .finally(() => {
//     //   handleTooltipPlaceClick();
//     // })
//     // }
//   }

//   function handleLogin(password, email) {
//     if (!email || !password) {
//       return;
//     }
//     auth
//       .authorize(email, password)
//       .then((data) => {
//         console.log(data);
//         if (data.token) {
//           console.log(data.token);
//           localStorage.setItem("token", data.token);
//           setLoggedIn(true);
//           handleGetUserInfo(data);
//           history.push("/movies");
//         }
//       })
//       .catch((err) => console.log(err));
//   }

//   function handleChangeResize() {
//     setWidthOfScreen(window.innerWidth);
//   }

//   function handleChangeWidthOfScreen() {
//     const findMovies = JSON.parse(localStorage.getItem("findMovies"));
//     console.log(findMovies);
//     if (findMovies === null) {
//       return;
//     }
//     if (widthOfScreen <= 1280) {
//       setMovies(findMovies.slice(0, 16));
//       setBtnMoreMovies(4);
//     } else if (widthOfScreen === 768) {
//       setMovies(findMovies.slice(0, 8));
//       setBtnMoreMovies(2);
//     } else if (widthOfScreen >= 320 && widthOfScreen <= 480) {
//       setMovies(findMovies.slice(0, 5));
//       setBtnMoreMovies(2);
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("resize", handleChangeResize);
//     handleChangeWidthOfScreen();
//   }, []);

//   function handleUpdateUser(data) {
//     if (loggedIn)
//     setIsLoading(true);
//     mainApi
//       .editUserInfo(data)
//       .then((res) => {
//         setCurrentUser(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }

//   function handleClickCheckbox() {
//     setIsChecked(!isChecked);
//   }

//   useEffect(() => {
//     // если у пользователя есть токен в localStorage,
//     // эта функция проверит, действующий он или нет
//     const jwt = localStorage.getItem("token");
//     if (jwt) {
//       // здесь будем проверять токен
//       auth
//         .checkToken(jwt)
//         .then((res) => {
//           // console.log(res);
//           if (res) {
//             setCurrentUser(res);
//             setLoggedIn(true);
//             history.push(location.pathname);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [history]);

//   // useEffect(() => {
//   //   mainApi
//   //     .getMovies()
//   //     .then((res) => {
//   //       console.log(res);
//   //       setSavedMovies(res);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }, []);

//   useEffect(() => {
//     Promise.all([mainApi.getMovies(), mainApi.getCards()])
//       .then(([profile, cards]) => {
//         setCurrentUser(profile);
//         console.log(profile);
//         setCards(cards);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }, []);

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header loggedIn={loggedIn} />

//         <Switch>
//           <Route exact path="/">
//             <Main />
//           </Route>

//           <ProtectedRoute
//             path="/movies"
//             loggedIn={loggedIn}
//             component={Movies}
//             movies={movies}
//             onInput={onInput}
//             handleFindMovieFromApi={handleFindMovieFromApi}
//             isLoading={isLoading}
//             isChecked={isChecked}
//             isCheckbox={handleClickCheckbox}
//             onMovieLike={handleSavedAndLikesMovies}
//           />

//           <ProtectedRoute
//             path="/saved-movies"
//             loggedIn={loggedIn}
//             component={SavedMovies}
//             savedMovies={savedMovies}
//             isLoading={isLoading}
//             isChecked={isChecked}
//             isCheckbox={handleClickCheckbox}
//             // isSavedMovies={handleGetSavedMovies}

//           />

//           <ProtectedRoute
//             path="/profile"
//             loggedIn={loggedIn}
//             component={Profile}
//             handleUpdateUser={handleUpdateUser}
//           />

//           <Route path="/signup">
//             <Register handleRegister={handleRegister} />
//           </Route>

//           <Route path="/signin">
//             <Login handleLogin={handleLogin} />
//           </Route>

//           <Route exact path="/">
//             {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
//           </Route>

//           <Route patch="*">
//             <NotFound />
//           </Route>
//         </Switch>
//         {/* </main> */}
//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;
