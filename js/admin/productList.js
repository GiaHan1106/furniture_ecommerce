//CATEGORY
const API_LISTCATE = `${URL_API}/cate`;
const API_COLOR = `${URL_API}/color`;
const API_MATERIAL = `${URL_API}/material`;
const category = document.querySelector("#listCategory");
const colorProduct = document.querySelector("#listColorPro");
const materialProduct = document.querySelector("#listMaterial");

async function renderSelect(apilink, selector) {
    const data = await getData(apilink);
    data.forEach((element) => {
        selector.innerHTML += `<option value="${element.name}">${element.name}</option>`;
    });
}
renderSelect(API_LISTCATE, category);
renderSelect(API_COLOR, colorProduct);
renderSelect(API_MATERIAL, materialProduct);

const API_LIST = `${URL_API}/product`;
const inputName = document.querySelector("input[name='title']");
const inputPrice = document.querySelector("input[name='price']");
const inputPriceSale = document.querySelector("input[name='priceSale']");
const inputDesc = document.querySelector("input[name='describe']");
const imgInput = document.querySelector("input[name='picture']");
const imgGet = document.querySelector(".imgGet");
const imgGetElse = document.querySelector("input[name='imgGetElse']");
const btnAdd = document.querySelector("#create");
const btnUpdate = document.querySelector("#update");

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
    const objListPro = {
        category: category.value,
        name: inputName.value,
        price: inputPrice.value,
        priceSale: inputPriceSale.value,
        describe: inputDesc.value,
        colorProduct: colorProduct.value,
        materialProduct: materialProduct.value,
        img: uploadImage || imgGet.src,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objListPro),
    };
    const res = await fetch(`${API_LIST}`, option);
    if (res.ok) {
        alert("Save Complete");
        renderProduct();
    } else {
        alert("Fail");
    }
});

const table = document.querySelector(".c-table tbody");
async function renderProduct() {
    const data = await getData(API_LIST);
    table.innerHTML = "";
    data.forEach((element) => {
        table.innerHTML += `    <td>${element.id}</td>
        <td><img src="${element.img}" alt=""></td>
        <td>${element.name}</td>
        <td>${element.category}</td>
        <td>${element.price}</td>
        <td>${element.priceSale}</td>
        <td>${element.materialProduct}</td>
        <td>${element.colorProduct}</td>
        <td><button onclick="deleteProduct(${element.id})">Delete</button></td>
        <td><button onclick="updateProduct(${element.id})">Update</button></td>`;
    });
}
renderProduct();

async function deleteProduct(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_LIST}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
        renderProduct();
    } else {
        alert("Fail");
    }
}

async function updateProduct(id) {
    const data = await getData(`${API_LIST}/${id}`);
    category.value = data.category;
    inputName.value = data.name;
    inputPrice.value = data.price;
    inputPriceSale.value = data.priceSale;
    inputDesc.value = data.describe;
    colorProduct.value = data.colorProduct;
    materialProduct.value = data.materialProduct;
    imgGet.src = data.img;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objProduct = {
        category: category.value,
        name: inputName.value,
        price: inputPrice.value,
        priceSale: inputPriceSale.value,
        describe: inputDesc.value,
        colorProduct: colorProduct.value,
        materialProduct: materialProduct.value,
        img: uploadImage || imgGet.src,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objProduct),
    };
    const res = await fetch(`${API_LIST}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
        renderProduct();
    } else {
        alert("Fail");
    }
});
