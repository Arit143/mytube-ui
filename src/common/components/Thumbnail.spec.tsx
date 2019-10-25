import React from "react";
import { cleanup, render } from "@testing-library/react";
import Thumbnail from "./Thumbnail";
import API_URL from "../constants";

describe("Thumbnail", () => {
  afterEach(cleanup);

  it("should be shown for file name passed with checking screen size", () => {
    const { container } = render(<Thumbnail fileName={"test"} width="md" />);

    expect(container.getElementsByTagName("img")).toHaveLength(1);
    expect(container.getElementsByTagName("img")[0].getAttribute("src")).toBe(
      `${API_URL}/videos/thumbnails/test.png`
    );
    expect(container.getElementsByTagName("img")[0].getAttribute("style")).toBe(
      "max-width: 50%;"
    );
  });
});
