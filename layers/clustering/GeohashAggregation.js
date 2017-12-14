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

define(["dojo/has","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","../../kernel","../../Evented","../../geometry/Point","../../geometry/Extent","../../geometry/mathUtils","../../support/expressionUtils","../../core/timerUtils","../support/attributeUtils","./geohashUtils","./statUtils"],function(t,e,s,i,a,n,l,r,u,h,o,c,d,f){var _="_geohash",p=e(n,{loaded:!1,map:null,layer:null,lod:null,tolerance:null,clusterMode:null,clusterRadius:null,sortEnabled:!0,filterEnabled:!0,bufferEnabled:!0,updateEnabled:!0,clusters:null,clustersEnabled:!0,statisticInfos:null,defaults:{lod:1,tolerance:0,clusterMode:"auto",clusterRadius:80,sortEnabled:!0,filterEnabled:!0,bufferEnabled:!0,updateEnabled:!0},_eventHandles:null,_updateHandle:null,_cellIndex:null,_globalIndex:null,_perfProfile:null,_cellSizeScaleFactor:1.5,_extentScaleFactor:1.25,_maxGeohashLength:12,_minClusterRadius:15,_levelChange:!0,_clusterFieldPrefix:"cluster_",_mapLevelChange:!1,constructor:function(t){this._update=s.hitch(this,this._update),this._eventHandles=[],this._globalIndex={numFeatures:null,fullExtent:null,lodStats:null},this._perfProfile={lastIndex:{total:null,numFeatures:0},lastUpdate:{cells:null,clusters:null,total:null}},this.clusters=[],this.map=t.map,this.layer=t.layer,this.setLod(t.lod),this.setTolerance(t.tolerance),this.setClusterMode(t.clusterMode),this.setClusterRadius(t.clusterRadius),this.setSortEnabled(t.sortEnabled),this.setFilterEnabled(t.filterEnabled),this.setBufferEnabled(t.bufferEnabled),this.setUpdateEnabled(t.updateEnabled),this.setStatisticInfos(t.statisticInfos),this._load(),this.loaded?this._startup():this._eventHandles.push(this.on("load",s.hitch(this,this._startup)))},destroy:function(t){this._displayFeatures(!0,t),i.forEach(this._eventHandles,function(t){t.remove()}),o.clearTimeout(this._updateHandle),this.map=this.layer=this.clusters=null,this._eventHandles=this._updateHandle=null,this._cellIndex=this._globalIndex=null},setLod:function(t){var e=this.lod;this.lod=t||this.defaults.lod,e!==this.lod&&this.update()},setTolerance:function(t){var e=this.tolerance;this.tolerance=t||this.defaults.tolerance,e!==this.tolerance&&this.update()},setClusterMode:function(t){var e=this.clusterMode;this.clusterMode=t||this.defaults.clusterMode,this._evalClusterParams(),e!==this.clusterMode&&this.update()},setClusterRadius:function(t){var e=this.clusterRadius;this.clusterRadius=null!=t?t:this.defaults.clusterRadius,this._evalClusterParams(),e!==this.clusterRadius&&this.update()},setSortEnabled:function(t){var e=this.sortEnabled;this.sortEnabled=null!=t?!!t:this.defaults.sortEnabled,e!==this.sortEnabled&&this.update()},setFilterEnabled:function(t){var e=this.filterEnabled;this.filterEnabled=null!=t?!!t:this.defaults.filterEnabled,e!==this.filterEnabled&&this.update()},setBufferEnabled:function(t){var e=this.bufferEnabled;this.bufferEnabled=null!=t?!!t:this.defaults.bufferEnabled,e!==this.bufferEnabled&&this.update()},setUpdateEnabled:function(t){var e=this.updateEnabled;this.updateEnabled=null!=t?!!t:this.defaults.updateEnabled,this.updateEnabled&&e!==this.updateEnabled&&(this._mapLevelChange=!0,this.update())},setStatisticInfos:function(t){this.statisticInfos=t||[],this.loaded&&this._applyStatInfos(this.statisticInfos)},update:function(){this.loaded&&null==this._updateHandle&&(this._updateHandle=o.setTimeout(this._update,o.priority.HIGH))},isUpdateScheduled:function(){return null!=this._updateHandle},getCell:function(t){return this._cellIndex[t.length][t]},getCluster:function(t){var e;return i.some(this.clusters,function(s){return i.indexOf(s.geohashes,t)>-1&&(e=s),!!e}),e},getCellsInCluster:function(t){var e=[];return i.forEach(t&&t.geohashes,function(t){var s=this.getCell(t);s&&e.push(s)},this),e},getFeaturesInCluster:function(t){var e=[],s=this.getCellsInCluster(t);return i.forEach(s,function(t){Array.prototype.push.apply(e,t.features)}),e},getCurrentLodStats:function(){var t=this._globalIndex.lodStats;return t&&t[this.lod]},getNumFeatures:function(){return this._globalIndex.numFeatures},getFullExtent:function(){var t=this._globalIndex.fullExtent;return t&&t.xmin!==1/0?new r(t):null},_load:function(){this._displayFeatures(!1),this._checkLoadStatus(),this.map.loaded||this._eventHandles.push(this.map.on("load",s.hitch(this,this._checkLoadStatus))),this.layer.loaded||this._eventHandles.push(this.layer.on("load",s.hitch(this,this._checkLoadStatus)))},_checkLoadStatus:function(){if(this.map.loaded&&this.layer.loaded){var t;if("esriGeometryPoint"!==this.layer.geometryType)t=new Error("GeohashAggregation is supported only for points");else{var e=this.map.spatialReference;e.isWebMercator()||4326===e.wkid||(t=new Error("GeohashAggregation is supported only when map spatial reference is WGS84 or WebMercator"))}t?(this.loadError=t,this.emit("load-error",{error:t})):(this.loaded=!0,this.emit("load"))}},_startup:function(){this._evalUpdateStatus(),this._processFeatures(),this._processExtentChange(),this._eventHandles.push(this.layer.on("update-end",s.hitch(this,this._processFeatures)),this.layer.on("edits-complete",s.hitch(this,this._processFeatures)),this.layer.on("graphics-clear",s.hitch(this,this._processFeatures)),this.layer.on("suspend",s.hitch(this,this._evalUpdateStatus)),this.layer.on("resume",s.hitch(this,this._evalUpdateStatus)),this.map.on("extent-change",s.hitch(this,this._processExtentChange)))},_processFeatures:function(){this._indexFeatures(),this.update()},_evalUpdateStatus:function(){this.setUpdateEnabled(!this.layer.suspended)},_processExtentChange:function(t){this._mapLevelChange=!(!t||!t.levelChange),this._evalClusterParams(),this.update()},_update:function(){if(this._updateHandle=null,this.updateEnabled){if(this.emit("update-start"),this.clustersEnabled){var t=this.map.geographicExtent;if(t){var e=this._getIntersectingCells(t),s=this._getClusters(e.cells,t);this.clusters=s.clusters,this._applyStatInfosToClusters();var i=e.profile,a=s.profile,n=i.total+a.total;i.total=this._getElapsedTime(i.total),a.total=this._getElapsedTime(a.total);var l=this._perfProfile.lastUpdate={};l.cells=i,l.clusters=a,l.total=this._getElapsedTime(n)}}else this.clusters=[],this._perfProfile.lastUpdate=null;var r=this._mapLevelChange;this._mapLevelChange=!1,this.emit("update-end",{levelChange:this._levelChange,mapLevelChange:r})}},_displayFeatures:function(t,e){var s=this.layer,i=!t;s.suspendGraphics(i),e!==!1&&(i?s.clearNodes():s.redraw())},_indexFeatures:function(){var t=this._getTime();this._initializeIndexing();var e=0,s=this._globalIndex.fullExtent;i.forEach(this.layer.graphics,function(t){if(t.visible){var i,a=t.geometry,n=this._getLngLat(a);n&&(i=a.getCacheValue(_),void 0===i&&(i=d.pointToGeohash(n),a.setCacheValue(_,i||null))),i&&(this._addGeohashToIndex(i,t,n),e++,this._updateExtent(s,n))}},this),this._applyStatInfosToIndex(),this._globalIndex.numFeatures=e;for(var a=this._globalIndex.lodStats,n=1;n<=this._maxGeohashLength;n++)a[n]=this._getLODStats(n,e);this._perfProfile.lastIndex.total=this._getElapsedTime(t,this._getTime()),this._perfProfile.lastIndex.numFeatures=e,this.emit("index-complete")},_initializeIndexing:function(){this._globalIndex={numFeatures:0,fullExtent:{xmin:1/0,ymin:1/0,xmax:-(1/0),ymax:-(1/0)},lodStats:{}};for(var t=this._cellIndex=[],e=1;e<=this._maxGeohashLength;e++)t[e]={}},_getLngLat:function(t){if(t){var e=t.getLongitude(),s=t.getLatitude();t=null!=e&&null!=s?{x:e,y:s}:null}return t},_addGeohashToIndex:function(t,e,s){for(var i=this._cellIndex,a="",n=0;n<this._maxGeohashLength;n++){a+=t[n];var l=i[a.length],r=l[a];r||(r=l[a]={count:0,centroid:{x:null,y:null},extent:{xmin:1/0,ymin:1/0,xmax:-(1/0),ymax:-(1/0)},features:[],geohash:a,statistics:null}),this._updateItem(r,1,s,!0),r.features.push(e)}},_getLODStats:function(t,e){var s=this._cellIndex[t],i=0,a=1/0,n=-(1/0),l=null;for(var r in s){var u=s[r];i++,u.count<a&&(a=u.count),u.count>n&&(n=u.count)}return i>0&&(l=e/i,l=Number(l.toFixed(2))),{lod:t,count:i,min:a===1/0?null:a,max:n===-(1/0)?null:n,avg:l}},_evalClusterParams:function(){if(this.loaded&&"auto"===this.clusterMode){var t=this._getClusterParams(this.map.getResolutionInMeters(),this.clusterRadius,this._minClusterRadius);this._levelChange=this.lod!==t.lod,this.lod=t.lod,this.tolerance=t.tolerance}},_getClusterParams:function(t,e,s){s>e&&(e=s);var i,a=Math.ceil(t*e),n=this._getClosestLODRange(a),l=n.max;do{var r=this._getCellSize(l);i=a>=this._cellSizeScaleFactor*r||1===r,i||(l+=1)}while(!i);var u=a/this._getCellSize(l);return{lod:l,tolerance:a,multiplier:Number(u.toFixed(2))}},_getClosestLODRange:function(t){for(var e,s,i=this._maxGeohashLength;i>=1;i--){var a=this._getCellSize(i);if(a>=t){e=i;break}}return null==e&&(e=1),s=e+1,s>this._maxGeohashLength&&(s=this._maxGeohashLength),{min:e,max:s}},_getCellSize:function(t){var e=d.getCellSizeInMeters(t);return Math.ceil(Math.min(e.width,e.height))},_sorter:function(t,e){var s=t.centroid,i=e.centroid;return t.count>e.count?-1:t.count<e.count?1:s.x>i.x?-1:s.x<i.x?1:0},_getIntersectingCells:function(t){var e=this._getTime();t=t.expand(this._extentScaleFactor);var s=d.getIntersecting(t,this.lod,this.bufferEnabled?this.tolerance:0),a=this._getTime(),n=[],l=this.tolerance,r=this.sortEnabled;i.forEach(s,function(t){var e=this.getCell(t);e&&n.push(e)},this),l&&r&&n.sort(this._sorter);var u=this._getTime();return{cells:n,profile:{findCells:this._getElapsedTime(e,a),scanAndSortCells:this._getElapsedTime(a,u),total:u-e}}},_getClusters:function(t,e){var s=this._getTime(),a=[],n={},l={findCells:0};i.forEach(t,function(t,e){var s=this._createCluster(t,n,l);s&&a.push(s)},this),this._markIntersecting(a,e),this.filterEnabled&&(a=this._getIntersectingClusters(a));var r=this._getTime();return{clusters:a,profile:{findCellsInCluster:this._getElapsedTime(l.findCells),total:r-s}}},_markIntersecting:function(t,e){var s=e.normalize();i.forEach(t,function(t){var e=t.centroid.x,a=t.centroid.y;t.isIntersecting=i.some(s,function(t){return e>=t.xmin&&e<=t.xmax&&a>=t.ymin&&a<=t.ymax})})},_getIntersectingClusters:function(t){return i.filter(t,function(t){return t.isIntersecting})},_createCluster:function(t,e,s){if(!e[t.geohash]){var a=[{cell:t,distance:0}];if(this.tolerance){var n=this._getTime(),l=d.getNeighborsWithinDistance(t.centroid,this.lod,this.tolerance);s.findCells+=this._getTime()-n,i.forEach(l,function(e){if(e!==t.geohash){var s=this.getCell(e);if(s){var i=this._calculateDistance(t.centroid,s.centroid);i<=this.tolerance&&a.push({cell:s,distance:i})}}},this)}return this._mergeCells(a,e)}},_calculateDistance:function(t,e){return u.getLength(d.geographicToWebMercator(t),d.geographicToWebMercator(e))},_mergeCells:function(t,e){var s=this._initializeCluster({},t[0].cell.geohash);return i.forEach(t,function(t){var i=t.cell,a=i.geohash,n=t.distance,l=e[a];if(l){if(!(n<l.distance))return;this._removeCellFromCluster(a,e)}e[a]={cluster:s,distance:n},this._updateItem(s,i.count,i.centroid),s.geohashes.push(a)},this),s},_removeCellFromCluster:function(t,e){var s=e[t].cluster;delete e[t];var a=i.indexOf(s.geohashes,t);a>-1&&s.geohashes.splice(a,1),this._reevaluateCluster(s)},_reevaluateCluster:function(t){var e=t.geohashes;t=this._initializeCluster(t,t.primary),i.forEach(e,function(e){var s=this.getCell(e);s&&(this._updateItem(t,s.count,s.centroid),t.geohashes.push(e))},this)},_initializeCluster:function(t,e){return t.count=0,t.centroid=new l(null,null),t.geohashes=[],t.primary=e,t.statistics=null,t},_applyStatInfos:function(t){t=this._getValidStatInfos(t),this._applyStatInfosToIndex(t),this._applyStatInfosToClusters(t)},_getValidStatInfos:function(t){var e=[];return i.forEach(t,function(t){var s=t.attributeInfo,i=t.statisticType,a="angle"===s.attributeType;if(f.isSupportedStatisticType(i)&&(!a||"avg"===i)){var n="type"===i,l="arithmetic"===s.rotationType;e.push({attributeCache:c.createAttributeCache(s,n),identifier:f.getStatisticId(s,i),statFunctions:f.getStatisticFunctions(i),isAngular:a,isDate:"date"===s.attributeType,isArithmetic:l})}}),e},_applyStatInfosToIndex:function(t){t=t||this._getValidStatInfos(this.statisticInfos);var e=this._cellIndex;if(e)for(var s=1;s<=this._maxGeohashLength;s++){var i=e[s];for(var a in i)this._applyStatInfosToCell(i[a],t)}},_applyStatInfosToCell:function(t,e){var s=this._initializeStats(t,e);i.forEach(t.features,function(t){this._calcFeatureStats(t,e,s)},this),this._summarizeStats(t,s,e)},_calcFeatureStats:function(t,e,s){var a=t.attributes;a&&i.forEach(e,function(e){var i=s[e.identifier],a=e.attributeCache,n=a?t._getDataValue(a.attributeInfo,a,h):null;e.statFunctions.updateCellStat(i,n,e)})},_applyStatInfosToClusters:function(t){t=t||this._getValidStatInfos(this.statisticInfos);var e=this._clusterFieldPrefix;i.forEach(this.clusters,function(s){var a=this._initializeStats(s,t);i.forEach(this.getCellsInCluster(s),function(e){this._calcCellStats(e,t,a)},this),this._summarizeStats(s,a,t,e),s.attributes[e+"id"]=s.primary},this)},_calcCellStats:function(t,e,s){var a=t.statistics;i.forEach(e,function(t){var e=t.identifier,i=a[e],n=s[e];t.statFunctions.updateClusterStat(n,i,t)})},_initializeStats:function(t,e){var s=t.statistics={};return i.forEach(e,function(t){s[t.identifier]=t.statFunctions.initialize(t)}),s},_summarizeStats:function(t,e,s,a){var n=t.attributes={};a=a||"",n[a+"count"]=t.count,i.forEach(s,function(t){var s=this._getStatFieldName(t,a),i=e[t.identifier];n[s]=t.statFunctions.summarize(i,t)},this)},_getStatFieldName:function(t,e){return(e||"")+t.identifier},_updateItem:function(t,e,s,i){var a=s.x,n=s.y,l=t.centroid,r=t.count;l.x=(r*l.x+e*a)/(r+e),l.y=(r*l.y+e*n)/(r+e),t.count+=e,i&&this._updateExtent(t.extent,s)},_updateExtent:function(t,e){var s=e.x,i=e.y;s<t.xmin&&(t.xmin=s),s>t.xmax&&(t.xmax=s),i<t.ymin&&(t.ymin=i),i>t.ymax&&(t.ymax=i)},_getTime:function(){return window.performance?window.performance.now():(new Date).getTime()},_getElapsedTime:function(t,e){var s,i,a;return i=null!=t&&null!=e?e-t:t,null!=i&&(a="millisecond",i>=1e3&&(i/=1e3,a="second",i>=60&&(i/=60,a="minute")),s={value:Number(i.toFixed(2)),unit:a}),s}});return t("extend-esri")&&s.setObject("layers.clustering.GeohashAggregation",p,a),p});