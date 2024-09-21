<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Icon} from '@iconify/vue';
import Translate from "./translate.vue";

let selectedText = ref("")
// 获取当前鼠标按下的位置
let startX = 0
let startY = 0
const llmPageDiv = ref();
const llmPageDivShow = ref(false);
const selectTarget = ref("all")
const llmExplainShow = ref(false);
const llmExplain = ref();

const handleMouseUp = (e) => {
  let selectionText = window.getSelection().toString()
  if (selectionText.length > 0) {
    selectedText.value = selectionText
    startX = e.pageX
    startY = e.pageY
    llmPageDivShow.value = true
    // 在当前的位置创建一个div
    if (llmPageDiv.value) {
      llmPageDiv.value.style.left = startX + 'px'
      llmPageDiv.value.style.top = startY + 'px'
    }
    console.log("selectedText:", selectedText.value)
  }
}


const llmPageCloseBtnClick = (e) => {
  e.stopPropagation();
  llmPageDivShow.value = false
  llmExplainShow.value = false
  let tools = document.getElementsByClassName("item")
  if (tools.length > 0) {
    for (let tool of tools) {
      tool.style.visibility = 'visible'
      tool.style.boxShadow = 'none'
      tool.style.color = 'black'
      tool.style.pointerEvents = 'auto'
      tool.style.opacity = '1'
    }
  }

  selectTarget.value = "all"
  selectedText.value = ""
  console.log("close btn click")
}


const selectLLmExplain = (target) => {
  console.log("selectLLmExplain")
  llmExplainShow.value = true
  selectTarget.value = target
  // 获取当前点击元素的id
  console.log("target:", target, "selectText:", selectedText.value)
  // 禁止其他的点击事件
  let tools = document.getElementsByClassName(target)
  if (tools.length > 0) {
    for (let tool of tools) {
      tool.style.pointerEvents = 'none'
      tool.style.opacity = '0.5'
    }
  }

  chrome.runtime.sendMessage({"message": selectedText.value}, (response) => {
    console.log("response", response)
  })

}


onUnmounted(() => {
  document.removeEventListener('mouseup', (e) => {
    console.log("remove mouseup event")
  })
})
onMounted(() => {
  document.addEventListener('mouseup', handleMouseUp)
  llmPageDiv.value = document.getElementById('llm-page-div')
  llmExplain.value = document.getElementById('llm_explain')
})

</script>

<template>
  <div>
    <div id="llm-page-div" ref="llmPageDiv" v-show="llmPageDivShow">
      <span class="llm_close">
        <Icon icon="mdi:close" @click="llmPageCloseBtnClick"/>
      </span>

      <div id="llm_tool">
        <div class="item translate"
             @click="selectLLmExplain('translate')"
             v-if="selectTarget==='all' || selectTarget==='translate'"
        >
          <Icon icon="mdi:google-translate" class="icon_item"/>
          <span>翻译</span>
        </div>
        <div class="item code"
             @click="selectLLmExplain( 'code')"
             v-if="selectTarget==='all' || selectTarget==='code'"
        >
          <Icon icon="mdi:code-braces" class="icon_item"/>
          <span>代码解释</span>
        </div>
        <div class="item chat"
             @click="selectLLmExplain( 'chat')"
             v-if="selectTarget==='all' || selectTarget==='chat'"
        >
          <Icon icon="mdi:message-question" class="icon_chat"/>
          <span>聊天</span>
        </div>
      </div>

      <div id="llm_explain" ref="llmExplain" v-show="llmExplainShow">
        <Translate :select_data="selectedText"></Translate>
      </div>

    </div>
  </div>
</template>

<style scoped>

#llm-page-div {
  position: absolute;
  z-index: 100;
  color: black;
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
  background-color: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 3px;
  box-sizing: border-box;
}

.llm_close {
  position: absolute;
  right: -4px;
  padding: 0 0 1px 1px;

  top: -2px;
  cursor: pointer;
  font-size: 17px;
  border-radius: 50%;
  width: 17px;
  height: 17px;
  background-color: rgba(255, 255, 255, 1);
  color: #333;
}

#llm_tool {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

.item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 3px;
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid transparent;
  padding: 3px 3px 5px 5px;
  border-radius: 5px;
  letter-spacing: 1px;
  text-align: center;
}


.item > svg {
  font-size: 16px;
  margin-left: 3px;
}

.icon_chat {
  margin-top: 3px;
}

.icon_item {
  margin-top: 2px;
}


.item:hover {
  background-color: #1171ee;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  color: white !important;
}


#llm_explain {
  width: 400px;
  height: 300px;
  border-top: 1px solid black;
  padding: 10px;
}

</style>