const API_REVIEW = `${URL_API}/review`;
const inputName = document.querySelector("input[name='title']");
const inputDesc = document.querySelector("input[name='des']");
const inputJob = document.querySelector("input[name='job']");
const btnUpdate = document.querySelector("#update");
const btnAdd = document.querySelector("#create");

btnAdd.addEventListener("click", async function () {
    const objReview = {
        name: inputName.value,
        describe: inputDesc.value,
        job: inputJob.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objReview),
    };
    const res = await fetch(`${API_REVIEW}`, option);
    if (res.ok) {
        alert("Save Complete");
    } else {
        alert("Fail");
    }
});

const table = document.querySelector(".c-table tbody");
async function renderReview() {
    const data = await getData(API_REVIEW);
    data.forEach((element) => {
        table.innerHTML += `  <tr>
        <td>${element.id}</td>
        <td>${element.name} </td>
        <td>
        ${element.describe} 
        </td>
        <td>${element.job} </td>
        <td><button onclick="deleteReview(${element.id})">Delete</button></td>
        <td><button onclick="deleteUpdate(${element.id})">Update</button></td>
    </tr>`;
    });
}
renderReview();

async function deleteReview(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_REVIEW}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
    } else {
        alert("Fail");
    }
}
async function deleteUpdate(id) {
    const data = await getData(`${API_REVIEW}/${id}`);
    inputName.value = data.name;
    inputDesc.value = data.describe;
    inputJob.value = data.job;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objReview = {
        name: inputName.value,
        describe: inputDesc.value,
        job: inputJob.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objReview),
    };
    const res = await fetch(`${API_REVIEW}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
    } else {
        alert("Fail");
    }
});
