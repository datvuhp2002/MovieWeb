import React from "react";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Body from "../../components/Layout/DefaultLayout/Body";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import GetDataID from "../../request/GetDataID";
import { getSeasion } from "../../request";
import MovieContent from "../../components/Layout/components/MovieContent";
import SeasonCard from "../../components/Layout/components/SeasonCard";
export default function WatchMovie() {
  const { mediaType, idMovie } = useParams();
  let data = GetDataID(mediaType, idMovie);
  console.log(data);
  const [linkMovie, setLinkMovie] = useState("");
  const [List, setList] = useState([]);
  const urlSeasons = getSeasion(idMovie);
  const location = useLocation();
  const [seasonNumber, setSeasonNumber] = useState("1");
  const [episodeNumber, setEpisodeNumber] = useState("1");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const season = searchParams.get("season");
    const episodeNumber = searchParams.get("episode");
    setSeasonNumber(season);
    setEpisodeNumber(episodeNumber);
  }, [location]);
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
          <Col
            xxl={mediaType === "movie" ? 12 : 8}
            xl={mediaType === "movie" ? 12 : 8}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className=""
          >
            <div className="ratio ratio-21x9">
              <iframe
                scrolling="no"
                allowFullScreen
                src={`${linkMovie}`}
              ></iframe>
            </div>
            <div>
              <MovieContent play={true} data={data} />
            </div>
          </Col>
          <Col xxl={4} xl={4}>
            {data.seasons &&
              data.seasons.map((item, index) => {
                return (
                  <SeasonCard
                    key={index}
                    mediaType={mediaType}
                    idMovie={idMovie}
                    seasonNumber={seasonNumber}
                    episodeNumber={episodeNumber}
                    data={item}
                  />
                );
              })}
          </Col>
        </Row>
      </Body>
    </DefaultLayout>
  );
}
