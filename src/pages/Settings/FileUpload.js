import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";

// import { Button } from "react-bootstrap";

import Icon from "./Icon";

function FileUpload({
  iconName,
  onUpload,
  src,
  maxFiles,
  maxSize,
  errorText,
  disabled,
  ...props
}) {
  const [files, setFiles] = useState([]);

  // convert file size bytes to MB
  const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, file) => {
    onUpload(acceptedFiles[0]);
    file(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // preview thumbs
  const thumbs = files.map((file) => {
    return (
      <div
        className="dz-preview dz-processing dz-image-preview dz-complete h-100"
        key={file.name}
      >
        <div className="dz-image h-100">
          <img
            className="h-100 w-100"
            src={file.preview}
            alt="preview"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <Dropzone
        onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
        maxFiles={maxFiles}
        maxSize={maxSize}
        onDropRejected={() => alert(errorText)}
        disabled={disabled ? disabled : false}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="dropzone dz-clickable"
            style={{ height: "170px" }}
          >
            {files.length === 0 && (
              <div
                className="dz-message"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {!src ? (
                  <>
                    <input {...getInputProps()} />
                    <div className="dz-message-icon">
                      <Icon size="lg" name={iconName} />
                    </div>
                    <span className="dz-message-text">
                      Drag and drop file{" "}
                      <small>
                        {maxSize && "Max " + bytesToMegaBytes(maxSize) + " MB"}
                      </small>
                    </span>
                    <div className="dz-message-btn mt-2">
                      <button type="button" className="btn btn-primary">
                        Upload
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="dz-preview dz-processing dz-image-preview dz-complete h-100">
                    <div className="dz-image h-100">
                      <img
                        className="h-100 w-100"
                        style={{
                          objectFit: "contain !important",
                        }}
                        src={src}
                        alt="preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {thumbs}
          </div>
        )}
      </Dropzone>
    </>
  );
}

export default FileUpload;
