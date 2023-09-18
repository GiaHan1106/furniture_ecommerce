const inputEmail = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");
const clickLogin = document.querySelector(".s-login .s_bot .s_button_1 ");
const API_USER = `${URL_API}/user`;
clickLogin.addEventListener("click", async function (e) {
    e.preventDefault();
    const data = await getData(API_USER);
    const findUser = data.find((item) => inputEmail.value == item.email);
    if (findUser) {
        if (findUser.password == inputPassword.value) {
            const objLogin = {
                name: findUser.name,
                email: findUser.email,
            };
            sessionStorage.setItem("USER_LOGIN", JSON.stringify(objLogin));
            window.location.href = "userProfile.html";
        } else {
            alert("Password not correct");
        }
    } else {
        alert("no Account ");
    }
});
