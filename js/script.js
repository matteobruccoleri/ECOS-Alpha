//let tableauSliding = ["slidingIntro", "slidingSlider", "slidingCompetences", "slidingExperiences", "slidingContact", "slidingContactSvg"];

/*let tableauId = ["texte", "slider","competences","experiences","contact_a","contact-svg" ];
const {scrollTop, clientHeight} = document.documentElement;

for (let i = 0; i < tableauId.length; i++) {
    //window{i} = document.querySelector(i);
    
    window.addEventListener('scroll', () => {
        const topElementToTopViewport = window[tableauId[i]].getBoundingClientRect().top;

        if(scrollTop > (scrollTop + topElementToTopViewport) - clientHeight * 1) {
            window[tableauId[i]].classList.add('anim-y');
        };
    });

}
*/
const {scrollTop, clientHeight} = document.documentElement;


window.addEventListener('scroll', () => {
    
const conceptionContent1 = document.querySelector(".conception_content_1")
const conceptionContent2 = document.querySelector(".conception_content_2")
const conceptionContent3 = document.querySelector(".conception_content_3")
const allConceptionContent = [conceptionContent1, conceptionContent2, conceptionContent3]
    //const scrollTop = window.scrollY;
    //const clientHeight = window.innerHeight;

    allConceptionContent.map(content => {
        const topElementToTopViewport = content.getBoundingClientRect().top;

        if (scrollTop > (scrollTop + topElementToTopViewport) - clientHeight * 0.8) {
            content.classList.add('anim-x');
        } else {
            content.classList.remove('anim-x');
        }
    });
});



// Animation Fonctionnement


window.addEventListener('scroll', () => {
    // fonctionnement_wrapper_1
    const fonctionnementWrapper1 = document.querySelector('.fonctionnement_wrapper_1');
    const fonctionnementWrapper1Top = fonctionnementWrapper1.getBoundingClientRect().top;
    const iphoneA = document.querySelector('.iphone-3-a');
    const iphoneB = document.querySelector('.iphone-3-b');   
    const fonctionnementTitle = document.querySelector('.fonctionnement_title_1');
    const fonctionnementText = document.querySelector('.fonctionnement_text');
    const fonctionnementBtn = document.querySelector('.fonctionnement_btn');
    
    // outil
    const outil = document.querySelector('.outil');
    const outilTop = outil.getBoundingClientRect().top;
    const outilTitle = document.querySelector('.outil_title');
    const outilContent1 = document.querySelector('.outil_content_1');
    const outilContent2 = document.querySelector('.outil_content_2');
    const outilBtn = document.querySelector('.outil_btn');
    //

    if(scrollTop > (scrollTop + fonctionnementWrapper1Top) - clientHeight * 0.7) {

        iphoneA.classList.add('anim-iphone-3-top');
        iphoneB.classList.add('anim-iphone-3-down');
        fonctionnementWrapper1.classList.add('anim-y-both');
        fonctionnementTitle.classList.add('anim-y');
        fonctionnementText.classList.add('anim-y');
        fonctionnementBtn.classList.add('anim-y');

    }
    
    if(scrollTop > (scrollTop + outilTop) - clientHeight * 0.7) {

        outil.classList.add('anim-y-both');
        outilTitle.classList.add('anim-y');
        outilContent1.classList.add('anim-y');
        outilContent2.classList.add('anim-y');
        outilBtn.classList.add('anim-y');
    }
});

// fonctionnement_wrapper_2 & fonctionnement_wrapper_3
window.addEventListener('scroll', () => {
    const fonctionnementWrapper2 = document.querySelector('.fonctionnement_wrapper_2');
    const fonctionnementWrapper3 = document.querySelector('.fonctionnement_wrapper_3');
    const fonctionnementTitle2 = document.querySelector('.fonctionnement_title_2')
    const fonctionnementTitle3 = document.querySelector('.fonctionnement_title_3')
    const fonctionnementIphone1 = document.querySelector('.fonctionnement_iphone_1');
    const fonctionnementIphone2 = document.querySelector('.fonctionnement_iphone_2');
    const fonctionnementIphone3 = document.querySelector('.fonctionnement_iphone_3');
    const fonctionnementWrapper2Top = fonctionnementWrapper2.getBoundingClientRect().top;
    const progressbar = document.querySelector('.progress_bar');
    const check1 = document.querySelector('.check_1');
    const check2 = document.querySelector('.check_2');
    const checkwrapper1Text = document.querySelector('.check_wrapper_1_text');
    const checkwrapper2Text = document.querySelector('.check_wrapper_2_text');

    if(scrollTop > (scrollTop + fonctionnementWrapper2Top) - clientHeight * 0.7) {
        // fonctionnement_wrapper_2
        fonctionnementWrapper2.classList.add('anim-y-both');
        fonctionnementTitle2.classList.add('anim-y');
        fonctionnementIphone1.classList.add('anim-top-20');
        fonctionnementIphone2.classList.add('anim-bottom-20');
        // fonctionnement_wrapper_3
        fonctionnementWrapper3.classList.add('anim-y-both');
        fonctionnementTitle3.classList.add('anim-y');
        fonctionnementIphone3.classList.add('anim-y-both');
        progressbar.classList.add('anim-x');
        check1.classList.add('anim_scale_100');
        checkwrapper1Text.classList.add('anim-y-both');
        check2.classList.add('anim_scale_100');
        checkwrapper2Text.classList.add('anim-y-both');
    };
});

// Animation Communaute
const communauteWrapper = document.querySelector('.communaute_wrapper');
const communauteTitle = document.querySelector('.communaute_title');
const communauteText = document.querySelector('.communaute_text');
const communauteBtn = document.querySelector('.communaute_btn');
const wrapperLightblueBtn = document.querySelector('.wrapper-lightblue_btn');
const iphone3c = document.querySelector('.iphone-3-c');
const iphone3d = document.querySelector('.iphone-3-d');

window.addEventListener('scroll', () => {

    const topElementToTopViewport = communauteWrapper.getBoundingClientRect().top;

    if(scrollTop > (scrollTop + topElementToTopViewport) - clientHeight * 0.7) {
        iphone3c.classList.add('anim-iphone-3-top');
        iphone3d.classList.add('anim-iphone-3-down');
        communauteWrapper.classList.add('anim-y-both');
        communauteTitle.classList.add('anim-y');
        communauteBtn.classList.add('anim-y');
        communauteText.classList.add('anim-y');
        wrapperLightblueBtn.classList.add('btn-anim-y');
    };
});






