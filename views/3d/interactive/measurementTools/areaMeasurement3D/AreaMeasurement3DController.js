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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/Handles","../../.././../../geometry/ScreenPoint","./AreaMeasurement3DView"],function(e,t,i,n,o,r,a){function d(e){return"mouse"!==e.pointerType||0===e.button}function s(e){return"touch"!==e}return function(){function e(e,t){this._dragVertices={},this._viewEventHandles=new o,this._tempPickRequest=new a.PickRequest,this.model=e,this.view=t,this.model.reset()}return e.prototype.activate=function(e){var t=this,i=this._viewEventHandles;i.add(e.on("immediate-click",function(e){return t._handleImmediateClick(e)})),i.add(e.on("click",function(e){return t._handleClick(e)})),i.add(e.on("double-click",function(e){return t._handleDoubleClick(e)})),i.add(e.on("drag",function(e){return t._handleDrag(e)})),i.add(e.on("pointer-move",function(e){return t._handlePointerMove(e)})),i.add(e.on("pointer-down",function(e){return t._handlePointerDown(e)})),i.add(e.on("pointer-up",function(e){return t._handlePointerUp(e)})),i.add(e.on("pointer-drag",function(e){return t._handlePointerDrag(e)})),i.add(e.on("key-down",function(e){return t._handleKeyDown(e)}))},e.prototype.deactivate=function(){this._viewEventHandles.removeAll()},e.prototype._handleDrag=function(e){0!==this.model.draggedVertices.length&&e.stopPropagation()},e.prototype._handlePointerMove=function(e){var t=new r({x:e.x,y:e.y});"mouse"===e.pointerType&&this._hoverAt(t,e.pointerType)&&e.stopPropagation()},e.prototype._handlePointerDown=function(e){if(d(e)){var t=new r({x:e.x,y:e.y}),i=this.view.vertexHandleAt(t,e.pointerType);null===i||i in this._dragVertices||(this._dragVertices[e.pointerId]=i,this.model.draggedVertices.push(i)),this.model.draggedVertices.length>0&&"measured"===this.model.state&&(this.model.state="editing"),"mouse"!==e.pointerType&&this._removeHover()}},e.prototype._handlePointerUp=function(e){if(d(e)){var t=this._dragVertices[e.pointerId];null!=t&&(delete this._dragVertices[e.pointerId],this.model.draggedVertices.remove(t)),0===this.model.draggedVertices.length&&"editing"===this.model.state&&(this.model.state="measured")}},e.prototype._handlePointerDrag=function(e){if(d(e)){var t=new r({x:e.x,y:e.y}),i=this._dragVertices[e.pointerId];null!=i&&("update"===e.action&&this._moveVertexTo(i,t,e.pointerType),e.stopPropagation())}},e.prototype._handleImmediateClick=function(e){if(d(e)){var t=new r({x:e.x,y:e.y});switch(this.model.state){case"initial":if(this._addVertexAt(t,e.pointerType))return this.model.state="drawing",void e.stopPropagation();break;case"drawing":var i=this.view.vertexHandleAt(t,e.pointerType);if(null===i){if(this._addVertexAt(t,e.pointerType))return void e.stopPropagation()}else if(0===i)return this._updateHoveredHandle(t,e.pointerType),this.model.finishMeasurement(),void e.stopPropagation();break;case"measured":if(null===this.view.vertexHandleAt(t,e.pointerType)&&(this.model.clearMeasurement(),this._addVertexAt(t,e.pointerType)))return this.model.state="drawing",void e.stopPropagation()}"mouse"===e.pointerType&&this._hoverAt(t,e.pointerType)}},e.prototype._handleClick=function(e){d(e)&&e.stopPropagation()},e.prototype._handleDoubleClick=function(e){if(d(e)){var t=new r({x:e.x,y:e.y});return"drawing"===this.model.state&&null!==this.view.vertexHandleAt(t,e.pointerType)?(this.model.finishMeasurement(),void e.stopPropagation()):void 0}},e.prototype._handleKeyDown=function(e){"Escape"===e.key&&"drawing"===this.model.state&&(this.model.clearMeasurement(),e.stopPropagation()),"Enter"===e.key&&"drawing"===this.model.state&&(this.model.finishMeasurement(),e.stopPropagation())},e.prototype._hoverAt=function(e,t){if(this._updateHoveredHandle(e,"mouse"),this.view.requiresCursorPoint){var i=this._pick(e);i.mapPoint&&(this.model.cursorPoint=i.mapPoint)}else this.model.cursorPoint=null},e.prototype._removeHover=function(){this.model.cursorPoint=null,this.model.hoveredVertexHandle=null},e.prototype._addVertexAt=function(e,t){var i=this._pick(e);return i.mapPoint?(this.model.path.add(i.mapPoint),this.model.hoveredVertexHandle=s(t)?this.model.path.length-1:null,!0):(this._updateHoveredHandle(e,t),!1)},e.prototype._moveVertexTo=function(e,t,i){if(t=this._clipToScreen(t),null!==e){var n=this._pick(t);if(n.mapPoint&&!this.view.overlapsAnyHandles(n.mapPoint,[e]))return this.model.path.update(e,n.mapPoint),this.model.hoveredVertexHandle=s(i)?e:null,!0}return this._updateHoveredHandle(t,i),!1},e.prototype._pick=function(e){var t=this._tempPickRequest;return t.screenPoint=e,this.view.pick(t)},e.prototype._clipToScreen=function(e){return new r({x:Math.max(0,Math.min(this.model.sceneView.width,e.x)),y:Math.max(0,Math.min(this.model.sceneView.height,e.y))})},e.prototype._updateHoveredHandle=function(e,t){this.model.hoveredVertexHandle=s(t)?this.view.vertexHandleAt(e,t):null},e}()});