"use strict";

async function getShoes(){
    try{
        const response = await fetch("http://localhost:3000/getShoes");
        const shoeData = await response.json();
        const shoeContainer = document.querySelector(".shoeContainer");

        shoeData.forEach(shoe => {
            shoeContainer.insertAdjacentHTML("beforeend", 
                `<div class="shoeItem">
                <img src="${shoe.shoeImage}"></div>`
            )
        });
    } catch (error){
        console.log(error);
    }
}
window.onload = getShoes();