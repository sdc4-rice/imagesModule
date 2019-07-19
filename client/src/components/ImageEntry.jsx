import React from 'react';
import styled from 'styled-components';

const MainEntry = styled.img`
height:41px;
width:41px;
margin-right:17px;
margin-bottom:5px;
border: 1px solid #ccc;
&:hover {
  border: 1px solid #0654ba;
}
`;

const MainSelected1 = styled.img`
  height:41px;
  width:41px;
  margin-right:17px;
  margin-bottom:5px;
  border: solid 2px #0654ba;
  height: 39px;
  width: 39px;
`;


const ImageEntry = ({
  image, onHover, onExit, onSelect, state,
}) => {
  if (image === state.previousImage) {
    return (
      <div>
        <MainSelected1
          src={image}
          onMouseEnter={onHover}
          onMouseLeave={onExit}
          onClick={onSelect}
        />
      </div>
    );
  }

  return (
    <div>
      <MainEntry
        src={image}
        onMouseEnter={onHover}
        onMouseLeave={onExit}
        onClick={onSelect}
      />
    </div>
  );
};

export default ImageEntry;
