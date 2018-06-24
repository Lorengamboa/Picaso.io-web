'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, openPlayerSocketConnection } from '../actions/player_action';
import { InputText, PrimaryButton } from '../components/common';

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
            buttonTxt: "Play as a Guest",
            privateTxt: "Create Private room"
        }

        // Events listeners
        this.onInputChange = this.onInputChange.bind(this);
        this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
        this.onCreateButtonClick = this.onCreateButtonClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Detecs user input changes
     * @param {Object} e 
     */
    onInputChange(e) {
        const newUsername = e.target.value;
        this.setState({
            "username": newUsername
        })
    }

    /**
     * If play button is clicked it will take you
     * to a random room to play!
     */
    onPlayButtonClick() {
        if(!this.state.username) return false;
        
        this.props.setUsername(this.state.username);
        this.props.openPlayerSocketConnection();
        this.props.history.push('/play');
    }

    /**
     * 
     */
    onCreateButtonClick() {
        if(!this.state.username) return false;

        this.props.setUsername(this.state.username);
        this.props.openPlayerSocketConnection();
        this.props.history.push('/create');
    }

    /**
     * If enter key button has been pressed it will trigger
     * the play button
     * @param {Object} e 
     */
    onSubmit(e) {
        if (e.key === 'Enter')
            this.onPlayButtonClick();
    }

    render() {
        return (
            <div className="container">
                <div className="home-menu">
                    <InputText
                        placeholder={this.state.placeholder}
                        onInputChange={this.onInputChange}
                        username={this.state.username}
                        onKeyPress={this.onSubmit}
                    />
                    <br />
                    <PrimaryButton
                        class="button-primary"
                        value={this.state.buttonTxt}
                        onClick={this.onPlayButtonClick}
                    />
                    <PrimaryButton
                        value={this.state.privateTxt}
                        onClick={this.onCreateButtonClick}
                    />
                </div>
            </div>
        )
    }
}

/**
 * 
 * @param {*} state 
 */
function mapStateToProps(state) {
    return { username: state.PlayerReducer.username };
}

export default connect(mapStateToProps, { setUsername, openPlayerSocketConnection })(HomePage);

