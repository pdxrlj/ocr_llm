import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest(async (env) => {
    return {
        manifest_version: 3,
        name: 'LLMPage',
        description: '使用本地的大模型解析网页的内容,用户可以选择滑动文本解析',
        version: packageJson.version,
        permissions: [
            "activeTab",
            "scripting",
            "tabs"
        ],
        action: {
            default_title: '设置本地模型地址',
            default_popup: 'index.html',
            default_icon: {
                '32': 'img.png',
                '72': 'img.png',
                '128': 'img.png',
                '512': 'img.png',
            },
        },
        icons:{
            '32': 'img.png',
            '72': 'img.png',
            '128': 'img.png',
            '512': 'img.png',
        },
        content_scripts: [
            {
                matches: ['<all_urls>'],
                js: ['src/content-script.js'],
                all_frames: true,
            },
        ],
        background: {
            service_worker: 'src/background.js',
        },
    }
})