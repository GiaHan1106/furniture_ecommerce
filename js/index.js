async function rennderBanner() {
    const API_BANNER = `${URL_API}/banner`;
    const data = await getData(API_BANNER);
    const banner = document.querySelector(".s-banner .s_inner");
    data.forEach((element, index) => {
        banner.innerHTML += ` <div class="s_item ${index == 0 && "active"}" style="--bg:${element.color}">
        <div class="row">
            <div class="col-md-6">
                <div class="s_left">
                    <h1>${element.name}</h1>
                    <p>${element.describe}</p>
                    <button class="s_button_1">SHOP NOW</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="s_right">
                    <img src="${element.img}" alt="" />
                </div>
            </div>
        </div>
    </div>`;
    });
    //banner
    let controlNext = document.querySelector(".s-banner .s_arrow i:first-child");
    let controlPrev = document.querySelector(".s-banner .s_arrow i:last-child");
    let slideItem = document.querySelectorAll(".s-banner .s_item");
    let currentIndex = 0;
    let PrevIndex = 0;
    let textLeft = document.querySelector(".s-banner .s_left");
    function displayslide() {
        slideItem[currentIndex].classList.add("active");
        slideItem[PrevIndex].classList.remove("active");
    }
    controlNext.addEventListener("click", function () {
        if (currentIndex < slideItem.length - 1) {
            currentIndex++;
            PrevIndex = currentIndex - 1;
            displayslide();
        } else if (currentIndex == slideItem.length - 1) {
            currentIndex = 0;
            PrevIndex = slideItem.length - 1;
            displayslide();
        }
    });
    controlPrev.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            PrevIndex = currentIndex + 1;
            displayslide();
        } else if (currentIndex == 0) {
            currentIndex = slideItem.length - 1;
            PrevIndex = 0;
            displayslide();
        }
    });
}
rennderBanner();

async function rennderGalary() {
    const API_GALARY = `${URL_API}/galary`;
    const data = await getData(API_GALARY);
    const galary = document.querySelector(".s-listPicShop .s_item");
    data.forEach((element) => {
        galary.innerHTML += `<div class="s_pic">
        <img src="${element.img}" alt="" />
    </div>`;
    });
    let clickGallery = document.querySelectorAll(".s-listPicShop .s_item .s_pic img");
    let showGalary = document.querySelector(".s-listPicShop .s_gallery");
    let closeGallery = document.querySelector(".s-listPicShop .s_gallery .close");
    let controlNextGallery = document.querySelector(".s-listPicShop .s_gallery .control-next ");
    let controlPrevGallery = document.querySelector(".s-listPicShop .s_gallery .control-prev ");
    let galleryInner = document.querySelector(".s-listPicShop .s_gallery .gallery-inner img");
    let galleryIndex = 0;
    function showGallery() {
        galleryInner.src = clickGallery[galleryIndex].src;
        showGalary.classList.add("active");
    }
    clickGallery.forEach((element, index) => {
        element.addEventListener("click", function () {
            galleryIndex = index;
            showGallery();
        });
    });
    showGalary.addEventListener("click", function (e) {
        if (e.target == e.currentTarget) {
            showGalary.classList.remove("active");
        }
    });
    closeGallery.addEventListener("click", function () {
        showGalary.classList.remove("active");
    });
    controlNextGallery.addEventListener("click", function () {
        galleryIndex++;
        if (galleryIndex > clickGallery.length - 1) {
            galleryIndex = 0;
        }
        showGallery();
    });
    controlPrevGallery.addEventListener("click", function () {
        galleryIndex--;
        if (galleryIndex < 0) {
            galleryIndex = clickGallery.length - 1;
        }
        showGallery();
    });
}
rennderGalary();

async function rennderReview() {
    const API_REVIEW = `${URL_API}/review`;
    const data = await getData(API_REVIEW);
    const review = document.querySelector(".s-feed .s_review");
    const reviewClick = document.querySelector(".s-feed .s_bot");
    data.forEach((element, index) => {
        review.innerHTML += ` <div class="s_top ${index == 0 && "active"}" id="${element.id}">
        <h5>
         ${element.describe}
        </h5>
        <div class="s_changeFeedback">
            <div class="s_feedCus">
                <p class="s_nameCus">${element.name}</p>
                <p class="s_major">${element.job}</p>
            </div>
        </div>
    </div>`;
        reviewClick.innerHTML += `<span class="${index == 0 && "active"}" data-feed="#${element.id}"></span>`;
    });

    $(".s-feed .s_bot span").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $changeFeed = $(this).attr("data-feed");
        console.log($changeFeed);
        $(".s-feed").find($changeFeed).addClass("active");
        $(".s-feed").find($changeFeed).siblings().removeClass("active");
    });
}
rennderReview();
async function renderCate() {
    const API_CATE = `${URL_API}/cate`;
    const data = await getData(API_CATE);

    const API_PRODUCT = `${URL_API}/product`;
    const dataPro = await getData(API_PRODUCT);
    const cate = document.querySelector(".s-listProduct .row");
    const listProduct = document.querySelector(".s-newProduct .s_bot .s_listItemPro ul");
    const listPicPro = document.querySelector(".s-newProduct .s_bot .s_listTab .container");
    data.forEach((element, index) => {
        cate.innerHTML += `<div class="col-6 col-lg-3">
        <a href="listProduct.html?idcate=${element.name}" class="s_inforPro">
            <img src="${element.img}" alt="" />
            <div class="s_text">
                <h3>${element.name}</h3>
            </div>
        </a>
    </div>`;
        listProduct.innerHTML += `<li class="${index == 0 && "active"}" data-tab="#${element.id}"><span>${element.name}</span></li>`;
        listPicPro.innerHTML += ` <div class="s_tab" id="${element.id}">
        <div class="row">
            ${dataPro
                .map((item) => {
                    if (item.category == element.name) {
                        return `<div class="col-6 col-lg-3">
                    <a href="detailProduct.html?id=${item.id}" class="c-product">
                    <div class="c_images">
                    <img src="${item.img}" alt="" />
                    </div>
                        <div class="c_sale">
                           <h3>-${Math.round(((item.price - item.priceSale) / item.price) * 100)}%</h3>
                        </div>
                        <div class="c_namePro">
                            <h3>${item.name}</h3>
                            <h4><span>$${item.price}</span>$${item.priceSale}</h4>
                        </div>
                    </a>
                </div>`;
                    }
                })
                .join("")}
        </div>
    </div>`;
    });
    $(".s-newProduct .s_bot .s_listItemPro ul li ").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $changeTab = $(this).attr("data-tab");
        $(".s-newProduct .s_bot .s_listTab").find($changeTab).fadeIn();
        $(".s-newProduct .s_bot .s_listTab").find($changeTab).siblings().fadeOut();
    });
}
renderCate();
