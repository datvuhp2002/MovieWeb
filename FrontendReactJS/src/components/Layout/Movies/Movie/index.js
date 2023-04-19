import React from "react";
import styles from "../global.module.scss";
import classNames from "classnames/bind";
import { MovieCard } from "../../components";
const cx = classNames.bind(styles);

export default function Movie(props) {
  const { data, type } = props;
  return (
    <>
      {data.map((item, index) => {
        if (index < 18) {
          return <MovieCard key={index} media_type={type} {...item} />;
        }
      })}
    </>
  );
}
