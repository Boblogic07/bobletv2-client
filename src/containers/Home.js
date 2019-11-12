import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { S3Image } from 'aws-amplify-react';
import "./Home.css";

export default function Home(props) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const img = await loadImages();
        setImages(img.reverse());
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadImages() {
    return API.get("uploads", "/uploads");
  }

  function renderNotesList(images) {
    console.log(images);
    return [{}].concat(images).map((img, i) =>
      i !== 0 ? (
        <LinkContainer key={img.uploadId} to={`/uploads/${img.uploadId}`}>
          <div className="preview">
            <S3Image imgKey={img.image} level="private"/>
          </div>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/uploads/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Upload another image
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Boblet</h1>
        <p>A collection of photos for your little ones</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="images">
        <PageHeader>Photos</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(images)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
