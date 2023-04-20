import React from "react";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Body from "../../components/Layout/DefaultLayout/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import GetDataID from "../../request/GetDataID";
import { getSeasion } from "../../request";
import UseAxios from "../../request/UseAxios";
import axios from "axios";
export default function WatchMovie() {
  const { mediaType, idMovie } = useParams();
  let data = GetDataID(mediaType, idMovie);
  const [linkMovie, setLinkMovie] = useState("");
  const [seasonNumber, setSeasonNumber] = useState("1");
  const [episodeNumber, setEpisodeNumber] = useState("1");
  const [List, setList] = useState([]);
  const urlSeasons = getSeasion(idMovie);
  console.log("data", data.seasons);
  useEffect(() => {
    if (mediaType == "tv") {
      setLinkMovie(
        `https://2embed.org/embed/series?tmdb=${idMovie}&s=${seasonNumber}&e=${episodeNumber}`
      );
    } else {
      setLinkMovie(`https://2embed.org/embed/movie?tmdb=${idMovie}`);
    }
  }, [seasonNumber, episodeNumber]);
  useEffect(() => {}, [idMovie]);

  return (
    <DefaultLayout>
      <Body>
        <Row>
          <Col xxl={8} xl={9} lg={6} md={6} sm={6} xs={6}>
            <div className="ratio ratio-21x9">
              <iframe
                scrolling="no"
                allowFullScreen
                className="embed-responsive-item"
                src={`${linkMovie}`}
              ></iframe>
            </div>
          </Col>
          <Col xxl={6} xl={3} lg={6} md={6} sm={6} xs={6}>
            {data.seasons &&
              data.seasons.map((item, index) => {
                return <div key={index}>{item.name}</div>;
              })}
          </Col>
        </Row>
      </Body>
    </DefaultLayout>
  );
}
