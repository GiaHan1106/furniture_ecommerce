const URL_API = "http://localhost:3000";
const arrayCart = localStorage.getItem("LISTCART") ? JSON.parse(localStorage.getItem("LISTCART")) : [];

//XU LY API
const API_INFO = `${URL_API}/info`;
async function getData(URL) {
    const promist = await fetch(URL);
    const data = await promist.json();
    return data;
}

const userLogin = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
console.log(userLogin);

async function showHeader() {
    const data = await getData(API_INFO);
    let header = document.querySelector("#header");
    header.innerHTML = ` <div class="c-header">
    <div class="container d-flex align-items-center justify-content-between">
        <div class="s_left">
            <a href="index.html"> <img src="${data[0].logo}" alt="" /></a>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="listProduct.html">Product</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
        <div class="s_search">
            <input type="text" placeholder="Search for product" />
            <div class="s_iconsearch">
                <a href=""><i class="fa-light fa-magnifying-glass"></i></a>
            </div>
        </div>
        <div class="s_right">
            <i class="fa-light fa-magnifying-glass"></i>
            ${userLogin ? `<a href="userProfile.html">Hello: ${userLogin.name}</a>` : `<a href="login.html"><i class="fa-light fa-user"></i> </a>`}

            <a href="cart.html"><i class="fa-light fa-cart-shopping"></i><span>1</span></a>
        </div>
        <div class="s_iconmenu">
            <p><i class="fa-light fa-bars"></i></p>
        </div>
    </div>
</div>
<div class="s-bar">
    <div class="s_menu">
        <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Shop</a></li>
            <li><a href="">Product</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">Page</a></li>
            <li><a href="">Contact</a></li>
        </ul>
    </div>
</div>`;

    let search = document.querySelector(".c-header .s_right .fa-magnifying-glass");
    let inputSearch = document.querySelector(".c-header .s_search");
    let input = document.querySelector(".c-header .s_search input");
    let showMenu = document.querySelector(".c-header .s_iconmenu p");
    let smallMenu = document.querySelector(".s-bar");
    search.addEventListener("click", function () {
        inputSearch.classList.toggle("active");
        search.classList.toggle("fa-xmark");
    });
    showMenu.addEventListener("click", function () {
        smallMenu.classList.add("active");
    });
    smallMenu.addEventListener("click", function (e) {
        if (e.target == e.currentTarget) {
            smallMenu.classList.remove("active");
        }
    });
    input.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            window.location.href = `listProduct.html?keySearch=${input.value}`;
        }
    });
    countCart();
}
showHeader();
function countCart() {
    const qualityCart = document.querySelector(".c-header .s_right a span");
    qualityCart.innerHTML = arrayCart.length;
}
async function showFooter() {
    const data = await getData(API_INFO);
    let footer = document.querySelector("#footer");
    footer.innerHTML = ` <div class="s-footer">
    <div class="s_top">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="s_childFooter">
                        <img src="${data[0].logo}" alt="" />
                        <div class="s_address">
                            <i class="fa-light fa-location-dot"></i>
                            <p class="s_footerText">${data[0].address}</p>
                        </div>
                        <div class="s_address">
                            <i class="fa-light fa-envelope"></i>
                            <p class="s_footerText">${data[0].email}</p>
                        </div>
                        <div class="s_address">
                            <i class="fa-light fa-phone"></i>
                            <p class="s_footerText">${data[0].phoneNumber}</p>
                        </div>
                        <div class="s_icon">
                           <a href="${data[0].facebook}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                           <a href="${data[0].instargram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="s_childFooter">
                        <ul>
                            <li>About Us</li>
                            <li>Delivery Info</li>
                            <li>Order Tracking</li>
                            <li>My Account</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="s_childFooter">
                        <h2>NEWSLETTER</h2>
                        <h5>Enjoy our newsletter to stay updated with the latest news and special sales.</h5>
                        <form>
                            <input required type="text" placeholder="Enter your email address" />
                            <button type="submit" class="s_letterPaper">
                                <i class="fa-light fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="s_bot">
        <h3>© Drile Theme. All Rights Reserved.</h3>
        <img src="img/visa.png" alt="" />
    </div>
    <div class="s_up">
        <i class="fa-sharp fa-solid fa-up-long"></i>
    </div>
</div>`;
}
showFooter();
//menu
function renderListProduct(selector, data) {
    selector.innerHTML = "";
    data.forEach((element) => {
        selector.innerHTML += `<div class="col-6 col-lg-3">
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
$(function () {
    $(".s-footer .s_up i").click(function () {
        document.documentElement.scrollTop = 0;
    });
});
