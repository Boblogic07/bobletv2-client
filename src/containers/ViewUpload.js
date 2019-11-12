import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./ViewUpload.css";
import { S3Image } from "aws-amplify-react";

export default function ViewUpload(props) {
  const [upload, setUpload] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    function loadImg() {
      return API.get("uploads", `/uploads/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const img = await loadImg();
        setComment(img.comment);
        setUpload(img.image);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleDownload() {

  }

  return (
    <div className="Uploads">
      {upload && (
          <div>
          <S3Image imgKey={upload} level="private"/>
          <h1>{comment}</h1>
          <Button
            block
            bsSize="large"
            bsStyle="default"
            onClick={handleDownload}
          >
            Download
          </Button>
          </div>
      )}
    </div>
  );
}
