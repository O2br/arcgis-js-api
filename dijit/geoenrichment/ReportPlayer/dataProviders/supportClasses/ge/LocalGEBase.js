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

define(["dojo/_base/declare","dojo/_base/lang","dojo/Evented","dojo/on","esri/graphic","esri/tasks/FeatureSet","../AreaDataUtil","../stdGeographies/StdGeographiesUtil","dojo/i18n!../../../../../../nls/jsapi"],function(e,a,t,r,i,n,s,o,l){l=l.geoenrichment.dijit.ReportPlayer.ReportPlayer;var h=e(t,{metadata:{name:"StdGeographyName",address:"address"},_variables:null,_variableShortToFullNameCache:null,_areaData:null,_cacheData:!1,_data:null,_initGE:function(e,a,t){this._variables=e||[],this._variableShortToFullNameCache={},this._variables.forEach(function(e){this._variableShortToFullNameCache[-1===e.indexOf(".")?e:e.substr(e.indexOf(".")+1)]=e},this);var r=a&&s.getAreaDataObjectCalculator(a,t);return r?void(this._areaData=[r.data].concat(r.comparisonLevels||[])):void this._handleError(new Error("Can't get infographic calculator"))},getVariables:function(){return this._variables},setVariables:function(e){this._variables=e},getData:function(){if(this._data)return this._data;var e=new n,a=this._prepareFeatures();return e.features=a,e.fields=this._prepareFields(a),this._prepareFieldAliases(e),this._cacheData&&(this._data=e),e},_prepareFeatures:function(){var e=[];if(!this._areaData)return e;for(var a=0;a<this._areaData.length;a++){var t={AREA_ID:a+""};if(this._propulateAttributesFromAreaData(t,this._areaData[a]),t.StdGeographyName=String(t.StdGeographyName||""),t.StdGeographyID=String(t.StdGeographyID||""),t.StdGeographyLevel=String(t.StdGeographyLevel||""),0===a)t.name=t.StdGeographyName=l.thisArea;else{if(!t.StdGeographyName&&!t.StdGeographyID&&!t.StdGeographyLevel){console.log("LocalGEBase.js can't add an unidentifiable geography.");continue}t.name=o.getAreaName(t)}e.push(new i(null,null,t))}return e},_propulateAttributesFromAreaData:function(e,t){a.mixin(e,t)},_stringAttrs:{AREA_ID:1,StdGeographyName:1,StdGeographyID:1,StdGeographyLevel:1,name:1},_prepareFields:function(e){var a=[];if(!e.length)return a;var t=e[0].attributes;for(var r in t)a.push(this._createField(r,t));return a},_createField:function(e,a){var t=this._stringAttrs[e]||"string"==typeof a[e];return{name:e,alias:e,type:t?"esriFieldTypeString":"esriFieldTypeDouble",length:t?256:void 0,fullName:this._variableShortToFullNameCache[e],decimals:t?void 0:0,units:t?"other":"double"}},_prepareFieldAliases:function(e){e.fieldAliases={},e.fields.forEach(function(a){e.fieldAliases[a.name]=a.alias})},_handleError:function(e){setTimeout(function(){e&&r.emit(this,"error",e)}.bind(this))},isBusy:function(){return!1},setOutSR:function(){},setGeoLevels:function(){},setStudyArea:function(){},stop:function(){}});return h});