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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/executeAsync","../../../../../core/MapPool","../../../../../core/promiseUtils","../../../../../core/SetPool","../../../../../core/accessorSupport/decorators","../../../../../renderers/support/jsonUtils","../../../engine/webgl/displayObjectUtils","../../../engine/webgl/rendererInfoUtils","../../../engine/webgl/TileData","../../../engine/webgl/Utils","./BaseProcessor"],function(e,t,r,i,n,o,s,a,l,u,c,d,p,f,y){function m(e){return e.outline&&"none"!==e.outline.style}function h(e){return e&&("unique-value"===e.type||"class-breaks"===e.type)&&null!==e.backgroundFillSymbol}function g(e,t){f.isMarkerSymbol(e)||f.isLineSymbol(e)?t.add(e):f.isFillSymbol(e)&&(t.add(e),m(e)&&t.add(e.outline))}function v(e,t){if(!t.has(e)){t.set(e,new Set);for(var r=e.text,i=t.get(e),n=r.length,o=0;o<n;o++){var s=r.charCodeAt(o);i.add(s)}}}Object.defineProperty(t,"__esModule",{value:!0});var b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="symbol",t._symbolToMosaicItemMap=new Map,t._visualSetPromises=new Map,t}return r(t,e),t.prototype.destroy=function(){this._visualSetPromises.forEach(function(e,t){e.cancel()}),this._visualSetPromises.clear(),this._symbolToMosaicItemMap.clear(),this.notifyChange("updating")},Object.defineProperty(t.prototype,"queryInfo",{get:function(){var e=this.configuration,t=e.renderer,r=e.definitionExpression,i=e.outFields,n=e.gdbVersion,o=e.historicMoment,s=this.service.geometryType,a=this._getReturnCentroid(this.rendererInfo.renderer),l="esriGeometryPoint"===s||"esriGeometryMultipoint"===s||a,u=l?20:0,c=null,d=t.visualVariables;return d&&d.some(function(e){if("size"===e.type&&e.field&&!e.normalizationField)return c=[e.field+" DESC"],!0}),{definitionExpression:r,orderByFields:c,outFields:i,pixelBuffer:u,returnCentroid:a,returnGeometry:!0,gdbVersion:n,historicMoment:o}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rendererInfo",{get:function(){return this.configuration?d.createRendererInfo(u.fromJSON(this.configuration.renderer),this.tileStore.spatialReference,{fields:this.service.fields}):null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this._visualSetPromises.size>0},enumerable:!0,configurable:!0}),t.prototype.featureSetReady=function(e,t,r){var i=this;if(r||!t||!t.features||0===t.features.length)return void this.remoteClient.invoke("setTileVisuals",{tileKey:e.id,data:null,error:r});var n=s.when(this._getMosaicItems(t.features)).then(function(){return i._createTileData(t.features)}).then(function(t){var r=t.serialize(),n=r.result,o=r.transferList;i._visualSetPromises.delete(e),i.notifyChange("updating"),i.remoteClient.invoke("setTileVisuals",{tileKey:e.id,data:n},o)}).catch(function(t){if(i._visualSetPromises.delete(e),i.notifyChange("updating"),t&&"cancel"!==t.dojoType)return i.remoteClient.invoke("setTileVisuals",{tileKey:e.id,data:null,error:t.message}),s.reject(t)});this._visualSetPromises.set(e,n),this.notifyChange("updating")},t.prototype.featurePatchReady=function(e,t){var r=this;this._getMosaicItems(t.addOrUpdate||[]).then(function(){if(!t.addOrUpdate||0===t.addOrUpdate.length)return r.remoteClient.invoke("patchTileVisuals",{tileKey:e.id,data:{remove:t.remove,addOrUpdate:null}}),s.resolve();var i,o=[],a={},l=t.addOrUpdate.length,u=0;return n(function(){return i=t.addOrUpdate[u],u++,o.push(c.getDisplayObject(i,r.service.objectIdField,r.rendererInfo,r.service.geometryType,r.configuration.devicePixelRatio,r._symbolToMosaicItemMap,a)),u===l}).then(function(){var i=p.create(o,a),n=i.serialize();r.remoteClient.invoke("patchTileVisuals",{tileKey:e.id,data:{remove:t.remove,addOrUpdate:n.result}},n.transferList)})})},t.prototype.tileAdded=function(e){},t.prototype.tileRemoved=function(e){var t=this._visualSetPromises;t.has(e)&&(t.get(e).cancel(),t.delete(e),this.notifyChange("updating"))},t.prototype._createTileData=function(e){var t=this,r=[],i={},o=0;return n(function(){var n=e[o];o++;var s=c.getDisplayObject(n,t.service.objectIdField,t.rendererInfo,t.service.geometryType,t.configuration.devicePixelRatio,t._symbolToMosaicItemMap,i);return r.push(s),o===e.length}).then(function(){return p.create(r,i)})},t.prototype._getReturnCentroid=function(e){function t(e){if(!e)return!1;var t=e.type;return"simple-marker"===t||"picture-marker"===t||"text"===t}if("esriGeometryPolygon"!==this.service.geometryType)return!1;switch(e.type){case"simple":return t(e.symbol);case"unique-value":return t(e.defaultSymbol)||e.uniqueValueInfos.some(function(e){return t(e.symbol)});case"class-breaks":return t(e.defaultSymbol)||e.classBreakInfos.some(function(e){return t(e.symbol)});default:return!0}},t.prototype._getMosaicItems=function(e){var t=a.acquire(),r=o.acquire(),i=this.rendererInfo;h(i.renderer)&&g(i.renderer.backgroundFillSymbol,t);for(var n=0,l=e;n<l.length;n++){var u=l[n],c=i.getSymbol(u);c&&(f.isTextSymbol(c)?v(c,r):g(c,t))}0===t.size&&0===r.size&&(a.release(t),o.release(r));var d=o.acquire(),p=[],y=this._symbolToMosaicItemMap,m=0;return t.forEach(function(e){y.has(e)||(d.set(m,e),p.push({symbol:e.toJSON(),id:m}),m++)}),r.forEach(function(e,t){if(y.has(t)){var r=y.get(t),i=r.glyphMosaicItems,n=[];e.forEach(function(e){(i&&i.length<e||!i[e])&&(n[e]=e)}),n.length>0&&(d.set(m,t),p.push({symbol:t.toJSON(),id:m,glyphIds:n}),m++)}else{d.set(m,t);var o=new Array(e.size);e.forEach(function(e){return o.push(e)}),p.push({symbol:t.toJSON(),id:m,glyphIds:o}),m++}}),p.length>0?this.remoteClient.invoke("getMaterialItems",p).then(function(e){for(var t=0,r=e;t<r.length;t++){var i=r[t],n=d.get(i.id);if(n)if(f.isTextSymbol(n))if(y.has(n)){var s=y.get(n),a=s.glyphMosaicItems,l=i.mosaicItem.glyphMosaicItems;if(l)for(var u=0;u<l.length;u++)null!=l[u]&&(a[u]=l[u])}else y.set(n,i.mosaicItem);else y.set(n,i.mosaicItem)}o.release(d)}):(a.release(t),o.release(r),s.resolve())},i([l.property()],t.prototype,"configuration",void 0),i([l.property({constructOnly:!0})],t.prototype,"queryInfo",null),i([l.property({dependsOn:["configuration"]})],t.prototype,"rendererInfo",null),i([l.property({readOnly:!0})],t.prototype,"updating",null),t=i([l.subclass()],t)}(l.declared(y.default));t.default=b});