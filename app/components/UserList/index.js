'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import userListStyles from './styles';

const SOCKET_EVENTS = {
    UPDATE_USER_LIST: 'updateUserList'
};

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { playerList: [] };
    }

    componentDidMount() {
        this.props.socket.on(SOCKET_EVENTS.UPDATE_USER_LIST, playerList => {
            this.setState({ playerList });
        });
    }

    render() {
        return (
            <div style={userListStyles.block}>
                <ul style={userListStyles.ul}>{this.state.playerList.map((player, key) => (
                    <li key={key}>
                        {player.name}
                    </li>
                ))}</ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { socket: state.PlayerReducer.socket };
}

export default connect(mapStateToProps, {})(UserList);

