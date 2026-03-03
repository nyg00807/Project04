document.addEventListener("DOMContentLoaded", () => {
  /* 버튼 링크 연결 */
const buttons = document.querySelectorAll('.site-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    const url = this.dataset.url;
    window.open(url, '_blank');
  });
});

  /* ===== 네비게이션(햄버거) ===== */
  const gnb = document.querySelector('#gnb');
  const toggleBtn = document.querySelector('#gnbToggle');

  if (toggleBtn && gnb) {
    toggleBtn.addEventListener('click', () => {
      gnb.classList.toggle('is-open');
    });

    // 바깥 클릭하면 닫기
    document.addEventListener('click', (e) => {
      if (gnb.classList.contains('is-open') && !gnb.contains(e.target)) {
        gnb.classList.remove('is-open');
      }
    });
  }

  /* ===== gnb 메뉴 클릭 시 섹션 이동 ===== */
  const mainSec = document.getElementById("mainVisual");
  const introSec = document.getElementById("Intro");
  const aboutSec = document.getElementById("AboutMe");
  const projectSec = document.getElementById("Project");
  const epilogueSec = document.getElementById("Epilogue");

  const menuLinks = document.querySelectorAll(".gnb-menu a");

  // Main
  menuLinks[0].addEventListener("click", (e) => {
    e.preventDefault();
    mainSec.scrollIntoView({ behavior: "smooth" });
  });

  // Intro
  menuLinks[1].addEventListener("click", (e) => {
    e.preventDefault();
    introSec.scrollIntoView({ behavior: "smooth" });
  });

  // About
  menuLinks[2].addEventListener("click", (e) => {
    e.preventDefault();
    aboutSec.scrollIntoView({ behavior: "smooth" });
  });

  // Project
  menuLinks[3].addEventListener("click", (e) => {
    e.preventDefault();
    projectSec.scrollIntoView({ behavior: "smooth" });
  });

  // Epilogue
  menuLinks[4].addEventListener("click", (e) => {
    e.preventDefault();
    epilogueSec.scrollIntoView({ behavior: "smooth" });
  });

  /* ===== Go 버튼(Intro로 이동) ===== */
  const goBtn = document.getElementById("goBtn");
  if (goBtn && introSec) {
    goBtn.addEventListener("click", () => {
      introSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ===== 밤하늘 별 배경 ===== */
  const $mv = document.querySelector(".main-visual");
  if ($mv) {
    const $stars = $mv.querySelector(".stars");
    const $meteors = $mv.querySelector(".meteors");

    if ($stars && $meteors) {
      const styles = ["style1", "style2", "style3", "style4"];
      const sizes = ["size1", "size1", "size1", "size2", "size3"];
      const opacities = ["op1", "op1", "op1", "op2", "op2", "op3"];

      const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

      function buildStars() {
        const w = Math.max(1, Math.floor($mv.clientWidth));
        const h = Math.max(1, Math.floor($mv.clientHeight));
        const maxLeft = Math.max(0, w - 1);
        const maxTop = Math.max(0, h - 1);

        let html = "";
        const count = 260;

        for (let i = 0; i < count; i++) {
          const style = styles[randInt(0, styles.length - 1)];
          const size = sizes[randInt(0, sizes.length - 1)];
          const op = opacities[randInt(0, opacities.length - 1)];

          const left = clamp(randInt(0, maxLeft), 0, maxLeft);
          const top = clamp(randInt(0, maxTop), 0, maxTop);

          const delay = randInt(0, 10) / 10;

          html += `<span class="star ${style} ${size} ${op}" style="left:${left}px; top:${top}px; animation-delay:${delay}s;"></span>`;
        }

        $stars.innerHTML = html;
      }

      function spawnMeteor() {
        const variant = "v" + randInt(1, 5);
        $meteors.innerHTML = `<i class="meteor ${variant}"></i>`;

        setTimeout(() => ($meteors.innerHTML = ""), 1100);

        const next = randInt(5000, 10000);
        setTimeout(spawnMeteor, next);
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          buildStars();
          setTimeout(spawnMeteor, 1500);
        });
      });

      let t = null;
      window.addEventListener("resize", () => {
        clearTimeout(t);
        t = setTimeout(buildStars, 150);
      });
    }
  }

  /* ===== 스와이퍼 ===== */
  const selectSwiper = new Swiper("#selectSwiper", {
    direction: "horizontal",
    slidesPerView: "auto",
    spaceBetween: 12,
    freeMode: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,

    breakpoints: {
      1025: {
        direction: "vertical",
        slidesPerView: 4,
        spaceBetween: 24,
        freeMode: false,
      },
    },
  });

  const screenSwiper = new Swiper("#screenSwiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 40,
    thumbs: {
      swiper: selectSwiper,
    },
  });

  // 내부 이미지 스와이퍼(각 슬라이드 안)
  const imgSwipers = document.querySelectorAll("#screenSwiper .img-swiper");

  imgSwipers.forEach((el) => {
    const nextEl = el.querySelector(".img-swiper__next");
    const prevEl = el.querySelector(".img-swiper__prev");
    const pagEl = el.querySelector(".img-swiper__pagination");

    new Swiper(el, {
      nested: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      touchStartPreventDefault: false,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      navigation: {
        nextEl,
        prevEl,
      },
      pagination: {
        el: pagEl,
        clickable: true,
      },
    });
  });

  requestAnimationFrame(() => {
    selectSwiper.update();
    screenSwiper.update();
  });

});