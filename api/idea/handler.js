'use strict';

const Idea = require('./entity/idea');

module.exports.hello = {
  handler: function(request, reply) {
    return reply({result: 'Hello there!'});
  }
};

module.exports.list = {
  handler: function(request, reply) {
    Idea.find({}).sort({'meta.upvotes' : -1}).exec(function(err, docs) {
      return reply({ideas: docs});
    });
  }
};

module.exports.show = {
  handler: function(request, reply) {
    Idea.findOne({
      slug: request.params.slug
    }, function(err, doc) {
      if (err) {
        return reply({status: "error", message: "Error while looking for one idea", idea: {}});
      }
      return reply({
        idea: doc || {}
      });
    });
  }
};

module.exports.create = {
  handler: function(request, reply) {
    console.log(request.payload)
    let idea = new Idea(request.payload);
    idea.save(function(error) {
      if (error) {
        return reply({
          status: "error",
          message: error + " / Error while creating Idea"
        });
      } else {
        return reply({status: "ok", message: "Idea created", idea: idea});
      }
    });
  }
}

module.exports.upvote = {
  handler: function(request, reply) {
    Idea.findOne({
      slug: request.params.slug
    }, function(err, doc) {
      doc.meta.upvotes++;
      doc.save(function(error, idea) {
        if (err) {
          return reply({status: "error", message: "Error while saving idea"});
        }
        return reply({idea: idea});
      });
    });
  }
}

module.exports.downvote = {
  handler: function(request, reply) {
    Idea.findOne({
      slug: request.params.slug
    }, function(err, doc) {
      doc.meta.downvotes++;
      doc.save(function(error, idea) {
        if (err) {
          return reply({status: "error", message: "Error while saving idea"});
        }
        return reply({idea: idea});
      });
    });
  }
}
