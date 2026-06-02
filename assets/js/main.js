/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')
/*==================== إغلاق القائمة عند الضغط على الروابط ====================*/
// لاحظ هنا استخدمت nav_link بشرطة واحدة كما هي في الـ HTML الخاص بك
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // إزالة كلاس show لإخفاء القائمة
    if(navMenu){
        navMenu.classList.remove('show')
    }
}

// إضافة المستمع لكل رابط
navLink.forEach(n => n.addEventListener('click', linkAction))
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              // البحث عن الرابط
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        // التحقق من وجود الرابط قبل إضافة الكلاس (هذا هو الإصلاح)
        if(sectionsClass){
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            }else{
                sectionsClass.classList.remove('active-link')
            }                                                    
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//  reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});
/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun' // الأيقونة ستتحول لشمس عند الضغط

// الكود يتحقق من اختيارك السابق (إذا كنت قد ضغطت عليه من قبل)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

if (selectedTheme) {
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme)
}

// تفعيل وإلغاء الوضع يدوياً عند الضغط
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    
    // حفظ الوضع الحالي ليتذكره المتصفح
    localStorage.setItem('selected-theme', document.body.classList.contains(lightTheme) ? 'light' : 'dark')
    localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon')
})// ... (كود الثيم يبقى كما هو)
/* --- كود تبديل اللغة الاحترافي --- */
const langBtn = document.getElementById('language-button');
const langText = langBtn.querySelector('.lang-text');

langBtn.addEventListener('click', () => {
    // 1. فحص الاتجاه الحالي (إذا كان يمين يعني عربي)
    const isCurrentlyArabic = document.body.dir === 'rtl' || document.body.dir === '';
    
    // 2. تحديد اللغة الجديدة والاتجاه الجديد
    const newLang = isCurrentlyArabic ? 'en' : 'ar';
    const newDir = isCurrentlyArabic ? 'ltr' : 'rtl';

    // 3. تطبيق التغيير على الصفحة
    document.body.dir = newDir;
    document.documentElement.lang = newLang;

    // 4. تغيير نص الزر (يظهر EN عندما تكون الواجهة عربية والعكس)
    langText.textContent = isCurrentlyArabic ? 'AR' : 'EN';

    // 5. تحديث النصوص (مع دعم الألوان والـ Placeholders)
    const elements = document.querySelectorAll('.translate, [data-en]');
    elements.forEach(el => {
        const newText = el.getAttribute(`data-${newLang}`);
        const newPlaceholder = el.getAttribute(`data-${newLang}-placeholder`);

        // تحديث النصوص (العناوين، الأزرار، والفقرات)
        if (newText) {
            // إذا كان العنصر زر إرسال نغير الـ value
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = newText;
            } else {
                // استخدام innerHTML للحفاظ على الـ span الملون
                el.innerHTML = newText;
            }
        }

        // تحديث الـ Placeholder للحقول
        if (newPlaceholder) {
            el.setAttribute('placeholder', newPlaceholder);
        }
    });

    // 6. ضبط الخطوط (Cairo للعربي و Poppins للإنجليزي)
    document.body.style.fontFamily = isCurrentlyArabic ? "'Poppins', sans-serif" : "'Cairo', sans-serif";
});
