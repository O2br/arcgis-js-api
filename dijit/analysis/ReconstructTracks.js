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

define(["require","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dojox/form/CheckedMultiSelect","../../kernel","../../lang","./AnalysisBase","./utils","./CreditEstimator","./_AnalysisOptions","../CalculateField","dojo/i18n!../../nls/jsapi","dojo/text!./templates/ReconstructTracks.html"],function(t,e,i,s,a,l,n,o,r,h,u,d,c,p,y,_,m,g,S,f,v,b,w,L,F,x,A,C,k,j,T,I,R,N,U,E,O,B,D,P,M){var G=i([m,g,S,f,v,B,U],{declaredClass:"esri.dijit.analysis.ReconstructTracks",templateString:M,widgetsInTemplate:!0,inputLayer:null,summaryFields:null,outputLayerName:null,i18n:null,toolName:"ReconstructTracks",helpFileName:"ReconstructTracks",resultParameter:"output",constructor:function(t){this._pbConnects=[],this._statsRows=[],t.containerNode&&(this.container=t.containerNode),t.trackFields&&"string"==typeof t.trackFields&&(t.trackFields=t.trackFields.split(","))},destroy:function(){this.inherited(arguments),a.forEach(this._pbConnects,l.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,P.aggregatePointsTool),s.mixin(this.i18n,P.reconstructTracksTool)},postCreate:function(){this.inherited(arguments),y.add(this._form.domNode,"esriSimpleForm"),u.set(this._trackFieldSelect.selectNode,"width","90%"),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._durSplitValue.set("isInRange",s.hitch(this._durSplitValue,E.isGreaterThanZero)),this._durSplitValue.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._buildUI()},startup:function(){},_onClose:function(t){this._aspectHandle&&(this._aspectHandle.remove(),this._aspectHandle=null),t&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:t})},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var t={},e={},i=this.constructAnalysisInputLyrObj(this.inputLayer,!0);t.inputLayer=i,t.trackFields=this._trackFieldSelect.get("value").toString(),t.method=this._methodSelect.get("value"),this._bufFieldOutput.get("value")&&(t.bufferField="= "+this._bufFieldOutput.get("value")),t.summaryFields=n.toJson(this.get("summaryFields")),this._durSplitValue.get("value")&&(t.timeSplit=this._durSplitValue.get("value"),t.timeSplitUnit=this._durSplitUnitsSelect.get("value")),this._distSplitValue.get("value")&&(t.distanceSplit=this._distSplitValue.get("value"),t.distanceSplitUnit=this._distSplitUnitsSelect.get("value")),this.returnFeatureCollection||(t.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=n.toJson({extent:this.map.extent._normalize(!0)})),e.jobParams=t,e.itemParams={description:h.substitute(this.i18n.itemDescription,{inputLayername:this.inputLayer.name}),tags:h.substitute(this.i18n.itemTags,{inputLayername:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(e.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(e.isSpatioTemporalDataStore=!0),this.execute(e)}},_handleShowCreditsClick:function(t){t.preventDefault();var e={};this._form.validate()&&(e.inputLayer=n.toJson(this.constructAnalysisInputLyrObj(this.inputLayer)),e.SummaryFields=n.toJson(this.get("summaryFields")),this.returnFeatureCollection||(e.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),e.KeepBoundariesWithNoPoints=this._keepPolygonsCheck.get("checked"),"0"!==this._groupBySelect.get("value")&&(e.GroupByField=this._groupBySelect.get("value")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,e).then(s.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()})))},_handleBrowseItemsSelect:function(t){t&&t.selection&&E.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.inputLayers:this.polygonLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:t.dialog||this._browsedlg,widget:this}).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_handleAttrSelectChange:function(t){var e,i,a,l;"0"!==t&&(e=this.get("statisticSelect"),l=this.getOptions(t),l&&l.type&&E.addStatisticsOptions({selectWidget:e,type:l.type,showGeoAnalyticsParams:this.showGeoAnalyticsParams}),"0"!==e.get("value")&&(e.get("isnewRowAdded")||(i=e.get("removeTd"),u.set(i,"display","block"),a=e.get("referenceWidget"),s.hitch(a,a._createStatsRow)(),e.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(t,e,i){var a,l,n;this.get("attributeSelect")&&(a=this.get("attributeSelect"),a.get("value")&&"0"!==a.get("value")&&i&&"0"!==i&&(this.get("isnewRowAdded")||(l=this.get("removeTd"),u.set(l,"display","block"),n=this.get("referenceWidget"),s.hitch(n,n._createStatsRow)(),this.set("isnewRowAdded",!0))))},_handleDistUnitsChange:function(t){},_handleDurSplitValue:function(t){},_save:function(){},_buildUI:function(){var t=!0;E.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(this.inputLayers&&this.inputLayer&&!E.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),E.populateAnalysisLayers(this,"inputLayer","inputLayers")),E.addReadyToUseLayerOption(this,[this._analysisSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this.method&&this._methodSelect.set("value",this.method),this.bufferField&&this._bufFieldOutput.set("value",this.bufferField.substring(this.bufferField.indexOf("=")+1)),this._durSplitUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes},{value:"Hours",label:this.i18n.hours},{value:"Days",label:this.i18n.days},{value:"Weeks",label:this.i18n.weeks},{value:"Months",label:this.i18n.months},{value:"Years",label:this.i18n.years}]),this.timeSplitUnit&&this._durSplitUnitsSelect.set("value",this.timeSplitUnit),this.timeSplit&&this._durSplitValue.set("value",this.timeSplit),this.distanceSplitUnit&&this._distSplitUnitsSelect.set("value",this.distanceSplitUnit),this.distanceSplit&&this._distSplitValue.set("value",this.distanceSplit),this.summaryFields&&(t=!1,this._createStatsRow(!t),a.forEach(this.summaryFields,function(t){this._currentAttrSelect.set("value",t.onStatisticField),this._currentStatsSelect.set("value",t.statisticType)},this)),u.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(t){this.folderStore=t,E.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.set("groupBySelect",this.groupByField),u.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this._updateAnalysisLayerUI(t),this._loadConnections()},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1))},_createStatsRow:function(e){var i,a,n,o,r,h,u;return i=c.create("tr",null,this._afterStatsRow,"before"),n=c.create("td",{style:{width:"45%",maxWidth:"100px"}},i),a=c.create("td",{style:{width:"55%",maxWidth:"104px"}},i),o=new x({maxHeight:200,"class":"esriLeadingMargin1 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},c.create("select",null,n)),E.addAttributeOptions({selectWidget:o,layer:this.inputLayer,allowStringType:!0}),r=new x({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},c.create("select",null,a)),E.addStatisticsOptions({selectWidget:r,showGeoAnalyticsParams:!0}),o.set("statisticSelect",r),o.set("showGeoAnalyticsParams",this.showGeoAnalyticsParams),o._onChangeHandle=_.pausable(o,"change",this._handleAttrSelectChange),e?o._onChangeHandle.pause():o._onChangeHandle.resume(),this.showGeoAnalyticsParams&&o.watch("value",this._handleAtrrValueUpdate),u=c.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},i),h=c.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+t.toUrl("./images/close.gif")+"' border='0''/>"},u),l.connect(h,"onclick",s.hitch(this,this._removeStatsRow,i)),this._statsRows.push(i),r.set("attributeSelect",o),r.set("removeTd",u),r.set("isnewRowAdded",!1),r.set("referenceWidget",this),r.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=r,this._currentAttrSelect=o,!0},_removeStatsRow:function(t){a.forEach(b.findWidgets(t),function(t){t.destroyRecursive()}),c.destroy(t)},_removeStatsRows:function(){a.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_handleAnalysisLayerChange:function(t){var e;"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"  AND tags:"polygon"'),this._isAnalysisSelect=!0,this._browsedlg.show()):"browselayers"===t?(this.showGeoAnalyticsParams&&(e=this._browseLyrsdlg.browseItems.get("query"),e.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",e)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPoint","esriGeometryPolygon"],this._browseLyrsdlg.browseItems.plugIn.checkTimeFilter=!0,this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(this.inputLayer=this.inputLayers[t],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(t){if(this._expBtn.set("disabled",!this.inputLayer),this._bufFieldOutput.set("disabled",!this.inputLayer),this.inputLayer)if(E.addAttributeOptions({selectWidget:this._trackFieldSelect,layer:this.inputLayer,allowStringType:!0,allowSelectLabel:!1}),!t&&this.trackFields&&this.trackFields.length>0&&this._trackFieldSelect.set("value",this.trackFields),t&&(this._removeStatsRows(),this._createStatsRow(),this.outputLayerName=h.substitute(this.i18n.outputLayerName,{inputLayername:this.inputLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this._calcField)this._calcField&&this._calcField.layer!==this.inputLayer&&(this._bufFieldOutput.set("value",""),this._calcField.reset(),this._calcField.set("layer",this.inputLayer));else{var i=E.getExprFunctions();this._calcField=new D({expressionMode:D.MODE_ARCADE,arcadeEditor:this.arcadeEditor,map:this.map,layer:this.inputLayer,field:this.i18n.bufField,baseClass:"esriBufFieldExp",helperMethods:i,showHelp:!0,helpUrl:E.getHelpUrl({widget:this,topic:"BufferExpression"}),css:{base:"esriBufFieldExp",addButton:"btn calcite primary",closeButton:"btn calcite cancel"},helperType:"numeric",showHeader:!1,calculateLabel:this.i18n.add,expression:!t&&this.bufferField?this._bufFieldOutput.get("value"):null},this._expressionCtr),this._calcField.startup(),this._calcField.expressionMode===D.MODE_SQL?(u.set(this._calcField._validateBtn.domNode,"display","none"),this._calcField._handleHelperTypeChange("value",null,{functionType:"NumType"}),this._aspectHandle=e.around(this._calcField,"_handleAddButtonClick",s.hitch(this,function(t){return s.hitch(this,function(t,e){var i=this._calcField.get("expression")[0];this._bufFieldOutput.set("value",i.sqlExpression),this._exprDialog.hide()})}))):this._calcField.expressionMode===D.MODE_ARCADE&&this._calcField.on("expression-add",s.hitch(this,function(t){this._bufFieldOutput.set("value",t.expression)})),this._calcField.on("close",s.hitch(this,function(){this._exprDialog.hide()}))}},_handleExpBtnClick:function(){this._calcField.set("expression",this._bufFieldOutput.get("value")),R.show(this._calcField.domNode),this._exprDialog.show()},_handleCalculateSuccess:function(t){this._dialog.hide()},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(t){N.isDefined(t)&&("esriGeometryPoint"===t.geometryType||"esriGeometryMultipoint"===t.geometryType||"esriGeometryPolygon"===t.geometryType)&&E.isTimeEnabled(t)?this.inputLayer=t:this.inputLayer=null},_setSummaryFieldsAttr:function(t){this.summaryFields=t},_getSummaryFieldsAttr:function(){var t,e,i=[];return p(".statsSelect",this.domNode).forEach(function(s,a){if(t=b.byNode(s),e=t.get("attributeSelect"),"0"!==e.get("value")&&"0"!==t.get("value")){var l={};l.statisticType=t.get("value"),l.onStatisticField=e.get("value"),i.push(l)}}),i},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},validateServiceName:function(t){return E.validateServiceName(t,{textInput:this._outputLayerInput})},_setInputLayersAttr:function(t){N.isDefined(t)&&(t=a.filter(t,function(t,e){return-1!==a.indexOf(["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolygon"],t.geometryType)&&E.isTimeEnabled(t)}),this.inputLayers=t)},_connect:function(t,e,i){this._pbConnects.push(l.connect(t,e,i))}});return o("extend-esri")&&s.setObject("dijit.analysis.ReconstructTracks",G,R),G});