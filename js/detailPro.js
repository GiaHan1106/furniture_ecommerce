async function renderColor() {
    const API_COLOR = `${URL_API}/color`;
    const data = await getData(API_COLOR);
    const color = document.querySelector(".s-detailProduct .s_right .s_chooseColor ul");
    data.forEach((element) => {
        color.innerHTML += `<li data-name="${element.name}"><span style="background-color: ${element.code}"></span>${element.name}</li>`;
    });
    $(".s-detailProduct .s_chooseColor ul li").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        let dataName = $(this).attr("data-name");
        $(".s-detailProduct .s_chooseColor h5 span").text(dataName);
        $(".s_popupCart .s_text .s_box .s_right .s_colorproduct .s_color").text(dataName);
    });
}
async function renderMaterial() {
    const API_MATERIAL = `${URL_API}/material`;
    const data = await getData(API_MATERIAL);
    const color = document.querySelector(".s-detailProduct .s_right .s_chooseMaterial ul");
    data.forEach((element) => {
        color.innerHTML += `<li data-name="${element.name}"><span class="s_marerial"><img src="${element.img}" alt="" /></span>${element.name}</li>`;
    });
    $(".s-detailProduct .s_chooseMaterial ul li").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        let dataName = $(this).attr("data-name");
        console.log(dataName);
        $(".s-detailProduct .s_chooseMaterial h5 span").text(dataName);
        $(".s_popupCart .s_text .s_box .s_right .s_colorproduct .s_material").text(dataName);
    });
}
renderColor();
renderMaterial();
const detailThumb = document.querySelector(".s-detailProduct .s_left img");
const detailName = document.querySelector(".s-detailProduct .s_right h2");
const detailPrice = document.querySelector(".s-detailProduct .s_right h5");
const detailDesc = document.querySelector(".s-detailProduct .s_right p");
const cartProduct = document.querySelector(".s_popupCart .s_box .row");

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
async function renderDetail() {
    const API_PRODUCT = `${URL_API}/product/${id}`;
    const data = await getData(API_PRODUCT);
    detailThumb.src = data.img;
    detailName.innerHTML = data.name;
    detailPrice.innerHTML = "$" + data.price;
    detailDesc.innerHTML = data.describe;

    cartProduct.innerHTML = ` <div class="col-lg-4">
    <img src="${data.img}" alt="" />
</div>
<div class="col-lg-8">
    <h3 class="s_nameproduct">${data.name}</h3>
    <p class="s_colorproduct"><span class="s_color"></span>- <span class="s_material"></span></p>
    <p class="s_price"><span class="price1">$ ${data.price}</span></p>
    <a href="cart.html" class="s_button_1">SEE CART</a>
</div>`;
}
renderDetail();
async function renderProduct() {
    const API_PRODUCT = `${URL_API}/product/${id}`;
    const dataDetail = await getData(API_PRODUCT);

    const API_PRODUCT_RELATED = `${URL_API}/product?category=${dataDetail.category}`;
    const dataRelated = await getData(API_PRODUCT_RELATED);

    const relatedFilter = dataRelated.filter((item) => item.id != dataDetail.id);

    const product = document.querySelector(".s_listSomePro .s_bot .row");
    relatedFilter.forEach((element) => {
        product.innerHTML += `<div class="col-6 col-lg-3">
  <a href="detailProduct.html?id=${element.id}" class="c-product">
  <div class="c_images">
  <img src="${element.img}" alt="" />
  </div>
      <div class="c_sale">
         <h3>-${Math.round(((element.price - element.priceSale) / element.price) * 100)}%</h3>
      </div>
      <div class="c_namePro">
          <h3>${element.name}</h3>
          <h4><span>$${element.price}</span>$${element.priceSale}</h4>
      </div>
  </a>
</div>`;
    });
}
renderProduct();

$(function () {
    $(".s-detailProduct .s_qualityAndCart .s_quality .s_icon i").click(function () {
        $quality = $(".s-detailProduct .s_qualityAndCart .s_quality h4").text();
        if ($(this).hasClass("fa-angle-up")) {
            $quality++;
        } else {
            if ($quality > 1) {
                $quality--;
            }
        }
        $(".s-detailProduct .s_qualityAndCart .s_quality h4").text($quality);
    });
    $(".s-detailProduct .s_qualityAndCart .s_cart .s_button_1").click(async function () {
        $chooseColor = $(".s-detailProduct .s_right .s_chooseColor h5 span").text();
        $chooseMaterial = $(".s-detailProduct .s_right .s_chooseMaterial h5 span").text();
        $chooseQuality = $(".s-detailProduct .s_right .s_qualityAndCart .s_quality h4").text();
        if ($chooseColor == "") {
            alert("Not select color");
        } else if ($chooseMaterial == "") {
            alert("Not select material");
        } else {
            $(".s-detailProduct .s_qualityAndCart .s_popupCart").addClass("active");
            $(".s-detailProduct .s_right .s_color").text($chooseColor);
            $(".s-detailProduct .s_right .s_material").text($chooseMaterial);
            setTimeout(() => {
                $(".s-detailProduct .s_qualityAndCart .s_popupCart").removeClass("active");
            }, 3000);
            const API_PRODUCT = `${URL_API}/product/${id}`;
            const data = await getData(API_PRODUCT);
            const objCart = {
                detail: data,
                choice: {
                    color: $chooseColor,
                    material: $chooseMaterial,
                    quanlity: $chooseQuality,
                },
                id: arrayCart.length,
            };
            const findProduct = arrayCart.findIndex((item) => {
                if (item.detail.id == id && item.choice.color == $chooseColor && item.choice.material == $chooseMaterial) {
                    return item;
                }
            });
            if (findProduct >= 0) {
                if (arrayCart[findProduct].choice.color == $chooseColor && arrayCart[findProduct].choice.material == $chooseMaterial) {
                    arrayCart[findProduct].choice.quality = parseInt(arrayCart[findProduct].choice.quality) + parseInt($chooseQuality);
                } else {
                    arrayCart.push(objCart);
                }
            } else {
                arrayCart.push(objCart);
            }
            localStorage.setItem("LISTCART", JSON.stringify(arrayCart));
            countCart();
        }
    });
});
