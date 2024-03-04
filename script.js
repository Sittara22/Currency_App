const Base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.2/v1/currencies";
//https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.2/v1/currencies/eur.json
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

const updateExchange=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amount.value="1";
        amtVal=1;
    }
    const URL=`${Base_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    const data=await response.json();
    console.log(data);
    const rate=data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    console.log(rate);
    msg.innerText=`${amtVal} ${fromCurrency.value} = ${rate} ${toCurrency.value}`;
}

for(let select of dropdowns){
    for (currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from"&&currcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&&currcode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateflag(e.target);
    })
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click",async (e)=>{
    e.preventDefault();
    updateExchange();
    
});

window.addEventListener("load",()=>{
    updateExchange();
 });