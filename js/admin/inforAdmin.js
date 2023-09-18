const API_INFO = `${URL_API}/info`;
const formInforAdmin = document.querySelector("#form-inforAdmin");
const imgInput = document.querySelector("input[name='logo']");
const inputAddress = document.querySelector("input[name='address']");
const inputPhoneNumber = document.querySelector("input[name='phone']");
const inputEmail = document.querySelector("input[name='email']");
const inputFacebook = document.querySelector("input[name='facebook']");
const inputInstar = document.querySelector("input[name='instargram']");

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

formInforAdmin.addEventListener("submit", async function (e) {
    e.preventDefault();
    const objInfo = {
        address: inputAddress.value,
        phoneNumber: inputPhoneNumber.value,
        email: inputEmail.value,
        facebook: inputFacebook.value,
        instargram: inputInstar.value,
        logo: uploadImage || imgGet.src,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfo),
    };
    const res = await fetch(`${API_INFO}/1`, option);
    if (res.ok) {
        alert("Save Complete");
    } else {
        alert("Fail");
    }
});

async function showInfor() {
    const data = await getData(API_INFO);
    inputAddress.value = data[0].address;
    inputPhoneNumber.value = data[0].phoneNumber;
    inputEmail.value = data[0].email;
    inputFacebook.value = data[0].facebook;
    inputInstar.value = data[0].instargram;
    imgGet.src = data[0].logo;
}
showInfor();
