import styles from "./DetailMovie.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import { Poster_W342 } from "../../../../request";
import { Row, Col } from "react-bootstrap";
import Button from "../Button";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import SlickCast from "../Slick/SlickCast";
import SlickTrailer from "../Slick/SlickTrailer";
import SlickRecommendations from "../Slick/SlickRecommendations";
import CastsCard from "../CastsCard";
import TrailerCard from "../TrailerCard";
import RecommendationsCard from "../RecommendationsCard";
import SeasionCard from "../SeasionCard";
const cx = classNames.bind(styles);

export default function DetailMovie(props) {
  const { data } = props;
  const posterImg = `${Poster_W342}${data.poster_path}`;
  const getTime = (time) => {
    let MovieTime = "";
    {
      time % 60 === 0
        ? (MovieTime = ` ${time / 60} hours`)
        : (MovieTime = `${(time - (time % 60)) / 60} hours ${
            time % 60
          } minutes`);
    }
    return MovieTime;
  };
  return (
    <Row className={cx("wrapper")}>
      <Col xxl={3} xl={3} lg={3} className="px-5 py-3">
        {data.poster_path && <Image w100 src={posterImg} />}
        <Button
          play
          className="mt-3 fs-3 fw-1"
          leftIcon={<FontAwesomeIcon icon={faPlay} />}
          to={`/watch/${data.media_type || "movie"}/${data.id}`}
        >
          Xem phim
        </Button>
      </Col>
      <Col xxl={9} xl={9} lg={9} className={cx("main", "px-5 py-3")}>
        <h1>{data.title || data.original_title || data.original_name}</h1>
        <h2 className={cx("tagLine")}>
          {data.tagline || data.original_title}{" "}
          <span>
            (
            {moment(data.release_date).format("YYYY") ||
              moment(data.first_air_date).format("YYYY")}
            )
          </span>
        </h2>
        {/* Run Time */}
        <div className={cx("runTime")}>
          <FontAwesomeIcon icon={faClock} className="me-2" />
          {(data.runtime && getTime(data.runtime)) ||
            (data.episode_run_time && getTime(data.episode_run_time))}
        </div>
        {/* information */}
        {data.production_countries && (
          <div className={cx("information")}>
            <span className="me-2">Nation:</span>
            {data.production_countries.map((item, index) => (
              <p className="me-4" key={index}>
                {item.name}
              </p>
            ))}
          </div>
        )}
        <div className={cx("overview", "mb-5")}>{data.overview}</div>
        <Row className={cx("facts", "mb-2")}>
          <Col className={cx("icon")}>
            <FontAwesomeIcon icon={faImdb} />
            <span>{data.vote_average}</span>
          </Col>
          {/* movieType */}
          {data.genres && (
            <Col className={cx("movieType")}>
              {data.genres.map((item, index) => (
                <Button
                  btnType
                  key={index}
                  to={`../genre/${data.media_type}/${item.id}/${item.name}`}
                >
                  {item.name}
                </Button>
              ))}
            </Col>
          )}
        </Row>
        {/* cast */}
        {data.credits && (
          <div className={cx("cast", "mb-5")}>
            <h2 className="mb-2">Cast</h2>
            <SlickCast className="list-cast">
              {data.credits["cast"].map((item, index) => {
                return <CastsCard key={index} {...item} />;
              })}
            </SlickCast>
          </div>
        )}
        {/* trailer */}
        {data.videos && (
          <div className={cx("trailer")}>
            <h2 className="mb-2">Trailer</h2>
            <SlickTrailer className="list-cast">
              {data.videos["results"].map((item, index) => {
                return (
                  <TrailerCard key={index} VideoKey={item.key} {...item} />
                );
              })}
            </SlickTrailer>
          </div>
        )}
        {/* recommendations */}
        {data.recommendations && (
          <div className={cx("similarMovies")}>
            <h2 className="mb-2">RECOMMENDATIONS</h2>
            <SlickRecommendations className="list-cast">
              {data.recommendations["results"].map((item, index) => {
                return <RecommendationsCard key={index} {...item} />;
              })}
            </SlickRecommendations>
          </div>
        )}
      </Col>
    </Row>
  );
}
