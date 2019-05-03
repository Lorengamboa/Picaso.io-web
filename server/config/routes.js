'use strict';

/**
 * Route config file that holds all the routes
 */

const routes = {
    API_DICTIONARY: '/api/dictionary',
    API_IMAGES: '/api/draws',
    API_ROOMS_AVAILABLE: '/api/rooms_available',
    API_ROOMS_INFO: '/api/room',
    ADMIN: '/admin',
    DASHBOARD: '/dashboard',
    DRAWS: '/drawings',
    LOGPANEL: '/logpanel',
    LOGPANEL_FILE: '/logpanel/:filename',
    REGISTER: '/register',
    PROFILE: '/profile',
    LOGIN: '/login',
    LOGOUT: '/logout',
    WEB_APP: '*'
}

module.exports = routes;