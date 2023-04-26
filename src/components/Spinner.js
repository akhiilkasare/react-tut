import React, { Component } from 'react';
import loading from 'D:/react_course/newsapp/src/loading.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
