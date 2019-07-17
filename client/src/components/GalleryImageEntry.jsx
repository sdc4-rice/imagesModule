import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: inline-block;
  padding-bottom:20px;
  margin: 0 auto;
`

const GalleryImageEntry = styled.img`
  height:72px;
  width:72px;
  padding: 0px;
  border: solid 1px #A0A0A0;
  border-radius:3px;
  &:hover {
    border: solid 1px #A0A0A0;
  }
`

const GallerySelected = styled.img`
  height:70px;
  width:70px;
  padding: 0px;
  border: solid 2px #A0A0A0;
  border-radius:3px;
`

var ImageEntry = ({image, onHover, onExit, onSelect, state}) => {
  if (image === state.previousImage) {
    return(
    <GalleryContainer>
      <GallerySelected
      src={image}
      onMouseEnter={onHover}
      onMouseLeave={onExit}
      onClick={onSelect}
     />
    </GalleryContainer>
    )
  }
  else  {
    return(
    <GalleryContainer>
      <GalleryImageEntry
        src={image}
        onMouseEnter={onHover}
        onMouseLeave={onExit}
        onClick={onSelect}
        />
    </GalleryContainer>
    )
  }

}

export default ImageEntry;
