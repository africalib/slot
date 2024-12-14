<script setup>
import Words from "@/components/Words.vue";
import Machine from "@/components/Machine.vue";
import {useGlobalStore} from "@/stores/globalStore.js";
import settings from "@/data/settings.js";
import {nextTick, reactive, watch} from "vue";

const globalStore = useGlobalStore();

const state = reactive({
  both: false,
});

watch(() => globalStore.category, (category) => {
  nextTick(() => {
    state.both = !!category;
  });
});
</script>

<template>
  <div class="root">
    <div class="wrapper">
      <div class="inner">
        <div :class="{ both: state.both }" class="core flex-row">
          <div class="left">
            <Machine/>
          </div>
          <div v-if="globalStore.category" class="right">
            <Words/>
          </div>
        </div>
        <div class="header">
          <router-link v-show="globalStore.category" :to="`${settings.baseDir}/`">
            <img :src="`${settings.baseDir}/icons/back.png`"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;

  > .wrapper {
    height: 100%;
    margin: 0 auto;
    padding: 0 var(--px15);

    > .inner {
      height: 100%;
      position: relative;

      .header {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: var(--px15);
      }

      > .core {
        height: 100%;
        overflow: hidden;

        > div {
          height: 100%;

          &.left {
            transition: left var(--transition-time), margin-left var(--transition-time);
            position: absolute;
            top: 0;
            left: 50%;
            width: var(--left-width);
            margin-left: calc(var(--left-width-reverse) / 2);
          }

          &.right {
            margin-left: calc(100% - var(--left-width-reverse));
            transition: margin-left var(--transition-time);
          }
        }

        &.both {
          padding-left: calc(var(--left-width) + var(--px15));

          > div {
            &.left {
              left: 0;
              margin-left: 0;
            }

            &.right {
              visibility: visible;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>