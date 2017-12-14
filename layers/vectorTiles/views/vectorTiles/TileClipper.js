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

define(["require","exports","./Geometry","./GeometryUtils"],function(i,t,s,h){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function i(i,t,s){this.ratio=i,this.x=t,this.y=s}return i}(),e=function(){function i(i,t,s){this.dz=i,this.yPos=t,this.xPos=s}return i.prototype.setExtent=function(i){this.finalRatio=4096/i*(1<<this.dz);var t=64;t/=this.finalRatio;var s=i>>this.dz;t>s&&(t=s),this.margin=t,this.xmin=s*this.xPos-t,this.ymin=s*this.yPos-t,this.xmax=this.xmin+s+2*t,this.ymax=this.ymin+s+2*t},i.prototype.reset=function(i){this.type=i,this._prevIsIn=!1,this.lines=[],this.line=null},i.prototype.moveTo=function(i,t){this._pushLine(),this._prevIsIn=this._isIn(i,t),this._moveTo(i,t,this._prevIsIn),this._prevPt=new s.Point(i,t),this._firstPt=new s.Point(i,t)},i.prototype.lineTo=function(i,t){var h,e,x,y,a,l,o,r,u=this._isIn(i,t);if(u)this._prevIsIn?this._lineTo(i,t,!0):(h=this._prevPt,e=new s.Point(i,t),x=this._intersect(e,h),this._lineTo(x.x,x.y,!0),this._lineTo(e.x,e.y,!0));else if(this._prevIsIn)e=this._prevPt,h=new s.Point(i,t),x=this._intersect(e,h),this._lineTo(x.x,x.y,!0),this._lineTo(h.x,h.y,!1);else{var p=this._prevPt,m=new s.Point(i,t);if(p.x<=this.xmin&&m.x<=this.xmin||p.x>=this.xmax&&m.x>=this.xmax||p.y<=this.ymin&&m.y<=this.ymin||p.y>=this.ymax&&m.y>=this.ymax)this._lineTo(m.x,m.y,!1);else{var f=[];if((p.x<this.xmin&&m.x>this.xmin||p.x>this.xmin&&m.x<this.xmin)&&(y=(this.xmin-p.x)/(m.x-p.x),r=p.y+y*(m.y-p.y),r<=this.ymin?l=!1:r>=this.ymax?l=!0:f.push(new n(y,this.xmin,r))),(p.x<this.xmax&&m.x>this.xmax||p.x>this.xmax&&m.x<this.xmax)&&(y=(this.xmax-p.x)/(m.x-p.x),r=p.y+y*(m.y-p.y),r<=this.ymin?l=!1:r>=this.ymax?l=!0:f.push(new n(y,this.xmax,r))),(p.y<this.ymin&&m.y>this.ymin||p.y>this.ymin&&m.y<this.ymin)&&(y=(this.ymin-p.y)/(m.y-p.y),o=p.x+y*(m.x-p.x),o<=this.xmin?a=!1:o>=this.xmax?a=!0:f.push(new n(y,o,this.ymin))),(p.y<this.ymax&&m.y>this.ymax||p.y>this.ymax&&m.y<this.ymax)&&(y=(this.ymax-p.y)/(m.y-p.y),o=p.x+y*(m.x-p.x),o<=this.xmin?a=!1:o>=this.xmax?a=!0:f.push(new n(y,o,this.ymax))),0===f.length)a?l?this._lineTo(this.xmax,this.ymax,!0):this._lineTo(this.xmax,this.ymin,!0):l?this._lineTo(this.xmin,this.ymax,!0):this._lineTo(this.xmin,this.ymin,!0);else if(f.length>1&&f[0].ratio>f[1].ratio)this._lineTo(f[1].x,f[1].y,!0),this._lineTo(f[0].x,f[0].y,!0);else for(var _=0;_<f.length;_++)this._lineTo(f[_].x,f[_].y,!0);this._lineTo(m.x,m.y,!1)}}this._prevIsIn=u,this._prevPt=new s.Point(i,t)},i.prototype.close=function(){var i,t;if(this.line.length>0){i=this._firstPt,t=this._prevPt,(i.x!==t.x||i.y!==t.y)&&this.lineTo(i.x,i.y);var s=this.line,h=s.length;h>=4&&(s[0].x===s[1].x&&s[0].x===s[h-2].x||s[0].y===s[1].y&&s[0].y===s[h-2].y)&&(s.pop(),s[0].x=s[h-2].x,s[0].y=s[h-2].y)}},i.prototype.result=function(){return this._pushLine(),0===this.lines.length?null:(3===this.type&&y.simplify(this.margin*this.finalRatio,this.lines),this.lines)},i.prototype._isIn=function(i,t){return i>=this.xmin&&i<=this.xmax&&t>=this.ymin&&t<=this.ymax},i.prototype._intersect=function(i,t){var h,n;if(t.x>=this.xmin&&t.x<=this.xmax)n=t.y<=this.ymin?this.ymin:this.ymax,h=i.x+(n-i.y)/(t.y-i.y)*(t.x-i.x);else if(t.y>=this.ymin&&t.y<=this.ymax)h=t.x<=this.xmin?this.xmin:this.xmax,n=i.y+(h-i.x)/(t.x-i.x)*(t.y-i.y);else{n=t.y<=this.ymin?this.ymin:this.ymax,h=t.x<=this.xmin?this.xmin:this.xmax;var e=(h-i.x)/(t.x-i.x),x=(n-i.y)/(t.y-i.y);x>e?n=i.y+e*(t.y-i.y):h=i.x+x*(t.x-i.x)}return new s.Point(h,n)},i.prototype._pushLine=function(){this.line&&(1===this.type?this.line.length>0&&this.lines.push(this.line):2===this.type?this.line.length>1&&this.lines.push(this.line):3===this.type&&this.line.length>3&&this.lines.push(this.line)),this.line=[]},i.prototype._moveTo=function(i,t,h){3!==this.type?h&&(i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line.push(new s.Point(i,t))):(h||(i<this.xmin&&(i=this.xmin),i>this.xmax&&(i=this.xmax),t<this.ymin&&(t=this.ymin),t>this.ymax&&(t=this.ymax)),i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line.push(new s.Point(i,t)),this._is_h=!1,this._is_v=!1)},i.prototype._lineTo=function(i,t,h){var n,e;if(3!==this.type)if(h){if(i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line.length>0&&(n=this.line[this.line.length-1],n.equals(i,t)))return;this.line.push(new s.Point(i,t))}else this.line&&this.line.length>0&&this._pushLine();else if(h||(i<this.xmin&&(i=this.xmin),i>this.xmax&&(i=this.xmax),t<this.ymin&&(t=this.ymin),t>this.ymax&&(t=this.ymax)),i=Math.round((i-(this.xmin+this.margin))*this.finalRatio),t=Math.round((t-(this.ymin+this.margin))*this.finalRatio),this.line&&this.line.length>0){n=this.line[this.line.length-1];var x=n.x===i,y=n.y===t;if(x&&y)return;this._is_h&&x?(n.x=i,n.y=t,e=this.line[this.line.length-2],this._is_h=e.x===i,this._is_v=e.y===t):this._is_v&&y?(n.x=i,n.y=t,e=this.line[this.line.length-2],this._is_h=e.x===i,this._is_v=e.y===t):(this.line.push(new s.Point(i,t)),this._is_h=x,this._is_v=y)}else this.line.push(new s.Point(i,t))},i}();t.TileClipper=e;var x=function(){function i(){}return i.prototype.setExtent=function(i){this._ratio=4096===i?1:4096/i},i.prototype.reset=function(i){this.type=i,this.lines=[],this.line=null},i.prototype.moveTo=function(i,t){this.line&&this.lines.push(this.line),this.line=[];var h=this._ratio;this.line.push(new s.Point(Math.round(i*h),Math.round(t*h)))},i.prototype.lineTo=function(i,t){var h=this._ratio;this.line.push(new s.Point(Math.round(i*h),Math.round(t*h)))},i.prototype.close=function(){var i=this.line;i&&!i[0].isEqual(i[i.length-1])&&i.push(i[0])},i.prototype.result=function(){return this.line&&this.lines.push(this.line),0===this.lines.length?null:(3===this.type&&1!==this._ratio&&y.simplify(64,this.lines),this.lines)},i}();t.SimpleBuilder=x;var y=function(){function i(){}return i.simplify=function(t,s){if(s){for(var h=-t,n=4096+t,e=-t,x=4096+t,y=[],a=[],l=s.length,o=0;l>o;++o){var r=s[o];if(r&&!(r.length<2))for(var u=r[0],p=void 0,m=r.length,f=1;m>f;++f)p=r[f],u.x===p.x&&(u.x<=h&&(u.y>p.y?(y.push(o),y.push(f),y.push(0),y.push(-1)):(a.push(o),a.push(f),a.push(0),a.push(-1))),u.x>=n&&(u.y<p.y?(y.push(o),y.push(f),y.push(1),y.push(-1)):(a.push(o),a.push(f),a.push(1),a.push(-1)))),u.y===p.y&&(u.y<=e&&(u.x<p.x?(y.push(o),y.push(f),y.push(2),y.push(-1)):(a.push(o),a.push(f),a.push(2),a.push(-1))),u.y>=x&&(u.x>p.x?(y.push(o),y.push(f),y.push(3),y.push(-1)):(a.push(o),a.push(f),a.push(3),a.push(-1)))),u=p}if(0!==y.length&&0!==a.length){i.fillParent(s,a,y),i.fillParent(s,y,a);var _=[];i.calcDeltas(_,a,y),i.calcDeltas(_,y,a),i.addDeltas(_,s)}}},i.fillParent=function(i,t,s){for(var n=s.length,e=t.length,x=0;e>x;x+=4){for(var y=t[x],a=t[x+1],l=t[x+2],o=i[y][a-1],r=i[y][a],u=8092,p=-1,m=0;n>m;m+=4)if(s[m+2]===l){var f=s[m],_=s[m+1],v=i[f][_-1],c=i[f][_];switch(l){case 0:case 1:if(h.between(o.y,v.y,c.y)&&h.between(r.y,v.y,c.y)){var g=Math.abs(c.y-v.y);u>g&&(u=g,p=m)}break;case 2:case 3:if(h.between(o.x,v.x,c.x)&&h.between(r.x,v.x,c.x)){var g=Math.abs(c.x-v.x);u>g&&(u=g,p=m)}}}t[x+3]=p}},i.calcDeltas=function(t,s,h){for(var n=s.length,e=0;n>e;e+=4){var x=[],y=i.calcDelta(e,s,h,x);t.push(s[e]),t.push(s[e+1]),t.push(s[e+2]),t.push(y)}},i.calcDelta=function(t,s,h,n){var e=s[t+3];if(-1===e)return 0;var x=n.length;return x>1&&n[x-2]===e?0:(n.push(e),i.calcDelta(e,h,s,n)+1)},i.addDeltas=function(i,t){for(var s=i.length,h=0,n=0;s>n;n+=4){var e=i[n+3];e>h&&(h=e)}for(var n=0;s>n;n+=4){var x=t[i[n]],y=i[n+1],e=h-i[n+3];switch(i[n+2]){case 0:x[y-1].x-=e,x[y].x-=e;break;case 1:x[y-1].x+=e,x[y].x+=e;break;case 2:x[y-1].y-=e,x[y].y-=e;break;case 3:x[y-1].y+=e,x[y].y+=e}}for(var a=t.length,l=0;a>l;++l){var x=t[l];!x||x.length<2||x[x.length-1].x!==x[0].x&&x[x.length-1].y!==x[0].y&&x.push(x[0])}},i}()});