$(function () {
    $(".s-userProfile .s_left .s_button_1").click(function () {
        $(this).removeClass("border");
        $(this).siblings().addClass("border");
        $id = $(this).attr("data-id");
        $($id).addClass("active");
        $($id).siblings().removeClass("active");
    });
});
function checkLogin() {
    if (!userLogin) {
        window.location.href = "login.html";
    }
}
checkLogin();
document.querySelector(".s-userProfile .s_box h3 span").innerHTML = userLogin.name;
document.querySelector(".s-userProfile .s_box button").addEventListener("click", function () {
    window.location.href = "login.html";
    sessionStorage.removeItem("USER_LOGIN");
});

//USER UPDATE
const inputEmail = document.querySelector("input[name='email']");
const inputPhone = document.querySelector("input[name='phone']");
const inputName = document.querySelector("input[name='name']");
const inputPassword = document.querySelector("input[name='password']");
const clickUpdateUser = document.querySelector(".s-userProfile .s_box .s_bot .s_button_1");
async function renderInforUser() {
    const API_USER = `${URL_API}/user?email=${userLogin.email}`;
    const data = await getData(API_USER);
    inputEmail.value = data[0].email;
    inputPhone.value = data[0].phone;
    inputName.value = data[0].name;
    inputPassword.value = data[0].password;
    clickUpdateUser.setAttribute("data-id", data[0].id);
}
renderInforUser();
clickUpdateUser.addEventListener("click", async function (e) {
    e.preventDefault();
    const id = clickUpdateUser.getAttribute("data-id");
    const objUser = {
        email: inputEmail.value,
        phone: inputPhone.value,
        name: inputName.value,
        password: inputPassword.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objUser),
    };
    const res = await fetch(`${URL_API}/user/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
        const objLogin = {
            name: inputName.value,
            email: inputEmail.value,
        };
        sessionStorage.setItem("USER_LOGIN", JSON.stringify(objLogin));
    } else {
        alert("Fail");
    }
});

//ORDER
async function renderListOrder() {
    const API_ORDER = `${URL_API}/order?email=${userLogin.email}`;
    const data = await getData(API_ORDER);
    const order = document.querySelector(".s-userProfile .s_box .s_order");
    let sum = 0;
    data.forEach((element) => {
        order.innerHTML += ` <h5>${element.infor.date}</h5>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quality</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            ${element.product
                .map((item) => {
                    sum += item.detail.priceSale * item.choice.quanlity;
                    return `<tr>
                <td>${item.detail.name}</td>
                <td>$ ${item.detail.priceSale}</td>
                <td>${item.choice.quanlity}</td>
                <td>$ ${item.detail.priceSale * item.choice.quanlity}</td>
            </tr>`;
                })
                .join("")}
            </tbody>
        </table>
        <p class="s_totalPrice">Total Price: <span>$ ${sum}</span></p>
        `;
    });
    console.log(data);
}
renderListOrder();
