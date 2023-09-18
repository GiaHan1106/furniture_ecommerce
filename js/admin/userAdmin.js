async function renderForUser() {
    const API_USER = `${URL_API}/user`;
    const data = await getData(API_USER);
    console.log(data);
    const showUser = document.querySelector("tbody");
    data.forEach((element) => {
        showUser.innerHTML += ` <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.access ? element.access : "User"}</td>
        <td>
            <button><a href="userDetail.html?id=${element.id}">Seen</a></button>
        </td>
        <td><button onclick="deleteUser(${element.id})">Delete</button></td>
    </tr>`;
    });
    console.log(data);
}
renderForUser();
async function deleteUser(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${URL_API}/user/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
    } else {
        alert("Fail");
    }
}
