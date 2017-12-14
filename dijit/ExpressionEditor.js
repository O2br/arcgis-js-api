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

define(["dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/html","dojo/Evented","dojo/string","dojo/dom","dojo/has","dojo/topic","dojo/query","dojo/aspect","dojo/_base/json","dojo/Deferred","dojo/dom-class","dojo/dom-style","dijit/registry","dijit/TooltipDialog","dijit/Tooltip","dojo/store/Memory","../layers/ArcGISImageServiceLayer","../layers/ArcGISImageServiceVectorLayer","../layers/ArcGISDynamicMapServiceLayer","../layers/ArcGISTiledMapServiceLayer","../support/expressionUtils","../lang","../symbols/jsonUtils","../geometry/Point","../geometry/Polyline","../geometry/Polygon","../SpatialReference","../tasks/QueryTask","../tasks/query","dojo/i18n!../nls/jsapi","dijit/_Widget","dijit/_Templated","dojo/text!./templates/ExpressionEditor.html"],function(e,i,t,s,r,n,a,o,l,p,u,h,d,y,c,m,f,g,x,v,b,T,E,L,R,I,_,F,j,O,S,w,V,C,q,M,k,D){var P=e([M,k],{declaredClass:"esri.dijit.ExpressionEditor",basePath:require.toUrl("."),baseClass:"esriAGOExpressionEditor",widgetsInTemplate:!0,templateString:D,i18n:null,constructor:function(e,i){e&&(t.mixin(this,e),this.defaultExpressionScript=this.defaultExpressionScript||"")},destroy:function(){clearInterval(this.editorFrameListener),window.removeEventListener("message",this.receiveMessageHitch),this.inherited(arguments)},postMixInProperties:function(){this.inherited(arguments),this.i18n=t.clone(q.common),t.mixin(this.i18n,q.rendererCommon)},postCreate:function(){},_onClose:function(e){e.preventDefault(),r.publish("expression-cancel")},startup:function(){this.inherited(arguments),this._init()},_init:function(){var e=0;this.editorFrameLoaded=!1,this.editorUrl=this.arcadeEditor+"?locale="+i.locale,this._expressionEditor.onload=t.hitch(this,function(){f.set(this._expressionEditorLoading,"display","none"),f.set(this._expressionEditor,"visibility","visible")}),this._expressionEditor.src=this.editorUrl,this.receiveMessageHitch=t.hitch(this,"receiveMessage"),window.addEventListener("message",this.receiveMessageHitch,!1),this.editorFrameListener=setInterval(t.hitch(this,function(){this.editorFrameLoaded?(clearInterval(this.editorFrameListener),this.editorFrameListener=null):this.sendPostMessage({type:"isLoaded"}),e++,e>60&&r.publish("expression-cancel")}),500)},sendPostMessage:function(e){this._expressionEditor&&this._expressionEditor.contentWindow&&this._expressionEditor.contentWindow.postMessage(y.toJson(e),this.editorUrl)},receiveMessage:function(e){if(-1!==this.editorUrl.indexOf(e.origin)){var t="string"==typeof e.data?y.fromJson(e.data):e.data;switch(t.type){case"loaded":if(this.editorFrameLoaded=t.value,this.editorFrameLoaded){var s=this.layer instanceof T,n=this.layer instanceof E,a=this.mapLayer.layer instanceof L,o="esri.layers.ArcGISTiledMapServiceLayer"===this.mapLayer.layer.declaredClass;if(s||n){if(!this.mapLayer._queryResponse){var l=new V(this.layer.url),p=new C;return p.where="1=1",p.num=1,p.outFields=["*"],p.outSpatialReference=this.map.spatialReference,void l.execute(p,i.hitch(this,function(i){this.mapLayer._queryResponse=i,this.receiveMessage(e)}),i.hitch(this,function(){this.mapLayer._queryResponse={},this.receiveMessage(e)}))}}else if((a||o)&&this.layer.url&&(this.mapLayer._queryResponse=this.mapLayer._queryResponse||[],!this.mapLayer._queryResponse[this.layer.url]))return l=new V(this.layer.url),p=new C,p.where="1=1",p.num=1,p.outFields=["*"],p.outSpatialReference=this.map.spatialReference,void l.execute(p,i.hitch(this,function(i){this.mapLayer._queryResponse[this.layer.url]=i,this.receiveMessage(e)}),i.hitch(this,function(){this.mapLayer._queryResponse[this.layer.url]={},this.receiveMessage(e)}));this.sendPostMessage({type:"initializeDialog",title:this.expressionTitle?this.expressionTitle:this.i18n.custom,captureTitle:_.isDefined(this.captureTitle)?this.captureTitle:!0,predictOutputType:!0,script:this.expression?this.expression:this.defaultExpressionScript,profile:this.arcadeProfile?this.arcadeProfile:this.makeCurrentProfile(),existing:this.makeExistingList(),spatialReference:this.map.spatialReference.toJson()})}case"initFinished":this.editorFrameLoaded?console.log("editor app loaded"):console.log("editor app not loaded yet");break;case"scriptSaveAndClose":if(!t.script||t.script===this.defaultExpressionScript){r.publish("expression-cancel");break}var u=function(e){r.publish("expression-commit",[{expression:e.script,returnType:"Number"===e.predictOutputType?"esriFieldTypeDouble":"String"===e.predictOutputType?"esriFieldTypeString":"esriFieldTypeUnknown",title:e.title}])};I.hasGeometryOperations(t.script)?I.enableGeometryOperations().then(function(){u(t)}):u(t);break;case"scriptClose":r.publish("expression-cancel")}}},makeCurrentProfile:function(){var e=this.layer.fields,r=s.map(e,function(e){return e.domain&&s.indexOf(["range","codedValue"],e.domain.type)>-1&&(e=i.clone(e),e.domain=e.domain.toJson?e.domain.toJson():e.domain),e}),n=[{type:"Feature",value:{attributes:null,geometry:null,layer:{fields:r,objectIdField:this.layer.objectIdField,typeIdField:this.layer.typeIdField,types:this.layer.types?s.map(this.layer.types,function(e){return e.toJson?e.toJson():e}):null,templates:this.layer.templates}},id:_.isDefined(this.fieldId)?this.fieldId:"$feature"}];if(this.showViewScale&&n.push({type:"Dictionary",value:{attributes:{scale:this.map.getScale()},layer:{fields:[{name:"scale",alias:this.i18n.currentMapScale,type:"Number"}]}},id:"$view"}),this.mapLayer._queryResponse&&this.mapLayer._queryResponse.features&&this.mapLayer._queryResponse.features.length)n[0].value.attributes=t.clone(this.mapLayer._queryResponse.features[0].attributes),n[0].value.geometry=this.mapLayer._queryResponse.features[0].geometry;else if(this.mapLayer._queryResponse&&this.mapLayer._queryResponse[this.layer.url]&&this.mapLayer._queryResponse[this.layer.url].features&&this.mapLayer._queryResponse[this.layer.url].features.length)n[0].value.attributes=t.clone(this.mapLayer._queryResponse[this.layer.url].features[0].attributes),n[0].value.geometry=this.mapLayer._queryResponse[this.layer.url].features[0].geometry;else if(this.layer.graphics&&this.layer.graphics.length)n[0].value.attributes=t.clone(this.layer.graphics[0].attributes),n[0].value.geometry=this.layer.graphics[0].geometry.toJson();else{var a={};s.forEach(e,function(e){s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeString","esriFieldTypeDate","esriFieldTypeOID","esriFieldTypeGlobalID"],e.type)>-1&&e.nullable===!1?e.defaultValue?a[e.name]=e.defaultValue:s.indexOf(["esriFieldTypeString"],e.type)>-1?a[e.name]="":a[e.name]=0:a[e.name]=null}),n[0].value.attributes=a;var o=this.map.extent;"esriGeometryPolygon"==this.layer.geometryType||this.layer.getCustomRasterFields?(n[0].value.geometry=new S(new w(this.map.spatialReference.toJson())),n[0].value.geometry.addRing([[o.xmin,o.ymin],[o.xmax,o.ymin],[o.xmax,o.ymax],[o.xmin,o.ymax],[o.xmin,o.ymin]])):"esriGeometryPoint"==this.layer.geometryType||"esriGeometryMultipoint"==this.layer.geometryType?n[0].value.geometry=new j(o.getCenter().toJson()):"esriGeometryPolyline"==this.layer.geometryType&&(n[0].value.geometry=new O(new w(this.map.spatialReference.toJson())),n[0].value.geometry.addPath([[o.xmin,o.ymin],[o.xmax,o.ymax]]))}return n},makeExistingList:function(){var e=i.hitch(this,function(e,i,t){if(e&&(e.shortTitle!==this.expressionTitle||e.valueExpression!==this.expression)){var s={shortTitle:e.shortTitle||this.i18n.untitled,script:e.valueExpression,returnType:e.returnType};switch(t){case"color":s.title=o.substitute(this.i18n.expressionOriginColor,{title:s.shortTitle});break;case"size":s.title=o.substitute(this.i18n.expressionOriginSize,{title:s.shortTitle});break;case"type":s.title=o.substitute(this.i18n.expressionOriginColor,{title:s.shortTitle});break;case"transparency":s.title=o.substitute(this.i18n.expressionOriginTransparency,{title:s.shortTitle});break;case"rotation":s.title=o.substitute(this.i18n.expressionOriginRotation,{title:s.shortTitle});break;default:s.title=s.shortTitle}i.push(s)}}),t=[],r=this.getRendererCustomExpression(this.layer.renderer,"color");if(e(r,t,"color"),r=this.getRendererCustomExpression(this.layer.renderer,"size"),e(r,t,"size"),r=this.getRendererCustomExpression(this.layer.renderer,"type"),e(r,t,"type"),r=this.getRendererCustomExpression(this.layer.renderer,"transparency"),e(r,t,"transparency"),r=this.getRendererCustomExpression(this.layer.renderer,"rotation"),e(r,t,"rotation"),this.layer.labelingInfo||this.layer.drawingInfo&&this.layer.drawingInfo.labelingInfo){var n=this.layer.drawingInfo?this.layer.drawingInfo.labelingInfo[0]:this.layer.labelingInfo[0];n.labelExpressionInfo&&n.labelExpressionInfo.expression&&n.name&&(n.name!==this.expressionTitle||n.labelExpressionInfo.expression!==this.expression)&&t.push({shortTitle:n.name||this.i18n.untitled,title:o.substitute(this.i18n.expressionOriginLabels,{title:n.name||this.i18n.untitled}),script:n.labelExpressionInfo.expression})}var a=this.latestPopupInfo||this.mapLayer.popupInfo;if(!a&&this.mapLayer.itemLayers)for(var l=0;l<this.mapLayer.itemLayers.length;l++)if(this.mapLayer.itemLayers[l].id===this.layer.id){a=this.mapLayer.itemLayers[l].popupInfo;break}return a&&a.expressionInfos&&s.forEach(a.expressionInfos,function(e){!e||e.title===this.expressionTitle&&e.expression===this.expression||t.push({shortTitle:e.title||this.i18n.untitled,title:o.substitute(this.i18n.expressionOriginPopup,{title:e.title||this.i18n.untitled}),script:e.expression})},this),t},getRendererCustomExpression:function(e,i){if(!e)return null;if(e.valueExpression&&("esri.renderer.UniqueValueRenderer"==e.declaredClass||"esri.renderer.ClassBreaksRenderer"==e.declaredClass&&!this.getVisualVariableByType("colorInfo",null,e.visualVariables)&&!this.getVisualVariableByType("sizeInfo",null,e.visualVariables))&&"type"===i){var t="esriFieldTypeDouble";return"esri.renderer.UniqueValueRenderer"==e.declaredClass&&e.infos&&e.infos[0]&&"string"==typeof e.infos[0].value&&(t="esriFieldTypeString"),{valueExpression:e.valueExpression,returnType:t,shortTitle:e.valueExpressionTitle||e.legendOptions&&e.legendOptions.title}}if(e.visualVariables){var s=this.getVisualVariableByType("colorInfo",null,e.visualVariables);if(s&&s.valueExpression&&"color"===i)return{valueExpression:s.valueExpression,returnType:"esriFieldTypeDouble",shortTitle:s.valueExpressionTitle||s.legendOptions&&s.legendOptions.title};var r=this.getVisualVariableByType("sizeInfo",null,e.visualVariables);if(r&&r.valueExpression&&"size"===i)return{valueExpression:r.valueExpression,returnType:"esriFieldTypeDouble",shortTitle:r.valueExpressionTitle||r.legendOptions&&r.legendOptions.title};var n=this.getVisualVariableByType("opacityInfo",null,e.visualVariables);if(n&&n.valueExpression&&"transparency"===i)return{valueExpression:n.valueExpression,returnType:"esriFieldTypeDouble",shortTitle:n.valueExpressionTitle||n.legendOptions&&n.legendOptions.title};var a=this.getVisualVariableByType("rotationInfo",null,e.visualVariables);if(a&&a.valueExpression&&"rotation"===i)return{valueExpression:a.valueExpression,returnType:"esriFieldTypeDouble",shortTitle:a.valueExpressionTitle||a.legendOptions&&a.legendOptions.title}}return e.observationRenderer?this.getRendererCustomExpression(e.observationRenderer):e.latestObservationRenderer?this.getRendererCustomExpression(e.latestObservationRenderer):null},getVisualVariableByType:function(e,i,r){if(r){var n=s.filter(r,function(t){return _.isDefined(i)?t.type===e&&t.target===i:t.type===e&&!t.target});return n.length?t.clone(n[0]):null}return null}});return p("extend-esri")&&t.setObject("esri.dijit.ExpressionEditor",P),P});