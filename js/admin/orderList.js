const API_ORDER = `${URL_API}/order`;
const inputName = document.querySelector("input[name='title']");
const table = document.querySelector(".c-table tbody");
async function renderGalary() {
    const data = await getData(API_ORDER);
    console.log(data);
    data.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.infor.name}</td>
        <td>${element.infor.phone}</td>
        <td>${element.infor.date}</td>
        <td>
            <button><a href="orderDetailAdmin.html?id=${element.id}">Seen</a></button>
        </td>
        <td><button onclick="deleteCusInfor(${element.id})">Delete</button></td>
    </tr>`;
    });
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
