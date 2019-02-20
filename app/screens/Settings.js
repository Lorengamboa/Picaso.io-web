"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Grid } from 'semantic-ui-react'
import { Navbar, Footer } from "../components";

/**
 * SEARCHPAGE COMPONENT VIEW
 */
class SettingsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="settings-site">
        <Navbar />
        <Grid>
          <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            Sound <Checkbox toggle />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            Swearing <Checkbox toggle />
          </Grid.Column>
          </Grid.Row>
        </Grid>
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
  return { sound: state.gameReducer.sound };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps, null
)(SettingsPage);
