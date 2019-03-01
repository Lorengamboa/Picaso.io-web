import React from 'react';
import '../lib/modernizr.js'
import '../lib/stack.js'

class Fancy extends React.Component {
  constructor() {
    super()
    this.state = {
      stack: undefined,
      imgs: undefined,
      postivebtnlabel: undefined,
      negativebtnlabel: undefined,
      postivebtnclass : undefined,
      negativebtnclass : undefined
    }
    this.onEndStack = this.onEndStack.bind(this)
  }

  componentDidMount() {
    let stack = new Stack(document.getElementById('stack'));
    stack.options.infinite = this.state.infinite
    stack.options.onEndStack = this.onEndStack
    this.setState({stack: stack})
  }

  componentWillMount() {
    this.setState({
      imgs: this.props.images,
      postivebtnlabel: this.props.postivebtnlabel || 'Yes',
      negativebtnlabel: this.props.negativebtnlabel || 'No',
      postivebtnclass : this.props.postivebtnclass || '',
      negativebtnclass : this.props.negativebtnclass || '',
      query : this.props.query || undefined,
      queryclass : this.props.queryclass || '',
      imgclass : this.props.imgclass || '',
      effect : this.props.effect || 'krisna',
      infinite : this.props.infinite || false
    })
  }

  onEndStack() {
    this.props.onstackendfn()
  }

  render() {
    return (
      <div className="stack-container">
        <ul id="stack" className={`stack stack--${this.state.effect}`}>
        {this.state.imgs && this.state.imgs.map((img, i) =>
          <li id={img.id} key={img.id} className="stack__item">
          <img src={img.imageData} />
        </li>)}
      </ul>
        <div className="controls">
          <div>
            <p className={this.state.queryclass}>{this.state.query}</p>
            <img className="icon-tool" src={this.props.cancelIcon}  onClick={this.props.reject} />
            <img className="icon-tool" src={this.props.acceptIcon}  onClick={this.props.accept} />
          </div>
        </div>
    </div>);
  }
}

export default Fancy;
