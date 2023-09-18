const API_CATE = `${URL_API}/cate`;
const imgInput = document.querySelector("input[name='picture']");
const inputTitle = document.querySelector("input[name='title']");
const btnUpdate = document.querySelector("#update");
const btnAdd = document.querySelector("#create");
const imgGet = document.querySelector(".imgGet");
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
    const objProductCate = {
        img: uploadImage,
        name: inputTitle.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objProductCate),
    };
    const res = await fetch(`${API_CATE}`, option);
    if (res.ok) {
        alert("Save Complete");
        renderProductCate();
    } else {
        alert("Fail");
    }
});
const table = document.querySelector(".c-table tbody");
async function renderProductCate() {
    const data = await getData(API_CATE);
    table.innerHTML = "";
    data.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td><img src="${element.img}" alt="" /></td>
        <td>${element.name}</td>
        <td><button onclick="deleteMaterial(${element.id})">Delete</button></td>
        <td><button onclick="updateMaterial(${element.id})">Update</button></td>
    </tr>`;
    });
}
renderProductCate();
async function deleteMaterial(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_CATE}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
        renderProductCate();
    } else {
        alert("Fail");
    }
}
async function updateMaterial(id) {
    const data = await getData(`${API_CATE}/${id}`);
    imgGet.src = data.img;
    inputTitle.value = data.name;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objProductCate = {
        img: uploadImage || imgGet.src,
        name: inputTitle.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objProductCate),
    };
    const res = await fetch(`${API_CATE}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
        renderProductCate();
    } else {
        alert("Fail");
    }
});
