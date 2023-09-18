const API_COLOR = `${URL_API}/color`;
const inputNameColor = document.querySelector("input[name='title']");
const inputCodeColor = document.querySelector("input[name='code']");
const btnUpdate = document.querySelector("#update");
const btnAdd = document.querySelector("#create");
const imgGet = document.querySelector(".imgGet");

btnAdd.addEventListener("click", async function () {
    const objColor = {
        name: inputNameColor.value,
        code: inputCodeColor.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objColor),
    };
    const res = await fetch(`${API_COLOR}`, option);
    if (res.ok) {
        alert("Save Complete");
    } else {
        alert("Fail");
    }
});
const table = document.querySelector(".c-table tbody");
async function renderProductCate() {
    const data = await getData(API_COLOR);
    data.forEach((element) => {
        table.innerHTML += `    <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.code}</td>
        <td><button onclick="deleteColor(${element.id})">Delete</button></td>
        <td><button onclick="updateColor(${element.id})">Update</button></td>
    </tr>`;
    });
}
renderProductCate();

async function deleteColor(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_COLOR}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
    } else {
        alert("Fail");
    }
}
async function updateColor(id) {
    const data = await getData(`${API_COLOR}/${id}`);
    inputNameColor.value = data.name;
    inputCodeColor.value = data.code;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objColorPro = {
        name: inputNameColor.value,
        code: inputCodeColor.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objColorPro),
    };
    const res = await fetch(`${API_COLOR}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
    } else {
        alert("Fail");
    }
});
