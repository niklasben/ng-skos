angular.module('ngSKOS').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/skos-browser.html',
    "<div ng-if=\"scheme.suggest\" style=\"margin:1em 0em\"><input class=\"form-control\" suggest-typeahead=\"scheme.suggest\" typeahead-on-select=\"selectNotation($item.description)\" ng-model=\"conceptLabel\" placeholder=\"Search by terms (typeahead)\" typeahead-loading=\"loading\" typeahead-editable=\"false\"> <i ng-show=\"loading\" class=\"glyphicon glyphicon-refresh typeahead-loading\"></i></div><div ng-if=\"selectNotation\" class=\"search-top\" style=\"overflow:hidden;margin-bottom:15px\"><form ng-submit=\"selectNotation(notation)\"><span style=\"float:left\"><input class=\"form-control search-top-input\" ng-model=\"notation\" placeholder=\"Enter full notation\"></span> <button type=\"submit\" ng-disabled=\"!notation.length\" class=\"search-top-button\"><span class=\"glyphicon glyphicon-search\"></span></button></form></div><div skos-concept=\"concept\" skos-click=\"selectConcept\" language=\"language\"></div>"
  );


  $templateCache.put('template/skos-concept-thesaurus.html',
    "<div class=\"skos-concept-thesaurus\"><ul ng-if=\"ancestors.length\" class=\"ancestors\"><span ng-if=\"inScheme\" class=\"classification\">{{inScheme}}</span><li class=\"ancestor\" ng-repeat=\"a in ancestors\"><span skos-label=\"a.prefLabel\" lang=\"{{language}}\" ng-click=\"update(a);reload();\"></span></li></ul><div class=\"top top-classic\"><span ng-if=\"notation\" class=\"notation\">{{notation[0]}}</span> <b><span skos-label=\"concept.prefLabel\" lang=\"{{language}}\"></span></b><a ng-if=\"notation\" class=\"uri\" href=\"{{uri}}\"><span style=\"vertical-align:-10%\" class=\"glyphicon glyphicon-globe\"></span></a></div><div ng-if=\"altLabel.length\" class=\"skos-concept-altlabel\"><ul><li ng-repeat=\"alt in altLabel\"><span ng-if=\"$index < 5\" style=\"display:inline\"><span skos-label=\"alt\"></span> <span style=\"margin-left:-4px;margin-right:3px\" ng-if=\"$index < 4 && $index < altLabel.length-1\">,</span></span></li></ul></div><div ng-if=\"broader.length\" class=\"skos-concept-thesaurus-relation\"><b>Broader Terms:</b><ul ng-repeat=\"b in broader\"><li><span skos-label=\"b.prefLabel\" lang=\"{{language}}\" ng-click=\"click(b)\"></li></ul></div><div ng-if=\"narrower.length\" class=\"skos-concept-thesaurus-relation\"><b>Narrower Terms:</b><ul ng-repeat=\"n in narrower\"><li><span skos-label=\"n.prefLabel\" lang=\"{{language}}\" ng-click=\"click(n)\"></li></ul></div><div ng-if=\"related.length\" class=\"skos-concept-thesaurus-relation\"><b>Related Terms:</b><ul ng-repeat=\"r in related\"><li><span skos-label=\"r.prefLabel\" lang=\"{{language}}\" ng-click=\"click(r)\"></li></ul></div></div>"
  );


  $templateCache.put('template/skos-concept.html',
    "<div class=\"skos-concept\"><div class=\"top top-alt\"><span ng-if=\"notation.length\" class=\"notation\">{{notation[0]}}</span> <b><span ng-if=\"prefLabel\" skos-label=\"concept.prefLabel\" lang=\"{{language}}\"></span></b> <a ng-if=\"uri && uri != notation\" class=\"uri\" href=\"{{uri}}\"><span class=\"glyphicon glyphicon-globe\"></span></a></div><div ng-if=\"altLabel.length\" class=\"skos-concept-altlabel\"><ul><li ng-repeat=\"alt in altLabel\"><span ng-if=\"$index < 5\" style=\"display:inline\"><span skos-label=\"alt\" lang=\"{{language}}\"></span></span> <span style=\"margin-left:-4px;margin-right:3px\" ng-if=\"$index < 4 && $index < altLabel.length-1\">,</span></li></ul></div><div ng-if=\"broader.length || narrower.length || related.length\" class=\"skos-concept-connected\"><div ng-if=\"broader.length\" class=\"skos-concept-relation skos-concept-relation-broader\"><ul ng-repeat=\"c in broader\"><li><span skos-label=\"c.prefLabel\" lang=\"{{language}}\" ng-click=\"click(c)\" title=\"{{c.notation[0]}}\"></span></li></ul></div><div ng-if=\"narrower.length\" class=\"skos-concept-relation skos-concept-relation-narrower\"><ul ng-repeat=\"c in narrower\"><li><span skos-label=\"c.prefLabel\" lang=\"{{language}}\" ng-click=\"click(c)\" title=\"{{c.notation[0]}}\"></span></li></ul></div><div ng-if=\"related.length\" class=\"skos-concept-relation skos-concept-relation-related\"><ul ng-repeat=\"c in related\"><li><span skos-label=\"c.prefLabel\" lang=\"{{language}}\" ng-click=\"click(c)\" title=\"{{c.notation[0]}}\"></span></li></ul></div></div><div ng-if=\"!isEmptyObject(note)\" style=\"margin-top:10px\"><div ng-repeat=\"n in note\" lang=\"{{language}}\" style=\"width:100%;padding:4px 6px;border:1px solid #ddd;margin-top:8px\"><em><div skos-label=\"n\"></div></em></div></div></div>"
  );


  $templateCache.put('template/skos-list.html',
    "<ul ng-if=\"concepts.length\" class=\"skos-simple-list\"><li ng-repeat=\"c in concepts\"><div class=\"set\" tabindex=\"0\" ng-keydown=\"onKeyDown($event, $first, $last, $index)\" list-id=\"{{ID + '_' + $index}}\" ng-focus=\"onFocus($index)\"><span style=\"whitespace:nowrap\" class=\"notation skos-list-notation\" ng-click=\"onClick($index)\">{{c.notation[0]}}</span> <span ng-if=\"showLabels\" skos-label=\"c.prefLabel\" lang=\"{{language}}\" class=\"skos-list-label\" ng-click=\"onClick($index)\"></span><div style=\"display:inline-table;padding-left:3px\"><a ng-if=\"onSelect\" href=\"\" ng-click=\"onSelect(c)\" style=\"text-decoration:none;vertical-align:middle\"><span class=\"glyphicon glyphicon-info-sign\" title=\"Select concept (ENTER)\"></span></a> <a ng-if=\"canRemove\" href=\"\" ng-click=\"removeConcept($index)\" style=\"text-decoration:none;vertical-align:middle\"><span class=\"glyphicon glyphicon-trash\" title=\"Remove concept (DEL)\"></span></a></div></div></li></ul>"
  );


  $templateCache.put('template/skos-tree.html',
    "<div style=\"\" class=\"skos-tree\"><p class=\"set\" ng-if=\"!tree.topConcepts\"><span ng-if=\"tree.notation.length\" class=\"notation\" style=\"white-space:nowrap\">{{tree.notation[0]}}</span> <span skos-label=\"tree.prefLabel\" lang=\"{{language}}\" style=\"padding-left:3px\"></span></p><ul><li ng-repeat=\"n in tree.narrower ? tree.narrower : tree.topConcepts\"><span skos-tree=\"n\" language=\"language\"></span></li></ul></div>"
  );

}]);
