<template>
  <section class="card">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>
    <router-link :to="{ name: 'post', params: { id: post._id } }">
      <article>
        <div class="picker" :style="{ 'background-color': post.favoriteColor.hex }">
          <FitText class="theTitle" v-html="post.title" />
          <BaseIcon class="pattern" name="shade" />
        </div>
      </article>

      <div class="content-wrap">
        <h3
          class="cat-list"
          v-for="category in post.categories"
          v-bind:key="category._id"
        >{{ category.title }}</h3>
        <!-- <block-content :blocks="post.body" /> -->
      </div>
    </router-link>
  </section>
</template>
<script>
import FitText from "@/components/FitText";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  name: "PostCard",
  components: {
    FitText
  },
  data() {
    return {
      loading: false,
      blocks: [],
      text: ""
    };
  },
  // created() {
  //   this.fetchData();
  // },
  // watch: {
  //   $route: "fetchData"
  // },
  mounted() {
    const titles = ["{{ post.title }}"];

    let idx = titles.length;

    setInterval(() => {
      --idx;

      if (idx < 0) {
        idx = titles.length - 1;
      }

      this.texts = titles[idx];
    });
  }
};
</script>
<style>
.card {
  position: relative;
  border-radius: 12px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  width: 90vw;
  flex-wrap: wrap;
  margin: 20px;
}

article {
  position: relative;
  flex-wrap: wrap;
}

.picker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  width: 90vw;
  height: 300px;
  overflow: hidden;
}

.pattern {
  width: 100vw;
  height: auto;
  text-align: center;
  margin: auto;
  animation: pulse 5s infinite;
}

@keyframes pulse {
  0% {
    background-color: hsla(165, 100%, 50%, 0.2);
  }
  30% {
    background-color: hsla(300, 100%, 50, 0.2);
  }
  60% {
    background-color: hsla(96, 86%, 81%, 0.4);
  }
  100% {
    background-color: hsla(195, 100%, 50%, 0.2);
  }
}

.theTitle {
  color: white;
  text-align: center;
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.content-wrap {
  margin: 20px;
}

.cat-list {
  display: inline-block;
  padding-right: 9px;
  padding: 4px;
}
</style>
