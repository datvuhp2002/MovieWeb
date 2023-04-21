import styles from "./SeasonCard.module.scss";
import classNames from "classnames/bind";
import "./SeasonCard.module.scss";
import Image from "../Image";
import { useEffect, useState } from "react";
import { getEpisode } from "../../../../request";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
import UseAxios from "../../../../request/UseAxios";
import axios from "axios";
const cx = classNames.bind(styles);
const getPosterURL = (poster_path) => {
  return `https://image.tmdb.org/t/p/w500/${poster_path}`;
};
const getBackDropURL = (backdrop_path) => {
  return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
};
export default function SeasonCard(props) {
  let navigate = useNavigate();
  const { data, mediaType, idMovie, seasonNumber, episodeNumber } = props;
  const [apiLink, setApiLink] = useState(null);
  const [season, setSeason] = useState("1");
  const [Show, setShow] = useState(false);
  const [ListEpisode, setListEpisode] = useState([]);
  const Loading = () => <div className={cx("lds-dual-ring")}></div>;
  const getSeasion = () => {
    setShow(!Show);
    setApiLink(getEpisode(idMovie, data.season_number));
  };
  useEffect(() => {
    if (apiLink) {
      axios
        .get(apiLink)
        .then((res) => {
          setListEpisode(res.data.episodes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [apiLink]);
  let onNavigate = (season, episode) => {
    console.log("click");
    navigate(
      `/watch/${mediaType}/${idMovie}?season=${season}&episode=${episode}`
    );
  };
  return (
    <div className={cx("wrapper", "mb-3")} onClick={getSeasion}>
      <div className={cx("container")}>
        <Image season className="me-3 " src={getPosterURL(data.poster_path)} />
        <div className={cx("SeasonInfor", "mt-3")}>
          <h3 className={cx("SeasonName")}>{data.name}</h3>
          <p className={cx("SeasonEp", "mt-1 fs-5")}>
            Episode: {data.episode_count}
          </p>
        </div>
      </div>
      {Show ? (
        <div
          className={cx(
            "Episode",
            "mt-3 pt-2 border-top border-dark border-opacity-75 "
          )}
        >
          {ListEpisode &&
            ListEpisode.map((item, index) => {
              return (
                <LazyLoad key={index} placeholder={<Loading />}>
                  <div
                    key={index}
                    className={cx(
                      "EpisodeItem",
                      "d-flex align-items-center mt-3"
                    )}
                    onClick={() =>
                      onNavigate(data.season_number, item.episode_number)
                    }
                  >
                    <p className="mx-3">{item.episode_number}</p>

                    <Image episode src={getBackDropURL(item.still_path)} />
                    <h4 className="ms-3  ">{item.name}</h4>
                  </div>
                </LazyLoad>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
