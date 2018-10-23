import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "react-testing-library";
import Gallery from "../Gallery";

it("renders Gallery without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Gallery />, div);
});

it("renders Gallery images", () => {
  const { getAllByAltText } = render(<Gallery />);
  expect(getAllByAltText("thumbnail"));
});

it("clicking thumbnail opens up image view modal", () => {
  const { getByTestId, getAllByAltText } = render(<Gallery />);
  fireEvent.click(getAllByAltText("thumbnail")[0]);
  expect(getByTestId("gallery-image-view-modal"));
});


// Todo image add/delete tests