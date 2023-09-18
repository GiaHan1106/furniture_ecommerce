const inputFullName = document.querySelector("input[name='fullname']");
const inputPhone = document.querySelector("input[name='numberphone']");
const inputEmail = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");
const clickRegister = document.querySelector(".s-login .s_bot .s_button_1");
const API_USER = `${URL_API}/user`;
clickRegister.addEventListener("click", async function (e) {
    e.preventDefault();
    const objInfor = {
        name: inputFullName.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        password: inputPassword.value,
        access: "user",
        status: "onl",
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfor),
    };
    const data = await getData(API_USER);
    console.log(data);
    const findUser = data.find((item) => inputEmail.value == item.email);
    if (findUser) {
        alert("Email existed");
    } else {
        const res = await fetch(`${API_USER}`, option);
        if (res.ok) {
            alert("Register Success");
        } else {
            alert("Fail");
        }
    }
});
