import React from 'react';
import styled, { keyframes } from 'styled-components';
import ImageEntry from './ImageEntry.jsx';
import GalleryImageEntry from './GalleryImageEntry.jsx';


const slideIn = keyframes`
0% {
  height:1%;
}

100% {
  height:10%;
}
`;

const ImagesList = styled.div`
  padding-top: 10px;
  paddin-right:5%;
  text-align: center;
  display: flex;
`;

const MainImage = styled.img`
  height: 498px;
  width: 498px;
  border: 1px solid rgb(102, 102, 102);

  z-index:5;
  &:hover {
    opacity:.7;
  }
`;

const MagnifiedDiv = styled.figure`
position: absolute;
z-index:4;
height: 700px;
width: 550px;
background-repeat: no-repeat;
display:block;
border:none;
transform: translate(520px, -16px);

`;

const Inner = styled.div`
  left:51%;
  top:50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position:absolute;
  border: 1px solid black;
  opacity:.9;
  padding-top:20px;
  height: 130px;
  width: 150px;
  font-family: "Helvetica neue",Helvetica,Verdana,Sans-serif;
  font-size:1.1em;
`;

const ZoomSelector = styled.div`
  background-color:rgba(0,0,0,.1);
  height: 405px;
  width: 434px;
  position:absolute;
  border:1px solid black;
  display:inline-block;
  transform: translate(-100%, -0%);
  padding:10px;
`;

const MainImageWrapper = styled.div`
  position: relative;

`;

const GalleryHovered = styled.img`
  border: solid 1px rgb(204, 204, 204);
`;
const GalleryEntryWrapper = styled.div`
  z-index:3;
  width:100%;
  height:11%;
  padding-top:13px;
  background-color: rgb(248,248,248,.95);
  left:50%;

  -webkit-transform: translate(-50%, -90%);
  -moz-transform: translate(-50%, -90%);
  transform: translate(-50%, -90%);
  position:absolute;
  justifyContent: 'center';
  animation: ${slideIn} linear .3s;
  overflow:hidden;

`;

const GalleryMainImage = styled.img`
  width: 70vw;
  height: 90vh;

`;

const ImageListGallery = styled.div`
  text-align: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color:#000;
  z-index:2;
  overflow:hidden;
  top:0;
  left:0;

`;

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousImage: '',
      selectedImage: '',
      zoom: false,
      magnifyImage: null,
      galleryState: false,
      x: null,
      y: null,
      screenx: null,
      screeny: null,
      backgroundPosition: '0% 0%',
    };
    this.onHover = this.onHover.bind(this);
    this.onExit = this.onExit.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onGallerySelect = this.onGallerySelect.bind(this);
    this.onGalleryMovePointer = this.onGalleryMovePointer.bind(this);
    this.selectImageOnLoad = this.selectImageOnLoad.bind(this);
    this.magnifyImage = this.magnifyImage.bind(this);
    this.mainClick = this.mainClick.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onMovePointer = this.onMovePointer.bind(this);


    this.onZoom = this.onZoom.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
  }

  componentDidMount() {
    this.selectImageOnLoad();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    document.body.style.overflow = 'visible';
    if (e.keyCode === 27) {
      this.setState({
        galleryState: false,
        zoom: false,
      });
    }
  }

  selectImageOnLoad() {
    this.setState({
      selectedImage: this.props.images[0],
      previousImage: this.props.images[0],
    });
  }

  onHover(e) {
    this.setState({
      previousImage: this.state.selectedImage,
      selectedImage: e.target.src,
    });
  }

  onExit() {
    this.setState({
      selectedImage: this.state.previousImage,
    });
  }

  onSelect(e) {
    this.setState({
      previousImage: e.target.src,
    });
  }

  onGallerySelect(e) {
    this.setState({
      previousImage: e.target.src,
      magnifyImage: e.target.src,
      selectedImage: e.target.src,
    });
  }

  magnifyImage(e) {
    this.setState({
      magnifyImage: e.target.src,
    });
  }

  onZoom() {
    this.setState({
      zoom: true,
    });
  }

  onZoomOut() {
    this.setState({
      zoom: false,
      x: null,
      y: null,
      magnifyImage: null,
    });
  }

  mainClick() {
    document.body.style.overflow = 'hidden';
    this.setState({
      galleryState: true,
    });
  }

  onGalleryMovePointer(e){
    let {
      left, top, width, height,
    } = e.target.getBoundingClientRect();
    this.setState({
      screenx: e.screenX,
      screeny: e.screenY
    })
  }

  onMovePointer(e) {
    const rect = e.target.getBoundingClientRect();
    const x1 = `${(e.clientX - rect.left) / 450 * 100}%`;
    const y1 = `${(e.clientY - rect.top) / 400 * 100}%`;
    let {
      left, top, width, height,
    } = e.target.getBoundingClientRect();
    const r = (e.pageX - left) / width * 100;
    const s = (e.pageY - top) / height * 100;
    this.setState({
      x: x1,
      y: y1,
      backgroundPosition: `${r}% ${s}%`
    });
  }


  render() {
    // Main- magnifiy Image state
    if (this.state.galleryState === false && this.state.magnifyImage !== null && this.state.zoom === true) {
      return (
        <ImagesList>
          <div>
            {this.props.images.map(image => (
              <ImageEntry
                image={image}
                onHover={this.onHover}
                onExit={this.onExit}
                onSelect={this.onSelect}
                state={this.state}
              />
            ))}
          </div>
          <MainImageWrapper
            src={this.state.selectedImage}
            onClick={this.mainClick}
            onMouseMove={this.onMovePointer}
            onMouseOut={this.onZoomOut}
          >
            <ZoomSelector style={{ left: this.state.x, top: this.state.y, transform: `translate(-${this.state.x}, -${this.state.y}) ` }}>
            </ZoomSelector>
            <MainImage src={this.state.selectedImage} />
          </MainImageWrapper>
          <MagnifiedDiv
            style={{ backgroundImage: `url(${this.state.magnifyImage})`, backgroundPosition: this.state.backgroundPosition }}
          />
        </ImagesList>
      );
    }
    // Main- magnification call to action state
    if (this.state.galleryState === false && this.state.magnifyImage !== null) {
      return (
        <ImagesList>
          <div>
            {this.props.images.map(image => <ImageEntry image={image} onHover={this.onHover} onExit={this.onExit} onSelect={this.onSelect} state={this.state} />)}
          </div>
          <MainImageWrapper
            src={this.state.selectedImage}
            onClick={this.mainClick}
            onMouseMove={this.onMovePointer}
          >
            <MainImage src={this.state.selectedImage} />
            <Inner onMouseEnter={this.onZoom}>
              <p>
                Mouse over to Zoom
                <br />
                -
                <br />
                Click to enlarge
              </p>
            </Inner>
          </MainImageWrapper>
        </ImagesList>
      );
    }
    // Main - base state
    if (this.state.galleryState === false) {
      return (
        <ImagesList>

          <div>
            {this.props.images.map(image => <ImageEntry image={image} onHover={this.onHover} onExit={this.onExit} onSelect={this.onSelect} state={this.state} />)}
          </div>
          <MainImageWrapper>
            <MainImage
              src={this.state.selectedImage}
              src={this.state.selectedImage}
              onMouseEnter={this.magnifyImage}
              onClick={this.mainClick}
              onMouseMove={this.onMovePointer}
              onMouseOut={this.onZoomOut}
            />
          </MainImageWrapper>
        </ImagesList>
      );
    }
    // Gallery - with underbar
    if (this.state.galleryState === true && this.state.screeny > 500) {
      return (
        <ImageListGallery
          onMouseMove={this.onGalleryMovePointer}>
          <GalleryMainImage
            src={this.state.selectedImage}
          />
          <GalleryEntryWrapper>
            {this.props.images.map(image => (
              <GalleryImageEntry
                image={image}
                onHover={this.onHover}
                onGallerySelect={this.onGallerySelect}
                onExit={this.onExit}
                onSelect={this.onSelect}
                state={this.state}
              />
            ))}
          </GalleryEntryWrapper>
        </ImageListGallery>
      );
    }
    // Gallery - base state
    if (this.state.galleryState === true) {
      return (
        <ImageListGallery
          onMouseMove={this.onGalleryMovePointer}>
            <GalleryMainImage
              src={this.state.selectedImage}
            />
  <div></div>
        </ImageListGallery>
      );
    }
  }
}


export default ImageList;
