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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/array","dojo/_base/Color","dojo/_base/window","dojo/dom-construct","dojo/i18n!../nls/jsapi","dojo/text!./templates/MosaicRule.html","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/query","dojo/number","dojo/has","dojo/date/locale","dojo/dnd/Source","../kernel","../config","../layers/MosaicRule","../renderers/SimpleRenderer","../symbols/SimpleFillSymbol","../layers/GraphicsLayer","../tasks/ImageServiceIdentifyTask","../tasks/ImageServiceIdentifyParameters","../tasks/QueryTask","../tasks/query","../geometry/Polygon","../geometry/Point","../geometry/Extent","dijit/Calendar","dijit/form/DropDownButton","dijit/form/CheckBox","dijit/TooltipDialog","dijit/layout/ContentPane"],function(e,t,i,s,a,r,o,l,n,c,h,d,u,_,p,y,O,R,m,k,g,M,T,b,f,w,v,I,F,x){var C=e([c,h,d],{declaredClass:"esri.dijit.MosaicRule",templateString:n,widgetsInTemplate:!0,layer:null,map:null,parent:null,hideApplyButton:!1,hideLockRasterSelectionIdButton:!1,_MosaicRuleObject:null,_fieldType:null,_identifyTask:null,_identify:null,_queryTask:null,_query:null,_graphicsLayer:null,_app:null,_initialExtent:null,_getpoint:null,_internalApplyMosaic:!1,_previousOrderFieldIndex:-1,constructor:function(t){e.safeMixin(this,t),this._i18n=l;var i=new g((new M).setColor(new a([150,150,150,.5])));this._graphicsLayer=new T,this._graphicsLayer.setRenderer(i),this.map.addLayer(this._graphicsLayer)},startup:function(){this.inherited(arguments);var e=t.hitch(this,"_onclickTooltip"),s=t.hitch(this,"_oncloseTooltip"),a=t.hitch(this,"_onclickLayerlist"),r=t.hitch(this,"_OnOpenQueryPopup"),o=t.hitch(this,"_OnCloseQueryPopup"),l=t.hitch(this,"_OnChangeMosaicRule"),n=t.hitch(this,"_OnChangeOrderField"),c=t.hitch(this,"_OnChangeLockRaster"),h=t.hitch(this,"_OnClickCurrentExtent"),d=t.hitch(this,"_OnChangeMosaicOperator"),u=t.hitch(this,"_OnClickDescending"),_=t.hitch(this,"_OnChangeQueryOrderField"),p=t.hitch(this,"_OnChangeQueryOperator"),y=t.hitch(this,"_OnKeyupQueryValue"),O=t.hitch(this,"_OnClickApplyMosaic"),R=t.hitch(this,"_OnClickResetMosaic");i.connect(this._lockRasterTooltip,"onclick",e),i.connect(this._lockRasterTooltip,"onClose",s),i.connect(this._layerList,"onclick",a),i.connect(this._queryTooltip,"onOpen",r),i.connect(this._queryTooltip,"onClose",o),i.connect(this._mosaicRule,"onchange",l),i.connect(this._orderField,"onchange",n),i.connect(this._lockRaster,"onkeyup",c),i.connect(this._aoi,"onclick",h),i.connect(this._mosaicOperator,"onchange",d),i.connect(this._descending,"onclick",u),i.connect(this._queryOrderField,"onchange",_),i.connect(this._queryOperator,"onchange",p),i.connect(this._queryValue,"onkeyup",y),i.connect(this._apply,"onclick",O),i.subscribe("onMosaicRuleApply",O),i.subscribe("onMosaicRuleReset",R),this._descending.checked=!1,this.hideApplyButton&&(this._apply.style.display="none"),this.hideLockRasterSelectionIdButton&&(this._lockRasterIdSelect.domNode.style.display="none",this._lockRaster.style.width="100%"),this._where.style.display="none",this._whereLabel.style.display="none",this._queryBlock.domNode.style.display="none"},_init:function(){this._MosaicRuleObject=new k,this._MosaicRuleObject.ascending=!0,this._getpoint=0,this._fieldType=[],this._app={},o.empty(this._layerList),this._orderValueDate.domNode.style.display="none",this._identifyTask=new b(this.layer.url),this._identify=new f,this._queryTask=new w(this.layer.url),this._query=new v},_buildRasterList:function(){this._lockRasterMsg.style.display="",this._lockRasterMsg.innerHTML=this._i18n.widgets.mosaicRule.lockRasterRequestMsg;var e=new x(this.layer.fullExtent.toJson());this.layer.fullExtent.contains(this.map.extent)&&(e=new x(this.map.extent.toJson())),this.layer.version>=10&&this.map.wrapAround180&&(e=e._normalize(!0));var i=I.fromExtent(e),s=(e.xmax-e.xmin)/(2*this.map.width),a=(e.ymax-e.ymin)/(2*this.map.height),r=e.spatialReference,o=new F(s,a,r),l=this._identifyTask,n=this._identify;this.layer.version>10.1&&(l=this._queryTask,n=this._query),n.geometry=i,n.pixelSize=o,n.returnGeometry=!1;var c=t.hitch(this,"_errorRastersInAOI"),h=t.hitch(this,"_showRastersInAOI");l.execute(n,function(e){h(e)},function(e){c(e)})},_setLayerAttr:function(e){this.inherited(arguments),this.layer=e,i.connect(this.layer,"onMosaicRuleChange",t.hitch(this,"_onLayerMosaicRuleChange")),this._init();var s;for(s=this._mosaicRule.options.length-1;s>=0;s--)this._mosaicRule.remove(s);for(s=this._mosaicOperator.options.length-1;s>=0;s--)this._mosaicOperator.remove(s);for(s=this._orderField.options.length;s>0;)this._orderField.remove(s-1),s=this._orderField.options.length;this._orderValueText.value="",this._where.value="<where>",this._orderFieldBlock.style.display="",this._lockRasterBlock.style.display="",this._descendingBlock.style.display="",this._graphicsLayer.clear();var a=t.hitch(this,"_initUsingServiceInfo");this.layer.loaded?this._initUsingServiceInfo(this.layer):i.connect(this.layer,"onLoad",a)},_initUsingServiceInfo:function(e){if(!e.fields||0===e.fields.length)return this._mosaicRuleLabel.innerHTML=this._i18n.widgets.mosaicRule.mosaicruleNotApplicable,void this._hideAllControls();this._mosaicRuleLabel.innerHTML=this._i18n.widgets.mosaicRule.mosaicMethodLabel,this._showAllControls();var t=new x(e.extent);this._initialExtent=t,this.hideLockRasterSelectionIdButton||this._buildRasterList(),this._populateOrderFieldsList(e.fields),e.sortField&&(this._MosaicRuleObject.sortField=e.sortField),e.sortValue&&(this._orderValueText.value=e.sortValue,this._MosaicRuleObject.sortValue=e.sortValue,"esriFieldTypeDate"===this._fieldType[this._orderField.selectedIndex]&&this._orderValueDate.set("value",new Date(this._MosaicRuleObject.sortValue)));var i="None,ByAttribute,Center,Nadir,LockRaster,NorthWest,Seamline";e.hasOwnProperty("currentVersion")&&e.currentVersion>=10.1&&e.allowedMosaicMethods.length>1&&(i=e.allowedMosaicMethods,i.toLowerCase().indexOf("none")<0&&(i+=",None")),this._populateMosaicMethodsList(i);var s=e.defaultMosaicMethod;s||(s="northwest"),this._MosaicRuleObject.method=this._esriStringMosaicMethodToEnum(s),this._populateMosaicOperatorsList(e.defaultMosaicMethod),this._MosaicRuleObject.operation=this._esriStringMosaicOperatorToEnum(e.mosaicOperator),this._MosaicRuleObject.ascending=!0,this.layer.mosaicRule&&this.layer.mosaicRule.multidimensionalDefinition&&(this._MosaicRuleObject.multidimensionalDefinition=this.layer.mosaicRule.multidimensionalDefinition);var a=this.layer&&this.layer.mosaicRule?this.layer.mosaicRule:this._MosaicRuleObject;this._setDefaultValues(a)},_populateOrderFieldsList:function(e){e.sort(function(e,t){return e.alias.localeCompare(t.alias)});var t;for(t in e)("esriFieldTypeDouble"===e[t].type||"esriFieldTypeSingle"===e[t].type||"esriFieldTypeInteger"===e[t].type||"esriFieldTypeSmallInteger"===e[t].type||"esriFieldTypeOID"===e[t].type||"esriFieldTypeDate"===e[t].type)&&(this._orderField.add(new Option(e[t].alias,e[t].name),this._orderField.length),this._queryOrderField.add(new Option(e[t].name),this._queryOrderField.length),this._fieldType.push(e[t].type));0===this._orderField.children.length&&this._orderField.add(new Option(this._i18n.widgets.mosaicRule.orderFieldNotFound,this._i18n.widgets.mosaicRule.orderFieldNotFound),!0)},_populateMosaicMethodsList:function(e){e.toLowerCase().indexOf("none")>=0&&this._addItemToMosaicMethodList("none"),e.toLowerCase().indexOf("byattribute")>=0&&this._addItemToMosaicMethodList("byattribute"),e.toLowerCase().indexOf("center")>=0&&this._addItemToMosaicMethodList("center"),e.toLowerCase().indexOf("northwest")>=0&&this._addItemToMosaicMethodList("northwest"),e.toLowerCase().indexOf("nadir")>=0&&this._addItemToMosaicMethodList("nadir"),e.toLowerCase().indexOf("seamline")>=0&&this._addItemToMosaicMethodList("seamline"),e.toLowerCase().indexOf("lockraster")>=0&&this._addItemToMosaicMethodList("lockraster")},_addItemToMosaicMethodList:function(e){var t=this._mosaicMethodNameToAlias(e);this._mosaicRule.add(new Option(t,e),this._mosaicRule.length)},_populateMosaicOperatorsList:function(e){var t,i=this._mosaicOperator.options.length,s=i?this._mosaicOperator.options[this._mosaicOperator.selectedIndex].value.toLowerCase():null;for(t=i-1;t>=0;t--)this._mosaicOperator.remove(t);if(e&&"seamline"===e.toLowerCase()?(this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.firstAlias,"First"),0),this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.blendAlias,"Blend"),1)):(this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.firstAlias,"First"),0),this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.minAlias,"Min"),1),this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.maxAlias,"Max"),2),this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.averageAlias,"Mean"),3),this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.sumAlias,"Sum"),4),this._mosaicOperator.add(new Option(this._i18n.widgets.mosaicRule.blendAlias,"Blend"),5)),this._mosaicOperator.selectedIndex=0,null!==s)for(t=this._mosaicOperator.options.length-1;t>=0;t--){var a=this._mosaicOperator.children[t].value;if(a.toLowerCase()===s.toLowerCase()){this._mosaicOperator.selectedIndex=t;break}}},_onLayerMosaicRuleChange:function(){return this._internalApplyMosaic?void(this._internalApplyMosaic=!1):void this._setDefaultValues(this.layer.mosaicRule)},_setDefaultValues:function(e){if(e){var t,i;if(e.sortField)for(t=0;t<this._orderField.children.length;t++)if(i=this._orderField.children[t].value,e.sortField.toLowerCase()===i.toLowerCase()){this._orderField.selectedIndex=t,this._OnChangeOrderField();break}e.sortValue&&(this._MosaicRuleObject.sortValue=e.sortValue,this._MosaicRuleObject.sortField=e.sortField,this._orderValueText.value=e.sortValue,"esriFieldTypeDate"===this._fieldType[this._orderField.selectedIndex]&&this._orderValueDate.set("value",new Date(e.sortValue)));var s=this._esriEnumMosaicOperatorToString(e.operation);for(t=0;t<this._mosaicOperator.children.length;t++)if(i=this._mosaicOperator.children[t].value,s.toLowerCase()===i.toLowerCase()){this._mosaicOperator.selectedIndex=t,this._OnChangeMosaicOperator();break}var a=this._esriEnumMosaicMethodToString(e.method);for(t=0;t<this._mosaicRule.children.length;t++)if(i=this._mosaicRule.children[t].value,a.toLowerCase()===i.toLowerCase()){this._mosaicRule.selectedIndex=t,this._OnChangeMosaicRule();break}"lockraster"===a.toLowerCase()&&e.lockRasterIds&&(this._lockRaster.value=e.lockRasterIds),e.where&&(this._where.value=e.where),null!==e.ascending?this._descending.checked=!e.ascending:this._descending.checked=!1}},_selectAllCheckboxOnChange:function(){var e=t.hitch(this,"_checkboxOnChange"),i=u(".mosaicRuleLayerlistSelectCheckbox",this._layerList),s=u(".mosaicRuleLayerlistCheckbox",this._layerList);i.forEach(function(t){t.checked?s.forEach(function(t){t.checked=!0,e()}):s.forEach(function(t){t.checked=!1,e()})})},_OnOpenQueryPopup:function(){this._where.disabled=!0},_OnCloseQueryPopup:function(){if(this._where.disabled=!1,"<None>"!==this._queryOrderField.options[this._queryOrderField.selectedIndex].text){try{this._queryOrderField.add(new Option("<None>"),this._queryOrderField.options[0])}catch(e){this._queryOrderField.add(new Option("<None>"),0)}this._queryOrderField.selectedIndex=0}if("<None>"!==this._queryOperator.options[this._queryOperator.selectedIndex].text){try{this._queryOperator.add(new Option("<None>"),this._queryOperator.options[0])}catch(t){this._queryOperator.add(new Option("<None>"),0)}this._queryOperator.selectedIndex=0}this._queryValue.value=""},_onclickLayerlist:function(){this._getpoint=1},_onclickTooltip:function(){0===this._getpoint&&(this._app.dndSource.selectNone(),this._graphicsLayer.clear()),this._getpoint=0},_oncloseTooltip:function(){this._graphicsLayer.clear()},_checkboxOnChange:function(){var e=[],t=0,i=0,s=u(".mosaicRuleLayerlistSelectCheckbox",this._layerList),a=u(".mosaicRuleLayerlistCheckbox",this._layerList);a.forEach(function(s){t++,s.checked===!0&&(i++,e.push(parseInt(s.id,10)))}),i!==t&&s.forEach(function(e){e.checked=!1}),i===t&&s.forEach(function(e){e.checked=!0}),0===e.length?this._lockRaster.value=null:this._lockRaster.value=e},_selectRaster:function(){this._graphicsLayer.clear();var e=t.hitch(this,"_setGraphicQuery"),i=this._app.dndSource.getSelectedNodes();i.forEach(function(t){var i=u(".mosaicRuleLayerlistCheckbox",t);i.forEach(function(t){e(t.id)})})},_setGraphicQuery:function(e){var i=t.hitch(this,"_addResultsToMap");this._query.geometry=this._initialExtent,this._query.returnGeometry=!0,this._query.where="OBJECTID = "+e,this._queryTask.execute(this._query,i)},_addResultsToMap:function(e){var i=t.hitch(this,"_addEachFeatureToMap");e.features.forEach(i)},_addEachFeatureToMap:function(e){this._graphicsLayer.add(e)},_reorderRaster:function(){var e=u(".mosaicRuleLayerlistCheckbox",this._layerList),t=[];e.forEach(function(e){e.checked===!0&&t.push(parseInt(e.id,10))});var i,s=t.length,a=0;for(i=0;i!==s/2;i++){a=0;var r;for(r=0;r<t.length-1;r++)if(t[t.length-1]===t[r]){t.splice(t.length-1,1),a=1;break}if(0===a)break}0===t.length?this._lockRaster.value=null:this._lockRaster.value=t},_showRastersInAOI:function(e){this._graphicsLayer.clear();var a;if(a=e&&e.catalogItems?e.catalogItems.features:e.features,(!e||!a||a.length<1)&&!this.hideLockRasterSelectionIdButton)return void(this._lockRasterMsg.innerHTML=this._i18n.widgets.mosaicRule.lockRasterRequestNoRasterMsg);this._lockRasterMsg.innerHTML=this._i18n.widgets.mosaicRule.lockRasterRequestDoneMsg,this._lockRasterMsg.style.display="none",this._app.hasOwnProperty("dndSource")&&(this._app.dndSource.destroy(),o.empty(this._layerList));var l=[];this.layer&&this.layer.mosaicRule&&this.layer.mosaicRule.lockRasterIds&&(l=this.layer.mosaicRule.lockRasterIds);var n,c=[],h=[],d=t.hitch(this,"_checkboxOnChange"),u=t.hitch(this,"_selectAllCheckboxOnChange");for(n=0;n<a.length;n++){var _=o.create("div"),p=o.create("input");p.type="checkbox",p.className="mosaicRuleLayerlistCheckbox",p.id=a[n].attributes.OBJECTID,a[n].attributes.hasOwnProperty("checked")?a[n].attributes.checked?(p.checked=!0,c.push(a[n].attributes.OBJECTID)):p.checked=!1:(0===l.length?p.checked=!0:p.checked=-1===s.indexOf(l,a[n].attributes.OBJECTID)?!1:!0,c.push(a[n].attributes.OBJECTID)),i.connect(p,"onchange",d),_.appendChild(p);var y=o.create("label");y.appendChild(r.doc.createTextNode(a[n].attributes.OBJECTID)),_.appendChild(y),h.push(_)}a.length>0&&!a[0].attributes.hasOwnProperty("checked")&&l.length<=0&&(this._lockRaster.value=c),this._MosaicRuleObject.ascending=!0;var R=o.create("input");R.type="checkbox",R.id="select",R.name=this._i18n.widgets.mosaicRule.selectAllLabel,R.className="mosaicRuleLayerlistSelectCheckbox",e.hasOwnProperty("selectAll")?e.selectAll?R.checked=!0:R.checked=!1:R.checked=!0,i.connect(R,"onchange",u);var m=o.create("div");m.appendChild(R);var k=o.create("label");k.appendChild(r.doc.createTextNode(this._i18n.widgets.mosaicRule.selectAllLabel)),m.appendChild(k),this._layerList.appendChild(m),this._app.dndSource=new O(this._layerList),this._app.dndSource.insertNodes(!1,h);var g=t.hitch(this,"_reorderRaster"),M=t.hitch(this,"_selectRaster");i.connect(this._app.dndSource,"onDndDrop",g),i.connect(this._app.dndSource,"onMouseUp",M)},_errorRastersInAOI:function(){this._lockRasterMsg.innerHTML=this._i18n.widgets.mosaicRule.lockRasterRequestErrorMsg},_OnChangeLockRaster:function(){var e={},t=[],i=[],a=this._lockRaster.value.split(","),r=u(".mosaicRuleLayerlistCheckbox",this._layerList);r.forEach(function(e){t.push(e.id),e.checked=!1});var o,l;if(a.length>0)for(o=0;o<a.length;o++)if(0!==a[o].length&&!isNaN(a[o])){var n=s.indexOf(t,a[o]);-1!==n&&(l={},l.attributes={},l.attributes.OBJECTID=a[o],l.attributes.checked=1,i.push(l))}var c;for(o=0;o<t.length;o++){c=0;var h;for(h=0;h<i.length;h++)t[o]===i[h].attributes.OBJECTID&&(c=1);0===c&&(l={},l.attributes={},l.attributes.OBJECTID=t[o],l.attributes.checked=0,i.push(l))}e.catalogItems={},e.catalogItems.features=i,e.selectAll=0,t.length===a.length&&(e.selectAll=1),this._showRastersInAOI(e)},_OnClickCurrentExtent:function(){this._buildRasterList()},_OnClickApplyMosaic:function(){var e=[];if(this._MosaicRuleObject.method===k.METHOD_LOCKRASTER){var t=this._lockRaster.value.split(",");if(!(t.length>0))return;var i;for(i=0;i<t.length;i++)(0===t[i].length||isNaN(t[i]))&&(t.splice(i,1),i--);if(0===t.length)return;for(i=0;i<t.length;i++)e.push(parseInt(t[i],10));this._MosaicRuleObject.lockRasterIds=e}this._MosaicRuleObject.method===k.METHOD_ATTRIBUTE&&("esriFieldTypeSmallInteger"===this._fieldType[this._orderField.selectedIndex]||"esriFieldTypeInteger"===this._fieldType[this._orderField.selectedIndex]||"esriFieldTypeDouble"===this._fieldType[this._orderField.selectedIndex]||"esriFieldTypeSingle"===this._fieldType[this._orderField.selectedIndex]?this._MosaicRuleObject.sortValue=_.parse(this._orderValueText.value):this._MosaicRuleObject.sortValue=y.format(this._orderValueDate.get("value"),{datePattern:"yyyy/MM/dd"})),"<where>"!==this._where.value&&this._where.value.length>1?this._MosaicRuleObject.where=this._where.value:this._MosaicRuleObject.where=null,this.layer.mosaicRule&&this.layer.mosaicRule.multidimensionalDefinition&&(this._MosaicRuleObject.multidimensionalDefinition=this.layer.mosaicRule.multidimensionalDefinition),this._internalApplyMosaic=!0,this.layer.setMosaicRule(this._MosaicRuleObject)},_OnClickResetMosaic:function(){this.layer&&(this.layer.mosaicRule=null,this._mosaicRule.options.length=0,this._orderField.options.length=0,this._previousOrderFieldIndex=-1,this._initUsingServiceInfo(this.layer),this._OnClickApplyMosaic())},_OnChangeOrderField:function(){var e=this._orderField.children[this._orderField.selectedIndex].value;this._MosaicRuleObject.sortField=e;var t=this._fieldType[this._orderField.selectedIndex];switch(t){case"esriFieldTypeOID":case"esriFieldTypeInteger":case"esriFieldTypeSmallInteger":case"esriFieldTypeDouble":case"esriFieldTypeSingle":this._orderValueTextBlock.style.display="",this._showDateControl(!1),this._orderValueText.value=this._getDefaultOrderFieldValue(t,e);break;case"esriFieldTypeDate":this._orderValueTextBlock.style.display="",this._showDateControl(!0);var i=this._getDefaultOrderFieldValue(t,e);this._orderValueDate.set("value",i);break;default:this._orderValueTextBlock.style.display="none",this._showDateControl(!1)}this._previousOrderFieldIndex=this._orderField.selectedIndex},_getDefaultOrderFieldValue:function(e,t){if(this._previousOrderFieldIndex<0)return"esriFieldTypeDate"===e?this.layer.sortField&&t.toLowerCase()===this.layer.sortField.toLowerCase()&&this.layer.sortValue?new Date(this.layer.sortValue):new Date:"0";var i=this._fieldType[this._previousOrderFieldIndex],s=this._orderValueText.value;"esriFieldTypeDate"===i&&(s=new Date(this._orderValueDate.get("value")));var a,r,o;return this.layer.timeInfo&&(a=this.layer.timeInfo.startTimeField,r=this.layer.timeInfo.endTimeField,this.layer.timeInfo.timeExtent&&(o=this.layer.timeInfo.timeExtent.endTime)),i&&i!==e?this._isFieldNumeric(e)?"0":"esriFieldTypeDate"===e?a&&t.toLowerCase()===a.toLowerCase()||r&&t.toLowerCase()===r.toLowerCase()?o:this.layer.sortField&&t.toLowerCase()===this.layer.sortField.toLowerCase()&&this.layer.sortValue?new Date(this.layer.sortValue):new Date:"":s},_isFieldNumeric:function(e){var t=!1;return("esriFieldTypeOID"===e||"esriFieldTypeInteger"===e||"esriFieldTypeSmallInteger"===e||"esriFieldTypeDouble"===e||"esriFieldTypeSingle"===e)&&(t=!0),t},_OnChangeMosaicOperator:function(){this._MosaicRuleObject.operation=this._esriStringMosaicOperatorToEnum(this._mosaicOperator.options[this._mosaicOperator.selectedIndex].value)},_OnClickDescending:function(){this._MosaicRuleObject.ascending=!1,this._descending.checked||(this._MosaicRuleObject.ascending=!0)},_OnChangeMosaicRule:function(){var e=this._mosaicRule.options[this._mosaicRule.selectedIndex].value;switch(this._populateMosaicOperatorsList(e),this._OnChangeMosaicOperator(),this._graphicsLayer.clear(),this._lockRasterBlock.style.display="",this._orderFieldBlock.style.display="",this._descendingBlock.style.display="",null===this._MosaicRuleObject.ascending&&(this._MosaicRuleObject.ascending=!this._descending.checked),this._apply.value="APPLY",e.toLowerCase()){case"none":this._MosaicRuleObject.lockRasterIds=null,this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._orderFieldBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_NONE;break;case"byattribute":this._MosaicRuleObject.sortField=this._orderField.options[this._orderField.selectedIndex].value,this._MosaicRuleObject.lockRasterIds=null,this._lockRasterBlock.style.display="none",this._OnChangeOrderField(),this._MosaicRuleObject.method=k.METHOD_ATTRIBUTE;break;case"center":this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._MosaicRuleObject.lockRasterIds=null,this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._orderFieldBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_CENTER;break;case"nadir":this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._MosaicRuleObject.lockRasterIds=null,this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._orderFieldBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_NADIR;break;case"viewpoint":this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._MosaicRuleObject.lockRasterIds=null,this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._orderFieldBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_VIEWPOINT;break;case"lockraster":this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._orderValueTextBlock.style.display="none",this._orderFieldBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_LOCKRASTER;break;case"northwest":this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._MosaicRuleObject.lockRasterIds=null,this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._orderFieldBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_NORTHWEST;break;case"seamline":this._MosaicRuleObject.ascending=null,this._MosaicRuleObject.sortField=null,this._MosaicRuleObject.sortValue=null,this._MosaicRuleObject.lockRasterIds=null,this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._orderFieldBlock.style.display="none",this._descendingBlock.style.display="none",this._MosaicRuleObject.method=k.METHOD_SEAMLINE;break;default:console.log("info not available")}},_OnChangeQueryOrderField:function(){this._where.value="";var e=this._queryOrderField.children[0].innerText;e||(e=this._queryOrderField.children[0].text),"<None>"===e&&this._queryOrderField.remove(0),this._where.value=this._queryOrderField.options[this._queryOrderField.selectedIndex].text,"<None>"!==this._queryOperator.options[this._queryOperator.selectedIndex].text&&(this._where.value=this._where.value+" "+this._queryOperator.options[this._queryOperator.selectedIndex].text),this._queryValue.value.length>0&&(this._where.value=this._where.value+" "+this._queryValue.value)},_OnChangeQueryOperator:function(){this._where.value="";var e=this._queryOperator.children[0].innerText;e||(e=this._queryOperator.children[0].text),"<None>"===e&&this._queryOperator.remove(0),"<None>"!==this._queryOrderField.options[this._queryOrderField.selectedIndex].text&&(this._where.value=this._queryOrderField.options[this._queryOrderField.selectedIndex].text),this._where.value=this._where.value+" "+this._queryOperator.options[this._queryOperator.selectedIndex].text,this._queryValue.value.length>0&&(this._where.value=this._where.value+" "+this._queryValue.value)},_OnKeyupQueryValue:function(){this._where.value="","<None>"!==this._queryOrderField.options[this._queryOrderField.selectedIndex].text&&(this._where.value=this._queryOrderField.options[this._queryOrderField.selectedIndex].text),"<None>"!==this._queryOperator.options[this._queryOperator.selectedIndex].text&&(this._where.value=this._where.value+" "+this._queryOperator.options[this._queryOperator.selectedIndex].text),this._where.value=this._where.value+" "+this._queryValue.value},_esriEnumMosaicMethodToString:function(e){var t="none";switch(e){case k.METHOD_ATTRIBUTE:t="byattribute";break;case k.METHOD_CENTER:t="center";break;case k.METHOD_LOCKRASTER:t="lockraster";break;case k.METHOD_NADIR:t="nadir";break;case k.METHOD_NORTHWEST:t="northwest";break;case k.METHOD_SEAMLINE:t="seamline";break;case k.METHOD_VIEWPOINT:t="viewpoint"}return t},_esriStringMosaicMethodToEnum:function(e){if(e){var t=k.METHOD_NONE;switch(e.toLowerCase()){case"byattribute":t=k.METHOD_ATTRIBUTE;break;case"center":t=k.METHOD_CENTER;break;case"lockraster":t=k.METHOD_LOCKRASTER;break;case"nadir":t=k.METHOD_NADIR;break;case"northwest":t=k.METHOD_NORTHWEST;break;case"seamline":t=k.METHOD_SEAMLINE;break;case"viewpoint":t=k.METHOD_VIEWPOINT}return t}},_esriStringMosaicOperatorToEnum:function(e){if(e)switch(e.toLowerCase()){case"first":return k.OPERATION_FIRST;case"last":return k.OPERATION_LAST;case"max":return k.OPERATION_MAX;case"min":return k.OPERATION_MIN;case"blend":return k.OPERATION_BLEND;case"mean":return k.OPERATION_MEAN;case"sum":return k.OPERATION_SUM}},_esriEnumMosaicOperatorToString:function(e){var t="first";switch(e){case k.OPERATION_FIRST:t="first";break;case k.OPERATION_LAST:t="last";break;case k.OPERATION_MAX:t="max";break;case k.OPERATION_MIN:t="min";break;case k.OPERATION_BLEND:t="blend";break;case k.OPERATION_MEAN:t="mean";break;case k.OPERATION_SUM:t="sum"}return t},_mosaicMethodNameToAlias:function(e){if(e){var t="";switch(e.toLowerCase()){case"none":t=this._i18n.widgets.mosaicRule.noneAlias;break;case"byattribute":t=this._i18n.widgets.mosaicRule.byAttributeAlias;break;case"center":t=this._i18n.widgets.mosaicRule.centerAlias;break;case"lockraster":t=this._i18n.widgets.mosaicRule.lockRasterAlias;break;case"nadir":t=this._i18n.widgets.mosaicRule.nadirAlias;break;case"northwest":t=this._i18n.widgets.mosaicRule.northWestAlias;break;case"seamline":t=this._i18n.widgets.mosaicRule.seamlineAlias;break;case"viewpoint":t=this._i18n.widgets.mosaicRule.viewPointAlias}return t}},_showAllControls:function(){this._mosaicRule.style.display="initial",this._mosaicOperatorLabelBlock.style.display="table-row",this._mosaicOperatorBlock.style.display="table-row",this._orderFieldBlock.style.display="table-row",this._orderValueTextBlock.style.display="table-row",this._lockRasterBlock.style.display="table-row",this._descendingBlock.style.display="table-row",this.hideApplyButton||(this._apply.style.display="initial")},_hideAllControls:function(){this._mosaicRule.style.display="none",this._mosaicOperatorLabelBlock.style.display="none",this._mosaicOperatorBlock.style.display="none",this._orderFieldBlock.style.display="none",this._orderValueTextBlock.style.display="none",this._lockRasterBlock.style.display="none",this._descendingBlock.style.display="none",this._apply.style.display="none"},_showDateControl:function(e){e?(this._orderValueDate.domNode.style.display="",this._orderValueText.style.display="none"):(this._orderValueDate.domNode.style.display="none",this._orderValueText.style.display="")}});return p("extend-esri")&&t.setObject("dijit.MosaicRule",C,R),C});