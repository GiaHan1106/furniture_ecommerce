const cartOrder = document.querySelector(".s-complete .s_between .s_information tbody");
const priceTotal = document.querySelectorAll(".s-complete .s_between .s_information .s_totalPrice .s_right span");
const orderInfor = JSON.parse(sessionStorage.getItem("INFOR_CHECKOUT"));
const date = document.querySelector("#showDate");
function checkBox() {
    if (orderInfor.length == 0) {
        document.querySelector("#checkBox").style.display = "block";
        document.querySelector("#checkBox").innerHTML = "Empty Cart";
        document.querySelector("#check").style.display = "none";
        document.querySelector("#inforCus").style.display = "none";
    } else {
        document.querySelector("#checkBox").innerHTML = "ORDER SUCCESS";
    }
}
checkBox();
async function orderComplete() {
    let sum = 0;
    orderInfor.product.forEach((element) => {
        cartOrder.innerHTML += ` <tr>
        <td>${element.detail.name}</td>
        <td>${element.choice.quanlity}</td>
        <td>$ ${element.detail.priceSale} </td>
        <td>$ ${element.choice.color} </td>
        <td>${element.choice.material}</td>
        <td>$ ${element.detail.priceSale * element.choice.quanlity} </td>
    </tr>
    `;
        sum += element.detail.priceSale * element.choice.quanlity;
    });
    priceTotal[0].innerHTML = "$" + sum;
    priceTotal[1].innerHTML = "$" + sum;
    date.innerHTML = orderInfor.infor.date;
}
orderComplete();

const nameCus = document.querySelector(".s-complete .s_bot .s_receive");
async function nameCustomer() {
    nameCus.innerHTML = `<p class="s_infor">Name receive: <span>${orderInfor.infor.name}</span></p>
        <p class="s_infor">Email: <span>${orderInfor.infor.email}</span></p>
        <p class="s_infor">Phone Number: <span>${orderInfor.infor.phone}</span></p>
        <p class="s_infor">Address: <span>${orderInfor.infor.address}</span></p> `;
}
nameCustomer();

const removeInfor = document.querySelector(".s-complete .s_top .s_button .s_button_1");
removeInfor.addEventListener("click", function () {
    window.location.href = "index.html";
    sessionStorage.removeItem("INFOR_CHECKOUT");
});
