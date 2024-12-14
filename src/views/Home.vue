<script setup>
import Words from "@/components/Words.vue";
import Machine from "@/components/Machine.vue";
import {useGlobalStore} from "@/stores/globalStore.js";

const globalStore = useGlobalStore();
</script>

<template>
  <div class="root">
    <div class="wrapper">
      <div class="inner">
        <div class="header">
          <router-link to="./" v-if="globalStore.category">
            <img :src="`./icons/back.png`"/>
          </router-link>
        </div>
        <div class="row flex-row">
          <div :class="{ 'col-3': globalStore.category }">
            <Machine/>
          </div>
          <div v-if="globalStore.category" class="col-9">
            <Words/>
          </div>
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

      > .row {
        height: 100%;

        > div {
          height: 100%;
        }
      }
    }
  }
}
</style>