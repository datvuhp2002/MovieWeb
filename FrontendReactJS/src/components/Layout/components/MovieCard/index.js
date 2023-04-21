import { useState } from "react";
import Image from "../Image";
import classNames from "classnames/bind";
import styles from "./MovieCard.module.scss";
import "../../../GlobalStyles/modal.scss";
import { Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import moment from "moment/moment";
import Badge from "react-bootstrap/Badge";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const getPosterURL = (poster_path) => {
  return `https://image.tmdb.org/t/p/w500/${poster_path}`;
};
const getBackDropURL = (backdrop_path) => {
  return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
};

export default function MovieCard({
  topRate = false,
  poster_path,
  backdrop_path,
  title,
  name,
  popularity,
  vote_average,
  overview,
  first_air_date,
  release_date,
  id,
  media_type = "movie",
}) {
  const navigate = useNavigate();
  const onMove = () => {
    navigate(`/Detail/${media_type}/${id}`);
  };
  const Loading = () => <div className={cx("lds-dual-ring")}></div>;
  return (
    <>
      <Col
        xxl={2}
        xl={2}
        lg={3}
        md={4}
        sm={6}
        xs={6}
        className={cx("wrapper", "mb-5")}
        onClick={onMove}
      >
        <LazyLoad placeholder={<Loading />}>
          <div className={cx("image")}>
            <Image className="w100" src={getPosterURL(poster_path)}></Image>
          </div>
          <h3 className={cx("movie")}>
            <span href="">{title || name}</span>
          </h3>
          {topRate ? (
            <h3 className={cx("vote")}>
              <span>Vote average: {vote_average}</span>
            </h3>
          ) : (
            <h3 className={cx("date")}>
              <span>Popularity: {popularity}</span>
            </h3>
          )}
        </LazyLoad>
      </Col>
    </>
  );
}
