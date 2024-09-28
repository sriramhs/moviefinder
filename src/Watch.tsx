import React from "react";
import { useParams } from "react-router-dom";

function Watch() {
  const { Id } = useParams<{ Id: string }>();
  console.log(Id);
  return (
    <>
      <h2>Watch Movie</h2>
      <iframe
        title="Movie"
        height={540}
        width={960}
        src={`https://vidsrc.to/embed/movie/${Id}`}
      ></iframe>
    </>
  );
}

export default Watch;
