const puppeteer = require("puppeteer");
let sName = ["RELIANCE INDUSTRIES LTD","TATA STEEL LTD","HDFC BANK LTD"];
let qty = ["210","100","300"];
let ctab;
let totalvalueofsinglestock;
let totalvalueofportfolio = 0;

(async function fn() {
    try {
        let browseropenPromise = puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args : ["--start-maximised"]
        });
        let browser = await browseropenPromise;
        let alltabsarr = await browser.pages();
        ctab = alltabsarr[0];
        await ctab.goto("https://www.bseindia.com/");
        await ctab.waitForSelector("#getquotesearch");

        for (let i=0; i<sName.length;i++) {
        await ctab.type("#getquotesearch",sName[i],{delay:100});
        await ctab.waitForTimeout(2000);
        await ctab.keyboard.press("Enter");
        await ctab.waitForSelector(".textvalue.ng-binding");
        let priceSel = await ctab.$(".textvalue.ng-binding");
        let price = await ctab.evaluate(function(elem){
            return elem.innerText;
        },priceSel);
        totalvalueofsinglestock = qty[i]*price;
        console.log("Total value of"+" "+sName[i]+" "+"is"+" "+totalvalueofsinglestock);
        
        totalvalueofportfolio = totalvalueofsinglestock + totalvalueofportfolio; 
    }
        console.log(totalvalueofportfolio);
    }
     catch(err) {
         console.log(err);
      }
  
})();



