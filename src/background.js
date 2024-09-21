// 读取content-script.js发送过来的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("request", JSON.stringify(request))
    sendResponse("我是后台，我已经收到了你的消息" + JSON.stringify(request))
})