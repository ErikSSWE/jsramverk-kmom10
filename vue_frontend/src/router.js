import Vue from "vue";
import Router from "vue-router";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import VueHtml2pdf from 'vue-html2pdf';

Vue.use(Router);
Vue.use(CKEditor);
Vue.use(VueHtml2pdf);

export default new Router({
  //mode: "history",
  routes: [
    {
      path: "/",
      alias: "/texts",
      name: "textEditors",
      component: () => import("./components/TextEditorList")
    },
    {
      path: "/texts/:id",
      name: "textEditor-details",
      component: () => import("./components/TextEditor")
    },
    {
      path: "/texts/view/:id",
      name: "textEditor-details",
      component: () => import("./components/TextView")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTextEditor")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/LogIn")
    },
    {
      path: "/graph",
      name: "graph",
      component: () => import("./components/graph")
    },
    {
      path: "/invite",
      name: "invite",
      component: () => import("./components/Invite")
    }
  ]
});
