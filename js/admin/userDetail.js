const inputEmail = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");
const inputname = document.querySelector("input[name='name']");
const inputPhone = document.querySelector("input[name='phone']");
const inputAccess = document.querySelector("#access");
const inputStatus = document.querySelector("#status");
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const updateInforUser = document.querySelector(".s-userDetail .s_button .s_button_1");
async function inforUser() {
    const API_USER = `${URL_API}/user/${id}`;
    const data = await getData(API_USER);
    inputEmail.value = data.email;
    inputPassword.value = data.password;
    inputname.value = data.name;
    inputPhone.value = data.phone;
    inputAccess.value = data.access;
    inputStatus.value = data.status;
}
inforUser();
updateInforUser.addEventListener("click", async function (e) {
    e.preventDefault();
    const objInfor = {
        email: inputEmail.value,
        password: inputPassword.value,
        name: inputname.value,
        phone: inputPhone.value,
        access: inputAccess.value,
        status: inputStatus.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfor),
    };
    const res = await fetch(`${URL_API}/user/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
    } else {
        alert("Fail");
    }
});
