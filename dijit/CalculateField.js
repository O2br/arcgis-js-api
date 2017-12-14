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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/kernel","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/_base/event","dojo/Evented","dojo/fx/easing","dojo/store/Memory","dojo/mouse","dojo/on","dojo/topic","dojo/_base/window","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/MultiSelect","dijit/form/TextBox","dijit/form/SimpleTextarea","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/ComboBox","dijit/Dialog","dijit/Tooltip","dgrid/OnDemandList","dgrid/Selection","dgrid/Keyboard","dgrid/extensions/DijitRegistry","dgrid/util/mouse","put-selector/put","../kernel","../lang","../request","./SingleFilter","./ExpressionEditor","dojo/i18n!../nls/jsapi","dojo/text!./templates/CalculateField.html"],function(e,t,i,s,n,r,o,a,l,h,d,c,u,p,f,_,m,x,b,y,g,T,C,F,v,E,L,S,B,w,R,M,N,I,O,A,D,j,P,H,U,k,q,G,W,Q,V,J,X,K,$,z,Y,Z){var ee=e([k,G,q,W]),te={base:"esriCalcField",titleLabel:"esriCalcTitleLabel",selectField:"esriCalcSelField",expressionBox:"esriExprBox",actionBtnContainer:"esriActionButtonCtr",validateIcon:"esriCalcFieldValidateIcon",validateDisabledIcon:"esriCalcFieldValidateDisabledIcon",actionButton:"esriActionButton",clearIcon:"esriCalcFieldClearIcon",clearDisabledIcon:"esriCalcFieldClearDisabledIcon",fieldFunctionContainer:"esriCalcFieldFuncCtr",fieldContainer:"esriCalcFieldCtr",functionContainer:"esriCalcFuncCtr",fieldLabelDiv:"esriFieldsLabelDiv",functionLabelDiv:"esriFunctionLabelDiv",fieldListContainer:"esriCalcFieldsList",functionListContainer:"esriCalcFunctionList",fieldTypeContainer:"esriFieldsSelectionCtr",loadingIcon:"esriLoadingLarge",formWarning:"esriFormWarning",formSuccess:"esriFormSuccess",addButton:"",closeButton:"",actionDividerLine:"esriActionDividerLine",titleDividerLine:"esriTitleDivideLine"},ie=e([F,v,E,L,S,m],{declaredClass:"esri.dijit.CalculateField",templateString:Z,widgetsInTemplate:!0,showSelectField:!1,showHeader:!0,closeOnAdd:!0,addButtonClass:"",closeButtonClass:"",_showMsgTimerInterval:3e3,showHelp:!1,expressionBoxRows:4,expressionBoxCols:2,baseClass:te.base,constructor:function(e){e.containerNode&&(this.container=e.containerNode),this._css=t.mixin(te,e.css),this.expressionMode=X.isDefined(e.expressionMode)?e.expressionMode:ie.MODE_SQL,this.fieldId=e.fieldId,this.arcadeProfile=e.arcadeProfile},destroy:function(){this.inherited(arguments)},postMixInProperties:function(){this.inherited(arguments),this.i18n={},t.mixin(this.i18n,Y.common),t.mixin(this.i18n,Y.calculateFields),this.calculateLabel||(this.calculateLabel=this.i18n.calculate)},postCreate:function(){if(this.inherited(arguments),this.expressionMode===ie.MODE_ARCADE)this._loadArcadeUIEvents(),this._buildArcadeEditorUI();else{this._buildUI(),this._loadEvents();var e,t,i=["ar","he"];for(this.onlineHelpMap={},e=0;e<i.length;e+=1)t=i[e],r.locale&&-1!==r.locale.indexOf(t)&&(-1!==r.locale.indexOf("-")?-1!==r.locale.indexOf(t+"-")&&(this._isRightToLeft=!0):this._isRightToLeft=!0);d.set(this._helpNode,"display",this.showHelp?"block":"none"),this.helpUrl&&c.set(this._helpurlNode,"href",this.helpUrl),this.validate()}},_loadArcadeUIEvents:function(){t.mixin(this.i18n,Y.expressionEditor),this.own(this.watch("layer",t.hitch(this,this._buildArcadeEditorUI)))},_buildArcadeEditorUI:function(){this.expressionEditor&&this._destroyArcadeUI();var e=this.expressionMode===ie.MODE_ARCADE;d.set(this._expressionForm,"display",e?"none":"block"),d.set(this._headerPane.domNode,"display",e?"none":"block"),d.set(this._arcadeExpressionEditorDlg,"display",e?"block":"none"),this.expressionEditorCommitHandler=T.subscribe("expression-commit",t.hitch(this,function(e){this.set("expression",e.expression),this.emit("expression-add",e),this.emit("close",{})})),this.expressionEditorCancelHandler=T.subscribe("expression-cancel",t.hitch(this,function(){this.emit("close",{})})),X.isDefined(this.fieldId)||(this.fieldId="$feature"),this.expressionEditor=new z({arcadeEditor:this.arcadeEditor,map:this.map,mapLayer:{layer:this.layer,popupInfo:this.layer.infoTemplate?this.layer.infoTemplate.toJson():null},layer:this.layer,expression:this.expression,captureTitle:!1,fieldId:this.fieldId,arcadeProfile:this.arcadeProfile,showViewScale:!1},u.create("div",null,this._arcadeExpressionEditorDlg)),this.expressionEditor.startup(),this.own(this.watch("arcadeProfile",t.hitch(this,function(){this.expressionEditor.set("arcadeProfile",this.get("arcadeProfile"))})))},_destroyArcadeUI:function(){this.expressionEditorCommitHandler&&this.expressionEditorCommitHandler.remove(),this.expressionEditorCommitHandler=null,this.expressionEditorCancelHandler&&this.expressionEditorCancelHandler.remove(),this.expressionEditorCancelHandler=null,this.expressionEditor&&this.expressionEditor.destroy(),this.expressionEditor=null,this.expression&&(this.expression=null)},_buildUI:function(){var e,s,n,r=[];if(d.set(this._header,"display",this.showHeader?"block":"none"),d.set(this._selCalcFieldDiv,"display",this.showSelectField?"block":"none"),this.field&&(s=i.filter(this.layer.fields,function(e){return e.name===this.field},this),n=s[0],this._calcField=n,c.set(this._calcFieldLabel,"innerHTML",h.substitute(this.i18n.exprLabel,{fieldName:n?n.name:this.field}))),!this.helperMethods||this.helperMethods&&0===this.helperMethods.length){var o=[{type:"NumType",label:h.substitute(this.i18n.absFunc,{functionName:"ABS(<i>number</i>)",num:"<i>number</i>"}),name:"ABS()"},{type:"NumType",label:h.substitute(this.i18n.castFunc,{functionName:"CAST(<i>number</i>",num:"<i>number</i>"}),name:"CAST()"},{type:"NumType",label:h.substitute(this.i18n.ceilingFunc,{functionName:"CEILING(<i>number</i>)",num:"<i>number</i>"}),name:"CEILING()"},{type:"NumType",label:h.substitute(this.i18n.cosFunc,{functionName:"COS(<i>number</i>)",num:"<i>number</i>"}),name:"COS()"},{type:"NumType",label:h.substitute(this.i18n.floorFunc,{functionName:"FLOOR(<i>number</i>)",num:"<i>number</i>"}),name:"FLOOR()"},{type:"NumType",label:h.substitute(this.i18n.logFunc,{functionName:"LOG(<i>number</i>)",num:"<i>number</i>"}),name:"LOG()"},{type:"NumType",label:h.substitute(this.i18n.log10Func,{functionName:"LOG10(<i>number</i>)",num:"<i>number</i>"}),name:"LOG10()"},{type:"NumType",label:h.substitute(this.i18n.modFunc,{functionName:"MOD(<i>number</i>, <i>n</i>)",num:"<i>number</i>",n:"<i>n</i>"}),name:"MOD(,)"},{type:"NumType",label:h.substitute(this.i18n.powerFunc,{functionName:"POWER(<i>number</i>, <i>y</i>)",num:"<i>number</i>",y:"<i>y</i>"}),name:"POWER(,)"},{type:"NumType",label:h.substitute(this.i18n.roundFunc,{functionName:"ROUND(<i>number</i>, <i>length</i>)",num:"<i>number</i>",length:"<i>length</i>"}),name:"ROUND(,)"},{type:"NumType",label:h.substitute(this.i18n.sinFunc,{functionName:"SIN(<i>number</i>)",num:"<i>number</i>"}),name:"SIN()"},{type:"NumType",label:h.substitute(this.i18n.tanFunc,{functionName:"TAN(<i>number</i>)",num:"<i>number</i>"}),name:"TAN()"},{type:"NumType",label:h.substitute(this.i18n.truncateFunc,{functionName:"TRUNCATE(<i>number</i>, <i>decimal_place</i>)",num:"<i>number</i>",decimal_place:"<i>decimal_place</i>"}),name:"TRUNCATE(,)"},{type:"NumType",label:h.substitute(this.i18n.nullifFunc,{functionName:"NULLIF(<i>number</i>,<i>value</i>)",num:"<i>number</i>",value:"<i>value</i>"}),name:"NULLIF(,)"},{type:"StrType",label:h.substitute(this.i18n.char_lengthFunc,{functionName:"CHAR_LENGTH(<i>string</i>)",str:"<i>string</i>"}),name:"CHAR_LENGTH()"},{type:"StrType",label:h.substitute(this.i18n.concatFunc,{functionName:"CONCAT(<i>string1</i>, <i>string2</i>)"}),name:"CONCAT(,)"},{type:"StrType",label:h.substitute(this.i18n.positionFunc,{functionName:"POSITION(<i>substring</i>, <i>string</i>)",str:"<i>string</i>"}),name:"POSITION(,)"},{type:"StrType",label:h.substitute(this.i18n.lowerFunc,{functionName:"LOWER(<i>string</i>)",str:"<i>string</i>"}),name:"LOWER()"},{type:"StrType",label:h.substitute(this.i18n.substringFunc,{functionName:"SUBSTRING(<i>string</i>, <i>start</i>, <i>length</i>)",start:"<i>start</i>",length:"<i>length</i>",str:"<i>string</i>"}),name:"SUBSTRING(,,)"},{type:"StrType",label:h.substitute(this.i18n.trimFunc,{functionName:"TRIM(BOTH|LEADING|TRAILING ‘ ‘ FROM expression)",str:"<i>string</i>"}),name:"TRIM()"},{type:"StrType",label:h.substitute(this.i18n.upperFunc,{functionName:"UPPER(<i>string</i>)",str:"<i>string</i>"}),name:"UPPER()"},{type:"DateType",label:h.substitute(this.i18n.current_dateFunc,{functionName:"CURRENT_DATE()"}),name:"CURRENT_DATE()"},{type:"DateType",label:h.substitute(this.i18n.current_timeFunc,{functionName:"CURRENT_TIME()"}),name:"CURRENT_TIME()"},{type:"DateType",label:h.substitute(this.i18n.current_timestampFunc,{functionName:"CURRENT_TIMESTAMP()"}),name:"CURRENT_TIMESTAMP()"},{type:"NumType",label:h.substitute(this.i18n.extractFunc,{functionName:"EXTRACT(unit FROM date)"}),name:"EXTRACT()"}];i.forEach(o,function(e){e.label="<b>"+e.label.substring(0,e.label.lastIndexOf(":")+1)+"</b><br/> "+e.label.substring(e.label.lastIndexOf(":")+1)},this),this.set("helperMethods",o)}if((!this.operators||this.operators&&0===this.operators.length)&&this.set("operators",["+","-","/","*","(",")"]),this._operatorBtns=[],i.forEach(this.operators,function(e){this._operatorBtns.push(new w({value:e,label:e,style:{width:"4em"},onClick:t.hitch(this,this._updateExpression,{value:e,type:"operator"})},u.create("div",null,this._operatorCtr)))},this),this.layer&&this.layer.fields&&this.layer.fields.length>0){r=this._createIds(this.layer.fields);var a=i.map(this.layer.fields,function(e){return{label:e.name,value:e.name}});this._selCalcField.addOption(a),this._selCalcField.set("value",this.field)}this.fieldsStore=new b({data:r}),this.attributeList=new ee({renderRow:t.hitch(this,this._renderAttributesRow),selectionMode:"single",store:this.fieldsStore},this._attributeListCtr),e=this._createIds(this.get("helperMethods")),this.operatorStore=new b({data:e}),this.helpersList=new ee({renderRow:t.hitch(this,this._renderOperatorRow),selectionMode:"single",store:this.operatorStore},this._helpersListCtr)},_loadEvents:function(){this.own(this.watch("fields",t.hitch(this,this._handleFieldsChange)),this.watch("field",t.hitch(this,this._handleFieldChange))),this.showSelectField&&this.own(this._selCalcField.on("change",t.hitch(this,this._handleSelcCalFieldChange))),this.own(this._expressionForm.watch("value",t.hitch(this,this._handleHelperTypeChange)),this._expressionForm.on("focus",t.hitch(this,this._setfocus)),this._exprBox.watch("value",t.hitch(this,this._handleExpChange)),this.attributeList.on("dgrid-select",t.hitch(this,function(e){var t=e.rows;this._updateExpression({value:t[0].data,type:"field"})})),this.helpersList.on("dgrid-select",t.hitch(this,function(e){var t=e.rows;this._updateExpression({value:t[0].data,type:"helper"})})),this.attributeList.on(Q.enterRow,t.hitch(this,function(e){var t,i,s,n=this.attributeList.row(e);i=n.data.alias||n.data.name,s="",s=this._getTypeLabel(n.data.type),t="<b>"+i+"</b>: "+s,this._showTooltip(n.element,t)})),this.attributeList.on(Q.leaveRow,t.hitch(this,function(e){var t=this.attributeList.row(e);this._hideTooltip(t.element)})),this.helpersList.on(Q.enterRow,t.hitch(this,function(e){var t=this.helpersList.row(e);this._showTooltip(t.element,t.data.label)})),this.helpersList.on(Q.leaveRow,t.hitch(this,function(e){var t=this.helpersList.row(e);this._hideTooltip(t.element)})),this.attributeList.on("dgrid-refresh-complete",t.hitch(this,this._setfocus)),this.helpersList.on("dgrid-refresh-complete",t.hitch(this,this._setfocus)),this._exprBox.on("blur",t.hitch(this,function(){this._exprBox.textbox.setSelectionRange&&"number"==typeof this._exprBox.textbox.selectionStart?this._exprBox.set("cursorPosition",[this._exprBox.textbox.selectionStart,this._exprBox.textbox.selectionEnd]):this._exprBox.set("cursorPosition",this._getCursorRange(this._exprBox.textbox))})),this._exprBox.on("focus",t.hitch(this,function(){var e=this._exprBox.get("cursorPosition");e&&(this._exprBox.textbox.setSelectionRange&&"number"==typeof this._exprBox.textbox.selectionStart?this._exprBox.textbox.setSelectionRange(e[1],e[1]):this._setCaretPosition(this._exprBox.textbox,e[1],e[1]))})),g(this._calcFieldLabel,y.enter,t.hitch(this,function(e){var t="";t=this._getTypeLabel(this._calcField.type),this._showTooltip(this._calcFieldLabel,"<b>"+this._calcField.alias+"</b>: "+t)})),g(this._calcFieldLabel,y.leave,t.hitch(this,function(e){this._hideTooltip(this._calcFieldLabel)})))},startup:function(){this.inherited(arguments),this.expressionMode===ie.MODE_SQL&&(this.attributeList.startup(),this.helpersList.startup(),this.set("helperType",this.helperType))},reset:function(){J.show(this.domNode),this.expressionMode===ie.MODE_SQL&&(this._expressionForm.reset(),this._handleCloseMsg(),this.set("helperType",this.helperType))},_close:function(){this.emit("close",{}),J.hide(this.domNode)},_createIds:function(e){var s=[];return e&&e.length>0&&(s=i.map(e,function(e,i){return t.mixin(e,{id:i})})),s},_renderAttributesRow:function(e){var t=u.create("div",{"class":"esriCalExpRowOuter"}),i=u.create("div",{"class":"esriCalcExpLabelRow"},t);return u.create("div",{"class":"esriCalcFieldTextTrimWithEllipses",innerHTML:e.name},i),t},_renderOperatorRow:function(e){var t=u.create("div",{"class":"esriCalExpRowOuter"}),i=u.create("div",{"class":"esriCalcExpLabelRow"},t);return u.create("div",{"class":"esriCalcFieldTextTrimWithEllipses",innerHTML:e.name},i),t},_handleFieldsChange:function(e,t,s){var n=[];if(this.layer&&this.layer.fields&&this.layer.fields.length>0){this._selCalcField.getOptions().length>0&&this._selCalcField.removeOption(this._selCalcField.getOptions()),n=this._createIds(this.layer.fields);var r=i.map(this.layer.fields,function(e){return{label:e.name,value:e.name}});this._selCalcField.addOption(r),this._selCalcField.set("value",this.field)}this.fieldsStore=new b({data:n}),this.attributeList.set("store",this.fieldsStore)},_handleFieldChange:function(e,t,i){c.set(this._calcFieldLabel,"innerHTML",h.substitute(this.i18n.exprLabel,{fieldName:i})),this.set("helperType",this.helperType),this._setfocus()},_setHelperTypeAttr:function(e){var t,s;e?this.helperType=e:this.field?(t=i.filter(this.layer.fields,function(e){return e.name===this.field},this),s=t[0],this._calcField=s,s&&"esriFieldTypeDate"===s.type?e="date":s&&"esriFieldTypeString"===s.type?e="string":s&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],s.type)&&(e="numeric")):e="string","string"===e?this._strRadioBtn.set("checked",!0):"numeric"===e?this._numRadioBtn.set("checked",!0):"date"===e&&this._dateRadioBtn.set("checked",!0)},_handleHelperTypeChange:function(e,t,s){this.helpersList.set("query",{type:s.functionType}),"DateType"===s.functionType?this.attributeList.set("query",{type:"esriFieldTypeDate"}):"StrType"===s.functionType?this.attributeList.set("query",{type:"esriFieldTypeString"}):"NumType"===s.functionType&&this.attributeList.set("query",function(e){return-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)}),this.helpersList.refresh(),this.attributeList.refresh()},_handleSelcCalFieldChange:function(e){this.set("field",e)},_handleRemoveBtnClick:function(){this._exprBox.set("value",""),this._setfocus()},_handleAddButtonClick:function(e){_.stop(e);var i,s=this._exprBox.get("value"),r={f:"json"};return s?(this._handleCloseMsg(),r.calcExpression=n.toJson(this.get("expression")),r.sqlFormat="standard",this.layer.getDefinitionExpression&&this.layer.getDefinitionExpression()?r.where=this.layer.getDefinitionExpression():X.isDefined(this.layer.definitionExpression)&&""!==this.layer.definitionExpression&&(r.where=this.layer.definitionExpression),void J.id.getCredential(this.layer.url+"/calculate").then(t.hitch(this,function(e){r.token=e.token,i=K({url:this.layer.url+"/calculate",content:r},{usePost:!0}),this.emit("calculate-start",{calcPromise:i.promise}),this._addBtn.set("disabled",!0),this._showLoading(),i.then(t.hitch(this,function(e){this._addBtn.set("disabled",!1),this._hideLoading();var i={};t.mixin(i,{calcExpression:n.fromJson(r.calcExpression)[0].sqlExpression,where:r.where,sqlFormat:r.sqlFormat},e),this.emit("calculate-success",i),this.layer.refresh(),this._showMessages(h.substitute(this.i18n.successMsg,{count:e.updatedFeatureCount}),!0),this.closeOnAdd&&this._close()}),t.hitch(this,this._handleErrorResponse))}),t.hitch(this,this._handleErrorResponse))):void this._addBtn.set("disabled",!0)},_handleErrorResponse:function(e){this._addBtn.set("disabled",!1),this._hideLoading(),this.emit("calculate-error",e),this._showMessages(h.substitute(this.i18n.exprFailedMsg,{expr:this._exprBox.get("value")})+"<br/>"+e.details.toString())},_handleCloseButtonClick:function(e){_.stop(e),this._close()},_showTooltip:function(e,t){var i=u.create("label",{innerHTML:t,className:"esriSmallFont",dir:"ltr"});this._isRightToLeft?U.show(i.outerHTML,e,["after"],!0):U.show(i.outerHTML,e,["after"])},_hideTooltip:function(e,t){U.hide(e)},_setfocus:function(){this._exprBox.focus()},_showMessages:function(e,i){c.set(this._bodyNode,"innerHTML",e),o.fadeIn({node:this._errorMessagePane,easing:x.quadIn,onEnd:t.hitch(this,function(){d.set(this._errorMessagePane,{display:""})})}).play(),i&&window.setTimeout(t.hitch(this,this._handleCloseMsg),this._showMsgTimerInterval)},_handleCloseMsg:function(e){e&&e.preventDefault(),"none"!==d.get(this._errorMessagePane,"display")&&o.fadeOut({node:this._errorMessagePane,easing:x.quadOut,onEnd:t.hitch(this,function(){d.set(this._errorMessagePane,{display:"none"})})}).play()},validate:function(){var e=!0,t="";return this.layer?this.field?this.layer.supportsCalculate?this.layer.userIsAdmin||this.layer.getEditCapabilities().canUpdate||(t=h.substitute(this.i18n.lyrUpdateCapMsg,{layername:this.layer.name}),e=!1):(t=h.substitute(this.i18n.lyrSupportCalMsg,{layername:this.layer.name}),e=!1):(t=this.i18n.fieldReqMsg,e=!1):(t=this.i18n.layerReqMsg,e=!1),this._addBtn.set("disabled",!e),e},_validateExpObj:function(e){var t,i=!0;return e||(i=!1),i?this._handleCloseMsg():this._showMessages(t),i},_updateExpression:function(e){var t,s,n=this._exprBox.get("cursorPosition"),r=this._exprBox.get("value"),o="",a=0;if(this._validateExpObj(e)){if(this._exprStack||(this._exprStack=[]),this._exprStack.length>0&&(s=this._exprStack[this._exprStack.length-1]),n&&r||(n=[0,0]),"operator"===e.type)t=" "+e.value+" ",a=t.length;else if("helper"===e.type)t=e.value.name,a=-1!==e.value.name.indexOf(",")?e.value.name.indexOf(","):e.value.name.length-1;else if("field"===e.type){var l=X.isDefined(s)&&"helper"===s.type&&-1!==s.value.name.indexOf("MOD")&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],e.value.type),h=X.isDefined(s)&&"helper"===s.type&&-1!==s.value.name.indexOf("MOD")&&"esriFieldTypeDouble"===e.value.type;t=this._calcField&&"esriFieldTypeDouble"===this._calcField.type&&!l&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],e.value.type)?"CAST("+e.value.name+" AS FLOAT)":this._calcField&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],this._calcField.type)&&h?"CAST("+e.value.name+" AS INT)":e.value.name,a=t.length+1}o=r.substring(0,n[0])+t+r.substring(n[1]),this._exprBox.set("value",o),this._exprBox.focus(),this._exprBox.textbox.setSelectionRange&&"number"==typeof this._exprBox.textbox.selectionStart?(this._exprBox.textbox.setSelectionRange(n[0]+a,n[0]+a),this._exprBox.set("cursorPosition",[n[0]+a,n[0]+a])):(this._setCaretPosition(this._exprBox.textbox,n[0]+a,n[0]+a),this._exprBox.set("cursorPosition",this._getCursorRange(this._exprBox.textbox))),this._setfocus(),this._exprStack.push(e)}},_setCaretPosition:function(e,t,i){if(e.setSelectionRange&&"number"==typeof e.selectionStart)e.setSelectionRange(t,i);else if("undefined"!=typeof e.createTextRange){var s=e.createTextRange();s.collapse(!0),s.moveEnd("character",i),s.moveStart("character",t),s.select()}},_getCaretPosition:function(e){var t=0;if(C.doc.selection){e.focus();var i=C.doc.selection.createRange();i.moveStart("character",-e.value.length),t=i.text.length}else(e.selectionStart||"number"==typeof e.selectionStart)&&(t=e.selectionStart);return t},_getCursorRange:function(e){var t,i;return e.setSelectionRange&&"number"==typeof e.selectionStart?(t=e.selectionStart,i=e.selectionEnd):"undefined"!=typeof e.createTextRange&&(t=this._getCaretPosition(e),i=this._getCaretPosition(e)),[t,i]},_handleExpChange:function(e,t,i){this._addBtn.set("disabled",!i),this._validateBtn.set("disabled",!i),this._removeBtn.set("disabled",!i)},_handleValidationBtnClick:function(){var e,s={sql:this.field+" = "+this._exprBox.get("value"),sqlType:"where",f:"json"};e=K({url:this.layer.url+"/validateSQL",content:s},{usePost:!0}),this._addBtn.set("disabled",!0),this._validateBtn.set("disabled",!0),this._showLoading(),e.then(t.hitch(this,function(e){var t;this._hideLoading(),this._validateBtn.set("disabled",!1),this._addBtn.set("disabled",!e.isValidSQL),e.isValidSQL?(f.toggle(this._errorMessagePane,this._css.formSuccess,!0),this._handleCloseMsg(),this._showMessages(Y.calculateFields.validExpression)):(e.validationErrors&&e.validationErrors.length>0?(t="",i.forEach(e.validationErrors,function(e){if(e.params&&Y.calculateFields.errorCodes[e.errorCode]){var i={};for(var s in e.params)e.params.hasOwnProperty(s)&&(i[s]=e.params[s]);t+=h.substitute(Y.calculateFields.errorCodes[e.errorCode],i)+"<br/>"}else t+=(Y.calculateFields.errorCodes[e.errorCode]||e.description)+"<br/>"},this),this._showMessages(t,!1)):this._showMessages(Y.calculateFields.invalidExpression),f.toggle(this._errorMessagePane,this._css.formSuccess,!1))}),t.hitch(this,function(e){this._hideLoading(),this._validateBtn.set("disabled",!1),this._addBtn.set("disabled",!1)}))},_showLoading:function(){d.set(this._underlay,"display","block")},_hideLoading:function(){d.set(this._underlay,"display","none")},_getTypeLabel:function(e){var t;return-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle"],e)?t=this.i18n.integerLabel:"esriFieldTypeDouble"===e?t=this.i18n.doubleLabel:"esriFieldTypeDate"===e?t=this.i18n.dateLabel:"esriFieldTypeString"===e&&(t=this.i18n.stringLabel),t},_setLayerAttr:function(e){this._set("layer",e),this._set("fields",e.fields)},_setFieldsAttr:function(e){this._set("fields",e)},_setFieldAttr:function(e){this._set("field",e)},_setHelperMethodsAttr:function(e){this._set("helperMethods",e)},_setOperatorsAttr:function(e){this._set("operators",e)},_setShowSelectFieldAttr:function(e){this._set("showSelectField",e)},_setShowHeaderAttr:function(e){this._set("showHeader",e)},_setCloseOnAddAttr:function(e){this._set("closeOnAdd",e)},_getExpressionAttr:function(){var e,t,i,s=this._exprBox.get("value");return s?(e=s.split(" "),i=[],t={field:this.field},t.sqlExpression=s,i.push(t),i):void this._addBtn.set("disabled",!0)},_setExpressionAttr:function(e){this._set("expression",e),this._exprBox&&this._exprBox.set("value",e)},_setAddButtonClassAttr:function(e){this._set("addButtonClass",e)},_setCloseButtonClassAttr:function(e){this._set("closeButtonClass",e)},_setExpressionBoxRowsAttr:function(e){this.expressionBoxRows=e||4},_setExpressionBoxColsAttr:function(e){this.expressionBoxCols=e||2},_setArcadeEditorAttr:function(e){this.arcadeEditor=e},_setFieldIdAttr:function(e){this.fieldId=e},_setArcadeProfileAttr:function(e){this._set("arcadeProfile",e)}});return t.mixin(ie,{MODE_SQL:0,MODE_ARCADE:1}),a("extend-esri")&&t.setObject("dijit.CalculateField",ie,J),ie});