'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, openPlayerSocketConnection } from '../actions/player';
import { InputText, PrimaryButton } from '../components/common';

/**
 * CREATEPAGE COMPONENT VIEW
 */
class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Home",
            placeholder: "Introduce a nickname",
            playBtn: "Play Now!",
            privateBtn: "Create a private game",
        }
    }
    render() {
        return (
            <div className="container">
                <div className="create-menu">
                    <InputText
                        placeholder="Introduce a room name"
                    />
                    <select>
                        <option value="volvo">1</option>
                        <option value="saab">2</option>
                        <option value="opel">3</option>
                        <option value="audi">4</option>
                    </select>
                    <select>
                        <option value="volvo">General</option>
                        <option value="saab">Pokemon</option>
                        <option value="opel">League of Legends</option>
                    </select>
                    <div className="row">
                        <div className="eight columns">
                            <InputText
                                value="SDADASDXASXASD"
                            />
                        </div>
                        <div className="four columns">
                            <PrimaryButton
                                class="button-primary"
                                value="COPY"
                            />
                        </div>
                    </div>
                    <PrimaryButton
                        class="button-primary"
                        value="create"
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

export default connect(mapStateToProps, null)(CreatePage);

