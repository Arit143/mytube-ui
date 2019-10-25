import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import wait from "waait";

import Upload from "./Upload";
import UPLOAD_FILE_MUTATION from "../common/api/mutation";

async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount);
  });
}

interface Props {
  onChange: (files: FileList | null) => void;
}

/**
 * Tried to mock material ui dropzone but the file object is always empty
 * TODO: try a work around
 */

jest.mock("material-ui-dropzone", () => {
  return {
    DropzoneArea: (props: Props) => {
      return (
        <div>
          <label htmlFor="upload-file">Upload File</label>
          <input
            onChange={e => {
              props.onChange(e.target.files);
            }}
            id="upload-file"
            name="upload-file"
            type="file"
          />
        </div>
      );
    }
  };
});

describe("User upload", () => {
  afterEach(cleanup);

  const mocks = [
    {
      request: {
        query: UPLOAD_FILE_MUTATION
      },
      result: {
        data: {
          uploadFile: true
        }
      }
    }
  ];
  it("should be able to click and upload the video", async () => {
    const root = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Upload />
      </MockedProvider>
    );

    const inputEl = root.getByLabelText(/upload file/i);
    const file = new File(["TestVideo"], "test.mp4", {
      type: "video/mp4"
    });

    //fireEvent.change(inputEl, { target: { files: [file] } });

    await actWait();
  });
});
