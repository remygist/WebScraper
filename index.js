"use strict";

const loader = document.querySelector(".loader");
const shoeContainer = document.querySelector(".shoeContainer");
const shoeList = [];
let currentIndex = 0;
const moreBtn = document.querySelector(".moreBtn");
moreBtn.addEventListener("click", () => {
    loadMoreShoes(24);
})

async function getShoes() {
    try {
        loader.style.display = "block";
        moreBtn.style.display = "none";

        const response = await fetch("http://localhost:3000/getShoes");
        const shoeData = await response.json();
        shoeData.forEach(shoe => {
            if (shoe.shoeImage != "" && shoe.shoeImage.startsWith("http") && shoe.shoeTitel != "" && shoe.shoePrice != "" && shoe.shoeType != "") {
                shoeList.push(shoe)
            }
        });
    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = "none";
        moreBtn.style.display = "";
    }
    console.log(shoeList);
    loadMoreShoes(24)

}

function loadMoreShoes(count){
    let itemsToLoad = Math.min(count, shoeList.length - currentIndex)

    for (let i = 0; i < itemsToLoad; i++) {
        const shoeItem = shoeList[currentIndex]
        shoeContainer.insertAdjacentHTML("beforeend",
            `<div class="shoeItem">
            <img src="${shoeItem.shoeImage}">
            <h1>${shoeItem.shoeTitel}</h1>
            <p>${shoeItem.shoeType}</p>
            <p>${shoeItem.shoePrice}</p></div>`

        );
        currentIndex++
    }

    itemsToLoad = Math.min(count, shoeList.length - currentIndex)

    if (itemsToLoad == 0) {
        moreBtn.style.visibility = 'hidden';
    }
}

window.onload = getShoes;
