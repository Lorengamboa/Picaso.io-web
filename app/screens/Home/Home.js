"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import * as Sentry from "@sentry/browser";
import { ToastContainer, toast } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";

import GameLoader from "./GameLoader";
import { setUsername } from "../../core/player/playerActions";
import { openPlayerSocketConnection } from "../../core/socket/socketActions";

import links from "./footer_url";
import { InputText, Navbar, Footer } from "../../components";
import MenuButton from "./MenuButton";

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
      username: "",
      error: null
    };

    // Events listeners
    this.onInputChange = this.onInputChange.bind(this);
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onCreateButtonClick = this.onCreateButtonClick.bind(this);
    this.onHow2PlayButtonClick = this.onHow2PlayButtonClick.bind(this);
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

  /**
   *
   * @param {*} props
   */
  componentWillReceiveProps(props) {
    if (props.connection) this.props.history.push("/play");

    if (props.snackbar !== this.props.snackbar) {
      if (props.snackbar.level === "error")
        toast.error(props.snackbar.message, {
          position: toast.POSITION.TOP_LEFT
        });
    }
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
  onHow2PlayButtonClick() {
    this.props.history.push("/howtoplay");
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
      <div>
          <GameLoader loading={this.props.loading} content="Loading game" />
          <Navbar className="center" />
      <div className="container">
      <div className="row">
      <div className="col-xl-10 col-centered">
          <div className="home-menu">
            <InputText
              className="input"
              placeholder="home.input"
              onInputChange={this.onInputChange}
              username={this.state.username}
              onKeyPress={this.onSubmit}
            />
            <MenuButton
              actions={[
                this.onPlayButtonClick,
                this.onSearchButtonClick,
                this.onCreateButtonClick,
                this.onHow2PlayButtonClick
              ]}
            />
          </div>
          </div>

          </div>
        </div>
        <div className="footer">
          <Footer links={links} />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return {
    username: state.playerReducer.username,
    loading: state.socketReducer.loading,
    connection: state.socketReducer.connection,
    snackbar: state.generalReducer
  };
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
