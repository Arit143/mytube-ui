import React from "react";
import {
  cleanup,
  render,
  RenderResult,
  fireEvent
} from "@testing-library/react";

import ListDetails from "./ListDetails";
import API_URL from "../common/constants";

describe("List Details", () => {
  let root: RenderResult;
  beforeEach(() => {
    const filesDetails = {
      fileName: "test.mp4",
      size: 10000,
      type: "mp4"
    };
    root = render(<ListDetails {...filesDetails} />);
  });

  afterEach(cleanup);

  it("should have file name", () => {
    const { getByText } = root;
    expect(getByText(/File Name/i).textContent).toBe("File Name: test.mp4");
  });

  it("should have file size", () => {
    const { getByText } = root;
    expect(getByText(/File Size/i).textContent).toBe("File Size: 0.01 MB");
  });

  it("should have file type", () => {
    const { getByText } = root;
    expect(getByText(/File Type/i).textContent).toBe("File Type: mp4");
  });

  it("should show thumbnail at first", () => {
    const { getByTestId } = root;
    expect(getByTestId("thumbnail")).toBeDefined();
  });

  it("should have watch video button", () => {
    const { getByText } = root;
    expect(getByText(/Watch Video/i).textContent).toBe("Watch Video");
  });

  it("should stream video on watch video click", () => {
    const { getByText, container } = root;
    fireEvent.click(getByText(/Watch Video/i));

    expect(
      container.getElementsByTagName("source")[0].getAttribute("src")
    ).toBe(`${API_URL}/stream/test.mp4`);
  });
});
