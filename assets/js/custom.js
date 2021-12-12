(function ($) {
  $(document).ready(function () {
    $("body").addClass("js");
    var $menu = $("#menu"),
      $menulink = $(".menu-link");

    $menulink.click(function () {
      $menulink.toggleClass("active");
      $menu.toggleClass("active");
      return false;
    });
  });

  videoPopup();

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      550: {
        items: 2,
      },
      750: {
        items: 3,
      },
      1000: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  $(".Modern-Slider").slick({
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: true,
    pauseOnDotsHover: true,
    cssEase: "fade",
    // fade:true,
    draggable: false,
    prevArrow: '<button class="PrevArrow"></button>',
    nextArrow: '<button class="NextArrow"></button>',
  });

  $("div.features-post").hover(
    function () {
      $(this).find("div.content-hide").slideToggle("medium");
    },
    function () {
      $(this).find("div.content-hide").slideToggle("medium");
    }
  );

  $("#tabs").tabs();

  (function init() {
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24) + 8;
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }

    function initializeClock(endtime) {
      var timeinterval = setInterval(function () {
        let currentDate2 = new Date();
        let endtime =
          currentDate2.getFullYear() +
          "/" +
          (currentDate2.getMonth() + 1) +
          "/10";
        // let endtime = currentDate2.getFullYear() + "/" + "/12" + "/12";

        let currentDate = new Date(endtime).toDateString();
        let checkSun = currentDate.substring(0, 3);

        if (checkSun != "Sun") {
          let daysToSunday = getNextSundayFromDay(checkSun);
          check = generateEndDate(7 - daysToSunday);

          endtime =
            check.getFullYear() +
            "/" +
            (check.getMonth() + 1) +
            "/" +
            check.getDate();
        }

        var t = getTimeRemaining(endtime);
        document.querySelector(".days > .value").innerText = t.days;
        document.querySelector(".hours > .value").innerText = t.hours;
        document.querySelector(".minutes > .value").innerText = t.minutes;
        document.querySelector(".seconds > .value").innerText = t.seconds;

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }, 1000);
    }

    function generateEndDate(daysToUpdate) {
      var currentDay = new Date();
      var nextSunday = new Date(
        currentDay.setDate(currentDay.getDate() + daysToUpdate)
      );
      return nextSunday;
    }

    function getNextSundayFromDay(day) {
      let res = 0;
      let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      let counter = 0;

      for (let i = 0; i < days.length; i++) {
        counter++;
        if (day === days[i]) {
          res = counter;
          break;
        }
      }

      return res;
    }

    initializeClock();
  })();
})(jQuery);
