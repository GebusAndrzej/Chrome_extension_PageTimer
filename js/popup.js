updatePages();

function updatePages(){
    var container = document.getElementById("pages");
    var template = document.querySelector('#linkTemplate');

    container.innerText="";

    chrome.storage.sync.get(['pages'], function(result) {
        let pages=result.pages

        if (pages==undefined) {clearStorage();pages=[]}

        for (let page of pages) {
            let clone= template.content.cloneNode(true);

            let h3 = clone.querySelectorAll("h3");
            h3[0].innerText=page

            let btn = clone.querySelectorAll("button");
            btn[0].addEventListener('click',() => {removePage(page)})

            container.appendChild(clone)
        }
    });
}

function addPage(){
    let input = document.getElementById("ext_add_page_input");

    if (input.value!=""){

        var list=[];

        chrome.storage.sync.get(['pages'], function(result) {
            
            list.push(...result.pages)

            if (list.includes(input.value)) return

            list.push(input.value)

            chrome.storage.sync.set({pages: list}, function() {
                input.value = "";
                console.log(list)

                //updatePages();
            });
            
            
        })
    }
}

function removePage(page){
    //console.log("removing:"+page)
    chrome.storage.sync.get(['pages'], function(result) {
            
        list= [];
        list=result.pages

        list=list.filter(pg => pg!=page);

        chrome.storage.sync.set({pages: list}, function() {
            console.log('Updated');
            updatePages();
        });
    })
}

function clearStorage() {
    chrome.storage.sync.set({pages: []}, function() {
        //console.log('Storage reset');
        updatePages();
    });
}

document.getElementById("ext_add_page_button").onclick = addPage;

