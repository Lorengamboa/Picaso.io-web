"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Loader, Image } from 'semantic-ui-react'
import axios from 'axios';

import { setUsername, openPlayerSocketConnection } from "../actions/player";
import { InputText, PrimaryButton, Header } from "../components/common";


const SAMPLE_DRAWS_ENDPOINT = "/api/sample/draws";

/**
 * HOMEPAGE COMPONENT VIEW
 */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Home",
      placeholder: "Introduce a nickname",
      username: this.props.username,
      buttonTxt: "Play now!",
      privateTxt: "Create Private room",
      samples: [],
      loadingSamples: true
    };

    // Events listeners
    this.onInputChange = this.onInputChange.bind(this);
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.onCreateButtonClick = this.onCreateButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   */
  componentWillMount() {
    axios.get(SAMPLE_DRAWS_ENDPOINT)
      .then(res => {
        const imageSamples = res.data;
        this.setState({
          samples: imageSamples,
          loadingSamples: false
        });
      })
      .catch(err => {
        this.setState({
          loadingSamples: false
        });
      });
  };

  /**
   * Detecs user input changes
   * @param {Object} e
   */
  onInputChange(e) {
    const newUsername = e.target.value;
    this.setState({
      username: newUsername
    });
  }

  /**
   * If play button is clicked it will take you
   * to a random room to play!
   */
  onPlayButtonClick() {
    // if (!this.state.username) return false;

    this.props.setUsername(this.state.username);
    this.props.openPlayerSocketConnection();
    this.props.history.push("/play");
  }

  /**
   *
   */
  onCreateButtonClick() {
    if (!this.state.username) return false;

    this.props.setUsername(this.state.username);
    this.props.openPlayerSocketConnection();
    this.props.history.push("/create");
  }

  /**
   * If enter key button has been pressed it will trigger
   * the play button
   * @param {Object} e
   */
  onSubmit(e) {
    if (e.key === "Enter") this.onPlayButtonClick();
  }

  render() {
    let renderSamples;

    if (this.state.loadingSamples) {
      renderSamples = <Loader active inline='centered' />;
    }
    else {
      renderSamples = this.state.samples.map(draw => {
        return (
          <div className="sample four columns">
            <Image src={`data:image/png;base64, ${draw}`} size='medium' bordered />
          </div>
        );
      });
    }

    return (
      <div id="home-site">
        <Header />
        <div className="home-menu">
          <InputText
            class="input"
            placeholder={this.state.placeholder}
            onInputChange={this.onInputChange}
            username={this.state.username}
            onKeyPress={this.onSubmit}
          />
          <br />
          <PrimaryButton
            color="red"
            value={this.state.buttonTxt}
            onClick={this.onPlayButtonClick}
          />
          <PrimaryButton
            color="yellow"
            class="create-btn"
            value={this.state.privateTxt}
            onClick={this.onCreateButtonClick}
          />
          <Divider className="divide" horizontal>
            Last draws
          </Divider>
        </div>
        <div className="sample-content">
          <div class="row">
            {renderSamples}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return { username: state.PlayerReducer.username };
}

export default connect(
  mapStateToProps,
  { setUsername, openPlayerSocketConnection }
)(HomePage);
