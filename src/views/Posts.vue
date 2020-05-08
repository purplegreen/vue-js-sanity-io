<template>
  <main>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="wrap-top">
      <div class="wrap-woo">
        <BackWoo class="back-woow" />
      </div>

      <div class="top-anim">
        <div class="box-one">
          <p id="d0">d</p>
          <p id="i">i</p>
          <p id="g">g</p>
          <p id="i">i</p>
          <p id="t">t</p>
          <p id="a">a</p>
          <p id="l">l</p>
        </div>
        <div class="box-two">
          <p id="d">d</p>
          <p id="e">e</p>
          <p id="s">s</p>
          <p id="i">i</p>
          <p id="g">g</p>
          <p id="n">n</p>
        </div>
      </div>
    </div>

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
              <h3
                class="cat-list"
                v-for="category in post.categories"
                v-bind:key="category._id"
              >{{ category.title }} |</h3>
              <!-- <block-content :blocks="post.body" /> -->
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
// import BlockContent from "sanity-blocks-vue-component";
import FitText from "@/components/FitText";
import BackWoo from "@/components/BackWoo";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "post" ] 
{
  _id,
  title,
  posterImage,
  author,
  reference,
  publishedAt,
  "categories": categories[]->{
    _id,
    description,
    title
  },
  body,
  favoriteColor
}[0...50]`;

export default {
  name: "Posts",
  components: {
    // BlockContent,
    FitText,
    BackWoo
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

.wrap-top {
  padding-top: 17vh;
  padding-bottom: 17vh;
  position: relative;
  width: 90vw;
  height: 18%;
  margin: auto;
  text-align: center;
}

.wrap-woo {
  width: 90vw;
  margin: auto;
  justify-content: center;
  align-items: center;
  display: flex;
}

/* first svg animation */

.top-anim {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 80vw;
  height: 90vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  font-size: 6.7em;
  background: -webkit-linear-gradient(mediumslateblue, #8ca369);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.box-one,
.box-two {
  display: flex;
  padding: 0 20px;
}

#d:hover,
#d0:hover,
#e:hover,
#s:hover,
#i:hover,
#g:hover,
#n:hover,
#t:hover,
#a:hover,
#l:hover {
  animation-name: wiggleWiggle;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}

#d:hover {
  animation-delay: 0s;
  -webkit-text-fill-color: deepskyblue;
  border: 1px solid blue;
  transform: translateY(2px);
}

#e:hover {
  animation-delay: 0.1s;
  -webkit-text-fill-color: blue;
  transform: translateY(3px);
}

#s:hover {
  animation-delay: 0.2s;
  border: 1px solid red;
  -webkit-text-fill-color: mediumpurple;
  transform: translateY(4px);
}

#i:hover {
  animation-delay: 0.3s;
  -webkit-text-fill-color: springgreen;
  transform: translateY(5px);
}

#g:hover {
  animation-delay: 0.4s;
  -webkit-text-fill-color: deepskyblue;
  transform: translateY(6px);
}

#n:hover {
  animation-delay: 0.5s;
  -webkit-text-fill-color: mediumpurple;
  transform: translateY(1px);
}

#d0:hover {
  animation-delay: 0.5s;
  -webkit-text-fill-color: deepskyblue;
  transform: translateY(-1px);
}

#t:hover {
  animation-delay: 0.3s;
  -webkit-text-fill-color: springgreen;
  transform: translateY(-3px);
}

#a:hover {
  animation-delay: 0.4s;
  -webkit-text-fill-color: deepskyblue;
  transform: translateY(-6px);
}

#l:hover {
  animation-delay: 0.5s;
  -webkit-text-fill-color: mediumpurple;
  transform: translateY(-7px);
}

@keyframes wiggleWiggle {
  20%,
  100% {
    transform: translate(0, 3px);
    display: none;
    opacity: 0.2;
  }

  0% {
    transform: translate(0, 0px);
    display: block;
    opacity: 0.5;
  }
  10% {
    transform: translate(0, 2px);
    display: block;
    opacity: 1;
  }
}

/* end first animation */

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

.cat-list {
  display: inline-block;
  padding-right: 9px;
  padding: 4px;
}
</style>
