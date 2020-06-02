import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BlockContent from "sanity-blocks-vue-component";

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import VueKinesis from "vue-kinesis";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
Vue.component("block-content", BlockContent);
Vue.use(VueKinesis);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
