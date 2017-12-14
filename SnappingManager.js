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

define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/_base/Deferred","dojo/has","dojo/keys","./kernel","./graphic","./geometry/ScreenPoint","./geometry/Extent","./symbols/SimpleMarkerSymbol","./symbols/SimpleLineSymbol","./tasks/query"],function(e,n,t,a,i,s,o,r,p,c,h,l,y,_,g){var f=e(null,{declaredClass:"esri.SnappingManager",constructor:function(e){if(e=e||{},e.map||console.error("map is not specified for SnappingManager"),this.map=e.map,this.tolerance=e.tolerance||15,this.layerInfos=[],e.layerInfos)this.layerInfos=e.layerInfos;else{var a;for(a=0;a<this.map.graphicsLayerIds.length;a++){var s=this.map.getLayer(this.map.graphicsLayerIds[a]);this.layerInfos.push({layer:s})}if(this.map.loaded)this.layerInfos.push({layer:this.map.graphics});else var p=n.connect(this.map,"onLoad",this,function(e){n.disconnect(p),p=null,this.layerInfos.push({layer:this.map.graphics}),this.setLayerInfos(this.layerInfos)})}e.snapPointSymbol?this.snapPointSymbol=e.snapPointSymbol:this.snapPointSymbol=new y(y.STYLE_CROSS,15,new _(_.STYLE_SOLID,new i([0,255,255]),1),new i([0,255,0,0])),e.alwaysSnap?this.alwaysSnap=e.alwaysSnap:this.alwaysSnap=!1,e.snapKey?this.snapKey=e.snapKey:this.snapKey=o("mac")?r.META:r.CTRL,this._SelectionLyrQuery=new g,this._SelectionLyrQuery.spatialRelationship=g.SPATIAL_REL_INTERSECTS,this._snappingGraphic=new c,this.setLayerInfos(this.layerInfos),this._currentGraphicOption={snapToPoint:!0,snapToVertex:!0,snapToEdge:!0},this._snappingCallback=t.hitch(this,this._snappingCallback)},getSnappingPoint:function(e){var n=this.layers,i=this.tolerance,o=this.map,r=this.layerOptions,p=o.toMap(e.offset(-i,i)),c=o.toMap(e.offset(i,-i)),h=new l(p.x,p.y,c.x,c.y,o.spatialReference),y=new g;y.geometry=h,y.spatialRelationship=g.SPATIAL_REL_INTERSECTS;var _,f,u=[],S=[],d=this._extractPointsAndLines,m=new s,x=0,L=h.xmin,v=h.xmax;a.forEach(n,function(e,n){e.visible&&e.loaded&&"esri.layers.FeatureLayer"===e.declaredClass&&e.mode!==e.constructor.MODE_SELECTION&&x++}),o.spatialReference._isWrappable()&&(L=l.prototype._normalizeX(h.xmin,o.spatialReference._getInfo()).x,v=l.prototype._normalizeX(h.xmax,o.spatialReference._getInfo()).x);var E=new l(L,h.ymin,v,h.ymax,o.spatialReference);a.forEach(n,function(e,n){if("esri.layers.GraphicsLayer"===e.declaredClass&&e.visible){var t=[];a.forEach(e.graphics,function(e){e&&e.visible&&E.intersects(e.geometry)&&t.push(e)});var i=d(t,r[n]);u=u.concat(i[0]),S=S.concat(i[1])}});var P=t.hitch(this,function(n){if(x--,n instanceof Error){var t="getSnappingPoint: query features failed";console.log(t)}else{var a=d(n.features,r[f]);u=u.concat(a[0]),S=S.concat(a[1])}x||(_=this._getSnappingPoint(u,S,e),m.callback(_))}),M=!1;return a.forEach(n,function(e,n){e.visible&&e.loaded&&(f=n,"esri.layers.FeatureLayer"===e.declaredClass&&e.mode!==e.constructor.MODE_SELECTION&&(M=!0,e.queryFeatures(y,P,P)))}),M||(_=this._getSnappingPoint(u,S,e),m.callback(_)),m},setLayerInfos:function(e){this.layers=[],this.layerOptions=[];var n;for(n=0;n<e.length;n++)this.layers.push(e[n].layer),this.layerOptions.push({snapToPoint:!0,snapToVertex:!0,snapToEdge:!0}),e[n].snapToPoint===!1&&(this.layerOptions[n].snapToPoint=e[n].snapToPoint),e[n].snapToVertex===!1&&(this.layerOptions[n].snapToVertex=e[n].snapToVertex),e[n].snapToEdge===!1&&(this.layerOptions[n].snapToEdge=e[n].snapToEdge);this._featurePtsFromSelectionLayer=[],this._featureLinesFromSelectionLayer=[],this._selectionLayers=[],this._selectionLayerOptions=[],a.forEach(this.layers,function(e,n){"esri.layers.FeatureLayer"===e.declaredClass&&e.mode===e.constructor.MODE_SELECTION&&(this._selectionLayers.push(e),this._selectionLayerOptions.push(this.layerOptions[n]))},this),this.layerInfos=e},destroy:function(){n.disconnect(this._onExtentChangeConnect),this._killOffSnapping(),this._featurePtsFromSelectionLayer=this._featureLinesFromSelectionLayer=this._currentFeaturePts=this._currentFeatureLines=this.layers=this.map=null},_startSelectionLayerQuery:function(){n.disconnect(this._onExtentChangeConnect),this._mapExtentChangeHandler(this._selectionLayers,this._selectionLayerOptions,this.map.extent),this._onExtentChangeConnect=n.connect(this.map,"onExtentChange",t.hitch(this,"_mapExtentChangeHandler",this._selectionLayers,this._selectionLayerOptions))},_stopSelectionLayerQuery:function(){n.disconnect(this._onExtentChangeConnect)},_mapExtentChangeHandler:function(e,n,i){this._featurePtsFromSelectionLayer=[],this._featureLinesFromSelectionLayer=[];var s;this._SelectionLyrQuery.geometry=i;var o=t.hitch(this,function(e){if(e instanceof Error){var t="getSnappingPoint: query features failed";console.log(t)}else{var a=this._extractPointsAndLines(e.features,n[s]);this._featurePtsFromSelectionLayer=this._featurePtsFromSelectionLayer.concat(a[0]),this._featureLinesFromSelectionLayer=this._featureLinesFromSelectionLayer.concat(a[1])}});a.forEach(e,function(e,n){e.visible&&e.loaded&&(s=n,e.queryFeatures(this._SelectionLyrQuery,o,o))},this)},_extractPointsAndLines:function(e,n){var t,i,s=[],o=[];return a.forEach(e,function(e,a){if((!e._graphicsLayer||e.visible)&&e.geometry)if("point"===e.geometry.type&&n.snapToPoint)s.push(e.geometry);else if("polyline"===e.geometry.type)for(t=0;t<e.geometry.paths.length;t++){for(o.push("lineStart"),i=0;i<e.geometry.paths[t].length;i++){var r=e.geometry.getPoint(t,i);n.snapToVertex&&s.push(r),n.snapToEdge&&o.push(r)}o.push("lineEnd")}else if("polygon"===e.geometry.type)for(t=0;t<e.geometry.rings.length;t++){for(o.push("lineStart"),i=0;i<e.geometry.rings[t].length;i++){var p=e.geometry.getPoint(t,i);n.snapToVertex&&s.push(p),n.snapToEdge&&o.push(p)}o.push("lineEnd")}}),[s,o]},_getSnappingPoint:function(e,n,t){var i,s,o=this.tolerance,r=this.map,p=this.map._getFrameWidth();if(e=e.concat(this._featurePtsFromSelectionLayer),n=n.concat(this._featureLinesFromSelectionLayer),this._currentGraphic){var c=this._extractPointsAndLines([this._currentGraphic],this._currentGraphicOption);e=e.concat(c[0]),n=n.concat(c[1])}var l,y;if(a.forEach(e,function(e,n){var a=r.toScreen(e,!0);if(-1!==p&&(a.x=a.x%p,a.x<0&&(a.x+=p),r.width>p))for(var s=(r.width-p)/2;a.x<s;)a.x+=p;i=Math.sqrt((a.x-t.x)*(a.x-t.x)+(a.y-t.y)*(a.y-t.y)),o>=i&&(o=i,l=a.x,y=a.y)}),l){var _=new h(l,y);_=r.toMap(_),s=_}else{var g,f,u,S;for(o=this.tolerance,u=0;u<n.length;u++)if("lineStart"===n[u])for(S=u+1;S<n.length;S++){if("lineEnd"!==n[S+1]&&"lineStart"!==n[S+1]&&"lineEnd"!==n[S]&&"lineStart"!==n[S]){var d=r.toScreen(n[S],!0),m=r.toScreen(n[S+1],!0),x=d.x>=m.x?d:m,L=d.x>=m.x?m:d;-1!==p&&(x.x=x.x%p,x.x<0&&(x.x+=p),L.x=L.x%p,L.x<0&&(L.x+=p),L.x>x.x&&(L.x-=p));var v,E,P,M,T,C,b=x.x,w=x.y,I=L.x,O=L.y;if(b===I)v=b,E=t.y,P=M=b,T=O>=w?w:O,C=O>=w?O:w;else if(w===O)v=t.x,E=w,P=I>=b?b:I,M=I>=b?I:b,T=C=w;else{var F=(O-w)/(I-b),K=(w*I-b*O)/(I-b),G=(b-I)/(O-w),D=(t.y*O-t.y*w-t.x*b+t.x*I)/(O-w);v=(K-D)/(G-F),E=F*v+K,P=I>=b?b:I,M=I>=b?I:b,T=O>=w?w:O,C=O>=w?O:w}if(v>=P&&M>=v&&E>=T&&C>=E){var k=Math.sqrt((t.x-v)*(t.x-v)+(t.y-E)*(t.y-E));o>=k&&(o=k,g=v,f=E)}else{var R,A=Math.sqrt((b-t.x)*(b-t.x)+(w-t.y)*(w-t.y)),H=Math.sqrt((I-t.x)*(I-t.x)+(O-t.y)*(O-t.y));H>=A?(R=A,v=b,E=w):(R=H,v=I,E=O),o>=R&&(o=R,g=v,f=E)}}if("lineEnd"===n[S]){u=S;break}}if(g){var q=new h(g,f);q=r.toMap(q),s=q}}return s},_setGraphic:function(e){this._currentGraphic=e},_addSnappingPointGraphic:function(){var e=this.map,n=this.snapPointSymbol;this._snappingGraphic.setSymbol(n),e.graphics.add(this._snappingGraphic)},_setUpSnapping:function(){var e=this.map;this._onSnapKeyDown_connect=n.connect(e,"onKeyDown",this,"_onSnapKeyDownHandler"),this._onSnapKeyUp_connect=n.connect(e,"onKeyUp",this,"_onSnapKeyUpHandler"),this._onSnappingMouseMove_connect=n.connect(e,"onMouseMove",this,"_onSnappingMouseMoveHandler"),this._onSnappingMouseDrag_connect=n.connect(e,"onMouseDrag",this,"_onSnappingMouseMoveHandler"),this.alwaysSnap&&this._activateSnapping()},_killOffSnapping:function(){n.disconnect(this._onSnapKeyDown_connect),n.disconnect(this._onSnapKeyUp_connect),n.disconnect(this._onSnappingMouseMove_connect),n.disconnect(this._onSnappingMouseDrag_connect),this._deactivateSnapping()},_onSnapKeyDownHandler:function(e){e.keyCode===this.snapKey&&(n.disconnect(this._onSnapKeyDown_connect),this.alwaysSnap?this._deactivateSnapping():this._activateSnapping())},_activateSnapping:function(){this._snappingActive=!0,this._addSnappingPointGraphic(),this._currentLocation&&this._onSnappingMouseMoveHandler(this._currentLocation)},_onSnapKeyUpHandler:function(e){e.keyCode===this.snapKey&&(this._onSnapKeyDown_connect=n.connect(this.map,"onKeyDown",this,"_onSnapKeyDownHandler"),this.alwaysSnap?this._activateSnapping():this._deactivateSnapping())},_deactivateSnapping:function(){this._snappingActive=!1,this._snappingPoint=null,this.map.graphics.remove(this._snappingGraphic),this._snappingGraphic.setGeometry(null)},_onSnappingMouseMoveHandler:function(e){if(this._currentLocation=e,this._snappingPoint=null,this._snappingActive){this._snappingGraphic.hide();var n=this.getSnappingPoint(e.screenPoint);n.addCallback(this._snappingCallback)}},_snappingCallback:function(e){this._snappingPoint=e,e&&(this._snappingGraphic.show(),this._snappingGraphic.setGeometry(e))}});return o("extend-esri")&&(p.SnappingManager=f),f});