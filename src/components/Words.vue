<script setup>
import {nextTick, onBeforeMount, onMounted, ref} from "vue";
import {useGlobalStore} from "@/stores/globalStore.js";

const globalStore = useGlobalStore();
const itemsRef = ref();

const setFrameStyle = () => {
  const rect = itemsRef.value.querySelector(".item.pick").getBoundingClientRect();

  globalStore.setFrameStyle({
    display: "block",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
  });
};

const load = () => {
  const itemsHeight = itemsRef.value.getBoundingClientRect().height;
  const $item = itemsRef.value.querySelector(".item");
  const itemRect = $item.getBoundingClientRect();
  const itemHeight = itemRect.height;
  const count = Math.ceil(itemsHeight / itemHeight);
  const pickIndex = (count % 2 === 0 ? count / 2 : Math.ceil(count / 2)) - 1;

  globalStore.setPickIndex(pickIndex);
  itemRect.width && nextTick(setFrameStyle);
};

onBeforeMount(() => {
});

onMounted(() => {
  load();
});

window.onresize = () => {
  setFrameStyle();
};
</script>

<template>
  <div class="words">
    <div :style="globalStore.frame.style" class="frame"></div>
    <div ref="itemsRef" class="items">
      <div :style="globalStore.items.style" class="wrapper">
        <div v-for="(w, idx) in globalStore.words" :class="{pick: idx === globalStore.pick.index}" class="item">
          {{ w }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.words {
  height: 100%;

  .items {
    height: 100%;
    overflow: hidden;

    > .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        font-size: var(--px42);
        justify-content: center;
        padding: var(--px10);
        opacity: 0.35;
        white-space: nowrap;

        &.pick {
          font-weight: bold;
          opacity: 1;
        }
      }
    }
  }

  .frame {
    position: fixed;
    border: var(--px10) solid #008551;
    border-radius: 4px;
    opacity: 1;
  }
}
</style>