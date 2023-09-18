console.log(arrayCart);
const showProduct = document.querySelector(".s-cart .s_left");
const subTotal = document.querySelector(".s-cart .s_right .s_top .s_textTotal .s_number span");
const total = document.querySelector(".s-cart .s_right .s_bot h5 span");
const notice = document.querySelector(".s_left h6");
const thumbTotal = document.querySelector(".s-cart .s_right");
function showCart() {
    let sum = 0;
    if (arrayCart.length == 0) {
        notice.style.display = "block";
        thumbTotal.style.display = "none";
    }
    arrayCart.forEach((element) => {
        showProduct.innerHTML += ` <div class="s_item" data-id="${element.id}"><div class="s_leftChild">
        <img src="${element.detail.img}" alt="" />
    </div>
    <div class="s_rightChild">
        <div class="s_name">
            <h2>${element.detail.name}</h2>
            <i class="fa-light fa-trash"  onclick='changeCart(event,"delete")'></i>
        </div>
        <div class="s_content">
        <p class="s_inforPro"><span>Color: </span>${element.choice.color}</p>
        <p class="s_inforPro"><span>Material: </span>${element.choice.material}</p>
        </div>
        <div class="s_quality">
            <p class="s_text">Quality:</p>
            <div class="s_number">
                <i class="fa-light fa-plus" onclick='changeCart(event,"plus")'></i>
                <p class="s_numberOfQuality">${element.choice.quanlity}</p>
                <i class="fa-light fa-minus"onclick='changeCart(event,"minus")'></i>
            </div>
            <p class="s_inforPro"><span>Price: </span>$ <span class="s_price">${element.detail.priceSale}</span></p>
        </div>
    </div>
    </div>`;
        sum += element.detail.priceSale * element.choice.quanlity;
    });
    subTotal.innerHTML = sum;
    total.innerHTML = sum;
}
function changeCart(event, type) {
    const cartItem = event.target.closest(".s_item");
    let quanlity = cartItem.querySelector(".s_numberOfQuality").innerHTML;
    let price = cartItem.querySelector(" .s_price").innerHTML;
    let id = cartItem.getAttribute("data-id");
    let findCart = arrayCart.findIndex((item) => item.id == id);
    console.log(findCart);
    if (type == "delete") {
        cartItem.style.display = "none";
        arrayCart.splice(findCart, 1);
    } else {
        if (type == "plus") {
            quanlity++;
        } else if (type == "minus" && quanlity > 1) {
            quanlity--;
        }
        cartItem.querySelector(".s_numberOfQuality").innerHTML = quanlity;
        arrayCart[findCart].choice.quanlity = quanlity;
    }
    let sum = 0;
    arrayCart.forEach((element) => {
        sum += element.detail.priceSale * element.choice.quanlity;
    });

    subTotal.innerHTML = sum;
    total.innerHTML = sum;
    localStorage.setItem("LISTCART", JSON.stringify(arrayCart));
}
showCart();
