const API_BANNER = `${URL_API}/banner`;
const inputName = document.querySelector("input[name='title']");
const inputDesc = document.querySelector("input[name='describe']");
const inputColor = document.querySelector("input[name='color']");
const inputLink = document.querySelector("input[name='link']");
const btnUpdate = document.querySelector("#update");
const btnAdd = document.querySelector("#create");
const imgInput = document.querySelector("input[name='picture']");
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
    const objBanner = {
        img: uploadImage || imgGet.src,
        name: inputName.value,
        describe: inputDesc.value,
        color: inputColor.value,
        link: inputLink.value,
    };
    console.log(objBanner);
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    const res = await fetch(`${API_BANNER}`, option);
    if (res.ok) {
        alert("Save Complete");
        renderBanner();
    } else {
        alert("Fail");
    }
});

const table = document.querySelector(".c-table tbody");
async function renderBanner() {
    const data = await getData(API_BANNER);
    table.innerHTML = "";
    data.forEach((element) => {
        table.innerHTML += ` <tr>
        <td>${element.id}</td>
        <td><img src="${element.img}" alt=""></td>
        <td>${element.name}</td>
        <td>${element.describe}</td>
        <td>${element.color}</td>
        <td>${element.link}</td>
        <td><button onclick="deleteBanner(${element.id})">Delete</button></td>
        <td><button onclick="updateBanner(${element.id})">Update</button></td>
    </tr>`;
    });
}
renderBanner();

async function deleteBanner(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_BANNER}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
        renderBanner();
    } else {
        alert("Fail");
    }
}
async function updateBanner(id) {
    const data = await getData(`${API_BANNER}/${id}`);
    imgGet.src = data.img;
    inputName.value = data.name;
    inputDesc.value = data.describe;
    inputColor.value = data.color;
    inputLink.value = data.link;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objBanner = {
        img: uploadImage || imgGet.src,
        name: inputName.value,
        describe: inputDesc.value,
        color: inputColor.value,
        link: inputLink.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    const res = await fetch(`${API_BANNER}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
        renderBanner();
    } else {
        alert("Fail");
    }
});
