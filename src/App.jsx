import React, { Component } from 'react';
import ZoomBoard from './ZoomBoard';
import ZoomItem from './ZoomItem';
import ZoomImage from './zoom-content/ZoomImage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ZoomBoard zoom={0.5}>
          <ZoomItem x={10} y={10} width={640} height={480}>
            <ZoomImage src="assets/bill_the_cat.jpg" alt="Bill the Cat" />
          </ZoomItem>
          <ZoomItem x={660} y={10} width={640} height={480}>
            <ZoomImage src="assets/rock.jpg" />
          </ZoomItem>
        </ZoomBoard>
      </div>
    );
  }
}

export default App;
