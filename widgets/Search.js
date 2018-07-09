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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!../nls/common","dojo/i18n!./Search/nls/Search","dojo/keys","dojo/query","dojo/regexp","../PopupTemplate","../core/lang","../core/watchUtils","../core/accessorSupport/decorators","./Widget","./Search/SearchResultRenderer","./Search/SearchViewModel","./support/widget"],function(e,t,s,o,i,n,r,a,l,u,c,d,h,p,g,_,v){var f={base:"esri-search esri-widget",loader:"esri-widget__loader",loaderText:"esri-widget__loader-text",loaderAnimation:"esri-widget__loader-animation",esriInput:"esri-input",hasMultipleSources:"esri-search--multiple-sources",isLoading:"esri-search--loading",isSearching:"esri-search--searching",showSuggestions:"esri-search--show-suggestions",showSources:"esri-search--sources",showWarning:"esri-search--warning",container:"esri-search__container",input:"esri-search__input",inputContainer:"esri-search__input-container",form:"esri-search__form",submitButton:"esri-search__submit-button",sourcesButton:"esri-search__sources-button",clearButton:"esri-search__clear-button",sourceName:"esri-search__source-name",suggestionsMenu:"esri-search__suggestions-menu",suggestionList:"esri-search__suggestions-list",suggestionListCurrentLocation:"esri-search__suggestions-list--current-location",sourcesMenu:"esri-search__sources-menu",source:"esri-search__source",activeSource:"esri-search__source--active",warningMenu:"esri-search__warning-menu",warningMenuBody:"esri-search__warning-body",warningMenuHeader:"esri-search__warning-header",warningMenuText:"esri-search__warning-text",noValueText:"esri-search__no-value-text",button:"esri-widget--button",fallbackText:"esri-icon-font-fallback-text",header:"esri-widget__header",locate:"esri-icon-locate-circled",menu:"esri-menu",menuHeader:"esri-header",loadingIcon:"esri-icon-loading-indicator esri-rotating",searchIcon:"esri-icon-search",dropdownIcon:"esri-icon-down-arrow esri-search__sources-button--down",dropupIcon:"esri-icon-up-arrow esri-search__sources-button--up",clearIcon:"esri-icon-close",noticeIcon:"esri-icon-notice-triangle",widgetIcon:"esri-icon-search",disabled:"esri-disabled"},y=/<[a-z\/][\s\S]*>/i;return function(e){function t(t){var s=e.call(this)||this;return s._inputNode=null,s._sourceMenuButtonNode=null,s._sourceListNode=null,s._suggestionListNode=null,s._searchResultRenderer=new g({container:document.createElement("div")}),s._suggestPromise=null,s._popupTemplate=new u({title:n.searchResult,content:s._renderSearchResultsContent.bind(s)}),s._relatedTarget=null,s.activeMenu="none",s.activeSource=null,s.activeSourceIndex=null,s.allPlaceholder=null,s.autoNavigate=null,s.autoSelect=null,s.goToOverride=null,s.iconClass=f.widgetIcon,s.includeDefaultSources=null,s.label=n.widgetLabel,s.locationEnabled=null,s.locationToAddressDistance=null,s.maxResults=null,s.maxSuggestions=null,s.minSuggestCharacters=null,s.popupEnabled=null,s.popupOpenOnSelect=null,s.popupTemplate=null,s.portal=null,s.resultGraphic=null,s.resultGraphicEnabled=null,s.results=null,s.searchAllEnabled=null,s.searchTerm=null,s.selectedResult=null,s.sources=null,s.suggestions=null,s.suggestionsEnabled=null,s.view=null,s.viewModel=new _,s}return s(t,e),t.prototype.postInitialize=function(){var e=this;this.viewModel.popupTemplate=this._popupTemplate,this.own(d.watch(this,"searchTerm",function(t){(t&&"warning"===e.activeMenu||!t&&!e.get("viewModel.selectedSuggestion.location"))&&(e.activeMenu="none")}))},t.prototype.destroy=function(){this._cancelSuggest(),this._searchResultRenderer&&(this._searchResultRenderer.viewModel=null,this._searchResultRenderer.destroy(),this._searchResultRenderer=null)},t.prototype.clear=function(){},t.prototype.focus=function(){this._inputNode&&(this.activeMenu="suggestion",this._inputNode.focus(),this.emit("search-focus"))},t.prototype.blur=function(e){this._inputNode&&(this._inputNode.blur(),this._inputBlur(e),this.emit("search-blur"))},t.prototype.search=function(e){var t=this;return this.activeMenu="none",this._cancelSuggest(),this.viewModel.search(e).catch(function(e){return t.activeMenu="none",e}).then(function(e){return t.activeMenu=e.numResults?"none":"warning",e})},t.prototype.suggest=function(e){var t=this;this._cancelSuggest();var s=this.viewModel.suggest(e).then(function(e){return e.numResults&&(t.activeMenu="suggestion"),t._scrollToTopSuggestion(),e}).catch(function(){return null});return this._suggestPromise=s,s},t.prototype.render=function(){var e,t,s=this,o=this.viewModel,r=o.activeSourceIndex,a=o.suggestions,l=o.maxInputLength,u=o.placeholder,d=o.searchTerm,h=o.searchAllEnabled,p=o.allSources,g=this._getSourceName(r),y=(""+d).trim(),w=this,S=w.activeMenu,M=w.id,m=this.viewModel.state,b=this.id+"-suggest-menu",x=v.tsx("input",{bind:this,placeholder:u,"aria-label":n.searchButtonTitle,maxlength:l,autocomplete:"off",type:"text",tabindex:"0",class:this.classes(f.esriInput,f.input),"aria-autocomplete":"list",value:d,"aria-haspopup":"true","aria-owns":b,role:"textbox",onkeydown:this._handleInputKeydown,onkeyup:this._handleInputKeyup,onclick:this._handleInputClick,oninput:this._handleInputPaste,onpaste:this._handleInputPaste,afterCreate:v.storeNode,"data-node-ref":"_inputNode",onfocusout:this._storeRelatedTarget,onfocus:this.focus,onblur:this.blur,title:d?"":u}),R=v.tsx("form",{key:"esri-search__form",bind:this,class:f.form,onsubmit:this._formSubmit,role:"search"},x),k=d?v.tsx("div",{key:"esri-search__clear-button",bind:this,role:"button",class:this.classes(f.clearButton,f.button),tabindex:"0",title:n.clearButtonTitle,onfocus:this._clearButtonFocus,onclick:this._handleClearButtonClick,onkeydown:this._handleClearButtonClick},v.tsx("span",{"aria-hidden":"true",class:f.clearIcon})):null,N=this.locationEnabled&&!y,O=N?v.tsx("ul",{key:"esri-search__suggestion-list-current-location",class:this.classes(f.suggestionList,f.suggestionListCurrentLocation)},v.tsx("li",{bind:this,onclick:this._handleUseCurrentLocationClick,onkeydown:this._handleUseCurrentLocationClick,onkeyup:this._handleSuggestionKeyup,role:"menuitem",tabindex:"-1"},v.tsx("span",{"aria-hidden":"true",role:"presentation",class:f.locate})," ",n.useCurrentLocation)):null,C=p.length>1&&r===_.ALL_INDEX,T=a?a.map(function(e,t){var o=e.sourceIndex,i=e.results.length,n=i&&C?s._getSuggestionHeaderNode(o):null,r=e.results,a=r.map(function(e,t){return s._getSuggestionNode(e,t,o)});return[n,i?v.tsx("ul",{key:"esri-search__suggestion-list-"+o,class:f.suggestionList},a):null]}):null,E=v.tsx("div",{id:b,"aria-expanded":"suggestion"===S,key:"esri-search__suggestions-menu",class:this.classes(f.menu,f.suggestionsMenu),role:"menu",bind:this,afterCreate:v.storeNode,"data-node-ref":"_suggestionListNode"},O,T),A=v.tsx("div",{key:"esri-search__input-container",class:f.inputContainer},R,E,k),B=v.tsx("div",{key:"esri-search__submit-button",bind:this,role:"button",title:n.searchButtonTitle,class:this.classes(f.submitButton,f.button),tabindex:"0",onclick:this._handleSearchButtonClick,onkeydown:this._handleSearchButtonClick},v.tsx("span",{"aria-hidden":"true",role:"presentation",class:f.searchIcon}),v.tsx("span",{class:f.fallbackText},n.searchButtonTitle)),L=y?c.substitute({value:'"'+d+'"'},n.noResultsFoundForValue):n.noResultsFound,I=o.get("selectedSuggestion.location")||y?v.tsx("div",{key:"esri-search__no_results"},v.tsx("div",{class:f.warningMenuHeader},n.noResults),v.tsx("div",{class:f.warningMenuText},L)):null,D=o.get("selectedSuggestion.location")||y?null:v.tsx("div",{key:"esri-search__empty-search"},v.tsx("span",{"aria-hidden":"true",class:f.noticeIcon}),v.tsx("span",{class:f.noValueText},n.emptyValue)),P=v.tsx("div",{key:"esri-search__error-menu",class:this.classes(f.menu,f.warningMenu)},v.tsx("div",{class:f.warningMenuBody},I,D)),W=p.length>1,H=p&&p.toArray(),K=h?this._getSourceNode(_.ALL_INDEX):null,U=M+"-source-menu",F=W?v.tsx("div",{key:"esri-search__source-menu-button",bind:this,role:"button",title:n.searchIn,"aria-haspopup":"true","aria-expanded":"source"===S,"aria-controls":U,class:this.classes(f.sourcesButton,f.button),tabindex:"0",onkeydown:this._handleSourceMenuButtonKeydown,onclick:this._handleSourcesMenuToggleClick,onkeyup:this._handleSourceMenuButtonKeyup,onblur:this._sourcesButtonBlur,afterCreate:v.storeNode,"data-node-ref":"_sourceMenuButtonNode"},v.tsx("span",{"aria-hidden":"true",role:"presentation",class:f.dropdownIcon}),v.tsx("span",{"aria-hidden":"true",role:"presentation",class:f.dropupIcon}),v.tsx("span",{class:f.sourceName},g)):null,G=W?v.tsx("ul",{bind:this,afterCreate:v.storeNode,"data-node-ref":"_sourceListNode"},K,H.map(function(e,t){return s._getSourceNode(t)})):null,j=v.tsx("div",{id:U,key:"esri-search__source-menu",class:this.classes(f.menu,f.sourcesMenu),role:"menu"},G),V=(e={},e[f.hasMultipleSources]=W,e[f.isLoading]="loading"===m,e[f.isSearching]="searching"===m,e[f.showWarning]="warning"===S,e[f.showSources]="source"===S,e[f.showSuggestions]="suggestion"===S,e),$=(t={},t[f.disabled]="disabled"===m,t),X="loading"===m?v.tsx("div",{role:"presentation",class:f.loader,key:"base-loader"},v.tsx("span",{"aria-hidden":"true",role:"presentation",class:f.loaderAnimation}),v.tsx("span",{class:f.fallbackText},n.searchButtonTitle),v.tsx("span",{class:f.loaderText},i.loading)):v.tsx("div",{role:"presentation",class:this.classes(V,f.container),key:"base-container"},F,j,A,B,P);return v.tsx("div",{class:this.classes(f.base,$)},X)},t.prototype._handleSourceMenuButtonKeydown=function(e){var t=e.keyCode;if(t===r.UP_ARROW||t===r.DOWN_ARROW||t===r.END||t===r.HOME)return e.preventDefault(),e.stopPropagation(),void(this.activeMenu="source");this._handleSourcesMenuToggleClick(e)},t.prototype._handleSourcesMenuToggleClick=function(e){var t="source"===this.activeMenu;if(this.activeMenu=t?"none":"source",this.renderNow(),t)return void(this._sourceMenuButtonNode&&this._sourceMenuButtonNode.focus());var s=this._sourceListNode?a("li",this._sourceListNode):null;if(s){var o=e.keyCode,i=o===r.END?s[s.length-1]:s[0];i&&i.focus()}},t.prototype._handleClearButtonClick=function(){this.viewModel.clear(),this._focus()},t.prototype._handleSearchButtonClick=function(){this.search()},t.prototype._handleSuggestionClick=function(e){var t=e.currentTarget,s=t["data-suggestion"];s&&(this._focus(),this.search(s))},t.prototype._handleUseCurrentLocationClick=function(){this._focus("none"),this.viewModel.searchNearby()},t.prototype._handleSourceClick=function(e){var t=e.currentTarget,s=t["data-source-index"];this.viewModel.activeSourceIndex=s,this._focus("none")},t.prototype._sourcesButtonBlur=function(e){var t=e&&e.relatedTarget;this._removeActiveMenu(t,this._sourceListNode)},t.prototype._inputBlur=function(e){var t=e&&e.relatedTarget;this._removeActiveMenu(t||this._relatedTarget,this._suggestionListNode)},t.prototype._storeRelatedTarget=function(e){this._relatedTarget=e.relatedTarget},t.prototype._clearButtonFocus=function(){this.activeMenu="none"},t.prototype._removeActiveMenu=function(e,t){e&&t&&t.contains(e)||(this.activeMenu="none")},t.prototype._cancelSuggest=function(){var e=this._suggestPromise;e&&e.cancel(),this._suggestPromise=null},t.prototype._handleInputKeydown=function(e){var t=e.keyCode;(t===r.TAB||t===r.ESCAPE||e.shiftKey&&t===r.TAB)&&this._cancelSuggest()},t.prototype._handleInputKeyup=function(e){var t=e.keyCode,s=e.ctrlKey||e.metaKey||t===r.copyKey||t===r.LEFT_ARROW||t===r.RIGHT_ARROW||t===r.ENTER||t===r.SHIFT,o=this._suggestionListNode?a("li",this._suggestionListNode):null;if(!s){if(t===r.TAB||t===r.ESCAPE||e.shiftKey&&t===r.TAB)return this._cancelSuggest(),void(t===r.ESCAPE&&(this.activeMenu="none"));if((t===r.UP_ARROW||t===r.DOWN_ARROW)&&o){this.activeMenu="suggestion",e.stopPropagation(),e.preventDefault(),this._cancelSuggest();var i=t===r.UP_ARROW?o.length-1:0,n=o[i];return void(n&&n.focus())}this.viewModel.searchTerm&&this.suggest()}},t.prototype._scrollToTopSuggestion=function(){this._suggestionListNode&&(this._suggestionListNode.scrollTop=0)},t.prototype._handleInputClick=function(e){this.activeMenu="suggestion"},t.prototype._handleInputPaste=function(e){var t=this.get("viewModel.searchTerm"),s=e.target;t!==s.value&&(this.viewModel.searchTerm=s.value),t&&this.suggest()},t.prototype._handleSourceMenuButtonKeyup=function(e){var t=e.keyCode;if(t===r.UP_ARROW||t===r.DOWN_ARROW||t===r.HOME||t===r.END){e.stopPropagation(),e.preventDefault();var s=this._sourceListNode?a("li",this._sourceListNode):null;if(s){var o=t===r.UP_ARROW||t===r.END?s.length-1:0,i=s[o];i&&i.focus()}}},t.prototype._handleSourceKeyup=function(e){var t=e.target,s=this._sourceListNode?a("li",this._sourceListNode):null,o=e.keyCode;if(o===r.ESCAPE)return this._focus("none"),void(this._sourceMenuButtonNode&&this._sourceMenuButtonNode.focus());if(s){var i=s.indexOf(t);if(o!==r.HOME&&o!==r.END&&o!==r.UP_ARROW&&o!==r.DOWN_ARROW||(e.stopPropagation(),e.preventDefault()),o===r.HOME){var n=s[0];return void(n&&n.focus())}if(o===r.END){var l=s[s.length-1];return void(l&&l.focus())}if(o===r.UP_ARROW){var u=i-1,c=u<0?this._sourceMenuButtonNode:s[u];return void(c&&c.focus())}if(o===r.DOWN_ARROW){var d=i+1,h=d>=s.length?this._sourceMenuButtonNode:s[d];h&&h.focus()}}},t.prototype._handleSuggestionKeyup=function(e){var t=e.target,s=this._suggestionListNode?a("li",this._suggestionListNode):null,o=s.indexOf(t),i=e.keyCode;if(this._cancelSuggest(),i===r.BACKSPACE||i===r.DELETE)return void this._focus();if(i===r.ESCAPE)return void this._focus("none");if(s){if(i!==r.HOME&&i!==r.END&&i!==r.UP_ARROW&&i!==r.DOWN_ARROW||(e.stopPropagation(),e.preventDefault()),i===r.HOME){var n=s[0];n&&n.focus()}if(i===r.END){var l=s[s.length-1];l&&l.focus()}if(i===r.UP_ARROW){var u=o-1,c=u<0?s[s.length-1]:s[u];return void(c&&c.focus())}if(i===r.DOWN_ARROW){var d=o+1,h=d>=s.length?s[0]:s[d];return void(h&&h.focus())}}},t.prototype._focus=function(e){this.focus(),e&&(this.activeMenu=e)},t.prototype._formSubmit=function(e){e.preventDefault(),this.search()},t.prototype._getSourceName=function(e){var t=this.viewModel,s=t.allSources,o=s.getItemAt(e);return e===_.ALL_INDEX?n.all:o?o.name||n.untitledSource:n.untitledSource},t.prototype._getSuggestionHeaderNode=function(e){var t=this._getSourceName(e);return v.tsx("div",{key:"esri-search__suggestion-header-"+e,class:f.menuHeader},t)},t.prototype._splitResult=function(e,t){var s=l.escapeString(t);return e.replace(new RegExp("(^|)("+s+")(|$)","ig"),"$1|$2|$3").split("|")},t.prototype._getSuggestionNode=function(e,t,s){var o=this.viewModel,i=o.searchTerm;if(i){var r=e.text,a=r||n.untitledResult,l=y.test(a),u=[];if(l)u.push(v.tsx("div",{innerHTML:a}));else{var c=this._splitResult(a,i),d=i.toLowerCase();c.forEach(function(e,t){e&&e.length&&(e.toLowerCase()===d?u.push(v.tsx("strong",{key:t},e)):u.push(e))})}return v.tsx("li",{bind:this,onclick:this._handleSuggestionClick,onkeydown:this._handleSuggestionClick,onkeyup:this._handleSuggestionKeyup,key:"esri-search__suggestion$-{sourceIndex}_"+t,"data-suggestion":e,role:"menuitem",tabindex:"-1"},u)}},t.prototype._getSourceNode=function(e){var t,s=(t={},t[f.activeSource]=e===this.viewModel.activeSourceIndex,t);return v.tsx("li",{bind:this,key:"esri-search__source-"+e,onclick:this._handleSourceClick,onkeydown:this._handleSourceClick,onkeyup:this._handleSourceKeyup,"data-source-index":e,role:"menuitem",class:this.classes(f.source,s),tabindex:"-1"},this._getSourceName(e))},t.prototype._renderSearchResultsContent=function(){return this._searchResultRenderer.showMoreResultsOpen=!1,this._searchResultRenderer.viewModel=this.viewModel,this._searchResultRenderer},o([h.property(),v.renderable()],t.prototype,"activeMenu",void 0),o([h.aliasOf("viewModel.activeSource"),v.renderable()],t.prototype,"activeSource",void 0),o([h.aliasOf("viewModel.activeSourceIndex"),v.renderable()],t.prototype,"activeSourceIndex",void 0),o([h.aliasOf("viewModel.allPlaceholder"),v.renderable()],t.prototype,"allPlaceholder",void 0),o([h.aliasOf("viewModel.autoNavigate")],t.prototype,"autoNavigate",void 0),o([h.aliasOf("viewModel.autoSelect")],t.prototype,"autoSelect",void 0),o([h.aliasOf("viewModel.goToOverride")],t.prototype,"goToOverride",void 0),o([h.property()],t.prototype,"iconClass",void 0),o([h.aliasOf("viewModel.includeDefaultSources")],t.prototype,"includeDefaultSources",void 0),o([h.property()],t.prototype,"label",void 0),o([v.renderable(),h.aliasOf("viewModel.locationEnabled")],t.prototype,"locationEnabled",void 0),o([h.aliasOf("viewModel.locationToAddressDistance")],t.prototype,"locationToAddressDistance",void 0),o([h.aliasOf("viewModel.maxResults")],t.prototype,"maxResults",void 0),o([h.aliasOf("viewModel.maxSuggestions")],t.prototype,"maxSuggestions",void 0),o([h.aliasOf("viewModel.minSuggestCharacters")],t.prototype,"minSuggestCharacters",void 0),o([h.aliasOf("viewModel.popupEnabled")],t.prototype,"popupEnabled",void 0),o([h.aliasOf("viewModel.popupOpenOnSelect")],t.prototype,"popupOpenOnSelect",void 0),o([h.aliasOf("viewModel.popupTemplate")],t.prototype,"popupTemplate",void 0),o([h.aliasOf("viewModel.portal")],t.prototype,"portal",void 0),o([h.aliasOf("viewModel.resultGraphic")],t.prototype,"resultGraphic",void 0),o([h.aliasOf("viewModel.resultGraphicEnabled")],t.prototype,"resultGraphicEnabled",void 0),o([h.aliasOf("viewModel.results"),v.renderable()],t.prototype,"results",void 0),o([h.aliasOf("viewModel.searchAllEnabled"),v.renderable()],t.prototype,"searchAllEnabled",void 0),o([h.aliasOf("viewModel.searchTerm"),v.renderable()],t.prototype,"searchTerm",void 0),o([h.aliasOf("viewModel.selectedResult")],t.prototype,"selectedResult",void 0),o([h.aliasOf("viewModel.sources")],t.prototype,"sources",void 0),o([h.aliasOf("viewModel.suggestions"),v.renderable()],t.prototype,"suggestions",void 0),o([h.aliasOf("viewModel.suggestionsEnabled")],t.prototype,"suggestionsEnabled",void 0),o([h.aliasOf("viewModel.view"),v.renderable()],t.prototype,"view",void 0),o([v.vmEvent(["search-complete","search-clear","search-start","select-result","suggest-start","suggest-complete"]),h.property({type:_}),v.renderable(["viewModel.allSources","viewModel.activeSource.placeholder","viewModel.activeSource.name","viewModel.state"])],t.prototype,"viewModel",void 0),o([h.aliasOf("viewModel.clear")],t.prototype,"clear",null),o([v.accessibleHandler()],t.prototype,"_handleSourcesMenuToggleClick",null),o([v.accessibleHandler()],t.prototype,"_handleClearButtonClick",null),o([v.accessibleHandler()],t.prototype,"_handleSearchButtonClick",null),o([v.accessibleHandler()],t.prototype,"_handleSuggestionClick",null),o([v.accessibleHandler()],t.prototype,"_handleUseCurrentLocationClick",null),o([v.accessibleHandler()],t.prototype,"_handleSourceClick",null),t=o([h.subclass("esri.widgets.Search")],t)}(h.declared(p))});