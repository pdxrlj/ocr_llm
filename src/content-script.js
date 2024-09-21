import {createApp} from 'vue'
import Content from "./components/content/content.vue";

const root = document.createElement('div')
root.id = 'crx-root'
document.body.appendChild(root)
const app = createApp(Content)
app.mount(root)

