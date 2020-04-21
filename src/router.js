import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Posts from "./views/Posts.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Posts
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts
    },
    {
      path: "/post/:id",
      name: "post",
      component: () =>
        import(/* webpackChunkName: "post" */ "./views/Post.vue"),
      props: route => ({ id: route.params.id })
    },
    {
      path: "/",
      name: "index",
      component: About
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
