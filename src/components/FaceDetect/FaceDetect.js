import React from "react";
import "./FaceDetect.css";

const FaceDetect = ({ imageUrl, box, showBox }) => {
  return (
    <div id="centering" className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt="result"
          src={imageUrl}
          width="500px"
          heigh="auto"
        />
        {showBox ? (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};

export default FaceDetect;
