chrome.tabs.onActivated.addListener(tab => {
    checkUrl(tab)
})
chrome.tabs.onCreated.addListener(tab => {
    checkUrl(tab)
})
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) => {
    if (changeInfo.url === undefined){
        checkUrl(tab)
    }
});

//check if page is on list
function checkUrl(tab) {
    let id = tab.tabId || tab.id

    chrome.tabs.get(id, tabinfo => {
        url = tabinfo.url.split('/');

        if (!url[2]) return

        chrome.storage.sync.get(['pages'], function(result) {
            let pages=result.pages

            if (!pages){
                pages=[]
            }

            for (link of pages) {
                //console.log(link+" :: "+url[2])
                if (url[2].includes(link)) {
                    inject();
                    break;
                }
            }
        })
        
    })
}

// inject script with timer into page
function inject(){
    chrome.tabs.insertCSS(null, {file: "./css/style.css"})
    chrome.tabs.executeScript(null, {file: './js/foreground.js'});

}