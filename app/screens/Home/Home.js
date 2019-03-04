"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Loader, Dimmer } from "semantic-ui-react";
import * as Sentry from "@sentry/browser";

import { setUsername } from '../../core/player/playerActions';
import { openPlayerSocketConnection } from "../../core/socket/socketActions";
import { InputText, PrimaryButton, Navbar, Footer } from "../../components";

const SAMPLE_DRAWS_ENDPOINT = "/api/sample/draws";

Sentry.init({
  dsn: "https://0bf6ab16edaf42b687dba1a4cdb01548@sentry.io/1406806"
});

/**
 * HOMEPAGE COMPONENT VIEW
 */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
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
    this.onSettingsButtonClick = this.onSettingsButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   * @param {*} error
   * @param {*} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  componentWillReceiveProps(props) {
    if (props.connection) return this.props.history.push("/play");
  }

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
    this.props.setUsername(this.state.username);
    this.props.openPlayerSocketConnection();
  }

  /**
   * Find existing games!
   */
  onSearchButtonClick() {
    this.props.history.push("/search");
  }

  /**
   * Create new game!
   */
  onCreateButtonClick() {
    this.props.history.push("/create");
  }

  /**
   * Set your config games!
   */
  onSettingsButtonClick() {
    this.props.history.push("/settings");
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
    return (
      <div id="home-site">
        <Dimmer active={this.props.loading}>
          <Loader indeterminate>Loading game</Loader>
        </Dimmer>
        <Navbar className="center" />
        <div className="home-menu">
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <InputText
                  className="input"
                  placeholder="home.input"
                  onInputChange={this.onInputChange}
                  username={this.state.username}
                  onKeyPress={this.onSubmit}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <PrimaryButton
                  color="red"
                  className="btn-roundy"
                  value="home.btn1"
                  onClick={this.onPlayButtonClick}
                />
              </Grid.Column>

              <Grid.Column mobile={16} tablet={16} computer={16}>
                <PrimaryButton
                  color="green"
                  className="btn-roundy"
                  value="home.btn2"
                  onClick={this.onSearchButtonClick}
                />
                <PrimaryButton
                  color="blue"
                  className="btn-roundy"
                  value="home.btn3"
                  onClick={this.onCreateButtonClick}
                />
                <PrimaryButton
                  color="grey"
                  className="btn-roundy"
                  value="home.btn4"
                  onClick={this.onSettingsButtonClick}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className="center">
          <Footer
            links={[
              { action: "mailto", value: "picas.iohelp@gmail.com" },
              { value: "policy", action: "link", url: "/policy" },
              { value: "How to play", action: "link", url: "/howtoplay" },
              { value: "Join our Discord community", action: "link", url: "https://discord.gg/NuNGe4" },
            ]}
          />
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
  return { username: state.playerReducer.username, loading: state.socketReducer.loading, connection: state.socketReducer.connection };
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    setUsername: name => {
      dispatch(setUsername(name));
    },
    openPlayerSocketConnection: () => {
      dispatch(openPlayerSocketConnection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);