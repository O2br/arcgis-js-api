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

define(["dojo/dom-geometry"],function(e){var t={getLayoutCells:function(e,t,n){var o=[];return e.getGrids().forEach(function(e){var t=e.getFieldCells({floatingCells:n&&n.floatingCells});t&&(o=o.concat(t))}),t?o.filter(function(e){return!t||e&&e.content&&e.content[t]}):o},findFirstEmptyLayoutCell:function(e){function n(){var n;return t.getLayoutCells(e,"isEmpty").some(function(e){return e.content.isEmpty()?(n=e,!0):void 0}),n}return n()},getFocusedLayoutCell:function(e){var t=[];return e.getGrids().forEach(function(e){var n=e.getFocusedCells();n&&(t=t.concat(n))}),t[0]},hasFocusedChild:function(e){return e.getGrids().some(function(e){var t=e&&e.getFocusedCells();return t&&!!t.length})},collectFieldInfos:function(e,n){var o=[];return t.getLayoutCells(e,"collectFieldInfos",{floatingCells:!0}).some(function(e){var t=e.content.collectFieldInfos(n);t&&(o=o.concat(t))}),o},getSectionIndex:function(e,t){var n,o=0;return e.getGrids().some(function(e){return e.getFieldCells().some(function(e){return e===t?(n=!0,!0):void o++})}),n&&o},getLayoutCellBySectionIndex:function(e,t){var n,o=0;return e.getGrids().some(function(e){return e.getFieldCells().some(function(e){return o===t?(n=e,!0):void o++})}),n},screenToPageCoords:function(t,n,o,r){r=r||{};var i;return t.getGrids().some(function(u){var c=e.position(u.domNode);if(c.y<o&&c.y+c.h>o){if(i={x:n-c.x,y:o-c.y},!r.returnInScreenCoordinates){var l=t.getZoomInfo().scale;i.x/=l,i.y/=l}return!0}}),i}};return t});