import Vue from "vue";
import Router from "vue-router";
import Works from "./views/Works.vue";
import Posts from "./views/Posts.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Works
    },
    {
      path: "/works",
      name: "works",
      component: Works
    },
    {
      path: "/specials",
      name: "specials",
      component: () =>
        import(/* webpackChunkName: "specials" */ "./views/Specials.vue")
    },
    {
      path: "/work/:id",
      name: "work",
      component: () =>
        import(/* webpackChunkName: "work" */ "./views/Work.vue"),
      props: route => ({ id: route.params.id })
    },
    {
      path: "/specials/:id",
      name: "special",
      component: () =>
        import(/* webpackChunkName: "special" */ "./views/Special.vue"),
      props: route => ({ id: route.params.id })
    },
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
      path: "/posts/:id",
      name: "post",
      component: () =>
        import(/* webpackChunkName: "post" */ "./views/Post.vue"),
      props: route => ({ id: route.params.id })
    }
  ]
});
