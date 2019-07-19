import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: inline-block;
  padding-bottom:20px;
  margin: 0 auto;
`;

const GalleryImageEntry = styled.img`
  height:72px;
  width:72px;
  padding: 0px;
  border: solid 1px #ccc;
  border-radius:3px;
  &:hover {
    border: solid 1px #fff;
  }
`;

const GallerySelected = styled.img`
  height:72px;
  width:72px;
  padding: 0px;
  border: solid 1px #000;
  border-radius:3px;
`;

const ImageEntry = ({
  image, onHover, onExit, onGallerySelect, state,
}) => {
  if (image === state.previousImage) {
    return (
      <GalleryContainer>
        <GallerySelected
          src={image}
          onMouseLeave={onExit}
          onClick={onGallerySelect}
        />
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <GalleryImageEntry
        src={image}
        onMouseLeave={onExit}
        onClick={onGallerySelect}
      />
    </GalleryContainer>
  );
};

export default ImageEntry;
