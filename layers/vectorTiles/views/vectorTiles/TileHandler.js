// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.

define(["require","exports","module","dojo/Deferred","dojo/promise/all","../../core/workers","../../core/promiseUtils","../../core/requireUtils","../../request","../2d/layers/support/TileKey","./TileIndex","./SpriteMosaic","./SpriteSource","./GlyphMosaic","./GlyphSource","./VectorTileDisplayObject","./GeometryUtils"],function(e,t,i,o,r,n,s,l,a,c,u,p,h,d,y,f,_){var v=function(){function t(e,t){this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null,this._tileIndex=null,this._vectorTileLayer=e,this._requestUpdate=t,this.devicePixelRatio=window.devicePixelRatio||1}return t.prototype.destroy=function(){this.stop(),this._vectorTileLayer=this._requestUpdate=null},Object.defineProperty(t.prototype,"spriteMosaic",{get:function(){return this._spriteMosaic},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"glyphMosaic",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0}),t.prototype.start=function(){var t=this;this.stop();var s=this._vectorTileLayer.styleRepository,a=new h(s.sprite,this.devicePixelRatio);a.devicePixelRatio=devicePixelRatio;var c=a.load().then(function(){t._spriteMosaic=new p(1024,1024),t._spriteMosaic.setSpriteSource(a)}),u=new y(s.glyphs);this._glyphMosaic=new d(1024,1024,u);var f=this._fetchTileMap(this._vectorTileLayer.tileIndexUrl),_=n.open(this,l.getAbsMid("./WorkerTileHandler",e,i)).then(function(e){t._connection=e}),v=new o(function(e){c.isFulfilled()||c.cancel(),f.isFulfilled()||f.cancel(),_.isFulfilled()||_.cancel()});return r([c,f,_]).then(function(e){r(t._connection.broadcast("setLayers",s.styleJSON)).then(function(){v.resolve()})}),this._broadcastPromise=v.promise,this._broadcastPromise},t.prototype.stop=function(){this._broadcastPromise&&!this._broadcastPromise.isFulfilled()&&this._broadcastPromise.cancel(),this._connection&&(this._connection.close(),this._connection=null)},t.prototype.updateTile=function(e,t){if(!this._broadcastPromise.isFulfilled()||!this._connection)return s.reject(new Error("no connection"));var i=Math.round(_.degToByte(t.state.rotation));return e.rotation===i?null:(e.rotation=i,this._connection.invoke("update",{key:e.id,rotation:i},[],{id:e.workerID}).then(function(t){return e.updateSymbolData(t),e}))},t.prototype.getVectorTile=function(e,t){var i=this;if(!this._broadcastPromise.isFulfilled()||!this._connection)return s.reject(new Error("no connection"));var o=this._vectorTileLayer.tileInfo,r=Math.round(t.state.rotation);if(o.lods.length<=e.level)return s.reject("Cannot create tile for the requested level");var n=this._tileIndex?this._tileIndex.dataKey(e):e;return n?this._getTileData(this._connection,e,n,r).then(function(r){var s=o.lods[e.level].resolution,l=o.size[0]*s,a=o.origin,c=e.col*l,u=e.row*l,p=e.world*i._vectorTileLayer.fullExtent.width,h=a.x+c+p,d=h+l,y=a.y-u,v=y-l;return i._requestUpdate(),new f(e,n,[h,y,d,v],i._vectorTileLayer.tileInfo.size[1],4096,Math.round(_.degToByte(t.state.rotation)),r.tileData,i._vectorTileLayer.styleRepository,i._glyphMosaic,r.workerId,i._connection)}).otherwise(function(e){return s.reject(e)}):s.reject(new Error("no data"))},t.prototype.fetchTileData=function(e){var t=c.fromId(e),i=this._vectorTileLayer.getTileUrl(t.level,t.row,t.col);return a(i,{callbackParamName:"callback",responseType:"array-buffer"}).then(function(e){return{data:{protobuff:e.data},buffers:[e.data]}})},t.prototype.getSprites=function(e){return s.resolve({data:{spriteItems:this._spriteMosaic.getSpriteItems(e.sprites)}})},t.prototype.getGlyphs=function(e){return this._glyphMosaic.getGlyphItems(e.tileID,e.font,e.codePoints).then(function(e){return{data:{glyphItems:e}}})},t.prototype.getStyleRepository=function(){return this._vectorTileLayer.styleRepository},t.prototype.getTileIndex=function(){return this._tileIndex},t.prototype._getTileData=function(e,t,i,o){var r={id:null};return this._connection.invoke("getTile",{key:t.id,refKey:i.id,rotation:o},[],r).then(function(e){return{tileData:e,workerId:r.id}})},t.prototype._fetchTileMap=function(e){var t=this;return e?a(e,{callbackParamName:"callback",responseType:"json"}).then(function(e){t._tileIndex=new u(e.data)}):null},t}();return v});