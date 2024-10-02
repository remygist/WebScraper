import puppeteer from 'puppeteer';

const getShoes = async () => {
    console.log("function start");


    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: undefined,
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://www.torfs.be/nl/heren/schoenen/", {
        waitUntil: "domcontentloaded",
    });

    //class of first item --> product-tile js-plp-tile product product-tile--plp-view hover-content-loaded
    const shoes = await page.evaluate(() => {
        const shoeList = document.querySelectorAll(".product-tile");

        return Array.from(shoeList).map((shoe) =>{
            
            const shoeTitel = shoe.querySelector(".brand a") 
                ? shoe.querySelector(".brand a").innerHTML 
                : "Unknown Title";

            const shoeImage = shoe.querySelector(".tile-image") 
                ? shoe.querySelector(".tile-image").src 
                : "No Image Available";

            const shoeType = shoe.querySelector(".pdp-link > a") 
                ? shoe.querySelector(".pdp-link > a").innerHTML 
                : "Unknown Type";

            const shoePrice = shoe.querySelector(".value") 
                ? shoe.querySelector(".value").innerHTML 
                : "No Price Available";

            return {
                shoeTitel,
                shoeImage,
                shoeType,
                shoePrice
            }
        });
    })

    console.log(shoes);
    browser.close();

};

getShoes();


// item code
/*
<meta itemprom="analytics" content="{&quot;name&quot;:&quot;Instappers zwart&quot;,&quot;category&quot;:&quot;Heren/Schoenen/Lage schoenen/Instappers&quot;,&quot;id&quot;:&quot;&quot;,&quot;group_id&quot;:&quot;353202&quot;,&quot;color&quot;:&quot;Zwart&quot;,&quot;size&quot;:&quot;&quot;,&quot;brand&quot;:&quot;Rieker&quot;,&quot;price&quot;:89.95,&quot;sale_price&quot;:&quot;&quot;,&quot;discount&quot;:&quot;&quot;,&quot;stock_online&quot;:&quot;&quot;,&quot;stock_in_store&quot;:&quot;&quot;,&quot;quantity&quot;:&quot;&quot;}">
<div class="d-none js-plp-tile-original-discount-labels-holder">
<div class="discount-label-plp-wrapper">
<span class="discount-label discount-label--new discount-label--tiny">
<span>Nieuw</span>
</span>
</div>
</div>
<div class="product-tile__image">
<div class="image-container">
<a class="js-product-tile-link tile-image-slider" href="/nl/heren/schoenen/rieker-zwarte-instappers/353202.html?cgid=Heren-Schoenen">
<picture>
<source media="(min-width: 1024px)" data-media="desktop" srcset="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=350 1x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=700 2x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=1050 3x">
<source media="(min-width: 0px)" data-media="mobile" srcset="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=350 1x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=700 2x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=1050 3x">
<img class="tile-image" src="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=350" onerror="this.src='https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/Sites-Torfs-Webshop-BE-Site/-/default/dw5e7a62ed/images/404.png?sw=95'; document.querySelectorAll('[data-pid=\'353202\'] .image-container source').forEach(function(sourceElement) { sourceElement.remove() }); this.onerror='';" alt="Instappers zwart" title="Instappers zwart">
</picture>
<div class="d-none js-product-tile-hover-image-holder" data-hover-image-src="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=350" data-hover-image-srcset="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=350 1x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=700 2x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=1050 3x" data-original-image-src="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=350" data-original-image-srcset="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=350 1x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=700 2x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwece9be81/hi-res/pdp/353/353202/353202-1.jpg?sw=1050 3x"></div>
<picture>
<source media="(min-width: 0px)" data-media="mobile" data-srcset="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=350 1x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=700 2x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=1050 3x" srcset="https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=350 1x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=700 2x, https://www.torfs.be/dw/image/v2/BCQR_PRD/on/demandware.static/-/Sites-torfs-catalog-master/default/dwe6546a77/hi-res/pdp/353/353202/353202-3.jpg?sw=1050 3x">
<img class="tile-image d-lg-none ml-3 lazyloading" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Instappers zwart" title="Instappers zwart">    
</picture>
</a>
<a class="favorite js-wishlistTile" href="/on/demandware.store/Sites-Torfs-Webshop-BE-Site/nl_BE/Wishlist-AddProduct" data-pid="353202" data-removeurl="/on/demandware.store/Sites-Torfs-Webshop-BE-Site/nl_BE/Wishlist-RemoveProduct" aria-label="Verlanglijstje" title="Verlanglijstje" rel="nofollow">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
</a>
</div>
<div class="discount-label-plp-wrapper">
<span class="discount-label discount-label--new discount-label--tiny">
<span>Nieuw</span>
</span>
</div>
</div>
<div class="position-relative w-100">
<div class="product-tile__content product-tile__content--default content">
<div class="mw-100">
<span class="content__name d-block">
<div class="pdp-link" itemprop="name">
<a href="/nl/heren/schoenen/rieker-zwarte-instappers/353202.html?cgid=Heren-Schoenen" itemprop="url">
Rieker
</a>
</div>
<div class="pdp-link brand">
<a href="/nl/heren/schoenen/rieker-zwarte-instappers/353202.html?cgid=Heren-Schoenen">
Instappers
</a>
</div>
</span>
<div class="product-tile__color-amount">
1 kleur
</div>
</div>
<div class="product-tile__price">
<div class="price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
<span class="price__sales false" style="">
<span class="value" itemprop="price" content="89.95">
€ 89,95
</span>
<meta itemprop="priceCurrency" content="EUR">
<link itemprop="itemCondition" href="http://schema.org/NewCondition">
<link itemprop="availability" href="http://schema.org/InStock">
</span></div>
</div>
</div>
<div class="product-tile__hover-content-wrapper">
</div>
</div>
*/