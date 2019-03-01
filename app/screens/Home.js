"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
// import { Divider, Loader, Image, Header, Icon } from 'semantic-ui-react'

import { setUsername, openPlayerSocketConnection } from "../core/player/playerActions";
import { InputText, PrimaryButton, Navbar, Footer } from "../components";

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
    this.onSettingsButtonClick = this.onSettingsButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.history.push("/play");
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
    // let renderSamples;

    // if (this.state.loadingSamples) {
    //   renderSamples = <Loader active inline='centered' />;
    // }
    // else {
    //   if (!this.state.samples.size) {
    //     renderSamples = <div>
    //       <Header as='h2' icon textAlign='center'>
    //         <Icon name='images' circular />
    //         <Header.Content>Not draws available!</Header.Content>
    //       </Header>
    //     </div>
    //   }
    //   else {
    //     renderSamples = this.state.samples.map(draw => {
    //       return (
    //         <div className="sample four columns">
    //           <Image src={`data:image/png;base64, ${draw}`} size='medium' bordered />
    //         </div>
    //       );
    //     });
    //   }
    // }

    return (
      <div id="home-site">
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
              <Grid.Column mobile={16} tablet={8} computer={16}>
                <PrimaryButton
                  color="red"
                  className="btn-roundy"
                  value="home.btn1"
                  onClick={this.onPlayButtonClick}
                />
              </Grid.Column>

              <Grid.Column mobile={16} tablet={8} computer={16}>
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

          {/* <Divider className="divide" horizontal>
            Last draws
          </Divider> */}
        </div>
        {/* <div className="sample-content">
          <div className="row">
            {renderSamples}
          </div>
        </div> */}
       <Footer links={["contact us", "policy", "download"]} />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return { username: state.playerReducer.username };
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
    openPlayerSocketConnection: data => {
      dispatch(openPlayerSocketConnection(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
