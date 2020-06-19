import Vue from 'vue'
import MyPage from './components/MyPage.vue'

// Vue.config.productionTip = false

let rootApp = new Vue({
  el: '#app',
  components: { MyPage },
  render: function () {
  return this.$createElement("div", {attrs: {id: "app"}}, [
    this.$createElement("MyPage")
  ])
}
});
