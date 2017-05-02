/* global Promise */
define([
    'jquery'
], function(
    $
) {
    'use strict';

    function factory(config) {
        var hostNode, container, runtime = config.runtime;

        function init(config) {
            return Promise.try(function() {
                // anything to initialize?
            });
        }

        function attach(node) {
            return Promise.try(function() {
                // Make our own top level container node. 
                // Sometimes we might want to create an html 
                // layout here.
                hostNode = node;
                container = hostNode.appendChild(createElement('div'));
            });
        }

        function start(params) {
            return Promise.try(function() {
                // usually rendering, or long async data loading, content generation, 
                // would go here.
                container.innerHTML = 'hi, i have started';
            });
        }

        function stop() {
            return Promise.try(function() {
                // anything to stop?
            });
        }

        function detach() {
            return Promise.try(function() {
                // at a minimum be nice and remove our top level node if any.
                if (hostNode && container) {
                    hostNode.removeChild(container);
                }
            });
        }

        return {
            init: init,
            attach: attach,
            start: start,
            stop: stop,
            detach: detach
        };
    }

    return {
        make: function(config) {
            return factory(config);
        }
    };
});