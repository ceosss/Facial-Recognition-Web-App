import React from "react";
import "./ImageSearchForm.css";

const ImageSearchForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="form center pa4 br3 shadow-5">
      <input
        className="f4 pa2 w-70 center"
        type="text"
        onChange={onInputChange}
        required
      />
      <button
        className="w-30 grow f4 link pv2 dib white bg-blue"
        onClick={onSubmit}
      >
        Detect
      </button>
    </div>
  );
};

export default ImageSearchForm;
