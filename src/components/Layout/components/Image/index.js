import { useState } from "react";
import images from "../../../../asstes/images";
import styles from "./Image.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Image = ({
  src,
  alt,
  className,
  fallback: customFallback = images.default,
  w100,
  w50,
  minw30,
  h100,
  h50,
  minh30,
  season,
  episode,
  ...props
}) => {
  const [fallback, setFallback] = useState("");
  const Loading = () => <div className={cx("lds-dual-ring")}></div>;
  function handleError() {
    setFallback(customFallback);
  }
  const classes = cx("wrapper", {
    w100,
    w50,
    minw30,
    h100,
    h50,
    minh30,
    season,
    episode,
    [className]: className,
  });
  return (
    <img
      className={cx("wrapper", classes)}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
};

export default Image;
