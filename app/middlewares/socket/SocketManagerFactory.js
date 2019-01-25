'use strict';

import io from "socket.io-client";
import SocketManager from './socketManager';

const SocketManagerFactory = function(url, store) {
    const ws = io(url);
    const sm = new SocketManager(ws, store);

    return sm;
}

export default SocketManagerFactory;
