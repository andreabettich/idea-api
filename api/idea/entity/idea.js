'use strict';

// Dependencies
const Mongoose = require('mongoose');
const Database = require('../../../config/database');

const IdeaSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    meta: {
        upvotes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default: 0
        }
    }
});

module.exports = Mongoose.model('idea', IdeaSchema);
