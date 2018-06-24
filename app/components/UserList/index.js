'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import userListStyles from './styles';

const SOCKET_EVENTS = {
    UPDATE_USER_LIST: 'updateUserList'
};

/**
 * @class UserList
 * @desc
 */
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { playerList: [] };
    }

    componentDidMount() {
        // Automaticly updates our chatlist anytime a user enters/Leave or score changes
        this.props.socket.on(SOCKET_EVENTS.UPDATE_USER_LIST, playerList => {
            this.setState({ playerList });
        });
    }

    render() {
        return (
            <div className="chatlist">
                <ul>
                    {this.state.playerList.map((player, key) => (
                        <li key={key}
                            style={userListStyles.li(player.color)}
                        >
                            {player.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

/**
 * 
 * @param {*} state 
 */
function mapStateToProps(state) {
    return { socket: state.PlayerReducer.socket };
}

export default connect(mapStateToProps, {})(UserList);

