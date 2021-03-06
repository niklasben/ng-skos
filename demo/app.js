angular.module('myApp', ['ui.bootstrap','ngSKOS','ngSuggest'])
.run(function($rootScope,$http,$q) {
    $rootScope.getSamples = $q.defer();
        $http.get('data/jita/jita.json').success(function(jita){
            $rootScope.jita = jita;
            $rootScope.sampleSkosConcept = jita.topConcepts[0].narrower[0];
            $rootScope.getSamples.resolve();
        });
        $http.get('data/rvk/UN.json').success(function(rvk){
            $rootScope.rvkUN = rvk;
        });
        $http.get('data/ddc/ddcsample.json').success(function(ddc){
            $rootScope.ddc = ddc;
        });
        $http.get('data/ezb/ezb.json').success(function(ezb){
            $rootScope.ezb = ezb;
        });

})
.config(function($locationProvider, $anchorScrollProvider) {
    $locationProvider.html5Mode(true);
})
.controller('myController',[
    '$scope','$timeout','$rootScope','$q',
    'OpenSearchSuggestions','SkosConceptSource','SkosHTTP','ngSKOS.version',
    function myController($scope, $timeout, $rootScope, $q, OpenSearchSuggestions, SkosConceptSource, SkosHTTP,version) {

    // RVK-Zugriff ausgelagert in rvk.js
    var rvk = rvkConceptScheme(
        $q,
        SkosConceptSource, SkosHTTP, OpenSearchSuggestions
    );
    // demo of skos-concept
    $scope.getSamples.promise.then(function(){
        $scope.sampleConcept = angular.copy($scope.jita.topConcepts[0].narrower[0]);
    });
    
    $scope.selectSampleConcept = function(scheme){
        if(scheme == 'jita'){
            angular.copy($scope.jita.topConcepts[0].narrower[0], $scope.sampleConcept);
        }else if(scheme == 'rvk'){
            angular.copy($scope.rvkUN, $scope.sampleConcept);
        }else if(scheme == 'ddc'){
            angular.copy($scope.ddc, $scope.sampleConcept);
        }
    }
    
    rvk.getTopConcepts().then(function(response){
        rvk.topConcepts = response;
    });

    // demo of skos-browser
    $scope.selectedBrowserConcept = {};
    
    rvk.lookupNotation('UN').then(function(response){
        angular.copy(response, $scope.selectedBrowserConcept);
    });

    $scope.selectTopConcept = function(concept){
        rvk.lookupNotation(concept.notation).then(function(response){
            angular.copy(response, $scope.selectedBrowserConcept);
        });
    };

    // demo of skos-list
    $scope.conceptList = [];
    $scope.selectedListConcept = {};
    rvk.lookupNotation('UN').then(function(response){
        angular.copy(response, $scope.selectedListConcept);
    });
    $scope.addConcept = function(concept){
        $scope.conceptList.push({
            prefLabel: { de: concept.prefLabel.de },
            notation: [ concept.notation[0] ],
            uri: concept.uri
        });
    };
    $scope.checkDuplicate = function(){
        var dupe = false;
        angular.forEach($scope.conceptList, function(value, key){
            if(value.uri == $scope.selectedListConcept.uri){
                dupe = true;
            }
        })
        return dupe;
    };
    $scope.reselectConcept = function(concept){
        rvk.lookupNotation(concept.notation[0]).then(function(response){
            angular.copy(response, $scope.selectedListConcept);
        });
        $scope.conceptLabel = {};
    };
    
    $scope.rvk = rvk;
    $scope.treeActive = {};
    $scope.tree = function(){
        if($scope.treeSelect == 'jita'){
            angular.copy($scope.jita, $scope.treeActive);
        }
        if($scope.treeSelect == 'ezb'){
            angular.copy($scope.ezb, $scope.treeActive);
        }
    };
    $scope.language = "en";

    $scope.version = version;
}]);

