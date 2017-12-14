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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/Deferred","dojo/has","../kernel","../lang","../layerUtils","../deferredUtils","../Color","../urlUtils","./Task","../geometry/Polygon","../renderers/SimpleRenderer","../symbols/FillSymbol","./Geoprocessor","./PrintTemplate","dojo/dom-attr","dojo/dom-construct","dojox/gfx/_base","dojox/gfx/canvas","dojox/json/query","dojo/has!extend-esri?./PrintParameters","dojo/has!extend-esri?./LegendLayer"],function(e,r,t,i,a,n,s,l,o,d,y,u,c,m,f,p,g,h,b,v,S,x,L){var _=e(c,{declaredClass:"esri.tasks.PrintTask",constructor:function(e,t){this.url=e,this.printGp=new g(this.url),this._handler=r.hitch(this,this._handler),t&&t.async&&(this.async=t.async),this._colorEvaluator=L("$..color")},_vtlExtent:null,_handler:function(e,t,i,a,n){try{var s;this.async?"esriJobSucceeded"===e.jobStatus&&this.printGp.getResultData(e.jobId,"Output_File",r.hitch(this,function(e){s=e.value,this._successHandler([s],"onComplete",i,n)})):(s=e[0].value,this._successHandler([s],"onComplete",i,n))}catch(l){this._errorHandler(l,a,n)}},execute:function(e,n,s){var o=this._handler,y=this._errorHandler,u=e.template||new h;u.hasOwnProperty("showLabels")||(u.showLabels=!0);var c,m=u.exportOptions;if(m){var f=m.width,p=m.height,g=m.dpi;c={outputSize:[f,p],dpi:g}}var b,v=u.layoutOptions,S=[];if(v){this.legendAll=!1,v.legendLayers?t.forEach(v.legendLayers,function(e){var r={};r.id=e.layerId,e.subLayerIds&&(r.subLayerIds=e.subLayerIds),S.push(r)}):this.legendAll=!0;var x,L;"Miles"===v.scalebarUnit||"Kilometers"===v.scalebarUnit?(x="esriKilometers",L="esriMiles"):("Meters"===v.scalebarUnit||"Feet"===v.scalebarUnit)&&(x="esriMeters",L="esriFeet");var _={esriMiles:"mi",esriKilometers:"km",esriFeet:"ft",esriMeters:"m"};b={titleText:v.titleText,authorText:v.authorText,copyrightText:v.copyrightText,customTextElements:v.customTextElements,scaleBarOptions:{metricUnit:x,metricLabel:_[x],nonMetricUnit:L,nonMetricLabel:_[L]},legendOptions:{operationalLayers:S}}}var I=e.map,D=this._getPrintDefinition(I,u);if(e.outSpatialReference&&(D.mapOptions.spatialReference=e.outSpatialReference.toJson()),e.template&&l.isDefined(e.template.showAttribution)&&(D.mapOptions.showAttribution=e.template.showAttribution),r.mixin(D,{exportOptions:c,layoutOptions:b}),this.allLayerslegend&&r.mixin(D.layoutOptions,{legendOptions:{operationalLayers:this.allLayerslegend}}),D.operationalLayers){var F,R,T,w,O=D.operationalLayers,k=function(e){return l.fixJson(r.mixin(e,{type:"esriSLS",cap:void 0,join:void 0,meterLimit:void 0}))},C=new RegExp("[\\u4E00-\\u9FFF\\u0E00-\\u0E7F\\u0900-\\u097F\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF]"),E=/[\u0600-\u06FF]/,P=function(e){var r=e.text,t=e.font,i=t&&t.family&&t.family.toLowerCase();r&&t&&("arial"===i||"arial unicode ms"===i)&&(t.family=C.test(r)?"Arial Unicode MS":"Arial","normal"!==t.style&&E.test(r)&&(t.family="Arial Unicode MS"))};for(F=0;F<O.length;F++)if(O[F].featureCollection&&O[F].featureCollection.layers)for(R=0;R<O[F].featureCollection.layers.length;R++){var A=O[F].featureCollection.layers[R];if(A.layerDefinition&&A.layerDefinition.drawingInfo&&A.layerDefinition.drawingInfo.renderer&&A.layerDefinition.drawingInfo.renderer.symbol&&(w=A.layerDefinition.drawingInfo.renderer,"esriCLS"===w.symbol.type?w.symbol=k(w.symbol):"esriTS"===w.symbol.type?P(w.symbol):w.symbol.outline&&"esriCLS"===w.symbol.outline.type&&(w.symbol.outline=k(w.symbol.outline))),A.featureSet&&A.featureSet.features)for(T=0;T<A.featureSet.features.length;T++)w=A.featureSet.features[T],w.symbol&&("esriCLS"===w.symbol.type?w.symbol=k(w.symbol):"esriTS"===w.symbol.type?P(w.symbol):w.symbol.outline&&"esriCLS"===w.symbol.outline.type&&(w.symbol.outline=k(w.symbol.outline)))}}var M=i.toJson(l.fixJson(D)),V=u.format,j=u.layout,J={Web_Map_as_JSON:M,Format:V,Layout_Template:j};e.extraParameters&&(J=r.mixin(J,e.extraParameters));var U=new a(d._dfdCanceller),G=function(e,r){o(e,r,n,s,U)},z=function(e){y(e,s,U)};return this.async?U._pendingDfd=this.printGp.submitJob(J,G,null,z):U._pendingDfd=this.printGp.execute(J,G,z),U},onComplete:function(){},_createMultipointLayer:function(){return{layerDefinition:{name:"multipointLayer",geometryType:"esriGeometryMultipoint",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryMultipoint",features:[]}}},_createPolygonLayer:function(){return{layerDefinition:{name:"polygonLayer",geometryType:"esriGeometryPolygon",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPolygon",features:[]}}},_createPointLayer:function(){return{layerDefinition:{name:"pointLayer",geometryType:"esriGeometryPoint",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPoint",features:[]}}},_createPolylineLayer:function(){return{layerDefinition:{name:"polylineLayer",geometryType:"esriGeometryPolyline",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPolyline",features:[]}}},_convertSvgSymbol:function(e){if(!(n("ie")<=8||!e.path&&"image/svg+xml"!==e.contentType)){var r,t=x.createSurface(v.create("div"),1024,1024);r="image/svg+xml"===e.contentType?t.createObject(x.Image,{src:"data:image/svg+xml;base64,"+e.imageData,width:S.pt2px(e.width),height:S.pt2px(e.height),x:0,y:0}):t.createObject(x.Path,e.path).setFill(e.color).setStroke(e.outline),"pendingRender"in t&&t._render(!0);var i=t.rawNode.getContext("2d"),a=Math.ceil(r.getBoundingBox().width),s=Math.ceil(r.getBoundingBox().height),l=i.getImageData(r.getBoundingBox().x,r.getBoundingBox().y,a,s);i.canvas.width=a,i.canvas.height=s,i.putImageData(l,0,0);var o=i.canvas.toDataURL("image/png"),d={type:"esriPMS",imageData:o.substr(22,o.length),angle:e.angle,contentType:"image/png",height:e.size?e.size:S.px2pt(s),width:e.size?e.size*(a/s):S.px2pt(a),xoffset:e.xoffset,yoffset:e.yoffset};return t.destroy(),d}},_convertSvgRenderer:function(e){"simple"===e.type&&e.symbol&&(e.symbol.path||"image/svg+xml"===e.symbol.contentType)?e.symbol=this._convertSvgSymbol(e.symbol):"uniqueValue"===e.type?(e.defaultSymbol&&(e.defaultSymbol.path||"image/svg+xml"===e.defaultSymbol.contentType)&&(e.defaultSymbol=this._convertSvgSymbol(e.defaultSymbol)),e.uniqueValueInfos&&t.forEach(e.uniqueValueInfos,function(e){(e.symbol.path||"image/svg+xml"===e.symbol.contentType)&&(e.symbol=this._convertSvgSymbol(e.symbol))},this)):"classBreaks"===e.type&&(e.defaultSymbol&&(e.defaultSymbol.path||"image/svg+xml"===e.defaultSymbol.contentType)&&(e.defaultSymbol=this._convertSvgSymbol(e.defaultSymbol)),e.classBreakInfos&&t.forEach(e.classBreakInfos,function(e){(e.symbol.path||"image/svg+xml"===e.symbol.contentType)&&(e.symbol=this._convertSvgSymbol(e.symbol))},this))},_createFeatureCollection:function(e,i,a){var n=this._createPolygonLayer(),s=this._createPolylineLayer(),l=this._createPointLayer(),o=this._createMultipointLayer(),d=this._createPointLayer();d.layerDefinition.name="textLayer",delete d.layerDefinition.drawingInfo,("esri.layers.FeatureLayer"===e.declaredClass||"esri.layers.StreamLayer"===e.declaredClass)&&(n.layerDefinition.name=s.layerDefinition.name=l.layerDefinition.name=o.layerDefinition.name=r.getObject("arcgisProps.title",!1,e)||e.name||e.id);var y=e.renderer&&"esri.renderer.SimpleRenderer"===e.renderer.declaredClass;if(!e.renderer||e.renderer.valueExpression||r.isFunction(e.renderer.attributeField))delete n.layerDefinition.drawingInfo,delete s.layerDefinition.drawingInfo,delete l.layerDefinition.drawingInfo,delete o.layerDefinition.drawingInfo;else{var u=e.renderer.toJson({useLegacyRotationProperties:!0});if("temporal"===u.type){var c={latestObservationRenderer:u.latestObservationRenderer,trackLinesRenderer:u.trackRenderer,observationAger:u.observationAger,renderer:u.observationRenderer},f={};e._trackIdField&&(f.trackIdField=e._trackIdField),e._startTimeField&&(f.startTimeField=e._startTimeField),e._endTimeField&&(f.endTimeField=e._endTimeField),n.layerDefinition.drawingInfo=c,n.layerDefinition.timeInfo=f,s.layerDefinition.drawingInfo=c,s.layerDefinition.timeInfo=f,l.layerDefinition.drawingInfo=c,l.layerDefinition.timeInfo=f,o.layerDefinition.drawingInfo=c,o.layerDefinition.timeInfo=f}else n.layerDefinition.drawingInfo.renderer=u,s.layerDefinition.drawingInfo.renderer=u,l.layerDefinition.drawingInfo.renderer=u,o.layerDefinition.drawingInfo.renderer=u}var p=e.fields;p||!e.renderer||e.renderer.valueExpression||r.isFunction(e.renderer.attributeField)||("esri.renderer.ClassBreaksRenderer"===e.renderer.declaredClass?(p=[{name:e.renderer.attributeField,type:"esriFieldTypeDouble"}],e.renderer.normalizationField&&p.push({name:e.renderer.normalizationField,type:"esriFieldTypeDouble"})):"esri.renderer.UniqueValueRenderer"===e.renderer.declaredClass&&(p=[{name:e.renderer.attributeField,type:"esriFieldTypeString"}],e.renderer.attributeField2&&p.push({name:e.renderer.attributeField2,type:"esriFieldTypeString"}),e.renderer.attributeField3&&p.push({name:e.renderer.attributeField3,type:"esriFieldTypeString"}))),p&&(n.layerDefinition.fields=p,s.layerDefinition.fields=p,l.layerDefinition.fields=p,o.layerDefinition.fields=p);var g=e.graphics;e.isFeatureReductionActive&&e.isFeatureReductionActive()&&(g=e.getSingleGraphics());var h,b,v=g.length;for(b=0;v>b;b++){var S=g[b];if(S.visible!==!1&&S.geometry){if(h=S.toJson(),h.symbol&&h.symbol.outline&&h.symbol.outline.color&&h.symbol.outline.color[3]&&(h.symbol.outline.color[3]=255),e.renderer&&!h.symbol&&(r.isFunction(e.renderer.attributeField)||e.renderer.valueExpression||this._isFeatureCollectionRequired(e.renderer,e)||"esri.renderer.DotDensityRenderer"===e.renderer.declaredClass||a)){a=a||e.renderer;var x=null;try{x=a.getSymbol(S)}catch(L){}if(!x)continue;h.symbol=x.toJson(),this._isFeatureCollectionRequired(a,e)&&this._applyVisualVariables(h.symbol,{renderer:a,graphic:S,symbol:x,mapResolution:i&&i.getResolutionInMeters(),mapScale:i&&i.getScale()})}switch(h.symbol&&(h.symbol.path||"image/svg+xml"===h.symbol.contentType?h.symbol=this._convertSvgSymbol(h.symbol):h.symbol.text&&delete h.attributes),S.geometry.type){case"polygon":n.featureSet.features.push(h);break;case"polyline":s.featureSet.features.push(h);break;case"point":h.symbol&&h.symbol.text?d.featureSet.features.push(h):l.featureSet.features.push(h);break;case"multipoint":o.featureSet.features.push(h);break;case"extent":h.geometry=m.fromExtent(S.geometry).toJson(),n.featureSet.features.push(h)}}}var _=[];if(n.featureSet.features.length>0&&_.push(n),s.featureSet.features.length>0&&_.push(s),o.featureSet.features.length>0&&_.push(o),l.featureSet.features.length>0&&_.push(l),d.featureSet.features.length>0&&_.push(d),!_.length)return null;t.forEach(_,function(e){var r=t.every(e.featureSet.features,function(e){return e.symbol});(y||r)&&(t.forEach(e.featureSet.features,function(e){delete e.attributes}),delete e.layerDefinition.fields),r&&delete e.layerDefinition.drawingInfo}),t.forEach(_,function(e){e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&this._convertSvgRenderer(e.layerDefinition.drawingInfo.renderer)},this);var I={layers:_},D={id:e.id,opacity:e.opacity,minScale:e.minScale||0,maxScale:e.maxScale||0,featureCollection:I};return D},_getPrintDefinition:function(e,t){var i=this._createOperationalLayers(e,t),a={operationalLayers:i},n=this._vtlExtent||e.extent,s=e.spatialReference;this._vtlExtent=null,e.spatialReference._isWrappable()&&(n=n._normalize(!0),s=n.spatialReference);var l={mapOptions:{showAttribution:e.showAttribution,extent:n.toJson(),spatialReference:s.toJson()}};t.preserveScale&&r.mixin(l.mapOptions,{scale:t.outScale||e.getScale()}),e.timeExtent&&r.mixin(l.mapOptions,{time:[e.timeExtent.startTime.getTime(),e.timeExtent.endTime.getTime()]});var o={};return r.mixin(o,l,a),o},_createOperationalLayers:function(e,a){var n,s,l,d,y=[],c=0;a.preserveScale&&(c=a.outScale||e.getScale()),this.legendAll?this.allLayerslegend=[]:this.allLayerslegend=null,this._vtlExtent=null;var m=t.map(e.layerIds,e.getLayer,e);for(e._mapImageLyr&&m.push(e._mapImageLyr),n=0;n<m.length;n++)if(s=m[n],s.loaded&&s.visible&&(!c||s.isVisibleAtScale(c)))switch(l=s.declaredClass,d={id:s.id,title:r.getObject("arcgisProps.title",!1,s)||s.id,opacity:s.opacity,minScale:s.minScale||0,maxScale:s.maxScale||0},d=r.mixin(d,this._getUrlAndToken(s)),s.getNode()&&b.get(s.getNode(),"data-reference")&&(d._isRefLayer=!0),l){case"esri.layers.ArcGISDynamicMapServiceLayer":var p=[],g=!!s._params.layers;if(s._params.dynamicLayers){var h=i.fromJson(s._params.dynamicLayers);t.forEach(h,function(e){p.push({id:e.id,name:e.name,layerDefinition:e}),delete e.id,delete e.name,delete e.maxScale,delete e.minScale}),0===p.length&&(d.visibleLayers=[-1])}else if(s.supportsDynamicLayers){if(g||s.layerDefinitions||s.layerTimeOptions){var v=s.createDynamicLayerInfosFromLayerInfos(),S=null;g&&(S=s.visibleLayers),S=o._getVisibleLayers(v,S);var x=o._getLayersForScale(a.outScale||e.getScale(),v);t.forEach(v,function(e){if(!e.subLayerIds){var r=e.id;if(t.indexOf(S,r)>-1&&t.indexOf(x,r)>-1){var i={source:e.source.toJson()};s.layerDefinitions&&s.layerDefinitions[r]&&(i.definitionExpression=s.layerDefinitions[r]),s.layerTimeOptions&&s.layerTimeOptions[r]&&(i.layerTimeOptions=s.layerTimeOptions[r].toJson()),p.push({id:r,layerDefinition:i})}}}),0===p.length&&(d.visibleLayers=[-1])}}else t.forEach(s.layerInfos,function(e){var r={id:e.id,layerDefinition:{}};s.layerDefinitions&&s.layerDefinitions[e.id]&&(r.layerDefinition.definitionExpression=s.layerDefinitions[e.id]),s.layerTimeOptions&&s.layerTimeOptions[e.id]&&(r.layerDefinition.layerTimeOptions=s.layerTimeOptions[e.id].toJson()),(r.layerDefinition.definitionExpression||r.layerDefinition.layerTimeOptions)&&p.push(r)}),g&&(d.visibleLayers=s.visibleLayers);p.length&&(d.layers=p),y.push(d),this.allLayerslegend&&this.allLayerslegend.push({id:s.id,subLayerIds:s.visibleLayers});break;case"esri.layers.ArcGISImageServiceLayer":if(d=r.mixin(d,{url:s.url,bandIds:s.bandIds,compressionQuality:s.compressionQuality,format:s.format,interpolation:s.interpolation}),s.mosaicRule&&r.mixin(d,{mosaicRule:s.mosaicRule.toJson()}),s.renderingRule||s.renderer){var L=s.getExportImageRenderingRule();L&&r.mixin(d,{renderingRule:L.toJson()})}y.push(d),this.allLayerslegend&&this.allLayerslegend.push({id:s.id});break;case"esri.layers.WMSLayer":d=r.mixin(d,{url:s.url,title:s.title,type:"wms",version:s.version,transparentBackground:s.imageTransparency,visibleLayers:s.visibleLayers}),y.push(d),this.allLayerslegend&&this.allLayerslegend.push({id:s.id,subLayerIds:s.visibleLayers});break;case"esri.virtualearth.VETiledLayer":var _=s.mapStyle;"roadOnDemand"===_?_="Road":"aerialWithLabelsOnDemand"===_&&(_="Hybrid"),d=r.mixin(d,{visibility:s.visible,type:"BingMaps"+_,culture:s.culture,key:s.bingMapsKey}),y.push(d);break;case"esri.layers.OpenStreetMapLayer":d=r.mixin(d,{credits:s.copyright,type:"OpenStreetMap",url:u.getAbsoluteUrl(s.tileServers[0])}),y.push(d);break;case"esri.layers.WMTSLayer":d=r.mixin(d,{url:s.url,type:"wmts",layer:s._identifier,style:s._style,format:s.format,tileMatrixSet:s._tileMatrixSetId}),y.push(d);break;case"esri.layers.MapImageLayer":var I=s.getImages();t.forEach(I,function(e,r){e.visible&&e.href&&(d={id:s.id+"_image"+r,type:"image",title:s.id,minScale:s.minScale||0,maxScale:s.maxScale||0,opacity:s.opacity*e.opacity,extent:e.extent.toJson()},"data:image/png;base64,"===e.href.substr(0,22)?d.imageData=e.href.substr(22):d.url=e.href,y.push(d))});break;case"esri.layers.VectorTileLayer":d.type="image",d.url&&delete d.url;var D=this._vtlExtent||e.extent.offset(0,0),F=a.exportOptions&&a.exportOptions.dpi||96,R={format:"png",pixelRatio:F/96};if("MAP_ONLY"===a.layout&&a.preserveScale&&(!a.outScale||a.outScale===e.getScale())&&96===F&&a.exportOptions&&(a.exportOptions.width%2!==e.width%2||a.exportOptions.height%2!==e.height%2)&&(R.area={x:0,y:0,width:e.width,height:e.height},a.exportOptions.width%2!==e.width%2&&(R.area.width-=1),a.exportOptions.height%2!==e.height%2&&(R.area.height-=1),!this._vtlExtent)){var T=e.toMap({x:R.area.width,y:R.area.height});D.update(D.xmin,T.y,T.x,D.ymax,D.spatialReference),this._vtlExtent=D}d.extent=D._normalize(!0).toJson();var w=s.takeScreenshot(R);w.isResolved()?w.then(function(e){"data:image/png;base64,"===e.dataURL.substr(0,22)&&(d.imageData=e.dataURL.substr(22))}):console.error("PrintTask: VectorTileLayer.takeScreenshot() returned an unresolved Promise"),d.imageData&&y.push(d);break;case"esri.layers.WebTiledLayer":var O=s.url.replace(/\$\{/g,"{");d=r.mixin(d,{type:"WebTiledLayer",urlTemplate:O,credits:s.copyright}),s.subDomains&&s.subDomains.length>0&&(d.subDomains=s.subDomains),s._wmtsInfo&&(d.wmtsInfo=s._wmtsInfo),delete d.url,y.push(d);break;default:(s.getTileUrl||s.getImageUrl)&&(d=r.mixin(d,{url:s.url}),y.push(d))}var k=t.map(e.graphicsLayerIds,e.getLayer,e);for(n=0;n<k.length;n++)s=k[n],s.isFeatureReductionActive&&s.isFeatureReductionActive()&&(s.getSingleGraphics().length?k.splice(++n,0,s.getFeatureReductionLayer()):k[n]=s.getFeatureReductionLayer());for(n=0;n<k.length;n++)if(s=k[n],s.loaded&&s.visible&&(!c||s.isVisibleAtScale(c))){l=s.declaredClass;var C;switch(l){case"esri.layers.FeatureLayer":case"esri.layers.LabelLayer":case"esri.layers.CSVLayer":case"esri.layers.StreamLayer":if("esri.layers.LabelLayer"===l&&!a.showLabels||s.renderer&&"esri.renderer.HeatmapRenderer"===s.renderer.declaredClass)continue;if(C=null,s.url&&s.renderer&&("esri.renderer.ScaleDependentRenderer"===s.renderer.declaredClass?"scale"===s.renderer.rangeType?C=s.renderer.getRendererInfoByScale(e.getScale())&&s.renderer.getRendererInfoByScale(e.getScale()).renderer:"zoom"===s.renderer.rangeType&&(C=s.renderer.getRendererInfoByZoom(e.getZoom())&&s.renderer.getRendererInfoByZoom(e.getZoom()).renderer):C=s.renderer),C&&("esri.renderer.SimpleRenderer"===C.declaredClass||"esri.renderer.TemporalRenderer"===C.declaredClass||r.isString(C.attributeField)&&s._getField(C.attributeField,!0))&&!C.valueExpression&&!this._isFeatureCollectionRequired(C,s)&&"esri.renderer.DotDensityRenderer"!==C.declaredClass&&"esri.layers.CSVLayer"!==s.declaredClass&&"esri.layers.StreamLayer"!==s.declaredClass){if(d={id:s.id,title:r.getObject("arcgisProps.title",!1,s)||s.id,opacity:s.opacity,minScale:s.minScale||0,maxScale:s.maxScale||0,layerDefinition:{drawingInfo:{renderer:C.toJson({useLegacyRotationProperties:!0})}}},d=r.mixin(d,this._getUrlAndToken(s)),"esri.renderer.TemporalRenderer"===C.declaredClass){var E=d.layerDefinition.drawingInfo;E.latestObservationRenderer=E.renderer.latestObservationRenderer,E.trackLinesRenderer=E.renderer.trackRenderer,E.observationAger=E.renderer.observationAger,E.renderer=E.renderer.observationRenderer,s._trackIdField&&(d.layerDefinition.timeInfo={trackIdField:s._trackIdField})}if(this._convertSvgRenderer(d.layerDefinition.drawingInfo.renderer),s.opacity<1||"esri.renderer.TemporalRenderer"===C.declaredClass||this._updateLayerOpacity(d)){if(s._params.source){var P=s._params.source.toJson();r.mixin(d.layerDefinition,{source:P})}if(s.getDefinitionExpression()&&r.mixin(d.layerDefinition,{definitionExpression:s.getDefinitionExpression()}),2!==s.mode){if(s.getSelectedFeatures().length>0){var A=t.map(s.getSelectedFeatures(),function(e){return e.attributes[s.objectIdField]});A.length>0&&s.getSelectionSymbol()&&r.mixin(d,{selectionObjectIds:A,selectionSymbol:s.getSelectionSymbol().toJson()})}}else{var M=t.map(s.getSelectedFeatures(),function(e){return e.attributes[s.objectIdField]});if(0===M.length||!s._params.drawMode)break;r.mixin(d.layerDefinition,{objectIds:M});var V=null;s.getSelectionSymbol()&&(V=new f(s.getSelectionSymbol())),r.mixin(d.layerDefinition.drawingInfo,{renderer:V&&V.toJson()})}}else d=this._createFeatureCollection(s,e)}else d=C&&(C.valueExpression||this._isFeatureCollectionRequired(C,s)||"esri.renderer.DotDensityRenderer"===C.declaredClass)?this._createFeatureCollection(s,e,C):this._createFeatureCollection(s,e);if(!d)continue;y.push(d),this.allLayerslegend&&this.allLayerslegend.push({id:s.id});break;case"esri.layers._GraphicsLayer":case"esri.layers.GraphicsLayer":case"esri.layers.WFSLayer":if(d=this._createFeatureCollection(s,e),!d)continue;y.push(d),this.allLayerslegend&&this.allLayerslegend.push({id:s.id});break;case"esri.layers.ArcGISImageServiceVectorLayer":d={id:s.id,title:r.getObject("arcgisProps.title",!1,s)||s.id,opacity:s.opacity,minScale:s.minScale||0,maxScale:s.maxScale||0,visibility:s.visible,symbolTileSize:s.symbolTileSize,layerDefinition:{drawingInfo:{renderer:s.renderer.toJson({useLegacyRotationProperties:!0})}}},d=r.mixin(d,this._getUrlAndToken(s)),s.mosaicRule&&r.mixin(d,{mosaicRule:s.mosaicRule.toJson()}),y.push(d),this.allLayerslegend&&this.allLayerslegend.push({id:s.id})}}return c&&t.forEach(y,function(e){e.minScale=0,e.maxScale=0}),e.graphics&&e.graphics.graphics.length>0&&(d=this._createFeatureCollection(e.graphics,e),d&&y.push(d)),e._labels&&a.showLabels&&(d=this._createFeatureCollection(e._labels,e),d&&y.push(d)),t.forEach(y,function(e,r,t){e._isRefLayer&&(delete e._isRefLayer,t.splice(r,1),t.push(e))}),y},_getUrlAndToken:function(e){return{token:e._getToken(),url:e._url?e._url.path:null}},_updateLayerOpacity:function(e){var i=this._colorEvaluator(e);i=t.filter(i,function(e){return r.isArray(e)&&4===e.length});var a=!0;if(i.length){var n,s=i[0][3];for(n=1;n<i.length;n++)if(s!==i[n][3]){a=!1;break}if(a)for(e.opacity=s/255,n=0;n<i.length;n++)i[n][3]=255}return a},_isFeatureCollectionRequired:function(e,t){if(t&&t.isFeatureReductionActive&&t.isFeatureReductionActive())return!0;var i=!1,a=this._getVariable(e,"rotationInfo",!1);if(a){var n=a.field;i=n&&r.isFunction(n)||a.valueExpression}return e.hasVisualVariables("sizeInfo")||e.hasVisualVariables("colorInfo")||e.hasVisualVariables("opacityInfo")||i},_getVariable:function(e,r,t){var i,a;return e&&(i=e.getVisualVariablesForType(r,t),a=i&&i[0]),a},_applyVisualVariables:function(e,r){var t=r.renderer,i=r.graphic,a=r.symbol,n=r.mapResolution,s=r.mapScale,l=a.type;if("textsymbol"!==l&&"shieldlabelsymbol"!==l){var o=this._getVariable(t,"sizeInfo",!1),d=this._getVariable(t,"colorInfo",!1),u=this._getVariable(t,"opacityInfo",!1),c=this._getVariable(t,"rotationInfo",!1);a instanceof p&&(o=this._getVariable(t,"sizeInfo","outline")||o);var m,f,g;if(m=o?t.getSize(i,{sizeInfo:o,shape:"simplemarkersymbol"===l?a.style:null,resolution:n,scale:s}):i.size,null!=m&&("simplemarkersymbol"===l?e.size=S.px2pt(m):"picturemarkersymbol"===l?(g=m,f=g*(a.width/a.height),e.width=S.px2pt(f),e.height=S.px2pt(g),0!==a.xoffset&&(e.xoffset=S.px2pt(f*(a.xoffset/a.width))),0!==a.yoffset&&(e.yoffset=S.px2pt(g*(a.yoffset/a.height)))):"simplelinesymbol"===l?e.width=S.px2pt(m):e.outline&&(e.outline.width=S.px2pt(m))),d){var h=t.getColor(i,{colorInfo:d});h&&("simplemarkersymbol"===l||"simplelinesymbol"===l||"simplefillsymbol"===l)&&(e.color=y.toJsonColor(h))}if(u){var b=t.getOpacity(i,{opacityInfo:u});null!=b&&e.color&&(e.color[3]=Math.round(255*b))}if(c){var v=t.getRotationAngle(i,{rotationInfo:c});v&&(e.angle=-v)}}}});return n("extend-esri")&&r.setObject("tasks.PrintTask",_,s),_});