import styles from "./MovieContent.module.scss";
import classNames from "classnames/bind";
import { Poster_W342 } from "../../../../request";
import { Row, Col } from "react-bootstrap";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

export default function MovieContent(props) {
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
      <Col xxl={9} xl={9} lg={9} className={cx("main", "mt-4")}>
        <h2>{data.title || data.original_title || data.original_name}</h2>
        <h3 className={cx("tagLine")}>
          {data.tagline || data.original_title}{" "}
          <span>
            (
            {moment(data.release_date).format("YYYY") ||
              moment(data.first_air_date).format("YYYY")}
            )
          </span>
        </h3>
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
      </Col>
    </Row>
  );
}
