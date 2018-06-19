'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, openPlayerSocketConnection } from '../actions/player_action';
import { InputText, PrimaryButton } from '../components/common';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "Home",
            "placeholder": "Introduce a nickname",
            "playBtn": "Play Now!",
            "privateBtn": "Create a private game",
        }

        // Events listeners

    }


    render() {
        return (
            <div className="container">


                <PrimaryButton
                    class="button-primary"
                    value={this.state.playBtn}
                />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { username: state.PlayerReducer.username };
}

export default connect(mapStateToProps, null)(CreatePage);

