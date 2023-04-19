import FAQ from "../FAQ";
import Search from "../Search";
import Home from "../Home";
import HotMovie from "../HotMovie";
import Movies from "../Movies";
import TelevisionMovies from "../TelevisionMovies";
import Detail from "../Detail";
import NewMovie from "../NewMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Genre from "../Genre";
import WatchMovie from "../WatchMovie";
const publicRoutes = [
  { path: "/", component: Home },
  {
    path: "/Search",
    component: Search,
    namePage: "Search",
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  },
  { path: "/HotMovie", component: HotMovie, namePage: "Hot Movie" },
  {
    path: "/Movies",
    component: Movies,
    namePage: "Movies",
  },
  {
    path: "/TelevisionMovies",
    component: TelevisionMovies,
    namePage: "TelevisionMovies",
  },
  { path: "/NewMovie", component: NewMovie, namePage: "New Movie" },
  { path: "/FAQ", component: FAQ, namePage: "FAQ" },
  { path: "/Detail/:mediaType/:idMovie", component: Detail },
  { path: "/genre/:type/:genre/:name", component: Genre },
  { path: "/watch/:mediaType/:idMovie", component: WatchMovie },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
