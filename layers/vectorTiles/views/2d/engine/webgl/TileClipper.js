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

define(["require","exports","./Geometry","./GeometryUtils"],function(i,t,s,h){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function i(i,t,s){this.ratio=i,this.x=t,this.y=s}return i}(),e=function(){function i(i,t,s,h,n){void 0===h&&(h=8),void 0===n&&(n=8),this.lines=[],this.starts=[],this.pixelRatio=h,this.pixelMargin=n,this.tileSize=512*h,this.dz=i,this.yPos=t,this.xPos=s}return i.prototype.setExtent=function(i){this.finalRatio=this.tileSize/i*(1<<this.dz);var t=this.pixelRatio*this.pixelMargin;t/=this.finalRatio;var s=i>>this.dz;t>s&&(t=s),this.margin=t,this.xmin=s*this.xPos-t,this.ymin=s*this.yPos-t,this.xmax=this.xmin+s+2*t,this.ymax=this.ymin+s+2*t},i.prototype.reset=function(i){this.type=i,this.lines=[],this.starts=[],this.line=null,this.start=0},i.prototype.moveTo=function(i,t){this._pushLine(),this._prevIsIn=this._isIn(i,t),this._moveTo(i,t,this._prevIsIn),this._prevPt=new s.Point(i,t),this._firstPt=new s.Point(i,t),this._dist=0},i.prototype.lineTo=function(i,t){var h,e,a,r,x,l,y,o,p=this._isIn(i,t),u=new s.Point(i,t),m=s.Point.distance(this._prevPt,u);if(p)this._prevIsIn?this._lineTo(i,t,!0):(h=this._prevPt,e=u,a=this._intersect(e,h),this.start=this._dist+m*(1-this._r),this._lineTo(a.x,a.y,!0),this._lineTo(e.x,e.y,!0));else if(this._prevIsIn)e=this._prevPt,h=u,a=this._intersect(e,h),this._lineTo(a.x,a.y,!0),this._lineTo(h.x,h.y,!1);else{var f=this._prevPt,_=u;if(f.x<=this.xmin&&_.x<=this.xmin||f.x>=this.xmax&&_.x>=this.xmax||f.y<=this.ymin&&_.y<=this.ymin||f.y>=this.ymax&&_.y>=this.ymax)this._lineTo(_.x,_.y,!1);else{var v=[];if((f.x<this.xmin&&_.x>this.xmin||f.x>this.xmin&&_.x<this.xmin)&&(r=(this.xmin-f.x)/(_.x-f.x),o=f.y+r*(_.y-f.y),o<=this.ymin?l=!1:o>=this.ymax?l=!0:v.push(new n(r,this.xmin,o))),(f.x<this.xmax&&_.x>this.xmax||f.x>this.xmax&&_.x<this.xmax)&&(r=(this.xmax-f.x)/(_.x-f.x),o=f.y+r*(_.y-f.y),o<=this.ymin?l=!1:o>=this.ymax?l=!0:v.push(new n(r,this.xmax,o))),(f.y<this.ymin&&_.y>this.ymin||f.y>this.ymin&&_.y<this.ymin)&&(r=(this.ymin-f.y)/(_.y-f.y),y=f.x+r*(_.x-f.x),y<=this.xmin?x=!1:y>=this.xmax?x=!0:v.push(new n(r,y,this.ymin))),(f.y<this.ymax&&_.y>this.ymax||f.y>this.ymax&&_.y<this.ymax)&&(r=(this.ymax-f.y)/(_.y-f.y),y=f.x+r*(_.x-f.x),y<=this.xmin?x=!1:y>=this.xmax?x=!0:v.push(new n(r,y,this.ymax))),0===v.length)x?l?this._lineTo(this.xmax,this.ymax,!0):this._lineTo(this.xmax,this.ymin,!0):l?this._lineTo(this.xmin,this.ymax,!0):this._lineTo(this.xmin,this.ymin,!0);else if(v.length>1&&v[0].ratio>v[1].ratio)this.start=this._dist+m*v[1].ratio,this._lineTo(v[1].x,v[1].y,!0),this._lineTo(v[0].x,v[0].y,!0);else{this.start=this._dist+m*v[0].ratio;for(var c=0;c<v.length;c++)this._lineTo(v[c].x,v[c].y,!0)}this._lineTo(_.x,_.y,!1)}}this._dist+=m,this._prevIsIn=p,this._prevPt=u},i.prototype.close=function(){var i,t;if(this.line.length>0){i=this._firstPt,t=this._prevPt,(i.x!==t.x||i.y!==t.y)&&this.lineTo(i.x,i.y);var s=this.line,h=s.length;h>=4&&(s[0].x===s[1].x&&s[0].x===s[h-2].x||s[0].y===s[1].y&&s[0].y===s[h-2].y)&&(s.pop(),s[0].x=s[h-2].x,s[0].y=s[h-2].y)}},i.prototype.result=function(){return this._pushLine(),0===this.lines.length?null:(3===this.type&&r.simplify(this.margin*this.finalRatio,this.lines),this.lines)},i.prototype.resultWithStarts=function(){if(2!==this.type)throw new Error("Only valid for lines");this._pushLine();var i=this.lines,t=i.length;if(0===t)return null;for(var s=[],h=0;t>h;h++)s.push({line:i[h],start:this.starts[h]||0});return s},i.prototype._isIn=function(i,t){return i>=this.xmin&&i<=this.xmax&&t>=this.ymin&&t<=this.ymax},i.prototype._intersect=function(i,t){var h,n,e;if(t.x>=this.xmin&&t.x<=this.xmax)n=t.y<=this.ymin?this.ymin:this.ymax,e=(n-i.y)/(t.y-i.y),h=i.x+e*(t.x-i.x);else if(t.y>=this.ymin&&t.y<=this.ymax)h=t.x<=this.xmin?this.xmin:this.xmax,e=(h-i.x)/(t.x-i.x),n=i.y+e*(t.y-i.y);else{n=t.y<=this.ymin?this.ymin:this.ymax,h=t.x<=this.xmin?this.xmin:this.xmax;var a=(h-i.x)/(t.x-i.x),r=(n-i.y)/(t.y-i.y);r>a?(e=a,n=i.y+a*(t.y-i.y)):(e=r,h=i.x+r*(t.x-i.x))}return this._r=e,new s.Point(h,n)},i.prototype._pushLine=function(){this.line&&(1===this.type?this.line.length>0&&(this.lines.push(this.line),this.starts.push(this.start)):2===this.type?this.line.length>1&&(this.lines.push(this.line),this.starts.push(this.start)):3===this.type&&this.line.length>3&&(this.lines.push(this.line),this.starts.push(this.start))),this.line=[],this.start=0},i.prototype._moveTo=function(i,t,h){3!==this.type?h&&(i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line.push(new s.Point(i,t))):(h||(i<this.xmin&&(i=this.xmin),i>this.xmax&&(i=this.xmax),t<this.ymin&&(t=this.ymin),t>this.ymax&&(t=this.ymax)),i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line.push(new s.Point(i,t)),this._is_h=!1,this._is_v=!1)},i.prototype._lineTo=function(i,t,h){var n,e;if(3!==this.type)if(h){if(i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line.length>0&&(n=this.line[this.line.length-1],n.equals(i,t)))return;this.line.push(new s.Point(i,t))}else this.line&&this.line.length>0&&this._pushLine();else if(h||(i<this.xmin&&(i=this.xmin),i>this.xmax&&(i=this.xmax),t<this.ymin&&(t=this.ymin),t>this.ymax&&(t=this.ymax)),i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line&&this.line.length>0){n=this.line[this.line.length-1];var a=n.x===i,r=n.y===t;if(a&&r)return;this._is_h&&a?(n.x=i,n.y=t,e=this.line[this.line.length-2],this._is_h=e.x===i,this._is_v=e.y===t):this._is_v&&r?(n.x=i,n.y=t,e=this.line[this.line.length-2],this._is_h=e.x===i,this._is_v=e.y===t):(this.line.push(new s.Point(i,t)),this._is_h=a,this._is_v=r)}else this.line.push(new s.Point(i,t))},i}();t.TileClipper=e;var a=function(){function i(){}return i.prototype.setExtent=function(i){this._ratio=4096===i?1:4096/i},i.prototype.reset=function(i){this.type=i,this.lines=[],this.line=null},i.prototype.moveTo=function(i,t){this.line&&this.lines.push(this.line),this.line=[];var h=this._ratio;this.line.push(new s.Point(Math.round(i*h),Math.round(t*h)))},i.prototype.lineTo=function(i,t){var h=this._ratio;this.line.push(new s.Point(Math.round(i*h),Math.round(t*h)))},i.prototype.close=function(){var i=this.line;i&&!i[0].isEqual(i[i.length-1])&&i.push(i[0])},i.prototype.result=function(){return this.line&&this.lines.push(this.line),0===this.lines.length?null:(3===this.type&&1!==this._ratio&&r.simplify(64,this.lines),this.lines)},i}();t.SimpleBuilder=a;var r=function(){function i(){}return i.simplify=function(t,s){if(s){for(var h=-t,n=4096+t,e=-t,a=4096+t,r=[],x=[],l=s.length,y=0;l>y;++y){var o=s[y];if(o&&!(o.length<2))for(var p=o[0],u=void 0,m=o.length,f=1;m>f;++f)u=o[f],p.x===u.x&&(p.x<=h&&(p.y>u.y?(r.push(y),r.push(f),r.push(0),r.push(-1)):(x.push(y),x.push(f),x.push(0),x.push(-1))),p.x>=n&&(p.y<u.y?(r.push(y),r.push(f),r.push(1),r.push(-1)):(x.push(y),x.push(f),x.push(1),x.push(-1)))),p.y===u.y&&(p.y<=e&&(p.x<u.x?(r.push(y),r.push(f),r.push(2),r.push(-1)):(x.push(y),x.push(f),x.push(2),x.push(-1))),p.y>=a&&(p.x>u.x?(r.push(y),r.push(f),r.push(3),r.push(-1)):(x.push(y),x.push(f),x.push(3),x.push(-1)))),p=u}if(0!==r.length&&0!==x.length){i.fillParent(s,x,r),i.fillParent(s,r,x);var _=[];i.calcDeltas(_,x,r),i.calcDeltas(_,r,x),i.addDeltas(_,s)}}},i.fillParent=function(i,t,s){for(var n=s.length,e=t.length,a=0;e>a;a+=4){for(var r=t[a],x=t[a+1],l=t[a+2],y=i[r][x-1],o=i[r][x],p=8092,u=-1,m=0;n>m;m+=4)if(s[m+2]===l){var f=s[m],_=s[m+1],v=i[f][_-1],c=i[f][_];switch(l){case 0:case 1:if(h.between(y.y,v.y,c.y)&&h.between(o.y,v.y,c.y)){var g=Math.abs(c.y-v.y);p>g&&(p=g,u=m)}break;case 2:case 3:if(h.between(y.x,v.x,c.x)&&h.between(o.x,v.x,c.x)){var g=Math.abs(c.x-v.x);p>g&&(p=g,u=m)}}}t[a+3]=u}},i.calcDeltas=function(t,s,h){for(var n=s.length,e=0;n>e;e+=4){var a=[],r=i.calcDelta(e,s,h,a);t.push(s[e]),t.push(s[e+1]),t.push(s[e+2]),t.push(r)}},i.calcDelta=function(t,s,h,n){var e=s[t+3];if(-1===e)return 0;var a=n.length;return a>1&&n[a-2]===e?0:(n.push(e),i.calcDelta(e,h,s,n)+1)},i.addDeltas=function(i,t){for(var s=i.length,h=0,n=0;s>n;n+=4){var e=i[n+3];e>h&&(h=e)}for(var n=0;s>n;n+=4){var a=t[i[n]],r=i[n+1],e=h-i[n+3];switch(i[n+2]){case 0:a[r-1].x-=e,a[r].x-=e;break;case 1:a[r-1].x+=e,a[r].x+=e;break;case 2:a[r-1].y-=e,a[r].y-=e;break;case 3:a[r-1].y+=e,a[r].y+=e}}for(var x=t.length,l=0;x>l;++l){var a=t[l];!a||a.length<2||a[a.length-1].x!==a[0].x&&a[a.length-1].y!==a[0].y&&a.push(a[0])}},i}()});