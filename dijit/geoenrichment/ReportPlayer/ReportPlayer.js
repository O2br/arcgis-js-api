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

define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/dom-class","dojo/dom-style","dojo/on","dojo/when","dojo/promise/all","dojo/promise/Promise","dijit/_WidgetBase","dijit/_TemplatedMixin","./config","./playerSupports/_CommandSupport","./playerSupports/_KeyboardNavigationSupport","./playerSupports/_LogoSupport","./playerSupports/_MapSupport","./playerSupports/_PageNavigationSupport","./playerSupports/_PlayerAreaSelectSupport","./playerSupports/_PrintSupport","./playerSupports/_ReportContainersSwitcher","./playerSupports/_SmartLayoutSupport","./playerSupports/_ZoomSupport","./playerSupports/_HeaderArrangeSupport","./playerSupports/_WaitingSupport","./printing/PageOptionsDialog/PageOptionsDialog","./ReportPlayerViewModel","./PlayerResizeModes","./PlayerZoomBehaviors","./PlayerThemes","./ReportPlayerState","./core/layout/LayoutBuilder","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/async/AsyncQueue","dojo/text!./templates/ReportPlayer.html","dojo/i18n!../../../nls/jsapi","./_devConfig"],function(e,t,r,i,n,a,o,s,l,h,p,d,u,g,_,c,m,f,y,C,D,A,S,v,w,R,P,I,L,E,M,x,T,b,z,j){return z=z.geoenrichment.dijit.ReportPlayer.ReportPlayer,e([h,p,u,_,c,y,C,D,A,f,g,m,S,v],{templateString:b,nls:z,dataProvider:null,config:null,isSlidesView:!1,enableDataDrilling:!0,theme:L.DARK,allowKeyboardNavigation:!0,showAreaTitle:!0,renderMapsFromCalculators:!1,resizeMode:P.AUTO,listenToWindowResize:!0,printConfig:{subtitle:z.preparedByEsri,printDialogClass:w},defaultZoomBehavior:I.FIT_PAGE,showProgressBar:!0,_viewModel:null,_initPromise:null,_reportData:null,_analysisAreaIndex:0,_disableAnimation:!1,postCreate:function(){this.inherited(arguments),this.config=t.mixin({},d,this.config),this._applyTheme(),this._showError(!1),this._initProgressController()},startup:function(){this.inherited(arguments),!this._viewModel&&this._reportData&&(this._viewModel=new R,this._viewModel.layoutBuilder=(new this._getLayoutBuilder)(),this._initPromise=o(this._viewModel.layoutBuilder.initialize()))},_getLayoutBuilder:function(){return M},_applyTheme:function(){i.remove(this.domNode,"playerThemeDark playerThemeLight"),i.add(this.domNode,this.theme===L.DARK?"playerThemeDark":"playerThemeLight"),this.areasSelect&&this.areasSelect.setTheme(this.theme),this.pageSelect&&this.pageSelect.setTheme(this.theme),this.zoomSelect&&this.zoomSelect.setTheme(this.theme)},playReport:function(e,t){if(this.isContentLoading())return this.isContentLoading();var r=this;return this._showError(!1),this._progressController&&this._progressController.reset(),o(this._showWaiting(this.dataProvider.getReportData(e,function(e){r._progressController&&r._progressController.setLoadDataProgress(e)})),function(e){return r.setReportData(e,t)},function(e){r._showError(e)})},_isDataBeingSetFlag:!1,setReportData:function(e,t){function i(){return 0>o?void a.resolve():void n._setReportData(e,{analysisAreaIndex:o--,rerenderContent:!1}).then(function(){setTimeout(i,0)},a.reject)}if(this.isContentLoading())return this.isContentLoading();var n=this;if(t=t||{},!e)return void this._showError(!0);t.disableAnimation&&(this._disableAnimation=!0),this._isDataBeingSetFlag=!0,E.isChartAnimationSuspended=!0,this.onSetReportDataStart();var a=new r;if(this._progressController&&this._progressController.setNumAreas(e.analysisAreas.length),1===e.analysisAreas.length)this._resetLoadedFlags(),this._resetMapBuilder(),this._setReportData(e).then(a.resolve,a.reject);else{t._resetLoadedContents!==!1&&(this._resetLoadedFlags(),this._resetMapBuilder());var o=e.analysisAreas.length-1;i()}this._progressController&&this._progressController.setLoadDataProgress(1);var s=a.promise.then(function(){return n._progressController&&n._progressController.finalize()}).otherwise(function(e){n._showError(e)});return this._showWaiting(s),s.always(function(){return n._isDataBeingSetFlag=!1,E.isChartAnimationSuspended=!1,n.onSetReportDataEnd(),n._emitPendingResizedEvent(),n.getCurrentReportContainer()&&(n.getCurrentReportContainer().notifyShown(),n.getCurrentReportContainer().getShownGrid&&n.getCurrentReportContainer().getShownGrid().notifyShown()),n._progressController&&n._progressController.reset(),t.waitUntilAllContentIsReady?n.isContentLoading():void 0})},refresh:function(e){return this.isContentLoading()?this.isContentLoading():this._reportData&&o(this.setReportData(this._reportData,{waitUntilAllContentIsReady:!(!e||!e.waitUntilAllContentIsReady),_resetLoadedContents:!(!e||!e.rerenderContent)}),function(){return this.showPageAt(0),this.resize()}.bind(this))},showAnalysisAreaAt:function(e,t){if(this.isContentLoading())return this.isContentLoading();var r=this._setReportData(this._reportData,{analysisAreaIndex:e,rerenderContent:!(!t||!t.rerenderContent)});return t&&t.waitUntilAllContentIsReady?this.isContentLoading():r},_setReportData:function(e,t){var r=this;t=t||{},t.analysisAreaIndex=t.analysisAreaIndex||0;var i=t.rerenderContent!==!1;return this._reportData=e,this._analysisAreaIndex=t.analysisAreaIndex,this._showError(!this._reportData),this._reportData?(this._updateMapPortalUrl(),this._setFallbackMapImageInfos(this._reportData.mapImageInfos),this.startup(),o(this._initPromise,function(){return r._updateAreaSelect(),r._configureViewModel(),o(r._setReportContainer(i),function(e){return e&&r._doApplyTemplateJson(t)})})):void 0},_doApplyTemplateJson:function(e){var t=this,r=this.getCurrentReportContainer(),i=r.fromJson(this._reportData.templateJson,{waitUntilAllContentIsReady:!0,progressCallback:function(r){t._progressController&&t._progressController.setProgressForAreaAt(r,e.analysisAreaIndex)}}),n=r.getPagePromise?r.getPagePromise():i,a=r.getContentPromise?r.getContentPromise():i;return this._registerContntainerLoadPromise(a),o(n,function(){return this._setCurrentContainerLoaded(),this.showPageAt(this._currentPageIndex),this.resize()}.bind(this))},_loadQueue:null,isContentLoading:function(){return this._loadQueue&&this._loadQueue.getPromise()},_registerContntainerLoadPromise:function(e){var t=this;this._loadQueue||(this._loadQueue=new T({onStarted:function(){x.enableContentAbsolute(t.commandButtonsContainer,!1)},onFinished:function(){x.enableContentAbsolute(t.commandButtonsContainer,!0)}})),this._loadQueue.add(e)},getReportData:function(){return this._reportData},updateTemplateJson:function(e){this._reportData&&e&&(this._reportData.templateJson=e)},getReportTitle:function(){return this._reportData&&this._reportData.reportTitle||""},getCurrentAnalysisAreaIndex:function(){return this._analysisAreaIndex},getCurrentAnalysisArea:function(){return this._reportData&&this._reportData.analysisAreas[this._analysisAreaIndex]},getAnalysisAreas:function(){return this._reportData&&this._reportData.analysisAreas},_configureViewModel:function(){var e=this;this._viewModel.setTheme(this._reportData.templateJson.theme);var r=this._getCurrentAnalysisAreaConfiguration();this._viewModel.enableDataDrilling=this.enableDataDrilling,this._disableAnimation&&(this._viewModel.chartAnimationAllowed=!1),this._viewModel.setDynamicReportInfo({fieldData:r.fieldData,features:r.features,infographicOptions:this._reportData.infographicOptions,attachmentsStore:this._reportData.attachmentsStore,createMapFunc:t.hitch(this,this._createMap),reportType:this._reportData.reportType,isClassic:this._reportData.isClassic,isFixedDataMode:!this._reportData.config.geoenrichmentUrl,geClient:this._reportData.geClient}),this._viewModel.getDynamicImageFunc=t.hitch(this,this._getReportLogo),this._viewModel.enrichFieldData=function(i){return e.dataProvider.enrichFieldData(i,t.mixin({analysisAreas:[r.analysisArea],fieldData:r.fieldData},e._reportData.config))}},_getCurrentAnalysisAreaConfiguration:function(){this._reportData.infographicOptions&&this._reportData.infographicOptions.setCurrentAnalysisAreaIndex(this._analysisAreaIndex),this._reportData.attachmentsStore&&this._reportData.attachmentsStore.setCurrentAnalysisAreaIndex&&this._reportData.attachmentsStore.setCurrentAnalysisAreaIndex(this._analysisAreaIndex);var e=t.mixin({},this._reportData.fieldData);e.areaData=[this._reportData.fieldData.areaData[this._analysisAreaIndex]];var r=this._reportData.analysisAreas[this._analysisAreaIndex];return{fieldData:e,analysisArea:r,features:[r.feature]}},getNumberOfPages:function(){return this.getCurrentReportContainer().getNumberOfPages()},notifyShown:function(){this._isDataBeingSetFlag||this.getCurrentReportContainer()&&this.getCurrentReportContainer().notifyShown()},_showError:function(e){j.emulateErrors.playerError&&(e=!0),x[e?"hide":"show"](this.normalViewDiv),x[e?"show":"hide"](this.errorViewDiv),i[e?"add":"remove"](this.domNode,"esriGEReportPlayerError"),e&&(n.set(this.errorViewDiv,"paddingTop",n.get(this.domNode,"height")/2-20+"px"),this._progressController&&this._progressController.reset(),console.log(e),this.onError(e))},setPrintMode:function(e){i[e?"add":"remove"](this.domNode,"esriGEReportPlayerInPrinting")},resize:function(){return this._applyTheme(),this.inherited(arguments)},_pendingResizeEvent:null,_emitResizedEvent:function(e){this._pendingResizeEvent={isPaginating:!!e},this._isDataBeingSetFlag||this._emitPendingResizedEvent()},_emitPendingResizedEvent:function(){this._pendingResizeEvent&&(this.onResized(this._pendingResizeEvent.isPaginating),this._pendingResizeEvent=null)},onSetReportDataStart:function(){},onSetReportDataEnd:function(){},onResized:function(e){},onError:function(e){}})});