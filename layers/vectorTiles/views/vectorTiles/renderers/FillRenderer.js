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

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/mat3","../../../core/libs/gl-matrix/vec4","../../../core/libs/gl-matrix/vec3","../../webgl/VertexArrayObject","../GeometryUtils","./rendererUtils","../../webgl/ShaderVariations","./vtShaderSnippets"],function(t,e,i,r,o,n,a,l,s,f,u){var _=1/65536,d=function(){function t(){this._fillAttributeLocations={a_pos:0},this._fillAttributeLocationsDD={a_pos:0,a_color:1},this._outlineAttributeLocations={a_pos:0,a_offset:1,a_xnormal:2},this._outlineAttributeLocationsDD={a_pos:0,a_offset:1,a_xnormal:2,a_color:3},this._initialized=!1,this._viewProjMat=i.create(),this._offsetVector=n.create(),this._patternMatrix=r.create(),this._color=o.create(),this._outlineColor=o.create()}return t.prototype.dispose=function(){},t.prototype.render=function(t,e,r,o,n,a,f,u,d,c,m){if(0!==e.triangleElementCount){this._initialized||this._initialize(t);var h,D=f.getPaintValue("fill-pattern",r),v=void 0!==D,V=m*f.getPaintValue("fill-opacity",r),x=f.getPaintValue("fill-color",r),p=3===n;p&&(h=s.int32To4Bytes(e.layerID));var b=a.tileTransform.transform,y=512,A=a.coordRange/y,g=f.getPaintValue("fill-translate",r);if(0!==g[0]||0!==g[1]){i.copy(this._viewProjMat,a.tileTransform.transform);var O=g[0],M=g[1],P=0,j=0,z=(1<<a.key.level)/Math.pow(2,r)*A,w=f.getPaintValue("fill-translate-anchor",r);if(1===w){var U=-l.C_DEG_TO_RAD*o,C=Math.sin(U),S=Math.cos(U);P=z*(O*S-M*C),j=z*(O*C+M*S)}else P=z*O,j=z*M;this._offsetVector[0]=P,this._offsetVector[1]=j,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),b=this._viewProjMat}this._drawFill(t,e,r,n,a,f,u,b,c,m,p,h);var E=f.getPaintValue("fill-antialias",r)&&!v&&e.outlineElementCount>0&&(1===n||3===n);if(E){var I=f.hasDataDrivenOutline,L=f.getPaintValue("fill-outline-color",r);if(0===L[3]){if(1!==this._color[3]&&!I)return;L=x}var T=.75/c,B=this._getOutlineVAO(t,a,I);if(B){t.bindVAO(B);var F=this._outlineShaderVariations.getProgram([I,p],void 0,void 0,I?this._outlineAttributeLocationsDD:this._outlineAttributeLocations);if(t.bindProgram(F),F.setUniformMatrix4fv("u_transformMatrix",b),F.setUniformMatrix4fv("u_extrudeMatrix",d),F.setUniform2fv("u_normalized_origin",a.tileTransform.displayCoord),F.setUniform1f("u_depth",f.z+_),F.setUniform1f("u_outline_width",T),!I){var R=V*L[3];this._outlineColor[0]=R*L[0],this._outlineColor[1]=R*L[1],this._outlineColor[2]=R*L[2],this._outlineColor[3]=R,F.setUniform4fv("u_color",this._outlineColor)}p&&F.setUniform4f("u_id",h[0],h[1],h[2],h[3]),t.drawElements(4,e.outlineElementCount,5125,12*e.outlineElementStart),t.bindVAO()}}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var e=new f("fill",["fillVS","fillFS"],[],u,t);e.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),e.addDefine("DD","DD",[!0,!1],"DD"),e.addDefine("ID","ID",[!0,!0],"ID"),this._fillShaderVariations=e,this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};var i=new f("outline",["outlineVS","outlineFS"],[],u,t);return i.addDefine("DD","DD",[!0,!1],"DD"),i.addDefine("ID","ID",[!0,!0],"ID"),this._outlineShaderVariations=i,this._outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]},this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]},this._initialized=!0,!0},t.prototype._drawFill=function(t,e,i,o,n,a,l,s,f,u,d,c){var m=a.getPaintValue("fill-pattern",i),h=void 0!==m,D=u*a.getPaintValue("fill-opacity",i),v=a.getPaintValue("fill-color",i),V=a.hasDataDrivenFill,x=V?.5:v[3]*D,p=!1;if(h||1!==x||(p=!0),(!h||0!==o)&&(!p||1!==o)&&(h||p||0!==o)){var b=this._getFillVAO(t,n,V);if(b){t.bindVAO(b);var y=this._fillShaderVariations.getProgram([h,V,d],void 0,void 0,V?this._fillAttributeLocationsDD:this._fillAttributeLocations);if(t.bindProgram(y),h){var A=l.getMosaicItemPosition(m,!0);if(A){var g=512,O=n.coordRange/g,M=O/Math.pow(2,Math.round(i)-n.key.level)/f;r.identity(this._patternMatrix);var P=1/(A.size[0]*M),j=1/(A.size[1]*M);this._patternMatrix[0]=P,this._patternMatrix[4]=j,l.bind(t,9729,A.page,1),y.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),y.setUniform2f("u_pattern_tl",A.tl[0],A.tl[1]),y.setUniform2f("u_pattern_br",A.br[0],A.br[1]),y.setUniform1i("u_texture",1)}}if(y.setUniformMatrix4fv("u_transformMatrix",s),y.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),y.setUniform1f("u_depth",a.z+_),!V){var z=D*v[3];this._color[0]=z*v[0],this._color[1]=z*v[1],this._color[2]=z*v[2],this._color[3]=z,y.setUniform4fv("u_color",this._color)}d&&y.setUniform4f("u_id",c[0],c[1],c[2],c[3]),t.drawElements(4,e.triangleElementCount,5125,12*e.triangleElementStart),t.bindVAO()}}},t.prototype._getFillVAO=function(t,e,i){if(i){if(e.fillDDVertexArrayObject)return e.fillDDVertexArrayObject;var r=e.fillDDVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillDDVertexArrayObject=new a(t,this._fillAttributeLocationsDD,this._fillVertexAttributesDD,{geometry:r},o),e.fillDDVertexArrayObject):null}if(e.fillVertexArrayObject)return e.fillVertexArrayObject;var r=e.fillVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillVertexArrayObject=new a(t,this._fillAttributeLocations,this._fillVertexAttributes,{geometry:r},o),e.fillVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,e,i){if(i){if(e.outlineDDVertexArrayObject)return e.outlineDDVertexArrayObject;var r=e.outlineDDVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineDDVertexArrayObject=new a(t,this._outlineAttributeLocationsDD,this._outlineVertexAttributesDD,{geometry:r},o),e.outlineDDVertexArrayObject):null}if(e.outlineVertexArrayObject)return e.outlineVertexArrayObject;var r=e.outlineVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineVertexArrayObject=new a(t,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:r},o),e.outlineVertexArrayObject):null},t}();return d});