// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","dojo/date/locale","../../../core/Error","../../../core/lang","../../../core/Logger","../../../core/promiseUtils","../../../geometry/support/scaleUtils","./geometryUtils"],function(e,r,t,i,n,a,u,l,o){function s(e){var r=e.exactMatch,t=void 0!==r&&r,n=e.location,a=e.maxResults,o=e.spatialReference,s=e.source,d=e.sourceIndex,p=e.suggestResult,F=e.view,x=s.featureLayer,b=s.filter,j=s.zoomScale,I=F&&F.scale,R=f(s,F);return v(x).then(function(){var e=y(s);if(!h(x,e))return q.error("invalid-field: displayField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","displayField is invalid."));var r=x.get("popupTemplate.requiredFields"),f=r&&r.length?r:null,v=s.outFields||f||[e],P=c(v);if(-1!==v.indexOf(x.objectIdField)||P||v.push(x.objectIdField),!(P||m(x,v)))return q.error("invalid-field: outField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","outField is invalid."));var E=x.createQuery(),O=s.searchQueryParams;if(O&&E.set(O),o){E.outSpatialReference=o;var S=l.getMetersPerUnitForSR(o);S&&(E.maxAllowableOffset=S)}if(E.returnGeometry=!0,v&&(E.outFields=v),n)E.geometry=n;else if(p.key)E.objectIds=[parseInt(p.key,10)];else{var D=s.searchFields||[e],T=m(x,D);if(!T)return q.error("invalid-field: search field is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","search field is invalid."));g(x)&&(E.num=a),R&&(E.geometry=R);var k=p.text.trim();if(!k)return u.resolve();var C=s.prefix,N=void 0===C?"":C,Q=s.suffix,A=void 0===Q?"":Q,G=w(""+N+k+A),M=L(G,x,D,b,t);if(!M)return u.resolve();E.where=M}return x.queryFeatures(E).then(function(r){return U(r,F,s,d,e,I,j)})})}function d(e){var r=e.source,t=e.spatialReference,n=e.view,a=e.suggestTerm,l=e.maxSuggestions,o=e.sourceIndex,s=r.featureLayer,d=r.filter,p=f(r,n);return v(s).then(function(){if(!g(s))return u.resolve();var e=y(r),n=r.searchFields||[e],f=[];r.suggestionTemplate?r.suggestionTemplate.replace(T,function(e,r){return f.push(r),e}):f.push(e);var v=c(f);-1!==f.indexOf(s.objectIdField)||v||f.push(s.objectIdField);var F=h(s,e),x=v||m(s,f),b=m(s,n);if(!F)return q.error("invalid-field: displayField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","displayField is invalid."));if(!x)return q.error("invalid-field: outField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","outField is invalid."));if(!b)return q.error("invalid-field: search field is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","search field is invalid."));var j=s.createQuery(),I=r.suggestQueryParams;I&&j.set(I),j.outSpatialReference=t,j.returnGeometry=!1,j.num=l,j.outFields=f,p&&(j.geometry=p);var R=a.trim();if(!R)return u.resolve();var P=r.prefix,E=void 0===P?"":P,S=r.suffix,U=void 0===S?"":S,D=w(""+E+R+U),k=L(D,s,n,d,!1);return k?(j.where=k,s.queryFeatures(j).then(function(t){return O(t,r,o,e)})):u.resolve()})}function f(e,r){var t=e.filter,i=e.searchExtent,n=e.withinViewEnabled,a=r&&r.extent,u=t&&t.geometry,l=n&&a?a:void 0;return u||i||l}function c(e){return e&&-1!==e.indexOf("*")}function v(e){return e?e.load().then(u.resolve).catch(u.reject):u.resolve()}function g(e){return e&&!!e.get("capabilities.query.supportsPagination")}function p(e){var r="";if(e){var t=e.fields;t&&t.some(function(e){if("string"===e.type)return r=e.name,!0})}return r}function y(e){return e.displayField||e.featureLayer.displayField||p(e.featureLayer)}function m(e,r){return!(!e||!r)&&r.every(function(r){return h(e,r)})}function h(e,r){return!!e.getField(r)}function F(e){for(var r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!0;return!1}function x(e,r,t){var i=null,n=e.codedValues;return n&&n.some(function(e){var n=e.name,a=t?n:n.toLowerCase();if((t?r:r.toLowerCase())===a)return i=e.code.toString(),!0}),i}function w(e){return e.replace(/\'/g,"''")}function b(e,r){var t=r&&r.where;return t?"("+e+") AND ("+t+")":e}function j(e,r,t,i,n){var a=r.type,u=r.name;if("string"===a||"date"===a){if(n)return b(u+" = "+t+"'"+e+"'",i);return b("UPPER("+u+") LIKE "+t+"'%"+e.toUpperCase()+"%'",i)}if("oid"===a||"small-integer"===a||"integer"===a||"single"===a||"double"===a){var l=parseFloat(e);return isNaN(l)?null:b(u+" = "+l,i)}return b(u+" = "+e,i)}function I(e,r){return e?" OR ("+r+")":"("+r+")"}function L(e,r,t,i,n){var a="";if(e){var u=D.test(r.url)&&F(e)?"N":"";t&&t.forEach(function(t){var l=r.getField(t),o="function"==typeof r.getFieldDomain&&r.getFieldDomain(t),s=o&&"coded-value"===o.type?x(o,e,n):null,d=s||e||null;if(null!==d){var f=j(d,l,u,i,n);f&&(a+=I(a,f))}})}return a}function R(e,r){var t=null,i=e.codedValues;return i&&i.length&&i.some(function(e){if(e.code===r)return t=e.name,!0}),t}function P(e,r,i,a){var u=e.layer,l=e.attributes,o="function"==typeof u.getFieldDomain&&u.getFieldDomain(i);if(r)return n.substitute(l,r);if(i&&e.hasOwnProperty("attributes")&&l.hasOwnProperty(i)){var s=l[i],d=u.getField(i);return o&&"coded-value"===o.type?R(o,s):d&&"date"===d.type?t.format(new Date(s)):s}return""}function E(e,r,t,i){var n=e.layer,a=e.attributes,u=n.objectIdField,l=a[u];return{text:P(e,r.suggestionTemplate,i,r),key:l,sourceIndex:t}}function O(e,r,t,i){return e.features.map(function(e){return E(e,r,t,i)})}function S(e,r,t,i,n,a,u){var l=e.clone(),s=e.layer,d=s&&s.objectIdField,f=d&&e.attributes[d],c=P(e,t.searchTemplate,n,t),v=o.createExtentFromGeometry(l.geometry,r,a);return{extent:u?o.scaleExtent(v.clone(),r,u):v,feature:l,key:f,name:c,sourceIndex:i}}function U(e,r,t,i,n,a,u){return e.features.map(function(e){return S(e,r,t,i,n,a,u)})}Object.defineProperty(r,"__esModule",{value:!0});var D=/https?:\/\/services.*\.arcgis\.com/i,T=/(?:\{([^}]+)\})/g,q=a.getLogger("esri.widgets.Search.support.featureLayerUtils");r.getResults=s,r.getSuggestions=d});