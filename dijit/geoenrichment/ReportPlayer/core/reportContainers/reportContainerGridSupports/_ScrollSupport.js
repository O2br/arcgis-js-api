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

define(["dojo/_base/declare","dojo/dom-geometry"],function(o,e){return o(null,{scrollToCell:function(o,e){return o&&o.parentGrid&&this._getGridContainerWrapper(o.parentGrid)?this._scrollToNode(o.domNode,e):void 0},_scrollToNode:function(o,t){t=t||{};var r=e.position(this.getScrollableContainer()),l=e.position(o),n=!(l.x>r.x&&r.x+r.w>l.x+l.w),i=!(l.y>r.y&&r.y+r.h>l.y+l.h),a=30,s=t.anchorTop&&("number"==typeof t.anchorTop?t.anchorTop:a),c={x:Math.max(a,(r.w-l.w)/2),y:void 0!==s?s:Math.min(r.h-l.h-a,(r.h-l.h)/2)};return c.dx=c.x-(l.x-r.x),c.dy=c.y-(l.y-r.y),!t.onlyIfOutOfView||n||i?(t.scrollHorizontally===!1||!n&&t.onlyIfOutOfView||(this.getScrollableContainer().scrollLeft-=c.dx),i||!t.onlyIfOutOfView?this._animateScrolling(this.getScrollableContainer().scrollTop-c.dy,t.immdediate):void 0):void 0},_animateScrolling:function(o,e){this.getScrollableContainer().scrollTop=o},scrollToPageAt:function(o,e){var t=this._grids[o],r=t.getFieldCells()[0];return r?this.scrollToCell(r,{scrollHorizontally:!1,anchorTop:e&&e.anchorTop}):this._scrollToNode(t.domNode,{scrollHorizontally:!1,anchorTop:0})},scrollToLastPage:function(){return this.scrollToPageAt(this._grids.length-1)},getCurrentViewedPageIndex:function(){var o=this.getScrollableContainer().scrollHeight/this._grids.length;return Math.round(this.getScrollableContainer().scrollTop/o)},getCurrentViewedPageGrid:function(){return this.getGrids()[this.getCurrentViewedPageIndex()]},getScrollableContainer:function(){return this.mainContainer}})});