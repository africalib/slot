<script setup>
import {useGlobalStore} from "@/stores/globalStore.js";
import categories from "@/data/categories.js";
import words from "@/data/words.js";
import {onBeforeMount, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import settings from "@/data/settings.js";

const globalStore = useGlobalStore();
const router = useRouter();
const route = useRoute();

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 두 요소를 교환
  }

  return arr;
};

const push = (category) => {
  router.push({query: {category}});
};

const select = (category = "") => {
  globalStore.reset();
  globalStore.setCategory(category);
  category && globalStore.setWords(shuffle(JSON.parse(JSON.stringify(words[category]))));
};

const run = () => {
  globalStore.run();
};

watch(() => route.query.category, (category) => {
      select(category);
    },
    {immediate: true}
);

onBeforeMount(() => {
  const category = route.query.category;

  if (category) {
    push(category);
    select(category);
  }
});
</script>

<template>
  <div :class="{ 'alone': !globalStore.category }" class="machine">
    <div class="wrapper">
      <h1 class="display-5 fw-bold text-body-emphasis lh-1">
        <router-link :to="`${settings.baseDir}/`">😎 SLOT</router-link>
      </h1>
      <h2>RANDOM WORD PICKER</h2>
      <div class="buttons gap-2">
        <div v-for="c in categories" class="wrapper">
          <div class="inner">
            <button :class="[globalStore.category === c.name ? 'btn-success active': 'btn-dark']" :disabled="globalStore.category === c.name && globalStore.spin.running" class="category btn btn-lg px-4" type="button" @click="push(c.name)">
              <img :src="`${settings.baseDir}/icons/${c.icon}`"/>
              <span>{{ c.title }}</span>
            </button>
            <button :disabled="globalStore.spin.running" class="btn btn-success run text-center" @click="run()">
              <img :src="`${settings.baseDir}/icons/play.png`"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.machine {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  > .wrapper {
    img {
      height: 300px;
    }

    > h1 {
      font-size: var(--px42);
      letter-spacing: var(--px1);
      font-weight: bold;
      margin-bottom: var(--px15);

      > a {
        color: inherit;
        text-decoration: none;
      }
    }

    > h2 {
      font-size: var(--px16);
      margin-bottom: var(--px15);
    }

    > p {
      font-size: var(--px16);
    }

    .buttons {
      > .wrapper {
        padding: var(--px5);

        > .inner {
          position: relative;
          overflow: hidden;

          .btn {
            width: 100%;
            border-radius: 4px;
            padding: var(--px10) !important;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--px6);

            img {
              height: var(--px32);
            }

            &.category {
              transition: width 0.25s;

              &.active {
                width: calc(100% - var(--px60));

                & + .run {
                  right: 0;
                }
              }
            }

            &.btn-success {
              background: #008551;
            }

            &.run {
              transition: right 0.25s;
              position: absolute;
              top: 0;
              right: var(--px-50);
              width: var(--px50);
            }
          }
        }
      }
    }
  }

  &.alone {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>