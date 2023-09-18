const inputEmail = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");
const URL_API = "http://localhost:3000";
const button = document.querySelector(".s_button_1");
const boxLogin = document.querySelector(".s-login .s_bot");
const textLogin = document.querySelector(".s-login h3");
let count = 0;
button.addEventListener("click", async function (e) {
    e.preventDefault();
    const API_USER = `${URL_API}/user?email=${inputEmail.value}`;
    const res = await fetch(API_USER);
    const data = await res.json();
    console.log(data);
    if (data.length > 0) {
        if (inputPassword.value == data[0].password) {
            if (data[0].access == "admin") {
                window.location.href = "inforAdmin.html";
                sessionStorage.setItem("USER_LOGIN_ADMIN", data[0].name);
            } else {
                alert("you not access admin");
                count++;
            }
        } else {
            alert("password not correct");
            count++;
        }
    } else {
        alert("no Account");
        count++;
    }
    if (count == 5) {
        boxLogin.style.display = "none";
        textLogin.style.display = "block";
        localStorage.setItem("CHECK_BAN", true);
    }
});
function unclockBan() {
    setTimeout(() => {
        localStorage.removeItem("CHECK_BAN");
    }, 100000);
}
unclockBan();
function checkBan() {
    if (localStorage.getItem("CHECK_BAN")) {
        boxLogin.style.display = "none";
        textLogin.style.display = "block";
    }
}
checkBan();
