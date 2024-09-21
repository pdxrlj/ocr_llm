<script setup>
import {watch} from "vue";

const props = defineProps({
  select_data: {
    type: String,
    required: true
  },
})

</script>

<template>
  <div>
    <div>
      <span>原文:</span>
      <span>{{ select_data }}</span>
    </div>
    <div>
      <span>翻译:</span>
      <span>这里是翻译的结果</span>
    </div>
  </div>
</template>

<style scoped>

</style>