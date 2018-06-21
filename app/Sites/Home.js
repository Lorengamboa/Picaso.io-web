'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, openPlayerSocketConnection } from '../actions/player_action';
import { InputText, PrimaryButton } from '../components/common';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "Home",
            "placeholder": "Introduce a nickname",
            "username": this.props.username,
            "buttonTxt": "Play Now!",
            "privateTxt": "Create Private room"
        }

        // Events listeners
        this.onInputChange = this.onInputChange.bind(this);
        this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    }

    /**
     * 
     * @param {*} e 
     */
    onInputChange(e) {
        const newUsername = e.target.value;
        this.setState({
            "username": newUsername
        })
    }

    /**
     * 
     */
    onPlayButtonClick() {
        this.props.setUsername(this.state.username);
        this.props.openPlayerSocketConnection();
        this.props.history.push('/play')
    }

    render() {
        return (
            <div className="container">
                <div className="home-menu">
                    <InputText
                        placeholder={this.state.placeholder}
                        onInputChange={this.onInputChange}
                        username={this.state.username}
                    />
                    <br />
                    <PrimaryButton
                        class="button-primary"
                        value={this.state.buttonTxt}
                        onClick={this.onPlayButtonClick}
                    />
                    <PrimaryButton
                        value={this.state.privateTxt}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { username: state.PlayerReducer.username };
}

export default connect(mapStateToProps, { setUsername, openPlayerSocketConnection })(HomePage);

