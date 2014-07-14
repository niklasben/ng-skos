/**
 * @ngdoc service
 * @name ng-skos.service:SkosConceptProvider
 * @description
 * 
 * Get concepts via HTTP. 
 *
 * The server to be queried with this service is expected to return a JSON
 * object with one [concept](#/guide/concepts). The concept object may contain
 * links to narrower and broader concepts, among other information.
 * 
 * ## Configuration
 * 
 * * url: URL template to query
 * * jsonp: enable JSONP
 * * transform: custom transformation function to map expected response format
 *
 * ## Methods
 *
 * * getConcept
 * * updateConcept
 * * updateConnected
 *
 * @example
 *  <example module="myApp">
 *    <file name="index.html">
 *      <div ng-controller="myController">
 *      </div>
 *    </file>
 *    <file name="script.js">
 *      angular.module('myApp',['ngSKOS']);
 *      function myController($scope, SkosConceptProvider) {
 *          var foo = new SkosConceptProvider({
 *              url: '...'
 *          });
 *      }
 *    </file>
 *  </example>
 */
angular.module('ngSKOS')
.factory('SkosConceptProvider',['$http','$q',function($http,$q) {

    // constructor
    var SkosConceptProvider = function(args) {
        this.transform = args.transform;
        this.url = args.url;
        var jsonp = args.jsonp;
        if (jsonp && (jsonp === true || angular.isNumber(jsonp) || jsonp.match(/^\d/))) {
            jsonp = 'callback';
        }
        this.jsonp = jsonp;
    };

    // methods
    SkosConceptProvider.prototype = {
        // look up by uri / notation / prefLabel
        getConcept: function(concept) {
            var url;

            if (this.url) {
                if (angular.isFunction(this.url)) {
                    url = this.url(concept);
                } else {
                    url = this.url;
                    if (concept.notation) {
                        var notation = concept.notation[0];
                        url = url.replace('{notation}', decodeURIComponent(notation));
                    }
                    url = url.replace('{uri}', decodeURIComponent(concept.uri));
                }
            } else {
                url = concept.uri;
            }

            var transform = this.transform;

            var get = $http.get;
            if (this.jsonp) {
                get = $http.jsonp;
                url += url.indexOf('?') == -1 ? '?' : '&';
                url += this.jsonp + '=JSON_CALLBACK';
            }

            return get(url).then(
                function(response) {
                    try {
                        return transform ? transform(response.data) : response.data;
                    } catch(e) {
                        console.error(e);
                        return $q.reject(e);
                    }
                }, function(response) {
                    console.error(response);
                    return $q.reject(response.data);
                }
            );
        },
        updateConcept: function(concept) {
            return this.getConcept(concept).then(
                function(response) {
                    angular.copy(response, concept);
                }
            );
        },
        updateConnected: function(concept, which) {
            if (angular.isString(which)) {
                which = [which];
            } else if (!angular.isArray(which)) {
                which = ['broader','narrower','related'];
            }
            var service = this;
            angular.forEach(which, function(w) {
                angular.forEach(concept[w], function(c){
                    service.updateConcept(c);
                });
            });
        },
    };
 
    return SkosConceptProvider;
}]);
