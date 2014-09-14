require('ember');
require('ember_data');
require('custom_prefs');
require('moment');
require('md5');

window.Blog = Ember.Application.create({
    LOG_TRANSITIONS: true
});

require('mixins');

