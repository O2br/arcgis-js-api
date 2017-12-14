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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/i18n!../nls/jsapi","dojo/text!./templates/MultidimensionalFilter.html","dojo/text!./templates/NumericDimensionItem.html","dojo/text!./templates/TimeDimensionItem.html","dojo/text!./templates/PagedDateTimeWidget.html","dojo/text!./templates/PagedNumberWidget.html","dojo/store/Memory","dojo/has","../kernel","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/form/DateTextBox","dijit/registry","dojo/date/locale","dojo/dom-style","dojo/dom-class","../layers/DimensionalDefinition","../layers/MosaicRule","dojo/html","dijit/form/FilteringSelect","dijit/form/ComboBox","dojox/widget/YearlyCalendar","dojox/widget/MonthlyCalendar","dojox/widget/Calendar3Pane","dojo/_base/array","./_EventedWidget","dijit/Tooltip","dijit/form/CheckBox","dijit/form/Button"],function(e,t,i,s,n,a,l,o,h,r,u,d,m,c,_,f,g,p,x,v,V,D,S,b,y,w,T,C,R){var M=e("PagedDimensionWidgetMixin",[m,c,_],{pageCount:100,displayValue:"",dimension:"",_currentIndex:"",values:"",constructor:function(t){e.safeMixin(this,t),this._i18n=s},_checkButtons:function(){var e=this.values,t=this._currentIndex;1===e.length?this._setButtonProperties(!0,!0,!0,!0):0===t?this._setButtonProperties(!0,!0,!1,!1):t===e.length-1?this._setButtonProperties(!1,!1,!0,!0):this._setButtonProperties(!1,!1,!1,!1)},_setButtonProperties:function(e,t,i,s){this.StartBtn.set("disabled",e),this.PreviousBtn.set("disabled",t),this.NextBtn.set("disabled",i),this.EndBtn.set("disabled",s)},_onStartBtnClick:function(){this._currentIndex=0,this._updateValues()},_onPreviousBtnClick:function(){this._currentIndex--,this._updateValues()},_onNextBtnClick:function(){this._currentIndex++,this._updateValues()},_onEndBtnClick:function(){this._currentIndex=this.values.length-1,this._updateValues()}}),I=e("PagedDateTimeWidget",[M],{dateValue:"",intervalInfo:{},_fullDateFormat:"yyyy-MM-dd",templateString:o,_setValuesAttr:function(e){var t,i=[];this._set("values",e),this._currentIndex=this.displayValue?R.indexOf(this.values,this.displayValue):0,this.displayValue&&this._set("dateValue",this.displayValue),this._checkButtons(),this.dateSelect?(R.forEach(this.values,function(e){i.push({id:e,label:e})},this),t=new r({data:i}),this.dateSelect.set({store:t,value:this.displayValue||this.values[0]}),this.dateSelect.startup()):this._populateValues()},_setDateValueAttr:function(e){e&&(this._currentIndex=R.indexOf(this.values,e),-1!==this._currentIndex?(this._set("dateValue",e),this._set("displayValue",e)):(this._set("dateValue",this._snapToClosest(e)),this._set("displayValue",this._snapToClosest(e)),this._currentIndex=R.indexOf(this.values,this.dateValue)),this._updateValues())},_getTimeArray:function(){var e,t,i,s,n=[],a=this.values,l=this._currentIndex;for(i=a[l]-Math.abs(a[l]%864e5),s=i+864e5,e=0;e<a.length;e++)if(a[e]>=i&&a[e]<s)t=p.format(this._getUTCTime(new Date(a[e])),{timePattern:"hh:mm a",selector:"time"}),n.push({id:a[e],label:t});else if(0!==n.length)break;return n},_updateTimeDropDown:function(){var e,t=[];t=this._getTimeArray(),this.timeSelect.reset(),e=new r({data:t}),this.timeSelect.set({store:e,value:this.values[this._currentIndex]})},_populateValues:function(){var e,i,s,n,a=[],l=this.values;n=p.format(this._getUTCTime(new Date(l[this._currentIndex])),{datePattern:this._fullDateFormat,selector:"date"}),a=this._getTimeArray(),i=p.format(this._getUTCTime(new Date(l[0])),{datePattern:this._fullDateFormat,selector:"date"}),s=p.format(this._getUTCTime(new Date(l[l.length-1])),{datePattern:this._fullDateFormat,selector:"date"}),this.dateSelect=new f({value:n,constraints:{min:i,max:s},popupClass:C,style:"width:95px;","class":"dijitSelect esriMultidimensionalFilterVariableList"},this.DateSelector),this.dateSelect.startup(),this.dateSelect.on("change",t.hitch(this,this._dateBoxChange)),e=new r({data:a}),this.timeSelect=new b({store:e,value:this.displayValue,labelAttr:"label",labelType:"text",searchAttr:"label",style:"width:85px;","class":"dijitSelect esriMultidimensionalFilterVariableList",maxHeight:-1},this.TimeSelector),this.timeSelect.startup(),this.timeSelect.on("change",t.hitch(this,this._timeValueChange)),this._checkCalendarControlView()},_checkCalendarControlView:function(){var e,t,i,s,n,a=[],l=[],o=[],h=this.values,r=this.intervalInfo;if(r.intervalUnit)"years"==r.intervalUnit.toLowerCase()?(this.dateSelect.set("popupClass",w),v.add(this.timeSelect.domNode,"esriTimeSelectDisplayNone")):"months"==r.intervalUnit.toLowerCase()?(this.dateSelect.set("popupClass",T),v.add(this.timeSelect.domNode,"esriTimeSelectDisplayNone")):"days"==r.intervalUnit.toLowerCase()?(this.dateSelect.set("popupClass",C),v.add(this.timeSelect.domNode,"esriTimeSelectDisplayNone")):this.dateSelect.set("popupClass",C);else{for(n=h.length<12?h.length:12,s=0;n>s;s++)e=p.format(this._getUTCTime(new Date(h[s])),{datePattern:"yyyy",selector:"date"}),t=p.format(this._getUTCTime(new Date(h[s])),{datePattern:"yyyyMM",selector:"date"}),i=p.format(this._getUTCTime(new Date(h[s])),{timePattern:"HH:mm",selector:"time"}),-1===R.indexOf(l,e)&&l.push(e),-1===R.indexOf(o,t)&&o.push(t),-1===R.indexOf(a,i)&&a.push(i);l.length===n?(this.dateSelect.set("popupClass",w),v.add(this.timeSelect.domNode,"esriTimeSelectDisplayNone")):o.length===n?(this.dateSelect.set("popupClass",T),v.add(this.timeSelect.domNode,"esriTimeSelectDisplayNone")):(this.dateSelect.set("popupClass",C),1===a.length&&v.add(this.timeSelect.domNode,"esriTimeSelectDisplayNone"))}},_timeValueChange:function(e){e&&(this._currentIndex=R.indexOf(this.values,e),this._set("dateValue",e),this._set("displayValue",e),this._checkButtons())},_updateValues:function(){var e;e=p.format(this._getUTCTime(new Date(this.values[this._currentIndex])),{datePattern:this._fullDateFormat,selector:"date"}),this.dateSelect.set("_onChangeActive",!1),this.dateSelect.set("value",e,!1),this.dateSelect.set("_onChangeActive",!0),this._updateTimeDropDown(),this._checkButtons()},_getUTCTime:function(e){return e&&e.setTime(e.getTime()+60*e.getTimezoneOffset()*1e3),e},_snapToClosest:function(e){var t,i,s,n,a,l=0,o=0,h=this.values;for(e=new Date(e),e=e.getTime()-60*e.getTimezoneOffset()*1e3,t=Math.abs(e-h[0]),i=Math.abs(e-h[0]),n=h[0],a=1;a<h.length;a++)s=h[a]-e,0>s?Math.abs(s)<i&&(i=Math.abs(s),l=a):t>s&&(t=s,o=a);return 86399999>t||i>t?(n=h[o],this._currentIndex=o):(n=h[l],this._currentIndex=l),n},_dateBoxChange:function(e){var t,i,s,n=[];e&&(t=new Date(e).getTime(),i=this._snapToClosest(parseInt(t,10)),this.dateSelect.set("_onChangeActive",!1),this.dateSelect.set("value",p.format(this._getUTCTime(new Date(i)),{datePattern:this._fullDateFormat,selector:"date"})),this.dateSelect.set("_onChangeActive",!0),p.format(this._getUTCTime(new Date(i)),{datePattern:this._fullDateFormat,selector:"date"})!=p.format(new Date(t),{datePattern:this._fullDateFormat,selector:"date"})&&(this.dateSelect.focus(),this.dateSelect.set("message",this._i18n.widgets.multidimensionalFilter.dateSnapText)),n=this._getTimeArray(),this.timeSelect.reset(),s=new r({data:n}),this.timeSelect.set({store:s,value:n[0].id}),this._checkButtons())}}),A=e("PagedNumberWidget",[M],{numValue:"",templateString:h,_setValuesAttr:function(e){var t,i=[];this._set("values",e),this.displayValue||0===this.displayValue?(this._currentIndex=R.indexOf(this.values,this.displayValue),this._set("numValue",this.displayValue)):this._currentIndex=0,this._checkButtons(),this.numSelect?(R.forEach(this.values,function(e){i.push({id:e,label:e})},this),t=new r({data:i}),this._currentIndex=this.displayValue?R.indexOf(this.values,this.displayValue):0,this.numSelect.set({store:t,value:this.displayValue||this.values[0]}),this.numSelect.startup()):this._populateValues()},_setNumValueAttr:function(e){(e||0===e)&&(this._currentIndex=R.indexOf(this.values,e),-1!==this._currentIndex?(this._set("numValue",e),this._set("displayValue",e)):(this._set("numValue",this._snapToClosest(e)),this._set("displayValue",this._snapToClosest(e)),this._currentIndex=R.indexOf(this.values,this.numValue)),this._updateValues())},_populateValues:function(){var e,i=[];R.forEach(this.values,function(e){i.push({id:e,label:e})},this),e=new r({data:i}),this.numSelect=new y({store:e,value:this.displayValue,labelAttr:"label",labelType:"text",searchAttr:"label",pageSize:this.pageCount,scrollOnFocus:!0,style:"width:95px;","class":"dijitSelect esriMultidimensionalFilterVariableList",maxHeight:-1},this.NumberSelector),this.numSelect.startup(),this.numSelect.on("change",t.hitch(this,this._numValueChange))},_snapToClosest:function(e){var t,i,s,n,a=this.values;for(t=Math.abs(e-a[0]),s=a[0],n=1;n<a.length;n++)i=Math.abs(e-a[n]),t>i&&(t=i,s=a[n],this._currentIndex=n);return s},_numValueChange:function(e){var t;e&&(t=this._snapToClosest(e),this.numSelect.set("_onChangeActive",!1),this.numSelect.set("value",t),this.numSelect.set("_onChangeActive",!0),e!=t&&(this.numSelect.focus(),this.numSelect.set("message",this._i18n.widgets.multidimensionalFilter.numSnapText)),this._currentIndex=R.indexOf(this.values,t),this._set("numValue",t),this._set("displayValue",t),this._checkButtons())},_updateValues:function(){this.numSelect.set("value",this.values[this._currentIndex]),this._checkButtons()}}),B=e("DimensionItemMixin",[m,c,_],{dimension:"",fromText:"",toText:"",valueCount:"",values:[],dimensionAlias:"",unit:"",disabled:!1,intervalInfo:{},_unitString:"",_unitReplaceString:"",_disabledDimensionText:"",_valueFieldString:"",_selectWidgetNameString:"",_onDimensionCheckboxChange:function(e){this.hasRanges?e?(v.replace(this.maxRow,"esriRowShow","esriDomHide"),v.replace(this.minRow,"esriRowShow","esriDomHide"),v.replace(this.rangeSpan,"esriInlineShow","esriDomHide")):(v.replace(this.maxRow,"esriDomHide","esriRowShow"),v.replace(this.minRow,"esriDomHide","esriRowShow"),v.replace(this.rangeSpan,"esriDomHide","esriInlineShow")):e?(this.rangeCheckbox.get("checked")?v.replace(this.maxRow,"esriRowShow","esriDomHide"):v.replace(this.maxRow,"esriDomHide","esriRowShow"),v.replace(this.minRow,"esriRowShow","esriDomHide"),v.replace(this.rangeSpan,"esriInlineShow","esriDomHide")):(v.replace(this.maxRow,"esriDomHide","esriRowShow"),v.replace(this.minRow,"esriDomHide","esriRowShow"),v.replace(this.rangeSpan,"esriDomHide","esriInlineShow"))},_setDisabledAttr:function(e){this._set("disabled",e),e?(this.dimensionCheckbox.set("checked",!1),this.dimensionCheckbox.set("disabled",!0),v.replace(this.dimensionAlias,"esriDisabled","esriEnabled"),v.replace(this.dimensionUnit,"esriDisabled","esriEnabled"),S.set(this.disabledDimText,"<br/>"+this._disabledDimensionText)):(this.dimensionCheckbox.set("checked",!0),this.dimensionCheckbox.set("disabled",!1),v.replace(this.dimensionAlias,"esriEnabled","esriDisabled"),v.replace(this.dimensionUnit,"esriEnabled","esriDisabled"),S.set(this.disabledDimText,""))},_createNewValues:function(){var e=[],t=[],i={};R.forEach(this.values,function(s){-1===R.indexOf(e,s[0])&&e.push(s[0]),-1===R.indexOf(e,s[1])&&e.push(s[1]),-1===R.indexOf(t,s[0])?(t.push(s[0]),i[s[0]]=[],i[s[0]].push(s[1])):i[s[0]].push(s[1])},this),e.sort(function(e,t){return e-t}),this._distinctRangeValues=e,this._rangeStartArray=t,this._rangeEndArrayMap=i},_setUnitAttr:function(e){e&&(e.indexOf(this._unitString)>-1&&(this.unit=e.replace(this._unitString,this._unitReplaceString)),S.set(this.dimensionUnit,"("+this.unit+")"),S.set(this.tooltipUnit,"<br/>   <span class='esriMultidimensionalFilterTooltipLeftText'>Unit:</span> "+this.unit))},_refreshMaxBox:function(e){this.rangeCheckbox.get("checked")||this.maxBox.set({displayValue:this._rangeEndArrayMap[e][0],values:this._rangeEndArrayMap[e]})},getDimensionCheckboxValue:function(){return this.dimensionCheckbox.get("checked")},setDimensionCheckboxValue:function(e){this.dimensionCheckbox.set("checked",e)},getRangeCheckboxValue:function(){return this.rangeCheckbox.get("value")},setRangeCheckboxValue:function(e){this.rangeCheckbox.set("value",e)},getMinValue:function(){return this.minBox.get(this._valueFieldString)},setMinValue:function(e){this.minBox.set(this._valueFieldString,e)},getMaxValue:function(){return this.maxBox.get(this._valueFieldString)},setMaxValue:function(e){this.maxBox.set(this._valueFieldString,e)},isMinBoxSupportedValue:function(e){return this.minBox[this._selectWidgetNameString].isValid(e)?!0:!1},isMaxBoxSupportedValue:function(e){return this.maxBox[this._selectWidgetNameString].isValid(e)?!0:!1}}),N=e("DateItem",[B],{fromDateValue:"",toDateValue:"",_unitString:"ISO8601",_unitReplaceString:"UTC",_valueFieldString:"dateValue",_selectWidgetNameString:"timeSelect",templateString:l,constructor:function(t){e.safeMixin(this,t),this._i18n=s,this.fromText=this._i18n.widgets.multidimensionalFilter.fromTimeText,this.toText=this._i18n.widgets.multidimensionalFilter.toTimeText,this._disabledDimensionText=this._i18n.widgets.multidimensionalFilter.disabledTimeDimensionText},_onRangeCheckboxChange:function(e){if(this.hasRanges){var t=this.minBox.dateSelect.value;e?(v.replace(this.hasRangesInfo,"esriRangeInfoHide","esriRangeInfoVisible"),this.minBox.set({displayValue:t,values:this._distinctRangeValues}),this.maxBox.set({displayValue:this._distinctRangeValues[this._distinctRangeValues.length-1],values:this._distinctRangeValues})):(v.replace(this.hasRangesInfo,"esriRangeInfoVisible","esriRangeInfoHide"),R.indexOf(this._rangeStartArray,t)>-1&&(this.minBox.set({displayValue:t,values:this._rangeStartArray}),this.maxBox.set({displayValue:this._rangeEndArrayMap[t][0],values:this._rangeEndArrayMap[t]})))}else e?(v.replace(this.maxRow,"esriRowShow","esriDomHide"),S.set(this.minDateText,this._i18n.widgets.multidimensionalFilter.fromTimeText)):(v.replace(this.maxRow,"esriDomHide","esriRowShow"),S.set(this.minDateText,this._i18n.widgets.multidimensionalFilter.sliceTimeText));this.emit("range-rendered",{})},_updateTooltip:function(){var e="MM/dd/yyyy",t="hh:mm:ss a",i=this.values,s=this._distinctRangeValues;this.hasRanges?(this.fromValue=p.format(this._getUTCTime(new Date(s[0])),{datePattern:e,timePattern:t}),this.toValue=p.format(this._getUTCTime(new Date(s[s.length-1])),{datePattern:e,timePattern:t}),this.valueCount=i.length):(this.fromValue=p.format(this._getUTCTime(new Date(i[0])),{datePattern:e,timePattern:t}),this.toValue=p.format(this._getUTCTime(new Date(i[i.length-1])),{datePattern:e,timePattern:t}),this.valueCount=i.length),S.set(this.tooltipFromValue,this.fromValue.toString()),S.set(this.tooltipToValue,this.toValue.toString()),S.set(this.tooltipValueCount,this.valueCount.toString())},_setValuesAttr:function(e){this.values=e,this.hasRanges?(this._createNewValues(),e=this._distinctRangeValues,this._updateTooltip(),this._set("values",this._distinctRangeValues),this.minBox=new I({values:this._rangeStartArray,dimension:this.dimension,displayValue:this._rangeStartArray[0],intervalInfo:this.intervalInfo},this.minDateSelector),this.minBox.startup(),this.minBox.dateSelect.on("change",t.hitch(this,this._refreshMaxBox)),this.maxBox=new I({values:this._rangeEndArrayMap[this._rangeStartArray[0]],dimension:this.dimension,displayValue:this._rangeEndArrayMap[this._rangeStartArray[0]][this._rangeEndArrayMap[this._rangeStartArray[0]].length-1],intervalInfo:this.intervalInfo},this.maxDateSelector),this.maxBox.startup(),S.set(this.minDateText,this._i18n.widgets.multidimensionalFilter.fromTimeText),v.replace(this.maxRow,"esriRowShow","esriDomHide"),v.replace(this.hasRangesInfo,"esriRangeInfoVisible","esriRangeInfoHide")):(this._set("values",e),this._updateTooltip(),this.minBox=new I({values:e,dimension:this.dimension,displayValue:e[0],intervalInfo:this.intervalInfo},this.minDateSelector),this.minBox.startup(),this.maxBox=new I({values:e,dimension:this.dimension,displayValue:e[e.length-1],intervalInfo:this.intervalInfo},this.maxDateSelector),this.maxBox.startup())},_getUTCTime:function(e){return e&&e.setTime(e.getTime()+60*e.getTimezoneOffset()*1e3),e}}),F=e("NumericItem",[B],{_unitString:"esri",_unitReplaceString:"",_valueFieldString:"numValue",_selectWidgetNameString:"numSelect",templateString:a,constructor:function(t){e.safeMixin(this,t),this._i18n=s,this.fromText=this._i18n.widgets.multidimensionalFilter.fromNumericText,this.toText=this._i18n.widgets.multidimensionalFilter.toNumericText,this._disabledDimensionText=this._i18n.widgets.multidimensionalFilter.disabledNumericDimensionText},_onRangeCheckboxChange:function(e){if(this.hasRanges){var t=this.minBox.numSelect.value;e?(v.replace(this.hasRangesInfo,"esriRangeInfoHide","esriRangeInfoVisible"),this.minBox.set({displayValue:t,values:this._distinctRangeValues}),this.maxBox.set({displayValue:this._distinctRangeValues[this._distinctRangeValues.length-1],values:this._distinctRangeValues})):(v.replace(this.hasRangesInfo,"esriRangeInfoVisible","esriRangeInfoHide"),R.indexOf(this._rangeStartArray,t)>-1&&(this.minBox.set({displayValue:t,values:this._rangeStartArray}),this.maxBox.set({displayValue:this._rangeEndArrayMap[t][0],values:this._rangeEndArrayMap[t]}))),this.emit("range-rendered",{})}else e?(v.replace(this.maxRow,"esriRowShow","esriDomHide"),S.set(this.minValueText,this._i18n.widgets.multidimensionalFilter.fromNumericText)):(v.replace(this.maxRow,"esriDomHide","esriRowShow"),S.set(this.minValueText,this._i18n.widgets.multidimensionalFilter.sliceNumberText))},_updateTooltip:function(){var e=this.values,t=this._distinctRangeValues;this.hasRanges?(this.fromValue=t[0],this.toValue=t[t.length-1],this.valueCount=e.length):(this.fromValue=e[0],this.toValue=e[e.length-1],this.valueCount=e.length),S.set(this.tooltipFromValue,this.fromValue.toString()),S.set(this.tooltipToValue,this.toValue.toString()),S.set(this.tooltipValueCount,this.valueCount.toString())},_setValuesAttr:function(e){this.values=e,this.hasRanges?(this._createNewValues(),e=this._distinctRangeValues,this._updateTooltip(),this._set("values",this._distinctRangeValues),this.minBox=new A({values:this._rangeStartArray,dimension:this.dimension,displayValue:this._rangeStartArray[0],intervalInfo:this.intervalInfo},this.minNumberSelector),this.minBox.startup(),this.minBox.numSelect.on("change",t.hitch(this,this._refreshMaxBox)),this.maxBox=new A({values:this._rangeEndArrayMap[this._rangeStartArray[0]],dimension:this.dimension,displayValue:this._rangeEndArrayMap[this._rangeStartArray[0]][this._rangeEndArrayMap[this._rangeStartArray[0]].length-1],intervalInfo:this.intervalInfo},this.maxNumberSelector),this.maxBox.startup(),S.set(this.minValueText,this._i18n.widgets.multidimensionalFilter.fromNumericText),v.replace(this.maxRow,"esriRowShow","esriDomHide"),v.replace(this.hasRangesInfo,"esriRangeInfoVisible","esriRangeInfoHide")):(this._set("values",e),this._updateTooltip(),this.minBox=new A({values:e,dimension:this.dimension,displayValue:e[0],intervalInfo:this.intervalInfo},this.minNumberSelector),this.minBox.startup(),this.maxBox=new A({values:e,dimension:this.dimension,displayValue:e[e.length-1],intervalInfo:this.intervalInfo},this.maxNumberSelector),this.maxBox.startup())}}),k=e([m,c,_],{declaredClass:"esri.dijit.MultidimensionalFilter",templateString:n,widgetsInTemplate:!0,layer:null,map:null,hideApplyButton:!1,_multidimensionalInfo:null,_variableStore:null,_variableData:[],_dimensionStore:null,_savedMultidimensionalDefinition:null,_dimensionWithRanges:[],_dimensionWidgets:{},reset:0,constructor:function(t){e.safeMixin(this,t),this._i18n=s},startup:function(){this.inherited(arguments),i.subscribe("onMultidimensionalFilterApply",t.hitch(this,"_onClickApplyMultidimensionalFilter")),i.subscribe("onMultidimensionalFilterReset",t.hitch(this,"_onClickResetMultidimensionalFilter"))},postCreate:function(){i.connect(this.variableList,"onChange",t.hitch(this,"_onVariableListChange")),this.hideApplyButton&&x.set(this.applyButton.domNode,"display","none")},destroy:function(){this.inherited(arguments)},_setLayerAttr:function(e){if(e){this.inherited(arguments),this._cachedDimensions=null,this._dimensionStore=null,this._set("layer",e);var s=t.hitch(this,"_setupDefaults");this.layer.loaded?this._setupDefaults():i.connect(this.layer,"onLoad",s)}},_setupDefaults:function(){this.layer.getMultidimensionalInfo().then(t.hitch(this,function(e){this._multidimensionalInfo=e,this._setupVariableFilterDefaults()}),function(e){console.log(e)}),this.layer.getDefaultMultidimensionalDefinition().then(t.hitch(this,function(e){this.defaultMultidimensionalDefinition=e}),function(e){console.log(e)})},_computeDimensionUnion:function(e){var i,s,n,a,l,o,h,r,u,d,m=[],c=[],_=[];if(e){for(i=0;i<e.length;i++)for(l=e[i].dimensions,s=0;s<l.length;s++){for(o=l[s],h=0,n=0;n<m.length;n++)if(o.name==m[n].name){if(r=m[n].values,u=o.values,o.hasRanges){for(a=0;a<r.length;a++)c.push(r[a][0]),_.push(r[a][1]);for(a=0;a<u.length;a++)(-1===R.indexOf(c,u[a][0])||-1===R.indexOf(_,u[a][1]))&&r.push(u[a])}else for(a=0;a<u.length;a++)-1===R.indexOf(r,u[a])&&r.push(u[a]);h=1}h||m.push(t.clone(o)),o.hasRanges&&-1===R.indexOf(this._dimensionWithRanges,o.name)&&this._dimensionWithRanges.push(o.name)}return this._dimensionWithRanges.length>0&&(m=this._convertSliceToRange(this._dimensionWithRanges,m)),d=this._sortDimensionValues(m)}},_sortDimensionValues:function(e){return R.forEach(e,function(e){e&&e.values&&(e.hasRanges?e.values=this._sortRangeDimensionValues(e.values):e.values=this._sortNoRangeDimensionValues(e.values))},this),e},_sortRangeDimensionValues:function(e){var t,i=[],s=[],n={},a={},l=[];return R.forEach(e,function(e){-1===R.indexOf(i,e[0])?(i.push(e[0]),n[e[0]]=[],n[e[0]].push(e)):n[e[0]].push(e)},this),i=i.sort(function(e,t){return e-t}),R.forEach(i,function(e){if(1===n[e].length)l.push(n[e][0]);else{for(s=[],a={},t=0;t<n[e].length;t++)s.push(n[e][t][1]),a[n[e][t][1]]=n[e][t];for(s=s.sort(function(e,t){return e-t}),t=0;t<s.length;t++)l.push(a[s[t]])}}),l},_sortNoRangeDimensionValues:function(e){return e.sort(function(e,t){return e-t})},_convertSliceToRange:function(e,t){var i=[];return R.forEach(t,function(t){-1!==R.indexOf(e,t.name)&&(t.hasRanges=!0,i=[],R.forEach(t.values,function(e){e instanceof Array?(i.push(e),t.extent[0]>e[0]?t.extent[0]=e[0]:t.extent[1]<e[0]&&(t.extent[1]=e[0]),t.extent[0]>e[1]?t.extent[0]=e[1]:t.extent[1]<e[1]&&(t.extent[1]=e[1])):(i.push([e,e]),t.extent[0]>e?t.extent[0]=e:t.extent[1]<e&&(t.extent[1]=e))},this),t.values=i)},this),t},_setupVariableFilterDefaults:function(){var e,t=this._multidimensionalInfo.variables,i=this.layer.mosaicRule;this.layer&&this._multidimensionalInfo&&t&&(this._variableData=[],this._variableData.push({name:this._i18n.widgets.multidimensionalFilter.defaultVariableText,label:"<html><body><section><table><tr><td><b>"+this._i18n.widgets.multidimensionalFilter.defaultVariableText+"</b></td></tr><tr><td><p style='white-space:pre-wrap;width:50ex'><i>No user-defined restriction on Variable.</i></p></td></tr></table></section></body></html",dimensions:this._computeDimensionUnion(t)}),R.forEach(t,function(t){e=t.unit?t.name+" ("+t.unit+")":t.name,this._variableData.push({name:t.name,dimensions:t.dimensions,description:t.description,label:"<html><body><section><table><tr><td><b>"+e+"</b></td></tr><tr><td><p style='white-space:pre-wrap;width:50ex'><i>"+t.description+"</i></p></td></tr></table></section></body></html>"})},this),this._variableStore=new r({data:this._variableData,idProperty:"name"}),this.variableList.reset(),this.variableList.set({store:this._variableStore,labelAttr:"label",labelType:"html",value:this._variableData[0].name}),this._savedMultidimensionalDefinition=null,i&&i.multidimensionalDefinition&&i.multidimensionalDefinition.length>0&&(this._savedMultidimensionalDefinition=i.multidimensionalDefinition,this._setVariableValueDefault()))},_setVariableValueDefault:function(){var e,t=this._savedMultidimensionalDefinition[0];t.variableName&&(e=""==t.variableName?this._i18n.widgets.multidimensionalFilter.defaultVariableText:t.variableName,this.variableList&&this.reset&&1===this.reset?e!=this.variableList.get("value")?this.variableList.set("value",e):this._onVariableListChange():this.variableList.set("value",e))},_setCachedDimensionProperties:function(){var e,t,i;for(e in this._cachedDimensions)this._cachedDimensions.hasOwnProperty(e)&&(t=e,this._dimensionWidgets[t]&&(i=this._dimensionWidgets[t],this._cachedDimensions[e].selected=i.getDimensionCheckboxValue(),this._cachedDimensions[e].isSlice=!i.getRangeCheckboxValue(),this._cachedDimensions[e].values=[Number(i.getMinValue()),Number(i.getMaxValue())]))},_onVariableListChange:function(){var e,t=this.variableList.get("value"),i=this._variableStore.query({name:t})[0],s=i.dimensions,n=this._variableData[0],a=this._savedMultidimensionalDefinition;!this._cachedDimensions&&this._dimensionStore&&(this._cachedDimensions={},R.forEach(n.dimensions,function(e){this._cachedDimensions[e.field]={}},this)),this._cachedDimensions&&this._setCachedDimensionProperties(),this._dimensionStore=null,this._dimensionStore=new r({data:s,idProperty:"name"}),this._createDimensionWidgets(),this._cachedDimensions?this._displayCachedProperties():a&&a.length>0&&(e=""==a[0].variableName?this._i18n.widgets.multidimensionalFilter.defaultVariableText:a[0].variableName,t==e&&this._setDimensionDefaults())},_createDimensionWidgets:function(){var e,t,i,s,n,a;this._destroyDimensionWidgets(),R.forEach(this._dimensionStore.data,function(l){e=l.field,s={hasRegularIntervals:l.hasRegularIntervals,interval:l.interval,intervalUnit:l.intervalUnit},a=l.hasRanges||!1,"StdTime"==e?(t=new N({dimension:l.name,hasRanges:a,dimensionAlias:this._returnFieldAlias(l.name),unit:l.unit,disabled:this.layer.useMapTime,intervalInfo:s,values:l.values}),t.placeAt(this.dimensionFilterGrid),this._dimensionWidgets[l.name]=t):"StdTime"!=e&&(n=this._isActiveDimension(l.name),i=new F({dimension:l.name,hasRanges:a,dimensionAlias:this._returnFieldAlias(l.name),unit:l.unit,disabled:n,intervalInfo:s,values:l.values}),i.placeAt(this.dimensionFilterGrid),this._dimensionWidgets[l.name]=i)},this),this._dimensionWidgets.StdTime.setDimensionCheckboxValue(!1)},_getUTCTime:function(e){return e&&e.setTime(e.getTime()+60*e.getTimezoneOffset()*1e3),e},_destroyDimensionWidgets:function(){var e=g.findWidgets(this.dimensionFilterGrid);R.forEach(e,function(e){e.destroyRecursive()}),this._dimensionWidgets={}},_displayCachedProperties:function(){var e,t,i,s,n,a,l=this._cachedDimensions;R.forEach(this._dimensionStore.data,function(o){e=0;for(t in l)if(l.hasOwnProperty(t)&&t==o.name&&l[t].values){e=1,i=t,s=l[t].isSlice,n=l[t].values,a=l[t].selected;break}e?(i.toLowerCase().indexOf("time")>-1&&!this.layer.useMapTime||-1===i.toLowerCase().indexOf("time")&&!this._isActiveDimension(i))&&this._updateDimensionValues(i,a,s,n[0],n[1]):(i=o.name,(-1===i.toLowerCase().indexOf("time")&&!this._isActiveDimension(i)||i.toLowerCase().indexOf("time")>-1&&!this.layer.useMapTime)&&this._updateDimensionValues(i,!1,!0,o.extent[0],o.extent[1]))},this)},_isActiveDimension:function(e){return this.layer.activeMapDimensions&&this.layer.activeMapDimensions.length>0&&R.indexOf(this.layer.activeMapDimensions,e)>-1},_setDimensionDefaults:function(){var e,t,i,s,n=this._savedMultidimensionalDefinition,a=0;R.forEach(this._dimensionStore.data,function(l){e=0,R.forEach(n,function(n){n.dimensionName==l.name&&(e=1,t=n.dimensionName,i=n.isSlice,s=n.values[1]?n.values:n.values[0],s.length||(s=[s]),(!this._dimensionWidgets[t].isMinBoxSupportedValue(s[0])||2===s.length&&!this._dimensionWidgets[t].isMaxBoxSupportedValue(s[1]))&&(a=1))},this),e?(t.toLowerCase().indexOf("time")>-1&&!this.layer.useMapTime||-1===t.toLowerCase().indexOf("time")&&!this._isActiveDimension(t))&&(i&&-1==R.indexOf(this._dimensionWithRanges,t)?this._updateDimensionValues(t,!0,i,s[0],l.extent[1]):this._updateDimensionValues(t,!0,i,s[0],s[1])):(t=l.name,(-1===t.toLowerCase().indexOf("time")&&!this._isActiveDimension(t)||t.toLowerCase().indexOf("time")>-1&&!this.layer.useMapTime)&&this._updateDimensionValues(t,!1,!0,l.extent[0],l.extent[1]))},this),a&&this._onClickApplyMultidimensionalFilter(),this.reset=0},_updateDimensionValues:function(e,t,i,s,n){var a=this._dimensionWidgets[e],l=null;a.getRangeCheckboxValue()===i&&(l||(l=a.on("range-rendered",function(){a.setMinValue(s),a.setMaxValue(n),l.remove(),l=null})),a.setRangeCheckboxValue(!i)),a.setMinValue(s),a.setMaxValue(n),a.setDimensionCheckboxValue(t)},_returnFieldAlias:function(e){var t;return R.forEach(this.layer.fields,function(i){i.name.toLowerCase()==e.toLowerCase()&&(t=i.alias)},this),t||e},_onClickApplyMultidimensionalFilter:function(){var e,t,i,s,n,a,l,o=this._dimensionWidgets,h=this.layer.mosaicRule,r=h&&h.multidimensionalDefinition,u=[];for(e in o)o.hasOwnProperty(e)&&o[e].getDimensionCheckboxValue()&&u.push(e);t=[],i=this.variableList.get("value")==this._i18n.widgets.multidimensionalFilter.defaultVariableText?"":this.variableList.get("value"),u.length||t.push({variableName:i}),R.forEach(u,function(e){s=e,l=this._dimensionWidgets[s],n=l.getRangeCheckboxValue()?[[Number(l.getMinValue()),Number(l.getMaxValue())]]:R.indexOf(this._dimensionWithRanges,s)>-1&&""==i||l.hasRanges&&""!=i?[[Number(l.getMinValue()),Number(l.getMaxValue())]]:[Number(l.getMinValue())],(-1===s.toLowerCase().indexOf("time")&&!this._isActiveDimension(s)||s.toLowerCase().indexOf("time")>-1&&!this.layer.useMapTime)&&t.push(new V({variableName:i,dimensionName:s,isSlice:!l.getRangeCheckboxValue(),values:n}))},this),r&&R.forEach(r,function(e){s=e.dimensionName,e.variableName=i,s&&-1===s.toLowerCase().indexOf("time")&&this._isActiveDimension(s)&&t.push(e)},this),h?(a=h,a.multidimensionalDefinition=t):this.layer.defaultMosaicRule?(a=this.layer.defaultMosaicRule,a.multidimensionalDefinition=t):a=new D({multidimensionalDefinition:[]}),this.layer.setMosaicRule(a)},_onClickResetMultidimensionalFilter:function(){var e,t,i=this.layer.mosaicRule,s=[];this.defaultMultidimensionalDefinition&&0===this.reset&&(this.reset=1,this._cachedDimensions=null,R.forEach(this.defaultMultidimensionalDefinition,function(t){e=t.dimensionName,(-1===e.toLowerCase().indexOf("time")&&!this._isActiveDimension(e)||e.toLowerCase().indexOf("time")>-1&&!this.layer.useMapTime)&&s.push(t)},this),i&&i.multidimensionalDefinition&&R.forEach(i.multidimensionalDefinition,function(t){e=t.dimensionName,-1===e.toLowerCase().indexOf("time")&&this._isActiveDimension(e)&&s.push(t)},this),0===s.length&&(s=this.defaultMultidimensionalDefinition),i?(t=i,t.multidimensionalDefinition=s):this.layer.defaultMosaicRule?(t=this.layer.defaultMosaicRule,t.multidimensionalDefinition=s):t=new D({multidimensionalDefinition:[]}),this.layer.setMosaicRule(t),this._savedMultidimensionalDefinition=s,this._savedMultidimensionalDefinition&&(this._dimensionStore=null,this._setVariableValueDefault()))}});return u("extend-esri")&&t.setObject("dijit.MultidimensionalFilter",k,d),k});