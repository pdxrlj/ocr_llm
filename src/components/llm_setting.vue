<script setup>
import { ref } from 'vue'
const modelUrl = ref('')

console.log("llm_setting.vue loaded", modelUrl.value)

</script>

<template>
  <div>
    <div id="llm_title">配置模型参数信息</div>

    <div>
      <span>模型地址:</span>&nbsp;
      <input type="text" v-model="modelUrl"/>
    </div>
  </div>
</template>

<style scoped>
  #llm_title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
