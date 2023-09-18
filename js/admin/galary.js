const API_GALARY = `${URL_API}/galary`;
const inputName = document.querySelector("input[name='title']");
const imgInput = document.querySelector("input[name='picture']");
const imgGet = document.querySelector(".imgGet");
const btnUpdate = document.querySelector("#update");
const btnAdd = document.querySelector("#create");
let uploadImage = "";
imgInput.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});
btnAdd.addEventListener("click", async function () {
    const objGalary = {
        img: uploadImage || imgGet.src,
        title: inputName.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objGalary),
    };
    const res = await fetch(`${API_GALARY}`, option);
    if (res.ok) {
        alert("Save Complete");
        renderGalary();
    } else {
        alert("Fail");
    }
});

const table = document.querySelector(".c-table tbody");
async function renderGalary() {
    const data = await getData(API_GALARY);
    table.innerHTML = "";
    data.forEach((element) => {
        table.innerHTML += ` <tr>
        <td>${element.id}</td>
        <td><img src="${element.img}" alt=""></td>
        <td>${element.title}</td>
        <td><button onclick="deleteGalary(${element.id})">Delete</button></td>
        <td><button onclick="updateGalary(${element.id})">Update</button></td>
    </tr>`;
    });
}
renderGalary();

async function deleteGalary(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_GALARY}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
        renderGalary();
    } else {
        alert("Fail");
    }
}
async function updateGalary(id) {
    const data = await getData(`${API_GALARY}/${id}`);
    imgGet.src = data.img;
    inputName.value = data.title;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objGalary = {
        img: uploadImage || imgGet.src,
        title: inputName.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objGalary),
    };
    const res = await fetch(`${API_GALARY}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
        renderGalary();
    } else {
        alert("Fail");
    }
});
