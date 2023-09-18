const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const API_ORDER = `${URL_API}/order/${id}`;
const table = document.querySelector(".s-orderDetail .s_order .s_table .s_top .c-table tbody");
const contactCustomer = document.querySelector(".s_contactCustomer");
async function renderGalary() {
    const data = await getData(API_ORDER);
    console.log(data);
    let sum = 0;
    data.product.forEach((element) => {
        table.innerHTML += `<tr>
        <td><img src="${element.detail.img}" alt="" /></td>
        <td>${element.detail.name}</td>
        <td>$ ${element.detail.priceSale}</td>
        <td> ${element.detail.colorProduct}</td>
        <td> ${element.detail.materialProduct}</td>
        <td>${element.choice.quanlity}</td>
        <td>$ ${element.choice.quanlity * element.detail.priceSale}</td>
    </tr>`;
        sum += element.choice.quanlity * element.detail.priceSale;
    });
    document.querySelector(".s-orderDetail .s_order .s_inforCus .s_infor").innerHTML = ` <p class="s_text">Name: <span>${data.infor.name}</span></p>
    <p class="s_text">Number Phone: <span>${data.infor.phone}</span></p>
    <p class="s_text">Email: <span>${data.infor.email}</span></p>
    <p class="s_text">Address: <span>${data.infor.address}</span></p>`;
    document.querySelector(".s-orderDetail .s_order .s_table .s_bot p span").innerHTML = ` ${data.infor.note}`;
    contactCustomer.innerHTML = ` <a href="tel:${data.infor.phone}">Call</a>
    <a href="mailto:${data.infor.email}">Email</a>`;
    document.querySelector(".s_totalPrice span").innerHTML = "$" + sum;
}
renderGalary();

async function deleteCusInfor(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_ORDER}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
    } else {
        alert("Fail");
    }
}

const button = document.querySelector("#download-button");

button.addEventListener("click", function () {
    const table = document.querySelector(".s_order");

    html2pdf().from(table).save();
});
