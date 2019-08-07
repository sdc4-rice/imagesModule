import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageList from './components/ImageList.jsx';
import styles from './styles/styles.css';

Enzyme.configure({ adapter: new Adapter() });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: true,
    };
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    const that = this;
    const queryId = (location.pathname + location.search).substr(5);
    $.ajax({
      method: 'GET',
      url: `http://localhost:3003/api/images/${queryId}`,
      contentType: 'application/json; charset=utf-8',
      success(response) {
        console.log('response(path in JSON and is not parsed yet): ', response);
        const parsedResponse = JSON.parse(response.path);
        // const parsedResponse = response.path;
        that.setState({
          images: parsedResponse,
          loading: false,
        });
      },
    });
  }

  render() {
    if (this.state.loading === true) {
      return (<div><h2> loading </h2></div>);
    }
    return (
      <div>
        <div className="App">
          <ImageList images={this.state.images} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('image-modal'));
