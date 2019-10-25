import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render, act, cleanup } from "@testing-library/react";
import wait from "waait";

import List from "./List";
import GET_FILE_LIST from "../common/api/query";

async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount);
  });
}

describe("List all videos", () => {
  afterEach(cleanup);

  const mocks = [
    {
      request: {
        query: GET_FILE_LIST
      },
      result: {
        data: {
          files: [
            {
              fileName: "test.mp4",
              size: 10000,
              type: "mp4"
            },
            {
              fileName: "test.mov",
              size: 12000,
              type: "mov"
            }
          ]
        }
      }
    }
  ];

  const mockWithoutResult = [
    {
      request: {
        query: GET_FILE_LIST
      },
      result: {
        data: {
          files: []
        }
      }
    }
  ];

  const mockWithError = [
    {
      request: {
        query: GET_FILE_LIST
      },
      error: new Error("Fetching list error")
    }
  ];

  it("should have loading at first", () => {
    const root = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List />
      </MockedProvider>
    );

    expect(root.getByText(/Loading.../i).textContent).toBe("Loading...");
  });

  it("should show snack bar of no result found", async () => {
    const root = render(
      <MockedProvider mocks={mockWithoutResult} addTypename={false}>
        <List />
      </MockedProvider>
    );

    await actWait();

    expect(root.container.getElementsByClassName("empty-list")).toBeDefined();
  });

  it("should show error snack bar if there is a fetching of list error", async () => {
    const root = render(
      <MockedProvider mocks={mockWithError} addTypename={false}>
        <List />
      </MockedProvider>
    );

    await actWait();

    expect(
      root.container.getElementsByClassName("error-occured")
    ).toBeDefined();
  });

  it("should show a list of two videos if data is properly fetched", async () => {
    const root = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List />
      </MockedProvider>
    );

    await actWait();

    expect(root.getAllByText(/File Name/i).length).toBe(2);
  });
});
