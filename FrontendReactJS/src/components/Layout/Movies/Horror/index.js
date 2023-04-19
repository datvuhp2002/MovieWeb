import React from "react";
import classNames from "classnames/bind";
import styles from "../global.module.scss";
import UseAxios from "../../../../request/UseAxios";
import requests from "../../../../request";
import { MovieCard } from "../../components";
const cx = classNames.bind(styles);
export default function Trending() {
  const Horror = UseAxios(requests.fetchHorror);
  return (
    <>
      <h2 className={cx("title")}>
        <span>Hor</span>
      </h2>
      {Horror.map((item, index) => {
        return <MovieCard key={index} {...item} />;
      })}
    </>
  );
}