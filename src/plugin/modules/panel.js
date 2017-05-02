/* global Promise */
// Note that the bluebird Promise library may be used globally
// like this. Bluebird is loaded globally by the ui, one of only a small 
// number loaded thus (requirejs being the only other third party dependency 
// loaded globally.)
// bluebird may also be included as a dependency. I'm of 
// two minds. Promise is present in just most modern browsers (not IE, but Edge)
// so including it as a dependency is a bit odd. On the other hand, bluebird
// is more functional than standard Promise, and if code depends on those features,
// prehaps it should be included directly.
define([
    'kb_common/html',
    './localDependency',

    // Note bootstrap, although not really necessary in all cases, is still required
    // if any bootstrap classes are used, as in the render() function below. 
    // Well, not required, in that the ui build has no idea that the markup contains
    // bootstrap style dependencies, but logically required because the bootsrap stylesheets are 
    // only loaded if some code expresses that dependency. 
    // Practically, though, but the time this code is loaded in the ui, bootstrap styles have been, 
    // or will shortly be, loaded by other modules.
    'bootstrap'
], function(
    html,
    local

    // Also note that since bootstrap is loaded for "effect", and does not implement an actual code
    // module it is not necessary to receive the module in an argument (it would not hurt, but
    // the argument would never be used, and linters will complain abount the unused variable.)
) {
    'use strict';

    // Note: there is no need to use kb_common/html. It is included here just
    // because it is a simply way of creating and demonstrating markup 
    // creation.
    var t = html.tag,
        div = t('div'),
        p = t('p');

    function factory(config) {
        var hostNode, container,
            runtime = config.runtime;

        // RENDERING CODE, ETC.

        // Note: this is not a special function, just a markup-building
        // function, in this case simply syncronous.
        function render() {
            // Typically for the top level of a plugin you need to wrap in bootstrap
            // boilerplate in order to get the padding, etc. that other top level
            // panels do.
            return div({
                class: 'container-fluid'
            }, [
                div({
                    class: 'row'
                }, [
                    div({
                        class: 'col-md-6'
                    }, 'This is my plugin.'),
                    div({
                        class: 'col-md-6'
                    }, [
                        p([
                            'Local dependencies are easy to use. Just make a relative ',
                            'path reference to the file, sans the ".js", in the module list ',
                            'provided to "define".'
                        ]),
                        p([
                            'This one, for instance, just contains the string: ',
                            local
                        ])
                    ])
                ])
            ]);
        }

        // LIFECYCLE API

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
                container = hostNode.appendChild(document.createElement('div'));
            });
        }

        function start(params) {
            return Promise.try(function() {
                // usually rendering, or long async data loading, content generation, 
                // would go here.
                runtime.send('ui', 'setTitle', 'Pavel\'s Demo Plugin')
                container.innerHTML = render();
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