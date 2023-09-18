const orderTotal = document.querySelector(".s_checkout .s_right .s_priceTotal");
const subTotal = document.querySelectorAll(".s_checkout .s_right .s_order .s_orderPrice span");
function displayBoxCheckOut() {
    if (arrayCart.length == 0) {
        document.querySelector("#textCheckout").style.display = "block";
        document.querySelector("#boxCheckout").style.display = "none";
    } else {
        document.querySelector("#textCheckout").style.display = "none";
    }
}
displayBoxCheckOut();
function showOrder() {
    let sum = 0;
    arrayCart.forEach((element) => {
        console.log(arrayCart);
        orderTotal.innerHTML += `<div class="s_order">
        <div class="s_left">
        <p class="s_orderText">${element.detail.name} <span>x ${element.choice.quanlity}</span></p>
        <p class="s_orderPrice">Color: ${element.choice.color}</p>
        <p class="s_orderPrice">Material: ${element.choice.material}</p>
        </div>
        <div class="">
        <p class="s_price">Price:</p>
        <p class="s_orderPrice"> $ ${element.detail.priceSale}</p>
        </div>
    </div>
    `;
        sum += element.detail.priceSale * element.choice.quanlity;
    });
    subTotal[0].innerHTML = sum;
    subTotal[1].innerHTML = sum;
}
showOrder();
const buttonOrder = document.querySelector(".s_checkout .s_button_1");
const inputName = document.querySelector('input[name="fullname"]');
const inputEmail = document.querySelector('input[name="email"]');
const inputPhone = document.querySelector('input[name="phone"]');
const inputAddress = document.querySelector('input[name="address"]');
const inputNote = document.querySelector('textarea[name="note"]');
buttonOrder.addEventListener("click", async function (e) {
    e.preventDefault();
    let now = new Date();
    const objOrder = {
        infor: {
            name: inputName.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            address: inputAddress.value,
            note: inputNote.value,
            date: `${now.getHours()}:${now.getMinutes()} - ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
        },
        product: arrayCart,
    };
    const API_ORDER = `${URL_API}/order`;
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objOrder),
    };
    if (validate()) {
        const res = await fetch(`${API_ORDER}`, option);
        if (res.ok) {
            alert("Order Complete");
            sessionStorage.setItem("INFOR_CHECKOUT", JSON.stringify(objOrder));
            localStorage.removeItem("LISTCART");
            window.location.href = "complete.html";
        } else {
            alert("Fail");
        }
    }
});
const error = document.querySelector(".s_error");
function validate() {
    let check = true;
    if (!inputName.value) {
        error.innerHTML = "fullname is not empty";
        check = false;
    } else if (!inputEmail.value) {
        error.innerHTML = "Email is not empty";
        check = false;
    } else if (!inputPhone.value) {
        error.innerHTML = "Phone is not empty";
        check = false;
    } else if (!inputAddress.value) {
        error.innerHTML = "Address is not empty";
        check = false;
    }
    return check;
}
