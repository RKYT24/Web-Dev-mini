const btn = document.getElementById("scanBtn");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({         // const [tab] -> extracts the first element of the object
        active: true,                           // check for active tabs in chrome
        currentWindow: true                     // check for currently opened tab. vo webpage jo open ho rkha hai 
    });


    chrome.scripting.executeScript(         // force chrome to run a script inside browser. extension can't access DOM so it asks from browser itself by injecting the script.
    {
        target: {                             // specifies where to run the script
            tabId: tab.id                       // tabId is a variable and it gets id of tab, as their are 3 things we get in a webpage by default(id,title,url).
        },
        files: ["content.js"]                 // this is the script that we are injecting into the browser to get the requisites(img,vid,aud)
    },
    (results) => {                              //takes all those img,vid,aud as parameter in function.

        if(chrome.runtime.lastError){           // if got an error...
            result.textContent = chrome.runtime.lastError.message;      //result text changed to Error msg 
            return;                                                    // and exits. without return next lines would run anyways...creating bugs.
        }

        const data = results[0].result;                // get the actual data by destructuring.

        result.textContent =                        //sow data in the specific format. for better readability.
            `Images: ${data.images}
            Videos: ${data.videos}
            Audio: ${data.audio}`;
    });
});

// abc({},()=>{})