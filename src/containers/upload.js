import React, { useState } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./upload.css";

export default function NewUpload(props) {
  const [file, setFile] = useState({});
  const [comment, setContent] = useState("Picture of boblet");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    console.log(file);
    if(file !== undefined && file !== {}) {
      return file.size < config.MAX_ATTACHMENT_SIZE;
    }
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const image = await s3Upload(file);
      await createUpload({ comment, image });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createUpload(body) {
    return API.post("uploads", "/uploads", {
      body: body
    });
  }

  return (
    <div className="NewUpload">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="upload">
          <ControlLabel>Select Picture</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <FormGroup controlId="comment">
          <ControlLabel>Comments</ControlLabel>
          <FormControl
            value={comment}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
