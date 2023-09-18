const product = document.querySelector(".s-listPro .s_bot .s_right .s_ListSomePro .row");
async function renderCate() {
    const API_CATE = `${URL_API}/cate`;
    const data = await getData(API_CATE);
    const categories = document.querySelector(".s-listPro .s_bot .s_left .s_catePriceAndColor .s_cate");
    const catePic = document.querySelector(".s-listPic");
    data.forEach((element) => {
        categories.innerHTML += `<li>${element.name} </li>`;
        catePic.innerHTML += ` <div class="s_pic">
        <img src="${element.img}" alt="" />
    </div>`;
    });
    filterCate();
}
renderCate();
async function renderColor() {
    const API_COLOR = `${URL_API}/color`;
    const data = await getData(API_COLOR);
    const color = document.querySelector(".s-listPro .s_bot .s_left .s_catePriceAndColor .s_color");
    data.forEach((element) => {
        color.innerHTML += `<li><span style="background-color: ${element.code}" class="s_color"></span>${element.name}</li>`;
    });
    filterColor();
}
renderColor();

async function renderMaterial() {
    const API_MATERIAL = `${URL_API}/material`;
    const data = await getData(API_MATERIAL);
    const color = document.querySelector(".s-listPro .s_bot .s_left .s_catePriceAndColor .s_material");
    data.forEach((element) => {
        color.innerHTML += `<li data-name2="${element.name}">
        <span><img src="${element.img}" alt="" /></span>${element.name}
    </li>`;
    });
    filterMaterial();
}
renderMaterial();

let url = new URL(window.location.href);
let idcate = url.searchParams.get("idcate");
let searchKey = url.searchParams.get("keySearch");
let page = 1;
const button = document.querySelector(".s_button_1.border");
async function renderProduct(page) {
    let API_PRODUCT;
    let data;
    if (idcate) {
        API_PRODUCT = `${URL_API}/product?category=${idcate}`;
        data = await getData(API_PRODUCT);
    } else if (searchKey) {
        API_PRODUCT = `${URL_API}/product?name_like=${searchKey}`;
        data = await getData(API_PRODUCT);
    } else {
        API_PRODUCT = `${URL_API}/product?_page=${page}&_limit=16`;
        data = await getData(API_PRODUCT);
    }

    const numberPro = document.querySelector(".s-listPro .s_bot .s_right .s_numberPro");
    numberPro.innerHTML = data.length;

    if (data.length < 16) {
        button.style.display = "none";
    }

    renderListProduct(product, data);
}
renderProduct(page);
button.addEventListener("click", function () {
    page++;
    renderProduct(page);
});

function filterPrice() {
    const listPrice = document.querySelectorAll(".s-listPro .s_catePriceAndColor .s_price li");
    listPrice.forEach((element) => {
        element.addEventListener("click", async function () {
            const priceMin = element.getAttribute("data-min");
            const priceMax = element.getAttribute("data-max");
            const API_PRODUCT = `${URL_API}/product`;
            const dataPrice = await getData(API_PRODUCT);
            const allPrice = dataPrice.filter((item) => {
                if (priceMin == "true") {
                    return item;
                } else {
                    if (parseFloat(item.priceSale) >= parseFloat(priceMin) && parseFloat(item.priceSale) <= parseFloat(priceMax)) {
                        return item;
                    }
                }
            });
            console.log(allPrice);
            renderListProduct(product, allPrice);
        });
    });
}
filterPrice();

function filterCate() {
    const listCate = document.querySelectorAll(".s-listPro .s_catePriceAndColor .s_cate li");
    listCate.forEach((element) => {
        element.addEventListener("click", async function () {
            const API_LISTPRODUCT = `${URL_API}/product?category=${element.innerHTML}`;
            const dataListProduct = await getData(API_LISTPRODUCT);
            renderListProduct(product, dataListProduct);
        });
    });
}
function filterColor() {
    const listColor = document.querySelectorAll(".s-listPro .s_catePriceAndColor .s_color li");
    listColor.forEach((element) => {
        element.addEventListener("click", async function () {
            const API_LISTCOLOR = `${URL_API}/product?colorProduct=${element.textContent}`;
            const dataListColor = await getData(API_LISTCOLOR);
            renderListProduct(product, dataListColor);
        });
    });
}
function filterMaterial() {
    const listMaterial = document.querySelectorAll(".s-listPro .s_catePriceAndColor .s_material li");
    listMaterial.forEach((element) => {
        element.addEventListener("click", async function () {
            const API_LISTMATERIAL = `${URL_API}/product?materialProduct=${element.getAttribute("data-name2")}`;
            const dataListMaterial = await getData(API_LISTMATERIAL);
            renderListProduct(product, dataListMaterial);
        });
    });
}
