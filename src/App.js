import React, { Component } from "react";
import Clarifai from "clarifai";
import ImageSearchForm from "./components/ImageSearchForm/ImageSearchForm";
import FaceDetect from "./components/FaceDetect/FaceDetect";
import { KEYS } from "./secret";
import "./App.css";

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: KEYS.CLARIFAI_API_KEY,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      show: false,
      showBox: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box, showBox: true });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value, show: false, showBox: false });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input, show: true });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <ImageSearchForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        {this.state.show ? (
          <FaceDetect
            showBox={this.state.showBox}
            box={this.state.box}
            imageUrl={this.state.imageUrl}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
