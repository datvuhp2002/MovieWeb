import React from "react";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Body from "../../components/Layout/DefaultLayout/Body";
import TypeOfMovie from "../../components/Layout/components/TypeOfMovie";
export default function TelevisionMovies() {
  return (
    <DefaultLayout>
      <Body>
        <TypeOfMovie filmType="TelevisionMovies" type="tv" />
      </Body>
    </DefaultLayout>
  );
}
