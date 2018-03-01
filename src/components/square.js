import React, { Component } from 'react'

// class Square extends Component {
//   render() {
//     return (
//       <button className="square" onClick={ this.props.changeX }>
//         {this.props.value}
//       </button>
//     )
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={ props.changeX }>
      {props.value}
    </button>
  )
}

export default Square