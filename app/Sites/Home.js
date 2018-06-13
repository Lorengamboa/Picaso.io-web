'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions/player_action';
import { InputText, PrimaryButton } from '../components/common';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "Home",
            "placeholder": "Introduce a nickname",
            "username": this.props.username,
            "buttonTxt": "Play Now!"
        }

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
        this.props.history.push('/play')
    }

    render() {
        return (
            <div className="container">
                <h1>Home</h1>
                <InputText
                    placeholder={this.state.placeholder}
                    onInputChange={this.onInputChange}
                    username={this.state.username}
                />

                <PrimaryButton
                    class="button-primary"
                    value={this.state.buttonTxt}
                    onClick={this.onPlayButtonClick}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { username: state.PlayerReducer.username };
}

export default connect(mapStateToProps, { setUsername })(HomePage);

