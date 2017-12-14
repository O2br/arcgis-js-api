// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define("require exports esri/kernel module esri/geometry/Geometry esri/geometry/Polygon esri/geometry/Polyline esri/geometry/Point esri/geometry/Extent esri/geometry/Multipoint esri/workers/WorkerClient dojo/Deferred".split(" "),function(C,Q,K,L,w,D,E,B,F,G,M,k){function N(b){if(void 0===B.fromJson){if(void 0!==b.x&&void 0!==b.y)return new B(b);if(void 0!==b.paths)return new E(b);if(void 0!==b.rings)return new D(b);if(void 0!==b.points)return new G(b);if(void 0!==b.xmin&&void 0!==b.ymin&&void 0!==
b.xmax&&void 0!==b.ymax)return new F(b)}else{if(void 0!==b.x&&void 0!==b.y)return B.fromJson(b);if(void 0!==b.paths)return E.fromJson(b);if(void 0!==b.rings)return D.fromJson(b);if(void 0!==b.points)return G.fromJson(b);if(void 0!==b.xmin&&void 0!==b.ymin&&void 0!==b.xmax&&void 0!==b.ymax)return F.fromJson(b)}}function u(b,a){var e;if(null==b||void 0===b)return b;if("number"===typeof b)return b;var c=b.toString();if(""===c)return null;if(2==a){if(e=O[c],void 0!==e)return e}else if(0==a){e=H[c];if(void 0!==
e)return e;e=I[b];if(void 0!==e)return e}else if(3==a&&(e=H[c],void 0!==e))return e;if(1==a&&(e=I[b],void 0!==e))return e;if(!0===/^\d+$/.test(c))return parseInt(c);throw Error("Unrecognised Unit Type");}function z(b){if(void 0!==b&&null!==b)switch(b){case "loxodrome":return 1;case "great-elliptic":return 2;case "normal-section":return 3;case "shape-preserving":return 4}return 0}function g(b){if(null===b||void 0===b)return null;if(x)switch(b.type){case "point":return{x:b.x,y:b.y,z:b.z,m:b.m};case "multipoint":return{points:b.points,
hasZ:b.hasZ,hasM:b.hasM};case "polyline":return{paths:b.paths,hasZ:b.hasZ,hasM:b.hasM};case "polygon":return{rings:b.rings,hasZ:b.hasZ,hasM:b.hasM};case "extent":return{xmin:b.xmin,ymin:b.ymin,xmax:b.xmax,ymax:b.ymax,zmin:b.zmin,zmax:b.zmax,mmin:b.mmin,mmax:b.mmax}}else switch(b.type){case "point":return{x:b.x,y:b.y};case "multipoint":return{points:b.points};case "polyline":return{paths:b.paths};case "polygon":return{rings:b.rings};case "extent":return{xmin:b.xmin,ymin:b.ymin,xmax:b.xmax,ymax:b.ymax}}return null}
function q(b,a){if(null===b)return null;var e=N(b);x?e.set("spatialReference",a):e.setSpatialReference(a);return e}function l(b){return null==b||void 0===b?null:-1!=b.wkid&&null!==b.wkid&&void 0!==b.wkid?{wkid:b.wkid}:""!==b.wkt&&void 0!==b.wkt&&null!==b.wkt?{wkt:b.wkt}:null}function A(b,a,e){var c=new k,d=a.spatialReference;h.a({action:b,geoma:g(a),geomb:g(e),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(q(a.result,d))},function(a){c.reject(a)});
return c.promise}function v(b,a,e){var c=new k;h.a({action:b,geoma:g(a),geomb:g(e),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise}var x=0==K.version.indexOf("4."),J;(function(b){b[b.Linear=0]="Linear";b[b.Angular=1]="Angular";b[b.Area=2]="Area";b[b.LinearOrAngular=3]="LinearOrAngular"})(J||(J={}));var H={feet:9002,kilometers:9036,meters:9001,miles:9035,"nautical-miles":9030,yards:9096},
O={acres:109402,ares:109463,hectares:109401,"square-feet":109405,"square-kilometers":109414,"square-meters":109404,"square-miles":109413,"square-yards":109442},I={degrees:9102,radians:9101},P=function(){function b(){this.c=!0;this.i=null}b.prototype.A=function(a){var b=this;this.i=new M;this.i.setWorker(this.l(),function(){b.c=!1;a()})};b.prototype.l=function(){return C.B?C.B("./geometryenginewebworker"):L.id.replace(/\/[^\/]*$/ig,"/")+"./geometryenginewebworker"};return b}(),h=function(){function b(){}
b.a=function(a){var e=new k;b.h.push({task:a,d:e});b.f();return e.promise};b.f=function(){if(0<b.h.length){for(var a=null,e=0;e<b.b.length;e++)if(!1===b.b[e].c){a=b.b[e];break}null===a&&b.b.length<b.g&&(e=new P,b.b.push(e),e.A(function(){b.f()}));if(null!==a){var c=this.h.shift();a.c=!0;a.i.postMessage(c.task).then(function(e){a.c=!1;try{c.d.resolve(e)}catch(f){}b.f()},function(e){a.c=!1;try{c.d.reject(e)}catch(f){}b.f()})}}};b.b=[];b.h=[];b.g=4;return b}();return function(){function b(){}b._removeAllWorkers=
function(){h.b=[]};b._setMaxWorkers=function(a){b._removeAllWorkers();h.g=a};b._getMaxWorkers=function(){return h.g};b._getNumWorkers=function(){return h.b.length};b.extendedSpatialReferenceInfo=function(a){var b=new k;h.a({action:"extendedspatialreferenceinfo",spatialReference:l(a)}).then(function(a){0===a.status?b.reject(Error(a.error.message)):b.resolve(a.result)},function(a){b.reject(a)});return b.promise};b.equals=function(a,b){return null===a&&null!==b||null===b&&null!==a?!1:v("equals",a,b)};
b.intersects=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("intersects",a,b)};b.touches=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("touches",a,b)};b.within=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("within",a,b)};b.disjoint=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("disjoint",a,b)};b.overlaps=function(a,b){if(null===a||null===
b)throw Error("Illegal Argument Exception");return v("overlaps",a,b)};b.crosses=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("crosses",a,b)};b.contains=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("contains",a,b)};b.isSimple=function(a){return v("issimple",a,null)};b.clip=function(a,b){return A("clip",a,b)};b.simplify=function(a){var b=new k,c=a.spatialReference;h.a({action:"simplify",geoma:g(a),spatialReference:l(a.spatialReference)}).then(function(a){0===
a.status?b.reject(Error(a.error.message)):b.resolve(q(a.result,c))},function(a){b.reject(a)});return b.promise};b.rotate=function(a,b,c){var d=new k,f=a.spatialReference;if(void 0===c||null===c)switch(a.type){case "point":c=a;break;case "extent":c=x?a.get("center"):a.getCenter();break;default:c=x?a.get("extent").get("center"):a.getExtent().getCenter()}h.a({action:"rotate",geoma:g(a),spatialReference:l(a.spatialReference),angle:b,rotpt:g(c)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):
d.resolve(q(a.result,f))},function(a){d.reject(a)});return d.promise};b.flipHorizontal=function(a,b){var c=new k,d=a.spatialReference;if(void 0===b||null===b)switch(a.type){case "point":b=a;break;case "extent":b=x?a.get("center"):a.getCenter();break;default:b=x?a.get("extent").get("center"):a.getExtent().getCenter()}h.a({action:"fliph",geoma:g(a),spatialReference:l(a.spatialReference),flippt:g(b)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(q(a.result,d))},function(a){c.reject(a)});
return c.promise};b.flipVertical=function(a,b){var c=new k,d=a.spatialReference;if(void 0===b||null===b)switch(a.type){case "point":b=a;break;case "extent":b=x?a.get("center"):a.getCenter();break;default:b=x?a.get("extent").get("center"):a.getExtent().getCenter()}h.a({action:"flipv",geoma:g(a),spatialReference:l(a.spatialReference),flippt:g(b)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(q(a.result,d))},function(a){c.reject(a)});return c.promise};b.distance=function(a,
b,c){var d=new k;h.a({action:"distance",geoma:g(a),geomb:g(b),spatialReference:l(a.spatialReference),distanceunits:u(c,3)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(a.result)},function(a){d.reject(a)});return d.promise};b.relate=function(a,b,c){var d=new k;h.a({action:"relate",geoma:g(a),geomb:g(b),relation:c,spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(a.result)},function(a){d.reject(a)});return d.promise};
b.nearestCoordinate=function(a,b,c){var d=new k,f=a.spatialReference;h.a({action:"nearestcoord",geoma:g(a),geomb:g(b),spatialReference:l(a.spatialReference),testinterior:void 0===c?!0:c}).then(function(a){0===a.status?d.reject(Error(a.error.message)):(a.result.coordinate=q(a.result.coordinate,f),d.resolve(a.result))},function(a){d.reject(a)});return d.promise};b.nearestVertex=function(a,b){var c=new k,d=a.spatialReference;h.a({action:"nearestvertex",geoma:g(a),geomb:g(b),spatialReference:l(a.spatialReference)}).then(function(a){0===
a.status?c.reject(Error(a.error.message)):(a.result.coordinate=q(a.result.coordinate,d),c.resolve(a.result))},function(a){c.reject(a)});return c.promise};b.nearestVertices=function(a,b,c,d){var f=new k,p=a.spatialReference;h.a({action:"nearestvertices",geoma:g(a),geomb:g(b),spatialReference:l(a.spatialReference),searchradius:c,maxreturn:d}).then(function(a){if(0===a.status)f.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b].coordinate=q(a.result[b].coordinate,p);f.resolve(a.result)}},
function(a){f.reject(a)});return f.promise};b.cut=function(a,b){var c=new k,d=a.spatialReference;h.a({action:"cut",geoma:g(a),geomb:g(b),spatialReference:l(a.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=q(a.result[b],d);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.generalize=function(a,b,c,d){var f=new k,p=a.spatialReference;h.a({action:"generalize",geoma:g(a),maxdeviation:b,removedegenerateparts:c,
maxdeviationunit:u(d,3),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?f.reject(Error(a.error.message)):f.resolve(q(a.result,p))},function(a){f.reject(a)});return f.promise};b.densify=function(a,b,c){var d=new k,f=a.spatialReference;h.a({action:"densify",geoma:g(a),maxsegmentlength:b,maxsegmentlengthunit:u(c,3),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(q(a.result,f))},function(a){d.reject(a)});return d.promise};
b.geodesicDensify=function(a,b,c,d){void 0===d&&(d=0);var f=new k,p=a.spatialReference;h.a({action:"geodensify",geoma:g(a),maxsegmentlength:b,maxsegmentlengthunit:u(c,3),spatialReference:l(a.spatialReference),curveType:d}).then(function(a){0===a.status?f.reject(Error(a.error.message)):f.resolve(q(a.result,p))},function(a){f.reject(a)});return f.promise};b.intersect=function(a,e){return a instanceof w?A("intersect",a,e):b.u(a,e)};b.u=function(a,b){for(var c=new k,d=[],f=0;f<a.length;f++)d.push(g(a[f]));
var p=b.spatialReference;h.a({action:"intersectmany",geom:g(b),geometries:d,spatialReference:l(b.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=q(a.result[b],p);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.difference=function(a,e){return a instanceof w?A("difference",a,e):b.s(a,e)};b.s=function(a,b){for(var c=new k,d=[],f=0;f<a.length;f++)d.push(g(a[f]));var p=b.spatialReference;h.a({action:"differencemany",
geom:g(b),geometries:d,spatialReference:l(b.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=q(a.result[b],p);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.symmetricDifference=function(a,e){return a instanceof w?A("symdifference",a,e):b.w(a,e)};b.w=function(a,b){for(var c=new k,d=[],f=0;f<a.length;f++)d.push(g(a[f]));var p=b.spatialReference;h.a({action:"symdifferencemany",geom:g(b),geometries:d,
spatialReference:l(b.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=q(a.result[b],p);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.union=function(a,b){void 0===b&&(b=null);var c=new k,d=[];if(null===a)return c.resolve(null),c.promise;a instanceof w&&(a=[a],null!==b&&a.push(b));if(0===a.length)return c.resolve(null),c.promise;for(var f=0;f<a.length;f++)d.push(g(a[f]));var p=a[0].spatialReference;
h.a({action:"unionmany",geometries:d,spatialReference:l(p)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(q(a.result,p))},function(a){c.reject(a)});return c.promise};b.buffer=function(a,e,c,d){void 0===d&&(d=!1);if(a instanceof w){var f=new k,p=a.spatialReference;h.a({action:"buffer",geoma:g(a),spatialReference:l(a.spatialReference),distance:e,unit:u(c,3),geodesic:!1,geodesicmaxdeviation:NaN,geodesiccurvetype:0}).then(function(a){0===a.status?f.reject(Error(a.error.message)):
f.resolve(q(a.result,p))},function(a){f.reject(a)});return f.promise}if("[object Array]"!==Object.prototype.toString.call(e)){for(var m=[],n=0;n<a.length;n++)m.push(e);e=m}if(e.length!=a.length){if(0==e.length)throw Error("Illegal Argument Exception");for(var m=[],r=0,n=0;n<a.length;n++)void 0===e[n]?m.push(r):(m.push(e[n]),r=e[n]);e=m}return b.j(a,e,c,!1,d,"geodesic",NaN)};b.geodesicBuffer=function(a,e,c,d,f,p){if(a instanceof w){var m=new k;void 0===f&&(f=NaN);var n=a.spatialReference;h.a({action:"buffer",
geoma:g(a),spatialReference:l(a.spatialReference),distance:e,unit:u(c,0),geodesic:!0,geodesicmaxdeviation:f,geodesiccurvetype:z(d)}).then(function(a){0===a.status?m.reject(Error(a.error.message)):m.resolve(q(a.result,n))},function(a){m.reject(a)});return m.promise}if("[object Array]"!==Object.prototype.toString.call(e)){for(var r=[],t=0;t<a.length;t++)r.push(e);e=r}if(e.length!=a.length){if(0==e.length)throw Error("Illegal Argument Exception");for(var r=[],y=0,t=0;t<a.length;t++)void 0===e[t]?r.push(y):
(r.push(e[t]),y=e[t]);e=r}return b.j(a,e,c,!0,d,f,p)};b.j=function(a,b,c,d,f,p,m){var n=new k,r=[];void 0===m&&(m=NaN);if(null===a||0===a.length)return n.resolve(null),n.promise;for(var t=0;t<a.length;t++)r.push(g(a[t]));c=d?u(c,0):u(c,3);var y=a[0].spatialReference;h.a({action:"buffermany",geometries:r,spatialReference:l(y),distances:b,tounionresults:f,unit:c,geodesic:d,geodesicmaxdeviation:m,geodesiccurvetype:z(p)}).then(function(a){if(0===a.status)n.reject(Error(a.error.message));else{for(var b=
0;b<a.result.length;b++)a.result[b]=q(a.result[b],y);n.resolve(a.result)}},function(a){n.reject(a)});return n.promise};b.convexHull=function(a,e){void 0===e&&(e=!1);if(a instanceof w){var c=new k,d=a.spatialReference;h.a({action:"convexhull",geoma:g(a),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(q(a.result,d))},function(a){c.reject(a)});return c.promise}return b.o(a,e)};b.o=function(a,b){for(var c=new k,d=[],f=0;f<a.length;f++)d.push(g(a[f]));
var l=0<a.length?a[0].spatialReference:null;h.a({action:"convexhullmany",geometries:d,merge:b}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=q(a.result[b],l);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.offset=function(a,e,c,d,f,p){var m=0;if(null!=d&&void 0!=d)switch(d){case "round":m=0;break;case "bevel":m=1;break;case "miter":m=2;break;case "square":m=3}if(a instanceof w){var n=new k,r=a.spatialReference;
h.a({action:"offset",geoma:g(a),spatialReference:l(a.spatialReference),distance:e,joins:m,bevelratio:f,flattenerror:p,offsetunit:u(c,3)}).then(function(a){0===a.status?n.reject(Error(a.error.message)):n.resolve(q(a.result,r))},function(a){n.reject(a)});return n.promise}return b.v(a,e,c,m,f,p)};b.v=function(a,b,c,d,f,p){for(var m=new k,n=[],r=0;r<a.length;r++)n.push(g(a[r]));var t=0<a.length?a[0].spatialReference:null;h.a({action:"offsetmany",geometries:n,spatialReference:l(t),distance:b,joins:d,bevelratio:f,
offsetunit:u(c,3),flattenerror:p}).then(function(a){if(0===a.status)m.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=q(a.result[b],t);m.resolve(a.result)}},function(a){m.reject(a)});return m.promise};b.planarArea=function(a,b){var c=new k;h.a({action:"area",geoma:g(a),unit:u(b,2),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.planarLength=function(a,
b){var c=new k;h.a({action:"length",geoma:g(a),unit:u(b,3),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.geodesicArea=function(a,b,c){var d=new k;h.a({action:"geodesicarea",geoma:g(a),unit:u(b,2),geodesiccurvetype:z(c),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(a.result)},function(a){d.reject(a)});return d.promise};
b.geodesicLength=function(a,b,c){var d=new k;h.a({action:"geodesiclength",geoma:g(a),unit:u(b,0),geodesiccurvetype:z(c),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(a.result)},function(a){d.reject(a)});return d.promise};return b}()});
