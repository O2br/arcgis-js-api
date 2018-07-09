// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../lib/glMatrix","./TerrainConst","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/DefaultVertexBufferLayouts","../webgl-engine/lib/glUtil3D","../../vectorTiles/tileRendererHelper3D","../../vectorTiles/VectorTileDisplayObject","../../webgl/BufferObject","../../webgl/FramebufferObject","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],function(e,t,r,a,i,s,n,o,l,d,c,u,p,h){function f(e){return e instanceof HTMLImageElement||e instanceof HTMLCanvasElement}var x=new Array(20),b=[0,0];return function(){function e(e,t,r,a,o){this._backgroundTex=null,this._blackTex=null,this.tileSize=256,this._context=e,this.tileSize=t,this._resourceCounter=a,this._setNeedsRender=o,e.capabilities.textureFilterAnisotropic&&(this._maxAnisotropy=Math.min(8,e.parameters.maxMaxAnisotropy));var l=new Float32Array(20);l[0]=-1,l[1]=-1,l[2]=0,l[3]=0,l[4]=0,l[5]=1,l[6]=-1,l[7]=0,l[8]=1,l[9]=0,l[10]=-1,l[11]=1,l[12]=0,l[13]=0,l[14]=1,l[15]=1,l[16]=1,l[17]=0,l[18]=1,l[19]=1,this._vaoQuad=new h(e,i.Default3D,{geometry:s.Pos3Tex},{geometry:d.createVertex(e,35044,l)}),this._blendLayersProgram=r.get("blendLayers"),this._blackTex=n.createColorTexture(this._context,[0,0,0,1])}return e.prototype.dispose=function(){this._fbo&&(this._fbo.dispose(),this._fbo=null),this._vaoQuad&&(this._vaoQuad.dispose(),this._vaoQuad=null),this._backgroundTex&&(this._backgroundTex.dispose(),this._backgroundTex=null),this._blackTex&&(this._blackTex.dispose(),this._blackTex=null),this._blendLayersProgram&&(this._blendLayersProgram.dispose(),this._blendLayersProgram=null),this._context&&(this._context=null)},e.prototype.updateTileTexture=function(e){for(var t=a.LayerClass.MAP,i=e.layerInfo[t],s=0;s<i.length;s++)i[s].pendingUpdates&=~a.TileUpdateTypes.UPDATE_TEXTURE;if(e.renderData){for(var n=e.renderData,o=e.parentSurface,l=o.baseOpacity,d=0,c=!1,p=i.length-1,h=i.length,b=0;b<i.length;b++){var _=i[b],g=o.layerViewByIndex(b,t),T=g.fullOpacity;if(x[b]=T,this._isBaseLayer(g.layer)&&h>=i.length&&(h=b),(_.data||_.upsampleFromTile)&&(d++,g.isOpaque&&1===T)){c=!0,p=b;break}}var m,y,v=l;if(0===d&&this._backgroundTex)n.textureReference=this._backgroundTex,r.vec4d.set4(0,0,1,1,n.texOffsetAndScale);else if(1===d&&c){var _=i[p];_.data?(m=_,r.vec4d.set4(0,0,1,1,n.texOffsetAndScale)):(y=_.upsampleFromTile,m=y.tile.layerInfo[t][p],r.vec4d.set4(y.offset[0],y.offset[1],y.scale,y.scale,n.texOffsetAndScale)),m&&(f(m.data)&&(m.data=this._buildTexture(m.data),y?y.tile.updateMemoryUsed():e.updateMemoryUsed()),m.data instanceof u&&(n.textureReference=m.data))}else v=this._composeMapLayers(e,i,p,h,c,x),n.textureReference=null,r.vec4d.set4(0,0,1,1,n.texOffsetAndScale);n.opacity=v,this._setNeedsRender()}},e.prototype.setBackground=function(e){f(e)?this._backgroundTex=this._buildTexture(e):this._backgroundTex=n.createColorTexture(this._context,e||[0,0,0,0])},e.prototype._buildTexture=function(e){var t,r={target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,maxAnisotropy:this._maxAnisotropy,flipped:!0,hasMipmap:!0},a=this._context;if(e)try{t=new u(a,r,e)}catch(e){t=n.createEmptyTexture(a),console.warn("TileRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}else r.width=r.height=this.tileSize,t=new u(a,r);return a.bindTexture(t),t.generateMipmap(),t},e.prototype._drawRasterData=function(e,t,r,a){void 0===a&&(a=1);var i=this._context,s=this._blendLayersProgram,n=this._vaoQuad;i.bindProgram(s),i.bindVAO(n),p.assertCompatibleVertexAttributeLocations(n,s),i.bindTexture(e,0),s.setUniform1i("tex",0),s.setUniform1f("scale",t),s.setUniform2f("offset",r[0],r[1]),s.setUniform1f("opacity",a),i.drawArrays(5,0,p.vertexCount(n,"geometry"))},e.prototype._composeMapLayers=function(e,t,r,i,s,n){var d=a.LayerClass.MAP,p=this._context;e.renderData.texture||(e.renderData.texture=this._buildTexture(),e.updateMemoryUsed());var h=e.renderData.texture,x=this._fbo;x&&x.width===h.descriptor.width&&x.height===h.descriptor.height||(x=c.create(p,{colorTarget:0,depthStencilTarget:1,width:h.descriptor.width,height:h.descriptor.height}),this._fbo=x);var _=p.gl;p.bindFramebuffer(x),p.setViewport(0,0,this.tileSize,this.tileSize),p.setClearColor(0,0,0,0),p.setClearDepth(1),p.clear(_.COLOR_BUFFER_BIT|_.DEPTH_BUFFER_BIT),p.setDepthTestEnabled(!1),p.setBlendFunction(1,771),p.setBlendEquation(32774),p.setBlendingEnabled(!0);var g,T,m,y;!s&&this._backgroundTex&&this._drawRasterData(this._backgroundTex,1,b);for(var v=e.parentSurface.baseOpacity,w=!1,D=r;D>=0;D--){var F=null;if(g=t[D],g.data)F=g,T=b,m=1;else if(g.upsampleFromTile){var A=g.upsampleFromTile;F=A.tile.layerInfo[d][D],y=A.tile.lij[0],T=[A.offset[0],A.offset[1]],m=A.scale}if(F)if(D<i&&v<1&&!w&&(p.setBlendFunction(0,770),this._drawRasterData(this._blackTex,1,b,v),p.setBlendFunction(1,771),w=!0),F.data instanceof l){var B=e.parentSurface.layerViewByIndex(D,d);o(this._context,e.lij,F.data,B.renderer,B.schemeHelper,e.lij[0],h.descriptor.width,h.descriptor.height,0,m,T,y,n[D])}else f(F.data)&&(F.data=this._buildTexture(F.data),F===g?e.updateMemoryUsed():g.upsampleFromTile.tile.updateMemoryUsed()),F.data instanceof u&&this._drawRasterData(F.data,m,T,n[D])}return p.bindTexture(h),_.copyTexImage2D(p.gl.TEXTURE_2D,0,h.descriptor.pixelFormat,0,0,h.descriptor.width,h.descriptor.height,0),h.generateMipmap(),p.bindFramebuffer(null),p.setBlendFunctionSeparate(770,771,1,771),p.setBlendingEnabled(!1),this._resourceCounter.incrementNumTileTexturesComposited(),w?1:v},e.prototype._isBaseLayer=function(e){return e.parent&&"esri.Basemap"===e.parent.declaredClass&&e.parent.baseLayers.indexOf(e)>-1},e}()});