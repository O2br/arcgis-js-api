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

define(["require","exports","dojo/Deferred","../../core/promiseUtils","../../core/executeAsync","../../core/ObjectPool","./VertexMemoryBuffer","./IndexMemoryBuffer","./TileParser","./BackgroundBucket","./FillBucket","./LineBucket","./SymbolBucket","./Placement","./GeometryUtils"],function(e,t,r,f,n,s,u,i,o,l,B,a,h,x,p){var c=function(){function e(){this.rotation=0,this.status=0,this._symbolBuckets=[],this.placementEngine=new x.PlacementEngine,this.fillVertexBuffer=new u.FillVertexBuffer(!1),this.fillDDVertexBuffer=new u.FillVertexBuffer(!0),this.fillIndexBuffer=new i.TriangleIndexBuffer,this.outlineVertexBuffer=new u.OutlineVertexBuffer(!1),this.outlineDDVertexBuffer=new u.OutlineVertexBuffer(!0),this.outlineIndexBuffer=new i.TriangleIndexBuffer,this.lineVertexBuffer=new u.LineVertexBuffer(!1),this.lineDDVertexBuffer=new u.LineVertexBuffer(!0),this.lineIndexBuffer=new i.TriangleIndexBuffer,this.iconVertexBuffer=new u.SymbolVertexBuffer(!1),this.iconDDVertexBuffer=new u.SymbolVertexBuffer(!0),this.iconIndexBuffer=new i.TriangleIndexBuffer,this.textVertexBuffer=new u.SymbolVertexBuffer(!1),this.textDDVertexBuffer=new u.SymbolVertexBuffer(!0),this.textIndexBuffer=new i.TriangleIndexBuffer}return e.prototype.initialize=function(e,t,r,f){void 0===f&&(f=0),this.tileKey=e,this.refKey=t,this._workerTileHandler=r,this.rotation=f,this.placementEngine.setAngle(p.C_DEG_TO_RAD*f)},e.prototype.release=function(){this.tileKey=this.refKey="",this.status=0,this.rotation=0,this.fillVertexBuffer.reset(),this.fillDDVertexBuffer.reset(),this.fillIndexBuffer.reset(),this.outlineVertexBuffer.reset(),this.outlineDDVertexBuffer.reset(),this.outlineIndexBuffer.reset(),this.lineVertexBuffer.reset(),this.lineDDVertexBuffer.reset(),this.lineIndexBuffer.reset(),this.iconVertexBuffer.reset(),this.iconDDVertexBuffer.reset(),this.iconIndexBuffer.reset(),this.textVertexBuffer.reset(),this.textDDVertexBuffer.reset(),this.textIndexBuffer.reset(),this.placementEngine.reset(),this._symbolBuckets.length=0,this._workerTileHandler=null},e.prototype.setDataAndParse=function(e,t){var f=this,n=new r(function(e){f.status=6});return this._parse(e,t).then(function(e){f.status=4;for(var t=[1,f.fillVertexBuffer.sizeInBytes,2,f.fillDDVertexBuffer.sizeInBytes,3,f.fillIndexBuffer.sizeInBytes,4,f.outlineVertexBuffer.sizeInBytes,5,f.outlineDDVertexBuffer.sizeInBytes,6,f.outlineIndexBuffer.sizeInBytes,7,f.lineVertexBuffer.sizeInBytes,8,f.lineDDVertexBuffer.sizeInBytes,9,f.lineIndexBuffer.sizeInBytes,10,f.iconVertexBuffer.sizeInBytes,11,f.iconDDVertexBuffer.sizeInBytes,12,f.iconIndexBuffer.sizeInBytes,13,f.textVertexBuffer.sizeInBytes,14,f.textDDVertexBuffer.sizeInBytes,15,f.textIndexBuffer.sizeInBytes],r=new Uint32Array(t),s=[],u=e.length,i=0;u>i;i++){var o=e[i];if(o instanceof B)s.push(o.layerIndex),s.push(1),s.push(o.fillIndexStart),s.push(o.fillIndexCount),s.push(o.outlineIndexStart),s.push(o.outlineIndexCount);else if(o instanceof a)s.push(o.layerIndex),s.push(2),s.push(o.lineIndexStart),s.push(o.lineIndexCount),s.push(o.connectorStart),s.push(o.connectorCount);else if(o instanceof h){s.push(o.layerIndex),s.push(3),s.push(o.sdfMarker?1:0);var x=o.markerPageMap;s.push(x.size),x.forEach(function(e,t){s.push(t),s.push(e[0]),s.push(e[1])});var p=o.glyphsPageMap;s.push(p.size),p.forEach(function(e,t){s.push(t),s.push(e[0]),s.push(e[1])})}else o instanceof l&&(s.push(o.layerIndex),s.push(0))}var c=new Uint32Array(s),y=f.fillVertexBuffer.toBuffer(),I=f.fillDDVertexBuffer.toBuffer(),d=f.fillIndexBuffer.toBuffer(),D=f.outlineVertexBuffer.toBuffer(),V=f.outlineDDVertexBuffer.toBuffer(),b=f.outlineIndexBuffer.toBuffer(),z=f.lineVertexBuffer.toBuffer(),v=f.lineDDVertexBuffer.toBuffer(),g=f.lineIndexBuffer.toBuffer(),w=f.iconVertexBuffer.toBuffer(),m=f.iconDDVertexBuffer.toBuffer(),k=f.iconIndexBuffer.toBuffer(),_=f.textVertexBuffer.toBuffer(),T=f.textDDVertexBuffer.toBuffer(),E=f.textIndexBuffer.toBuffer();n.resolve({data:{bufferDataInfo:r.buffer,bucketDataInfo:c.buffer,bufferData:[y,I,d,D,V,b,z,v,g,w,m,k,_,T,E]},buffers:[y,I,d,D,V,b,z,v,g,w,m,k,_,T,E,r.buffer,c.buffer]})}),n.promise},e.prototype.addBucket=function(e){this._symbolBuckets.push(e)},e.prototype.updateSymbols=function(e){var t=this,r=this._symbolBuckets;if(!r||0===r.length)return f.resolve({data:null,buffers:null});this.rotation=e;var s=this.placementEngine;s.reset(),s.setAngle(e/256*360*p.C_DEG_TO_RAD);var u=this.iconVertexBuffer;u.reset();var i=this.iconDDVertexBuffer;i.reset();var o=this.iconIndexBuffer;o.reset();var l=this.textVertexBuffer;l.reset();var B=this.textDDVertexBuffer;B.reset();var a=this.textIndexBuffer;a.reset();var h=[],x=r.length,c=0;return n(function(){if(6===t.status||0===t.status)return!0;if(x>c){var e=r[c++],f=e.layer,n=e.copy(f.hasDataDrivenIcon?i:u,o,f.hasDataDrivenText?B:l,a,s);n&&(h.push(n),n.updateSymbols())}return c>=x},5).then(function(){if(6===t.status||0===t.status||0===u.sizeInBytes&&0===i.sizeInBytes&&0===o.sizeInBytes&&0===l.sizeInBytes&&0===B.sizeInBytes&&0===a.sizeInBytes)return{data:null,buffers:null};var e=[10,u.sizeInBytes,11,i.sizeInBytes,12,o.sizeInBytes,13,l.sizeInBytes,14,B.sizeInBytes,15,a.sizeInBytes],r=new Uint32Array(e),f=[];x=h.length;for(var n=0;x>n;n++){var s=h[n];f.push(s.layerIndex),f.push(3),f.push(s.sdfMarker?1:0);var p=s.markerPageMap;f.push(p.size),p.forEach(function(e,t){f.push(t),f.push(e[0]),f.push(e[1])});var c=s.glyphsPageMap;f.push(c.size),c.forEach(function(e,t){f.push(t),f.push(e[0]),f.push(e[1])})}var y=new Uint32Array(f),I=u.toBuffer(),d=i.toBuffer(),D=o.toBuffer(),V=l.toBuffer(),b=B.toBuffer(),z=a.toBuffer();return{data:{bufferDataInfo:r.buffer,bucketDataInfo:y.buffer,bufferData:[I,d,D,V,b,z]},buffers:[I,d,D,V,b,z,r.buffer,y.buffer]}}).otherwise(function(e){return f.resolve({data:null,buffers:null})})},e.prototype.setObsolete=function(){this.status=6},e.prototype.getLayers=function(){return this._workerTileHandler.getLayers()},e.prototype.getWorkerTileHandler=function(){return this._workerTileHandler},e.prototype._parse=function(e,t){if(!e||0===e.byteLength)return f.resolve([]);this.status=2;var r=new o(e,this,t);return r.parse()},e.pool=new s(e),e}();return c});