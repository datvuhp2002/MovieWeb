import { useEffect, useState } from "react";
import axios from "axios";

export default function GetDataID(mediaType, id) {
  const [Movie, setMovies] = useState([]);
  let api;
  {
    mediaType
      ? (api = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=9195c13a37c697961a3f6920c92c27f0&language=en-US&append_to_response=credits,videos,images,recommendations,season`)
      : (api = `https://api.themoviedb.org/3/movie/${id}?api_key=9195c13a37c697961a3f6920c92c27f0&language=en-US&append_to_response=credits,videos,images,recommendations`);
  }
  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return Movie;
}
