<template>
  <main>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>
    <div class="top">digital design</div>
    <ul class="list">
      <li v-for="post in posts" class="list__item" :key="post._id">
        <section class="card">
          <router-link :to="{ name: 'post', params: { id: post._id } }">
            <article>
              <div class="picker" :style="{ 'background-color': post.favoriteColor.hex }">
                <FitText class="theTitle" v-html="post.title" />
                <BaseIcon class="pattern" name="shade" />
              </div>
            </article>

            <div class="content-wrap">
              <h4 v-for="category in post.categories" v-bind:key="category._id">{{ category.title }}</h4>
              <h4
                v-for="category in post.categories"
                v-bind:key="category._id"
              >{{ category.description }}</h4>
              <block-content :blocks="post.body" />
            </div>
          </router-link>
        </section>
      </li>
    </ul>
  </main>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "sanity-blocks-vue-component";
import FitText from "@/components/FitText";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "post" ] {
  _id,
  title,
  posterImage,
  author,
  reference,
  publishedAt,
  categories[{
   _id, 
  title,
  description
}],
  body,
  favoriteColor
}[0...50]`;

export default {
  name: "Posts",
  components: {
    BlockContent,
    FitText
  },
  data() {
    return {
      loading: true,
      posts: [],
      blocks: [],
      text: ""
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
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
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        posts => {
          this.loading = false;
          this.posts = posts;
          // this.texts = this.post.title;
        },
        error => {
          this.error = error;
        }
      );
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
}

.top {
  width: 100vw;
  display: block;
  position: relative;
  text-align: center;
  font-size: 4.7em;
  background: -webkit-linear-gradient(mediumslateblue, #8ca369);
  opacity: 0.3;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 100;
  padding-bottom: 32vh;
  padding-top: 32vh;
}

.list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem;
  width: 100vw;
  justify-content: space-around;
}

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
    background-color: hsla(345, 100%, 50%, 0.4);
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
</style>
