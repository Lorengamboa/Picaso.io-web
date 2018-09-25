"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Loader, Image, Header, Icon } from 'semantic-ui-react'
import axios from 'axios';

import { setUsername, openPlayerSocketConnection } from "../actions/player";
import { InputText, PrimaryButton, Navbar } from "../components";

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
      searchTxt: "Find game",
      samples: [],
      loadingSamples: true
    };

    // Events listeners
    this.onInputChange = this.onInputChange.bind(this);
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
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
          samples: imageSamples || this.state.samples,
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

  onSearchButtonClick() {
    // if (!this.state.username) return false;
    this.props.history.push("/search");
  }

  /**
   *
   */
  onCreateButtonClick() {
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
      if (!this.state.samples.length) {
        renderSamples = <div>
          <Header as='h2' icon textAlign='center'>
            <Icon name='images' circular />
            <Header.Content>Not draws available!</Header.Content>
          </Header>
        </div>
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
    }

    return (
      <div id="home-site">
        <Navbar />
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
            color="green"
            value={this.state.searchTxt}
            onClick={this.onSearchButtonClick}
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
          <div className="row">
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

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (name) => {
      dispatch(setUsername(name));
    },
    openPlayerSocketConnection: (data) => {
      dispatch(openPlayerSocketConnection(data));
    },
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(HomePage);
