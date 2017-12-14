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

define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/when","dojo/on","dojo/sniff","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/store/Memory","dijit/_WidgetBase","dijit/_TemplatedMixin","./reportContainerGridSupports/_HiddenContentSupport","./reportContainerGridSupports/_ScrollSupport","./reportContainerGridSupports/_ZoomSupport","../grid/coreUtils/GridDataUtil","./containerGridUtils/QueryUtil","./containerGridUtils/SerializationManager","./containerGridUtils/ContentLoadingEventManager","../supportClasses/DocumentOptions","../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder","../themes/BackgroundThemeUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes","dojo/text!../templates/ReportContainerGrid.html"],function(t,e,i,n,o,r,a,s,d,h,g,l,u,c,p,m,f,_,C,v,w,M,P,x,y,G,S){return t([l,u,c,p,m],{templateString:S,viewModel:null,themeContext:null,theme:null,parentWidget:null,isSourceContainer:!0,showWatermark:!0,documentOptions:null,loadingManager:null,serializationManager:null,renderOptions:{center:!1,minTop:0},_grids:null,_enableAsyncRendering:!0,postCreate:function(){this.serializationManager=(new this._getSerializationManagerClass)(this),this._grids=[],this.inherited(arguments),this.updateLayout(),this.setViewMode(G.PREVIEW_VALUES),this.isSourceContainer&&s.add(this.domNode,"reportContainerGrid_sourceContainer")},_getSerializationManagerClass:function(){return C},setDocumentOptions:function(t,i){this.documentOptions&&e.mixin(this.documentOptions,t),this.updateLayout(i)},updateLayout:function(t){var e=this;this.documentOptions&&(this._updateContainerSize(),this._grids.forEach(function(i,n){t&&void 0!==t.pageIndex&&t.pageIndex!==n||(e._updateGridWrappingNodeForCurrentDocumentLayout(i),i.setMaxWidth(e._getAllowedPageWidth()),i.resizeToFitAllowedWidth(),i.resizeToFitHeight(e._getPageHeight()))}),this._syncFillerContainer())},getFirstPageDomNode:function(){var t=this.stackContainer.children[0];return t&&t.children[0]},getPageDomNodes:function(){return this._getGridContainers()},_getGridContainers:function(){for(var t=[],e=0;e<this.stackContainer.children.length;e++){var i=this.stackContainer.children[e];i&&t.push(i.children[0])}return t},_placeGridContainer:function(t,e){var i=a.create("div",{"class":"reportContainerGrid_gridContainerWrapper"}),n=void 0!==e&&this.stackContainer.children[e];n?a.place(i,n,"before"):a.place(i,this.stackContainer),a.place(t,i),t.backgroundImage=a.create("div",{"class":"reportContainerGrid_stackContainerBackgroundImage esriGEAbsoluteStretched"},t),r("ie")||this.viewModel.dynamicReportInfo||!this.showWatermark||(this._sampleWatermarkDiv=a.create("div",{"class":"sampleValuesWatermark esriGEAbsoluteStretched"},t,"first"))},getGridContainer:function(t){return this._getGridContainer(t)},_getGridContainer:function(t){var e=t.isFloatingTable?t.parentGrid:t;return e.domNode&&e.domNode.parentNode},_getGridContainerWrapper:function(t){var e=this._getGridContainer(t);return e&&e.parentNode},_updateGridWrappingNodeForCurrentDocumentLayout:function(t){t.isEmptyTable()&&h.set(t.domNode,{width:this._getAllowedPageWidth()+"px",height:this._getPageHeight()+"px"});var e=this._getGridContainer(t);if(e){var i=this.viewModel.getDocumentDefaultStyles(this.theme||this.themeContext);h.set(e,{paddingLeft:(this.documentOptions.left||0)+"px",paddingRight:(this.documentOptions.right||0)+"px",paddingTop:(this.documentOptions.top||0)+"px",paddingBottom:(this.documentOptions.bottom||0)+"px",backgroundColor:this.documentOptions.backgroundColor||i.backgroundColor})}P.applyBackgroundImageFromSettings(e.backgroundImage,i.backgroundImage)},_updateContainerSize:function(){var t=0===this._heigth?"auto":h.get(this.domNode,"height")+"px";h.set(this.mainContainer,"height",t),h.set(this.mainContainer,"maxWidth",this._maxWidth?this._maxWidth+"px":""),h.set(this.mainContainer,"maxHeight",this._maxHeight?this._maxHeight+"px":""),this._syncFillerContainer()},getCurrentPageDim:function(){return w.getPageBox(this.documentOptions)},_getAllowedPageWidth:function(){return this.getCurrentPageDim().contentW},_getPageHeight:function(){return this.getCurrentPageDim().contentH},getCanvasOffsets:function(){var t=d.position(this.mainContainer),e=d.position(this.fillerContainer);return{l:e.x-t.x,r:t.x+t.w-e.x-e.w}},_currentPageIndex:-1,getFullWidth:function(){var t=this.getFirstPageDomNode();return d.getMarginBox(t).w+d.getMarginExtents(this.stackContainer).w},getFullHeight:function(){var t=this.getFirstPageDomNode();return d.getMarginBox(t).h+d.getMarginExtents(this.stackContainer).h},getNumberOfPages:function(){return this._grids.length},showAllPages:function(){this.showPageAt(-1)},showPageAt:function(t){this._grids.forEach(function(e,i){var n=-1===t||t===i;x[n?"showNodeFromBackground":"hideNodeInBackground"](this._getGridContainerWrapper(e),"reportContainerPage_"+i),this.isCurrentContainer()&&n&&e.notifyShown()},this),this._currentPageIndex=t,this._syncFillerContainer()},getShownGrid:function(){return this._grids[this._currentPageIndex]},getCurrentPageIndex:function(){return this._currentPageIndex},getGrids:function(){return this._grids},isCurrentContainer:function(){return!1},_width:0,_heigth:0,resize:function(t,e){this._width=void 0===t?this._width:t,this._heigth=void 0===e?this._heigth:e,void 0!==t&&h.set(this.domNode,"width",0===this._width?"auto":this._width+"px"),void 0!==e&&h.set(this.domNode,"height",0===this._heigth?"auto":this._heigth+"px"),this._updateContainerSize()},_maxWidth:0,_maxHeight:0,setMaxWidth:function(t){this._maxWidth=t},setMaxHeight:function(t){this._maxHeight=t},screenToPageCoords:function(t,e){return _.screenToPageCoords(this,t,e)},getLayoutCells:function(t,e){return _.getLayoutCells(this,t,e)},getCellPageGrid:function(t){return t&&t.parentGrid?t.parentGrid.isFloatingTable?t.parentGrid.parentGrid:t.parentGrid:null},clear:function(t){this._grids.forEach(function(t,e){t.destroy()},this),this._grids.length=0,this.stackContainer&&a.empty(this.stackContainer),this._syncFillerContainer()},_removeGrid:function(t){if(t){var e=this._getGridContainerWrapper(t);t.destroy(),e&&a.destroy(e);var i=this._grids.indexOf(t);this._grids.splice(i,1),this._syncFillerContainer()}},removeGridAt:function(t){this._removeGrid(this._grids[t])},getGridJsonAt:function(t){return this._grids[t].toJson()},setHeight:function(t){h.set(this.mainContainer,"height",t+"px")},_viewMode:null,getViewMode:function(){return this._viewMode},setViewMode:function(t){this._viewMode!==t&&(this._viewMode=t,t===G.EDIT?(s.add(this.domNode,"reportContainerEditMode"),s.remove(this.domNode,"reportContainerPreviewMode")):(s.remove(this.domNode,"reportContainerEditMode"),s.add(this.domNode,"reportContainerPreviewMode")),this._updateContainerSize(),this._grids.forEach(function(e,i){e.setViewMode(t)},this))},hasFocusedChild:function(){return _.hasFocusedChild(this)},collectFieldInfos:function(t){return _.collectFieldInfos(this,t)},createGridFromSectionTableJson:function(t,e,i){void 0!==e&&"replace"===i&&this._removeGrid(this._grids[e]);var n=a.create("div",{"class":"reportContainerGrid_stackContainer"});this._placeGridContainer(n,e);var o=this._createGridFromTableJson(t,n);return o.setMaxWidth(this._getAllowedPageWidth()),o.setSettings({style:{width:this._getAllowedPageWidth(),left:0,spaceBefore:0,spaceAfter:0}}),this._updateGridWrappingNodeForCurrentDocumentLayout(o),void 0!==e?this._grids.splice(e,0,o):this._grids.push(o),this._syncFillerContainer(),o},_getGridClass:function(){return this.viewModel.layoutBuilder.getClass("grid")},_createGridFromTableJson:function(t,i){var n=this;t.data=t.data||{};var o=this._getGridClass(),r=new o(e.mixin({"class":"outerAdjustableGrid",fieldCellClass:"outerAdjustableGridCell",viewModel:this.viewModel,themeContext:this.themeContext,theme:this.theme,parentWidget:this,viewPortContainer:this.mainContainer,reportContainerPageNode:i,columns:t.data.columns||[],store:new g({data:t.data.data||[],idProperty:"id"}),backgroundSectionJson:t.backgroundSectionJson,foregroundSectionJson:t.foregroundSectionJson,floatingTablesSectionJson:t.floatingTablesSectionJson,stickToRight:!0,keepGridSizeWhenResized:!1,looseResize:!0,layoutDefaults:{defaultRowHeight:250,rowMinHeight:100,columnMinWidth:100},renderBordersFromTheme:!0,hasRealBorders:!0,inheritThemeBackground:!1,enableBackgroundForeground:!0,enableAsyncRendering:this._enableAsyncRendering,_preRenderFieldCell:function(t){var e=f.getFieldInfo(t);e||n.isSourceContainer||f.setFieldInfo(t,n.createEmptySectionJson())},_postCreateFieldCell:function(t){n._postCreateFieldCell(t)},onContentLoadingStart:function(){n.loadingManager&&n.loadingManager.onContentLoadingStart()},onContentLoadingEnd:function(){n.loadingManager&&n.loadingManager.onContentLoadingEnd()}},this._getGridCreationParams(i)),a.create("div",null,i));return r.setViewMode(this._viewMode),r},_postCreateFieldCell:function(t){},createEmptySectionJson:function(){return M.createFieldInfoFromSection({type:y.EMPTY})},_getGridCreationParams:function(t){return null},notifyShown:function(){this.serializationManager.notifyShown()},getVisualState:function(){return{pages:this._grids.map(function(t,e){return{grid:t.getVisualState()}})}},setVisualState:function(t){t&&t.pages&&t.pages.length===this._grids.length&&this._grids.forEach(function(e,i){var n=t.pages[i];e.setVisualState(n.grid)})},_syncFillerContainer:function(){if(this.domNode){var t=this.getZoomInfo().scale;if(h.set(this.fillerContainer,"marginTop",""),h.set(this.fillerContainer,{width:h.get(this.scalableContainer,"width")*t+"px",height:h.get(this.scalableContainer,"height")*t+"px"}),this.renderOptions&&this.renderOptions.center){var e=(h.get(this.mainContainer,"height")-h.get(this.fillerContainer,"height"))/2;h.set(this.fillerContainer,"marginTop",Math.max(this.renderOptions.minTop||0,e)+"px")}this.onViewSyncronized()}},onViewSyncronized:function(){},_pagePromise:null,_contentPromise:null,fromJson:function(t,e){e=e||{};var o=this;this._enableAsyncRendering=!e.renderSync,this._pagePromise=null,this._contentPromise=null;var r;e.keepZoom?r=this.getZoomInfo():this.resetZoom(),this._currentPageIndex=-1,this.loadingManager&&this.loadingManager.destroy(),this.loadingManager=null;var a=new i;return e.waitUntilAllContentIsReady?(this.loadingManager=new v,this.loadingManager.init(),this._pagePromise=this.serializationManager.fromJson(t,e),this._contentPromise=n(this._pagePromise,function(){return this.loadingManager.notifyPagesLoaded(),this.loadingManager.returnOnLoadEnd()}.bind(this))):this._pagePromise=this.serializationManager.fromJson(t,e),n(e.waitUntilAllContentIsReady?this._contentPromise:this._pagePromise,a.resolve,a.reject),n(a.promise,function(){r&&o.setZoomInfo(r)})},getPagePromise:function(){return this._pagePromise},getContentPromise:function(){return this._contentPromise},toJson:function(t){return this.serializationManager.toJson(t)},onPendingDataApplied:function(){},destroy:function(){this.loadingManager&&this.loadingManager.destroy(),this.loadingManager=null,this.clear(),this.inherited(arguments)}})});