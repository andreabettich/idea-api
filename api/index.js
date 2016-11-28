'use strict';

const Idea = require('./idea/handler');

exports.register = (plugin, options, next) => {

    plugin.route([
        {
            method: 'GET',
            path: '/',
            config: Idea.hello
        }, {
            method: 'GET',
            path: '/idea',
            config: Idea.list
        }, {
            method: 'GET',
            path: '/idea/{slug}',
            config: Idea.show
        }, {
            method: 'POST',
            path: '/idea',
            config: Idea.create
        }, {
            method: 'GET',
            path: '/idea/{slug}/upvote',
            config: Idea.upvote
        }, {
            method: 'GET',
            path: '/idea/{slug}/downvote',
            config: Idea.downvote
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};
