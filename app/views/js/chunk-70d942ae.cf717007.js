(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70d942ae"],{"15b0":function(t,e,n){"use strict";n("be84")},5952:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list row"},[n("div",{staticClass:"col-md-6"},[n("h4",[t._v("TextEditors List")]),n("ul",{staticClass:"list-group"},t._l(t.textEditors,(function(e,i){return n("li",{key:i,staticClass:"list-group-item",class:{active:i==t.currentIndex},on:{click:function(n){return t.setActiveTextEditor(e,i)}}},[t._v(" "+t._s(e.title)+" ")])})),0)]),n("div",{staticClass:"col-md-6"},[t.currentTextEditor?n("div",[n("h4",[t._v("TextEditor")]),n("div",[t._m(0),t._v(" "+t._s(t.currentTextEditor.title)+" ")]),n("div",[t._m(1),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.currentTextEditor.text)}})]),n("router-link",{staticClass:"btn btn-primary",attrs:{to:"/texts/"+t.currentTextEditor.id}},[t._v("Edit")]),n("router-link",{staticClass:"btn btn-primary",attrs:{to:"/texts/view/"+t.currentTextEditor.id}},[t._v("View")])],1):n("div",[n("br"),n("p",[t._v("Please click on a TextEditor...")])])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Title:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[n("strong",[t._v("Text:")])])}],o=n("6cd2"),c={name:"textEditors-list",data:function(){return{textEditors:[],currentTextEditor:null,currentIndex:-1,title:""}},methods:{retrieveTextEditors:function(){var t=this;o["a"].getAll().then((function(e){t.textEditors=e.data,console.log(e.data)})).catch((function(t){console.log(t)}))},refreshList:function(){this.retrieveTextEditors(),this.currentTextEditor=null,this.currentIndex=-1},setActiveTextEditor:function(t,e){this.currentTextEditor=t,this.currentIndex=e},removeAllTextEditors:function(){var t=this;o["a"].deleteAll().then((function(e){console.log(e.data),t.refreshList()})).catch((function(t){console.log(t)}))},searchTitle:function(){var t=this;o["a"].findByTitle(this.title).then((function(e){t.textEditors=e.data,console.log(e.data)})).catch((function(t){console.log(t)}))}},mounted:function(){this.retrieveTextEditors()}},s=c,l=(n("15b0"),n("2877")),a=Object(l["a"])(s,i,r,!1,null,null,null);e["default"]=a.exports},"6cd2":function(t,e,n){"use strict";var i=n("d4ec"),r=n("bee2"),o=n("c427"),c=function(){function t(){Object(i["a"])(this,t)}return Object(r["a"])(t,[{key:"getAll",value:function(){return o["a"].get("/textEditors")}},{key:"get",value:function(t){return o["a"].get("/textEditors/".concat(t))}},{key:"create",value:function(t){return o["a"].post("/textEditors",t)}},{key:"update",value:function(t,e){return o["a"].put("/textEditors/".concat(t),e)}},{key:"delete",value:function(t){return o["a"].delete("/textEditors/".concat(t))}},{key:"deleteAll",value:function(){return o["a"].delete("/textEditors")}},{key:"findByTitle",value:function(t){return o["a"].get("/textEditors?title=".concat(t))}}]),t}();e["a"]=new c},be84:function(t,e,n){}}]);
//# sourceMappingURL=chunk-70d942ae.cf717007.js.map