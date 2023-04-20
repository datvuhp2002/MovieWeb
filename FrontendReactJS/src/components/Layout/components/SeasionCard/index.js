import classNames from "classnames/bind";
import styles from "./SeasionCard.module.scss";
import "../../../GlobalStyles/modal.scss";
import Image from "../Image";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const getPosterURL = (poster_path) => {
  return `https://image.tmdb.org/t/p/w500/${poster_path}`;
};
const getBackDropURL = (backdrop_path) => {
  return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
};

export default function SeasionCard(props) {
  const { data } = props;
  const onMove = () => {
    // navigate(`/Detail/${media_type}/${id}`);
  };
  return (
    <div className={cx("wrapper", "mt-5")}>
      <Image seasion src={getPosterURL(data.poster_path)} />
      {data.name}
    </div>
  );
}
