async function ourTeam() {
    const API_ADMIN = `${URL_API}/admin`;
    const data = await getData(API_ADMIN);
    const ourTeam = document.querySelector(".s-ourGreatTeam .s_our .s_bot .row");
    data.forEach((element) => {
        ourTeam.innerHTML += `<div class="col-6 col-lg-4">
         <div class="s_card">
        <img src="${element.img}" alt="" />
        <div class="s_inforPeople">
            <h4>${element.name}</h4>
            <h5>${element.position}</h5>
                <div class="s_social">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-pinterest-p"></i>
               </div>
           </div>
       </div>
    </div>`;
    });
}
ourTeam();
//s-ourStory
$(function () {
    $(".s-ourStory .s_click span").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        let imgSrc = $(this).attr("data-bg");
        $(".s-ourStory .s_story .s_right img").attr("src", imgSrc);
    });
});
