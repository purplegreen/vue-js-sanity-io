<template>
  <main>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <ul class="list">
      <li v-for="post in posts" class="list__item" :key="post._id">
        <section class="card">
          <router-link :to="{ name: 'post', params: { id: post._id } }">
            <article>
              <FitText class="theTitle" v-html="post.title" />
              <BaseIcon class="mainImage" name="hello" />
            </article>
            <div :style="{ 'background-color': post.favoriteColor.hex }">hello!</div>
            <div>
              <h4>{{ post.author.name }}</h4>
              <h4>{{ post.publishedAt }}</h4>
              <h6
                v-for="reference in post.categories"
                v-bind:key="reference.id"
              >{{ reference._type }}</h6>
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
  categories,
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
  font-size: 1rem;
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
  border: 3px dotted blue;
  width: 100vw;
  flex-wrap: wrap;
  margin: 20px;
}

article {
  position: relative;
  flex-wrap: wrap;
}

.mainImage {
  width: 100%;
  height: auto;
}

.backImg {
  width: 100vw;
  height: 300px;
}

.input-color {
  width: 100vw;
  height: 300px;
}

.theTitle {
  text-align: center;
  font-size: 12vw;
  overflow: hidden;
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.color-input {
  background-color: favoritecolor;
}
</style>
