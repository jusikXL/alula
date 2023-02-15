function t121_setHeight(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var videoBlock = document.getElementById("youtubeiframe" + recid);
  var videoParent = videoBlock ? videoBlock.parentNode : null;
  var videoWidth = videoBlock ? videoBlock.offsetWidth : 0;
  var videoHeight = videoWidth * 0.5625;
  if (videoBlock) videoBlock.style.height = videoHeight + "px";
  if (videoParent) videoParent.style.height = videoHeight + "px";
  var videoLazy = rec ? rec.querySelector(".t-video-lazyload") : null;
  if (videoLazy) {
    var iframeLazy = videoLazy.querySelector("iframe");
    var heightLazy = videoLazy.offsetWidth * 0.5625;
    videoLazy.style.height = heightLazy + "px";
    if (iframeLazy) iframeLazy.style.height = heightLazy + "px";
    setTimeout(function () {
      videoBlock = document.getElementById("youtubeiframe" + recid);
      videoWidth = videoBlock ? videoBlock.offsetWidth : 0;
      if (videoBlock) videoBlock.style.height = videoWidth * 0.5625 + "px";
    }, 200);
  }
}
function t142_checkSize(recId) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var button = rec.querySelector(".t142__submit");
  if (!button) return;
  var buttonStyle = getComputedStyle(button, null);
  var buttonPaddingTop = parseInt(buttonStyle.paddingTop) || 0;
  var buttonPaddingBottom = parseInt(buttonStyle.paddingBottom) || 0;
  var buttonHeight =
    button.clientHeight - (buttonPaddingTop + buttonPaddingBottom) + 5;
  var textHeight = button.scrollHeight;
  if (buttonHeight < textHeight) {
    button.classList.add("t142__submit-overflowed");
  }
}
function t228__init(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var menuBlock = rec.querySelector(".t228");
  var mobileMenu = rec.querySelector(".t228__mobile");
  var menuSubLinkItems = rec.querySelectorAll(".t-menusub__link-item");
  var rightBtn = rec.querySelector(".t228__right_buttons_but .t-btn");
  var mobileMenuPosition = mobileMenu
    ? mobileMenu.style.position || window.getComputedStyle(mobileMenu).position
    : "";
  var mobileMenuDisplay = mobileMenu
    ? mobileMenu.style.display || window.getComputedStyle(mobileMenu).display
    : "";
  var isFixedMobileMenu =
    mobileMenuPosition === "fixed" && mobileMenuDisplay === "block";
  var overflowEvent = document.createEvent("Event");
  var noOverflowEvent = document.createEvent("Event");
  overflowEvent.initEvent("overflow", !0, !0);
  noOverflowEvent.initEvent("nooverflow", !0, !0);
  if (menuBlock) {
    menuBlock.addEventListener("overflow", function () {
      t228_checkOverflow(recid);
    });
    $(menuBlock).on("overflow", function () {
      t228_checkOverflow(recid);
    });
    menuBlock.addEventListener("nooverflow", function () {
      t228_checkNoOverflow(recid);
    });
    $(menuBlock).on("nooverflow", function () {
      t228_checkNoOverflow(recid);
    });
  }
  rec.addEventListener("click", function (e) {
    var targetLink = e.target.closest(".t-menusub__target-link");
    if (targetLink && window.isMobile) {
      if (targetLink.classList.contains("t-menusub__target-link_active")) {
        if (menuBlock) menuBlock.dispatchEvent(overflowEvent);
      } else {
        if (menuBlock) menuBlock.dispatchEvent(noOverflowEvent);
      }
    }
    var currentLink = e.target.closest(
      ".t-menu__link-item:not(.tooltipstered):not(.t-menusub__target-link):not(.t794__tm-link):not(.t966__tm-link):not(.t978__tm-link):not(.t978__menu-link)"
    );
    if (currentLink && mobileMenu && isFixedMobileMenu) mobileMenu.click();
  });
  Array.prototype.forEach.call(menuSubLinkItems, function (linkItem) {
    linkItem.addEventListener("click", function () {
      if (mobileMenu && isFixedMobileMenu) mobileMenu.click();
    });
  });
  if (rightBtn) {
    rightBtn.addEventListener("click", function () {
      if (mobileMenu && isFixedMobileMenu) mobileMenu.click();
    });
  }
  if (menuBlock) {
    menuBlock.addEventListener("showME601a", function () {
      var menuLinks = rec.querySelectorAll(".t966__menu-link");
      Array.prototype.forEach.call(menuLinks, function (menuLink) {
        menuLink.addEventListener("click", function () {
          if (mobileMenu && isFixedMobileMenu) mobileMenu.click();
        });
      });
    });
  }
}
function t228_highlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) === "/") {
    url = url.slice(0, -1);
  }
  if (pathname.substr(pathname.length - 1) === "/") {
    pathname = pathname.slice(0, -1);
  }
  if (pathname.charAt(0) === "/") {
    pathname = pathname.slice(1);
  }
  if (pathname === "") {
    pathname = "/";
  }
  var shouldBeActiveElements = document.querySelectorAll(
    ".t228__list_item a[href='" +
      url +
      "'], " +
      ".t228__list_item a[href='" +
      url +
      "/'], " +
      ".t228__list_item a[href='" +
      pathname +
      "'], " +
      ".t228__list_item a[href='/" +
      pathname +
      "'], " +
      ".t228__list_item a[href='" +
      pathname +
      "/'], " +
      ".t228__list_item a[href='/" +
      pathname +
      "/']"
  );
  Array.prototype.forEach.call(shouldBeActiveElements, function (link) {
    link.classList.add("t-active");
  });
}
function t228_checkAnchorLinks(recid) {
  if (window.innerWidth >= 980) {
    var rec = document.getElementById("rec" + recid);
    var navLinks = rec
      ? rec.querySelectorAll(".t228__list_item a[href*='#']")
      : [];
    navLinks = Array.prototype.filter.call(navLinks, function (navLink) {
      return !navLink.classList.contains("tooltipstered");
    });
    if (navLinks.length) {
      setTimeout(function () {
        t228_catchScroll(navLinks);
      }, 500);
    }
  }
}
function t228_checkOverflow(recid) {
  var rec = document.getElementById("rec" + recid);
  var menu = rec ? rec.querySelector(".t228") : null;
  if (!menu) return;
  var mobileContainer = document.querySelector(".t228__mobile_container");
  var mobileContainerHeight = t228_getFullHeight(mobileContainer);
  var windowHeight = document.documentElement.clientHeight;
  var menuPosition =
    menu.style.position || window.getComputedStyle(menu).position;
  if (menuPosition === "fixed") {
    menu.classList.add("t228__overflow");
    menu.style.setProperty(
      "height",
      windowHeight - mobileContainerHeight + "px",
      "important"
    );
  }
}
function t228_checkNoOverflow(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return !1;
  var menu = rec.querySelector(".t228");
  var menuPosition = menu
    ? menu.style.position || window.getComputedStyle(menu).position
    : "";
  if (menuPosition === "fixed") {
    if (menu) menu.classList.remove("t228__overflow");
    if (menu) menu.style.height = "auto";
  }
}
function t228_catchScroll(navLinks) {
  navLinks = Array.prototype.slice.call(navLinks);
  var clickedSectionID = null;
  var sections = [];
  var sectionToNavigationLinkID = {};
  var interval = 100;
  var lastCall;
  var timeoutID;
  navLinks = navLinks.reverse();
  navLinks.forEach(function (link) {
    var currentSection = t228_getSectionByHref(link);
    if (currentSection && currentSection.id) {
      sections.push(currentSection);
      sectionToNavigationLinkID[currentSection.id] = link;
    }
  });
  sections.sort(function (a, b) {
    return b.getBoundingClientRect().top - a.getBoundingClientRect().top;
  });
  t228_highlightNavLinks(
    navLinks,
    sections,
    sectionToNavigationLinkID,
    clickedSectionID
  );
  navLinks.forEach(function (navLink, i) {
    navLink.addEventListener("click", function () {
      var clickedSection = t228_getSectionByHref(navLink);
      if (
        !navLink.classList.contains("tooltipstered") &&
        clickedSection &&
        clickedSection.id
      ) {
        navLinks.forEach(function (link, index) {
          if (index === i) {
            link.classList.add("t-active");
          } else {
            link.classList.remove("t-active");
          }
        });
        clickedSectionID = clickedSection.id;
      }
    });
  });
  window.addEventListener("scroll", function () {
    var dateNow = new Date().getTime();
    if (lastCall && dateNow < lastCall + interval) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        lastCall = dateNow;
        clickedSectionID = t228_highlightNavLinks(
          navLinks,
          sections,
          sectionToNavigationLinkID,
          clickedSectionID
        );
      }, interval - (dateNow - lastCall));
    } else {
      lastCall = dateNow;
      clickedSectionID = t228_highlightNavLinks(
        navLinks,
        sections,
        sectionToNavigationLinkID,
        clickedSectionID
      );
    }
  });
}
function t228_getSectionByHref(curlink) {
  if (!curlink) return;
  var href = curlink.getAttribute("href");
  var curLinkValue = href ? href.replace(/\s+/g, "") : "";
  if (curLinkValue.indexOf("/") === 0) curLinkValue = curLinkValue.slice(1);
  if (href && curlink.matches('[href*="#rec"]')) {
    curLinkValue = curLinkValue.replace(/.*#/, "");
    return document.getElementById(curLinkValue);
  } else {
    var selector = href ? href.trim() : "";
    var slashIndex = selector.indexOf("#") !== -1 ? selector.indexOf("#") : !1;
    if (typeof slashIndex === "number") {
      selector = selector.slice(slashIndex + 1);
    } else {
      slashIndex = selector.indexOf("/") !== -1 ? selector.indexOf("/") : !1;
      if (typeof slashIndex === "number")
        selector = selector.slice(slashIndex + 1);
    }
    var fullSelector = '.r[data-record-type="215"] a[name="' + selector + '"]';
    return document.querySelector(fullSelector)
      ? document.querySelector(fullSelector).closest(".r")
      : null;
  }
}
function t228_highlightNavLinks(
  navLinks,
  sections,
  sectionToNavigationLinkID,
  clickedSectionID
) {
  var scrollPosition = window.pageYOffset;
  var scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  var returnValue = clickedSectionID;
  var lastSection = sections.length ? sections[sections.length - 1] : null;
  var lastSectionTopPos = lastSection
    ? lastSection.getAttribute("data-offset-top")
    : "0";
  lastSectionTopPos = parseInt(lastSectionTopPos, 10) || 0;
  if (
    sections.length &&
    clickedSectionID === null &&
    lastSectionTopPos > scrollPosition + 300
  ) {
    navLinks.forEach(function (link) {
      link.classList.remove("t-active");
    });
    return null;
  }
  for (var i = 0; i < sections.length; i++) {
    var sectionTopPos =
      sections[i].getBoundingClientRect().top + window.pageYOffset;
    var navLink = sections[i].id
      ? sectionToNavigationLinkID[sections[i].id]
      : null;
    if (
      scrollPosition + 300 >= sectionTopPos ||
      (i === 0 && scrollPosition >= scrollHeight - window.innerHeight)
    ) {
      if (
        clickedSectionID === null &&
        navLink &&
        !navLink.classList.contains("t-active")
      ) {
        navLinks.forEach(function (link) {
          link.classList.remove("t-active");
        });
        if (navLink) navLink.classList.add("t-active");
        returnValue = null;
      } else if (
        clickedSectionID !== null &&
        sections[i].id &&
        clickedSectionID === sections[i].id
      ) {
        returnValue = null;
      }
      break;
    }
  }
  return returnValue;
}
function t228_setWidth(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var menuCenterSideList = rec.querySelectorAll(".t228__centerside");
  Array.prototype.forEach.call(menuCenterSideList, function (menuCenterSide) {
    menuCenterSide.classList.remove("t228__centerside_hidden");
  });
  if (window.innerWidth <= 980) return;
  var menuBlocks = rec.querySelectorAll(".t228");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    var maxWidth;
    var centerWidth = 0;
    var paddingWidth = 40;
    var leftSide = menu.querySelector(".t228__leftside");
    var rightSide = menu.querySelector(".t228__rightside");
    var menuList = menu.querySelector(".t228__list");
    var mainContainer = menu.querySelector(".t228__maincontainer");
    var leftContainer = menu.querySelector(".t228__leftcontainer");
    var rightContainer = menu.querySelector(".t228__rightcontainer");
    var centerContainer = menu.querySelector(".t228__centercontainer");
    var centerContainerLi = centerContainer
      ? centerContainer.querySelectorAll("li")
      : [];
    var leftContainerWidth = t228_getFullWidth(leftContainer);
    var rightContainerWidth = t228_getFullWidth(rightContainer);
    var mainContainerWidth = mainContainer ? mainContainer.offsetWidth : 0;
    var dataAlign = menu.getAttribute("data-menu-items-align");
    var isDataAlignCenter = dataAlign === "center" || dataAlign === null;
    maxWidth =
      leftContainerWidth >= rightContainerWidth
        ? leftContainerWidth
        : rightContainerWidth;
    maxWidth = Math.ceil(maxWidth);
    Array.prototype.forEach.call(centerContainerLi, function (li) {
      centerWidth += t228_getFullWidth(li);
    });
    if (
      mainContainerWidth - (maxWidth * 2 + paddingWidth * 2) >
      centerWidth + 20
    ) {
      if (isDataAlignCenter) {
        if (leftSide) leftSide.style.minWidth = maxWidth + "px";
        if (rightSide) rightSide.style.minWidth = maxWidth + "px";
        if (menuList) menuList.classList.remove("t228__list_hidden");
      }
    } else {
      if (leftSide) leftSide.style.minWidth = maxWidth + "";
      if (rightSide) rightSide.style.minWidth = maxWidth + "";
    }
  });
}
function t228_getFullWidth(el) {
  if (!el) return 0;
  var marginLeft =
    el.style.marginLeft || window.getComputedStyle(el).marginLeft;
  var marginRight =
    el.style.marginRight || window.getComputedStyle(el).marginRight;
  marginLeft = parseInt(marginLeft, 10) || 0;
  marginRight = parseInt(marginRight, 10) || 0;
  return el.offsetWidth + marginLeft + marginRight;
}
function t228_getFullHeight(el) {
  if (!el) return 0;
  var marginTop = el.style.marginTop || window.getComputedStyle(el).marginTop;
  var marginBottom =
    el.style.marginBottom || window.getComputedStyle(el).marginBottom;
  marginTop = parseInt(marginTop, 10) || 0;
  marginBottom = parseInt(marginBottom, 10) || 0;
  return el.offsetHeight + marginTop + marginBottom;
}
function t228_setBg(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var menuBlocks = rec.querySelectorAll(".t228");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    if (window.innerWidth > 980) {
      if (menu.getAttribute("data-bgcolor-setbyscript") === "yes") {
        menu.style.backgroundColor = menu.getAttribute("data-bgcolor-rgba");
      }
    } else {
      menu.style.backgroundColor = menu.getAttribute("data-bgcolor-hex");
      menu.setAttribute("data-bgcolor-setbyscript", "yes");
      if (menu.style.transform) menu.style.transform = "";
      if (menu.style.opacity) menu.style.opacity = "";
    }
  });
}
function t228_appearMenu(recid) {
  if (window.innerWidth <= 980) return;
  var rec = document.getElementById("rec" + recid);
  if (!rec) return !1;
  var menuBlocks = rec.querySelectorAll(".t228");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    var appearOffset = menu.getAttribute("data-appearoffset");
    if (appearOffset) {
      if (appearOffset.indexOf("vh") !== -1) {
        appearOffset = Math.floor(
          window.innerHeight * (parseInt(appearOffset) / 100)
        );
      }
      appearOffset = parseInt(appearOffset, 10);
      var menuHeight = menu.clientHeight;
      if (
        typeof appearOffset === "number" &&
        window.pageYOffset >= appearOffset
      ) {
        if (menu.style.transform === "translateY(-" + menuHeight + "px)") {
          t228_slideUpElement(menu, menuHeight, "toBottom");
        }
      } else if (menu.style.transform === "translateY(0px)") {
        t228_slideUpElement(menu, menuHeight, "toTop");
      } else {
        menu.style.transform = "translateY(-" + menuHeight + "px)";
        menu.style.opacity = "0";
      }
    }
  });
}
function t228_changebgopacitymenu(recid) {
  if (window.innerWidth <= 980) return;
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var menuBlocks = rec.querySelectorAll(".t228");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    var bgColor = menu.getAttribute("data-bgcolor-rgba");
    var bgColorAfterScroll = menu.getAttribute("data-bgcolor-rgba-afterscroll");
    var bgOpacity = menu.getAttribute("data-bgopacity");
    var bgOpacityTwo = menu.getAttribute("data-bgopacity-two");
    var menuShadow = menu.getAttribute("data-menushadow") || "0";
    var menuShadowValue = menuShadow === "100" ? menuShadow : "0." + menuShadow;
    menu.style.backgroundColor =
      window.pageYOffset > 20 ? bgColorAfterScroll : bgColor;
    if (
      (window.pageYOffset > 20 && bgOpacityTwo === "0") ||
      (window.pageYOffset <= 20 && bgOpacity === "0.0") ||
      menuShadow === " "
    ) {
      menu.style.boxShadow = "none";
    } else {
      menu.style.boxShadow = "0px 1px 3px rgba(0,0,0," + menuShadowValue + ")";
    }
  });
}
function t228_createMobileMenu(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var menu = rec.querySelector(".t228");
  var burger = rec.querySelector(".t228__mobile");
  if (burger) {
    burger.addEventListener("click", function () {
      if (burger.classList.contains("t228_opened")) {
        t228_fadeOut(menu, 300);
        burger.classList.remove("t228_opened");
      } else {
        t228_fadeIn(menu, 300, function () {
          if (menu.style.transform) menu.style.transform = "";
          if (menu.style.opacity) menu.style.opacity = "";
        });
        burger.classList.add("t228_opened");
      }
    });
  }
  window.addEventListener(
    "resize",
    t_throttle(function () {
      if (window.innerWidth > 980) {
        if (menu.style.opacity) menu.style.opacity = "";
        if (menu.style.display === "none") menu.style.display = "";
      } else if (menu.style.transform) menu.style.transform = "";
    })
  );
}
function t228_fadeOut(element, duration, callback) {
  if (!element) return !1;
  var opacity = 1;
  duration = parseInt(duration, 10);
  var speed = duration > 0 ? duration / 10 : 40;
  var timer = setInterval(function () {
    element.style.opacity = opacity;
    opacity -= 0.1;
    if (opacity <= 0.1) {
      element.style.opacity = "0";
      element.style.display = "none";
      if (typeof callback === "function") {
        callback();
      }
      clearInterval(timer);
    }
  }, speed);
}
function t228_fadeIn(element, duration, callback) {
  if (!element) return !1;
  if (
    (getComputedStyle(element).opacity === "1" ||
      getComputedStyle(element).opacity === "") &&
    getComputedStyle(element).display !== "none"
  )
    return !1;
  var opacity = 0;
  duration = parseInt(duration, 10);
  var speed = duration > 0 ? duration / 10 : 40;
  element.style.opacity = opacity;
  element.style.display = "block";
  var timer = setInterval(function () {
    element.style.opacity = opacity;
    opacity += 0.1;
    if (opacity >= 1) {
      element.style.opacity = "1";
      if (typeof callback === "function") {
        callback();
      }
      clearInterval(timer);
    }
  }, speed);
}
function t228_slideUpElement(menu, menuHeight, position) {
  var diff = position === "toTop" ? 0 : menuHeight;
  var diffOpacity = position === "toTop" ? 1 : 0;
  var timerID = setInterval(function () {
    menu.style.transform = "translateY(-" + diff + "px)";
    menu.style.opacity = diffOpacity.toString();
    diffOpacity = position === "toTop" ? diffOpacity - 0.1 : diffOpacity + 0.1;
    diff =
      position === "toTop" ? diff + menuHeight / 20 : diff - menuHeight / 20;
    if (position === "toTop" && diff >= menuHeight) {
      menu.style.transform = "translateY(-" + menuHeight + "px)";
      menu.style.opacity = "0";
      clearInterval(timerID);
    }
    if (position === "toBottom" && diff <= 0) {
      menu.style.transform = "translateY(0px)";
      menu.style.opacity = "1";
      clearInterval(timerID);
    }
  }, 10);
}
function t270_scroll(hash, offset, speed) {
  if (hash.indexOf("#!/tproduct/") !== -1 || hash.indexOf("#!/tab/") !== -1) {
    return !0;
  }
  var root = $("html, body");
  var target = "";
  if (speed === undefined) {
    speed = 400;
  }
  try {
    target = $(hash);
  } catch (event) {
    console.log("Exception t270: " + event.message);
    return !0;
  }
  if (target.length === 0) {
    target = $('a[name="' + hash.substr(1) + '"]');
    if (target.length === 0) {
      return !0;
    }
  }
  var isHistoryChangeAllowed = window.location.hash !== hash;
  var complete = function () {
    if (!isHistoryChangeAllowed) {
      return;
    }
    if (history.pushState) {
      history.pushState(null, null, hash);
    } else {
      window.location.hash = hash;
    }
    isHistoryChangeAllowed = !1;
  };
  var dontChangeHistory = Boolean($(".t270").attr("data-history-disabled"));
  if (dontChangeHistory) {
    complete = function () {};
  }
  root.animate({ scrollTop: target.offset().top - offset }, speed, complete);
  return !0;
}
function t381_appearMenu(recId) {
  if (window.innerWidth > 980) {
    var recs = document.querySelectorAll(".t381");
    var scrollTop = window.pageYOffset;
    var body = document.body;
    var html = document.documentElement;
    var documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    for (var i = 0; i < recs.length; i++) {
      var rec = recs[i];
      var appearOffset = rec.getAttribute("data-appearoffset");
      var hideOffset = rec.getAttribute("data-hideoffset");
      if (appearOffset) {
        if (appearOffset.indexOf("vh") > -1) {
          appearOffset = Math.floor(
            window.innerHeight * (parseInt(appearOffset) / 100)
          );
        }
        appearOffset = parseInt(appearOffset, 10);
        if (scrollTop >= appearOffset) {
          if (rec.style.visibility === "hidden") {
            rec.style.visibility = "visible";
            t381__fadeIn(rec);
          }
        } else {
          rec.style.visibility = "hidden";
        }
      }
      if (hideOffset) {
        if (hideOffset.indexOf("vh") > -1) {
          hideOffset = Math.floor(
            window.innerHeight * (parseInt(hideOffset) / 100)
          );
        }
        hideOffset = parseInt(hideOffset, 10);
        if (scrollTop + window.innerHeight >= documentHeight - hideOffset) {
          if (rec.style.visibility !== "hidden") {
            rec.style.visibility = "hidden";
          }
        } else if (appearOffset) {
          if (scrollTop >= appearOffset) {
            rec.style.visibility = "visible";
          }
        } else {
          rec.style.visibility = "visible";
        }
      }
    }
  }
}
function t381__fadeIn(el) {
  if (el.style.display === "block") return;
  var opacity = 0;
  el.style.opacity = opacity;
  el.style.display = "block";
  var timer = setInterval(function () {
    el.style.opacity = opacity;
    opacity += 0.1;
    if (opacity >= 1.0) {
      clearInterval(timer);
      el.style.display = "";
    }
  }, 30);
}
function t395_init(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var allRecords = document.getElementById("allrecords");
  var tildaMode = allRecords ? allRecords.getAttribute("data-tilda-mode") : "";
  var tildaLazyMode = allRecords
    ? allRecords.getAttribute("data-tilda-lazy")
    : "";
  var tabs = rec ? rec.querySelectorAll(".t395__tab") : [];
  if (tildaMode !== "edit" && tildaMode !== "preview") {
    t395_scrollToTabs(recid);
  }
  Array.prototype.forEach.call(tabs, function (tab, i) {
    tab.addEventListener("click", function (e) {
      var targetTab = e.target.closest(".t395__tab");
      if (
        targetTab &&
        targetTab.classList.contains("t395__tab_active") &&
        !e.isTrusted
      )
        return;
      var activeTab = rec.querySelector(".t395__tab_active");
      if (activeTab) activeTab.classList.remove("t395__tab_active");
      targetTab.classList.add("t395__tab_active");
      t395_removeUrl();
      var tabNumber = i + 1;
      if (
        tildaMode !== "edit" &&
        tildaMode !== "preview" &&
        tabNumber &&
        typeof history.replaceState !== "undefined"
      ) {
        try {
          window.history.replaceState(
            "",
            "",
            window.location.href + "#!/tab/" + recid + "-" + tabNumber
          );
        } catch (err) {}
      }
      t395_alltabs_updateContent(recid);
      t395_updateSelect(recid);
      var hookBlocks = targetTab.getAttribute("data-tab-rec-ids").split(",");
      var event = document.createEvent("Event");
      event.initEvent("displayChanged", !0, !0);
      hookBlocks.forEach(function (curRecid) {
        var currentRec = document.getElementById("rec" + curRecid);
        if (!currentRec) return;
        var currentRecChildren = currentRec.querySelectorAll(
          ".t-feed, .t-store, .t-store__product-snippet, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t400, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t448, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t533, .t538, .t539, .t544, .t545, .t552, .t554, .t569, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t730, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t813, .t814, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t881, .t889, .t902, .t912, .t923, .t937, .t959, .t979, .t982, .t983, .t989, .t994"
        );
        Array.prototype.forEach.call(currentRecChildren, function (child) {
          child.dispatchEvent(event);
        });
        var displayChangedBlock = currentRec.querySelector(
          '[data-display-changed="true"]'
        );
        if (displayChangedBlock) displayChangedBlock.dispatchEvent(event);
      });
      var galaxyEffectBlocks = document.querySelectorAll(".t826");
      Array.prototype.forEach.call(
        galaxyEffectBlocks,
        function (galaxyEffectBlock) {
          galaxyEffectBlock.dispatchEvent(event);
        }
      );
      t395_startUpdateLazyLoad(targetTab);
      if (window.lazy === "y" || tildaLazyMode === "yes") {
        t_onFuncLoad("t_lazyload_update", function () {
          t_lazyload_update();
        });
      }
    });
  });
  if (tabs.length) {
    t395_alltabs_updateContent(recid);
    t395_updateContentBySelect(recid);
    var bgColor = rec ? rec.style.backgroundColor : "#ffffff";
    var bgColorTargets = rec.querySelectorAll(
      ".t395__select, .t395__firefoxfix"
    );
    Array.prototype.forEach.call(bgColorTargets, function (target) {
      target.style.background = bgColor;
    });
  }
}
function t395_alltabs_updateContent(recid) {
  var rec = document.getElementById("rec" + recid);
  var activeTabs = rec ? rec.querySelectorAll(".t395__tab_active") : null;
  var select = rec ? rec.querySelector(".t395__select") : null;
  var tabs = rec.querySelectorAll(".t395__tab");
  if (activeTabs.length !== 1) return !1;
  var activeTab = activeTabs[0];
  var hookBlocks = activeTab.getAttribute("data-tab-rec-ids").split(",");
  var noActive = [];
  Array.prototype.forEach.call(tabs, function (tab) {
    if (tab !== activeTab) {
      var noActiveHooks = tab.getAttribute("data-tab-rec-ids").split(",");
      noActiveHooks.forEach(function (hook) {
        if (noActive.indexOf(hook) === -1 && hookBlocks.indexOf(hook) === -1)
          noActive.push(hook);
      });
    }
  });
  if (t395_checkVisibillityEl(activeTab) || t395_checkVisibillityEl(select)) {
    hookBlocks.forEach(function (hook) {
      if (hook) {
        var hookEl = document.getElementById("rec" + hook);
        var hookElRecordType = hookEl
          ? hookEl.getAttribute("data-record-type")
          : "";
        if (hookEl) hookEl.classList.remove("t395__off");
        if (hookEl) hookEl.style.opacity = "";
        t395_updateTabsByHook(hookElRecordType, hookEl, hook, recid);
      }
    });
  } else {
    hookBlocks.forEach(function (hook) {
      var hookEl = document.getElementById("rec" + hook);
      if (hookEl) hookEl.setAttribute("data-animationappear", "off");
      if (hookEl) hookEl.classList.add("t395__off");
    });
  }
  noActive.forEach(function (noActiveID) {
    if (!noActiveID) return;
    var hookEl = document.getElementById("rec" + noActiveID);
    var hookElRecordType = hookEl
      ? hookEl.getAttribute("data-record-type")
      : "";
    if (hookEl) hookEl.setAttribute("data-connect-with-tab", "yes");
    if (hookEl) hookEl.setAttribute("data-animationappear", "off");
    if (hookEl) hookEl.classList.add("t395__off");
    t395_updateTabsByHook(hookElRecordType, hookEl, noActiveID, recid);
  });
  var scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  if (scrollHeight - window.innerHeight < window.pageYOffset) {
    window.scrollTo(0, 0);
  }
}
function t395_updateTabsByHook(hookElRecordType, hookEl, currentID, recid) {
  var hookElTab;
  switch (hookElRecordType) {
    case "395":
      if (
        window.t395_alltabs_updateContent &&
        window.t395_updateSelect &&
        recid !== currentID
      ) {
        window.t395_alltabs_updateContent(currentID);
        window.t395_updateSelect(currentID);
        hookElTab = hookEl ? hookEl.querySelector(".t395__tab") : null;
        if (hookElTab) hookElTab.click();
      }
      break;
    case "397":
      if (recid !== currentID) {
        t397_alltabs_updateContent(currentID);
        t397_updateSelect(currentID);
        hookElTab = hookEl ? hookEl.querySelector(".t397__tab") : null;
        if (hookElTab) hookElTab.click();
      }
      break;
  }
}
function t395_checkVisibillityEl(el) {
  return !!(
    el &&
    (el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  );
}
function t395_updateContentBySelect(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return !1;
  var select = rec.querySelector(".t395__select");
  if (select) {
    select.addEventListener("change", function () {
      var currentValue = select.value;
      var tabIndex = rec.querySelector(
        ".t395__tab[data-tab-rec-ids='" + currentValue + "']"
      );
      if (tabIndex) tabIndex.click();
    });
  }
}
function t395_updateSelect(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return !1;
  var activeTab = rec.querySelector(".t395__tab_active");
  var currentTabHooks = activeTab
    ? activeTab.getAttribute("data-tab-rec-ids")
    : "";
  var select = rec.querySelector(".t395__select");
  if (select) select.value = currentTabHooks;
}
function t395_startUpdateLazyLoad(el) {
  var hookBlocks = el ? el.getAttribute("data-tab-rec-ids").split(",") : [];
  hookBlocks.forEach(function (hook) {
    var rec = document.getElementById("rec" + hook);
    if (!rec) return;
    var videos = rec.querySelectorAll(".t-video-lazyload");
    if (videos.length) {
      t395_updateVideoLazyLoad(videos);
    }
  });
}
function t395_updateVideoLazyLoad(videos) {
  setTimeout(function () {
    Array.prototype.forEach.call(videos, function (video) {
      if (!video.classList.contains("t-video__isload")) {
        var heightAttribute = video.getAttribute("data-videolazy-height");
        var height = heightAttribute ? heightAttribute : "100%";
        if (height.indexOf("vh") !== -1) height = "100%";
        var videoID = video.getAttribute("data-videolazy-id");
        videoID = videoID ? videoID.trim() : "";
        var blockID = video.getAttribute("data-blocklazy-id");
        var twoIdAttr = video.getAttribute("data-videolazy-two-id");
        var videoTwoID = twoIdAttr ? "_" + twoIdAttr + "_" : "";
        if (video.getAttribute("data-videolazy-type") === "youtube") {
          var oldIframe = video.querySelector("iframe");
          if (oldIframe && oldIframe.parentNode)
            oldIframe.parentNode.removeChild(oldIframe);
          var iframe = document.createElement("iframe");
          iframe.id = "youtubeiframe" + videoTwoID + blockID;
          iframe.width = "100%";
          iframe.height = height;
          iframe.src =
            "https://www.youtube.com/embed/" +
            videoID +
            "?rel=0&fmt=18&html5=1&showinfo=0";
          iframe.frameBorder = "0";
          iframe.setAttribute("allowfullscreen", "");
          video.insertAdjacentElement("beforeend", iframe);
        }
      }
      video.classList.add("t-video__isload");
    });
  }, 2);
}
function t395_scrollToTabs(recid) {
  var rec = document.getElementById("rec" + recid);
  var curUrl = window.location.href;
  var tabIndexNumber = curUrl.indexOf("#!/tab/");
  if (tabIndexNumber === -1) return !1;
  var tabIndexNumberStart = curUrl.indexOf("tab/");
  var firstOptionSelect = rec
    ? rec.querySelector(".t395__wrapper_mobile .t395__select option")
    : null;
  if (firstOptionSelect) firstOptionSelect.selected = !1;
  var tabRec = curUrl.substring(
    tabIndexNumberStart + 4,
    tabIndexNumberStart + 4 + recid.length
  );
  if (tabRec !== recid) return !1;
  var tabBlock = rec ? rec.querySelector(".t395") : null;
  var tabNumber = parseInt(
    curUrl.slice(tabIndexNumberStart + 4 + recid.length + 1),
    10
  );
  var tabs = rec.querySelectorAll(".t395__tab");
  Array.prototype.forEach.call(tabs, function (tab, i) {
    if (i === tabNumber - 1) {
      tab.click();
      tab.classList.add("t395__tab_active");
    } else {
      tab.classList.remove("t395__tab_active");
    }
  });
  var tabsMob = rec.querySelectorAll(
    ".t395__wrapper_mobile .t395__select option"
  );
  var activeTabMob = tabsMob.length ? tabsMob[tabNumber - 1] : null;
  if (activeTabMob) activeTabMob.selected = !0;
  var targetOffset = tabBlock.getBoundingClientRect().top + window.pageYOffset;
  var target =
    window.innerWidth > 960 ? targetOffset - 200 : targetOffset - 100;
  if (target < 0) target = 0;
  t395_scrollToEl(target);
}
function t395_scrollToEl(elTopPos) {
  if (elTopPos === window.pageYOffset) return !1;
  var duration = 300;
  var difference = window.pageYOffset;
  var cashedDiff = window.pageYOffset;
  var step = (10 * (elTopPos || window.pageYOffset)) / duration;
  var timer = setInterval(function () {
    if (cashedDiff > elTopPos) {
      difference -= step;
    } else {
      difference += step;
    }
    window.scrollTo(0, difference);
    document.body.setAttribute("data-scrollable", "true");
    if (
      (cashedDiff > elTopPos && window.pageYOffset <= elTopPos) ||
      (cashedDiff <= elTopPos && window.pageYOffset >= elTopPos)
    ) {
      document.body.removeAttribute("data-scrollable");
      clearInterval(timer);
    }
  }, 10);
  var timer2 = setTimeout(function () {
    clearInterval(timer);
    document.body.removeAttribute("data-scrollable");
    clearTimeout(timer2);
  }, duration * 2);
}
function t395_removeUrl() {
  var curUrl = window.location.href;
  var indexToRemove = curUrl.indexOf("#!/tab/");
  if (indexToRemove === -1) {
    indexToRemove = curUrl.indexOf("%23!/tab/");
  }
  curUrl = curUrl.substring(0, indexToRemove);
  if (indexToRemove !== -1) {
    if (typeof history.replaceState != "undefined") {
      try {
        window.history.replaceState("", "", curUrl);
      } catch (err) {}
    }
  }
}
function t396_init(recid) {
  var data = "";
  var resolution = t396_detectResolution();
  var allRecords = document.getElementById("allrecords");
  var record = document.getElementById("rec" + recid);
  var zeroBlock = record ? record.querySelector(".t396") : null;
  var artBoard = record ? record.querySelector(".t396__artboard") : null;
  window.tn_window_width = document.documentElement.clientWidth;
  window.tn_scale_factor =
    Math.round((window.tn_window_width / resolution) * 100) / 100;
  t396_initTNobj();
  t396_switchResolution(resolution);
  t396_updateTNobj();
  t396_artboard_build(data, recid);
  var isTouchDevice = "ontouchend" in document;
  window.addEventListener("resize", function () {
    tn_console(">>>> t396: Window on Resize event >>>>");
    t396_waitForFinalEvent(
      function () {
        if (window.isMobile || isTouchDevice) {
          if (document.documentElement.clientWidth !== window.tn_window_width) {
            t396_doResize(recid);
          }
        } else {
          t396_doResize(recid);
        }
      },
      500,
      "resizeruniqueid" + recid
    );
  });
  window.addEventListener("orientationchange", function () {
    tn_console(">>>> t396: Orient change event >>>>");
    t396_waitForFinalEvent(
      function () {
        t396_doResize(recid);
      },
      600,
      "orientationuniqueid" + recid
    );
  });
  window.addEventListener("load", function () {
    t396_allelems__renderView(artBoard);
    var blockOverflow = artBoard
      ? window.getComputedStyle(artBoard).getPropertyValue("overflow")
      : "";
    if (
      typeof t_lazyload_update === "function" &&
      blockOverflow === "auto" &&
      artBoard
    ) {
      artBoard.addEventListener(
        "scroll",
        t_throttle(function () {
          var dataLazy = allRecords
            ? allRecords.getAttribute("data-tilda-lazy")
            : null;
          if (window.lazy === "y" || dataLazy === "yes") {
            t_onFuncLoad("t_lazyload_update", function () {
              t_lazyload_update();
            });
          }
        }, 500)
      );
    }
    if (window.location.hash !== "" && blockOverflow === "visible") {
      if (artBoard) artBoard.style.overflow = "hidden";
      setTimeout(function () {
        if (artBoard) artBoard.style.overflow = "visible";
      }, 1);
    }
  });
  if (document.querySelector(".t830")) {
    window.addEventListener("load", function () {
      if (
        allRecords.classList.contains("t830__allrecords_padd") ||
        allRecords.classList.contains("t830__allrecords_padd-small")
      ) {
        t396_doResize(recid);
      }
    });
  }
  if (
    record &&
    zeroBlock &&
    artBoard &&
    record.getAttribute("data-connect-with-tab") === "yes"
  ) {
    zeroBlock.addEventListener("displayChanged", function () {
      t396_allelems__renderView(artBoard);
      t396_doResize(recid);
    });
    $(zeroBlock).bind("displayChanged", function () {
      t396_allelems__renderView(artBoard);
      t396_doResize(recid);
    });
  }
  setTimeout(function () {
    if (record && record.closest("#allrecordstable") && zeroBlock && artBoard) {
      zeroBlock.addEventListener("displayChanged", function () {
        t396_allelems__renderView(artBoard);
        t396_doResize(recid);
      });
      $(zeroBlock).bind("displayChanged", function () {
        t396_allelems__renderView(artBoard);
        t396_doResize(recid);
      });
    }
  }, 1000);
  if (window.isSafari && zeroBlock) {
    zeroBlock.classList.add("t396_safari");
  }
  var isScaled = t396_ab__getFieldValue(artBoard, "upscale") === "window";
  var isTildaModeEdit = allRecords
    ? allRecords.getAttribute("data-tilda-mode") === "edit"
    : null;
  if (isScaled && !isTildaModeEdit) t396_scaleBlock(recid);
}
function t396_isOnlyScalableBrowser() {
  var isFirefox = navigator.userAgent.search("Firefox") !== -1;
  var isOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") !== -1;
  return isFirefox || isOpera;
}
function t396_scaleBlock(recid) {
  var isOnlyScalable = t396_isOnlyScalableBrowser();
  var resolution = t396_detectResolution();
  var record = document.getElementById("rec" + recid);
  var elements = record ? record.querySelectorAll(".t396__elem") : [];
  var artBoard = record ? record.querySelector(".t396__artboard") : null;
  if (artBoard) {
    var artBoardWidth = artBoard.clientWidth;
    var updatedBlockHeight = Math.floor(
      artBoard.clientHeight * window.tn_scale_factor
    );
    var artBoardHeightVH = t396_ab__getFieldValue(artBoard, "height_vh");
    window.tn_scale_offset =
      (artBoardWidth * window.tn_scale_factor - artBoardWidth) / 2;
    if (artBoardHeightVH) {
      var artBoardMinHeight = t396_ab__getFieldValue(artBoard, "height");
      var artBoardMaxHeight = t396_ab__getHeight(artBoard);
      var scaledMinHeight = artBoardMinHeight * window.tn_scale_factor;
      updatedBlockHeight =
        scaledMinHeight >= artBoardMaxHeight
          ? scaledMinHeight
          : artBoardMaxHeight;
    }
    artBoard.classList.add("t396__artboard_scale");
    var styleStr =
      '<style class="t396__scale-style">' +
      ".t-rec#rec" +
      recid +
      " { overflow: visible; }" +
      "#rec" +
      recid +
      " .t396__carrier," +
      "#rec" +
      recid +
      " .t396__filter," +
      "#rec" +
      recid +
      " .t396__artboard {" +
      "height: " +
      updatedBlockHeight +
      "px !important;" +
      "width: 100vw !important;" +
      "max-width: 100%;" +
      "}" +
      "</style>";
    artBoard.insertAdjacentHTML("beforeend", styleStr);
  }
  Array.prototype.forEach.call(elements, function (elem) {
    var atom = elem.querySelector(".tn-atom");
    var containerProp = t396_elem__getFieldValue(elem, "container");
    if (containerProp === "grid") {
      if (isOnlyScalable) {
        if (atom) {
          var atomParent = atom.parentNode;
          var div = document.createElement("div");
          div.classList.add("tn-atom__scale-wrapper");
          div.style.transform = "scale(" + window.tn_scale_factor + ")";
          if (atomParent) atomParent.removeChild(atom);
          div.appendChild(atom);
          if (atomParent) atomParent.appendChild(div);
        }
      } else {
        elem.style.zoom = window.tn_scale_factor;
        if (elem.getAttribute("data-elem-type") === "shape") {
          var elemHeight = t396_elem__getFieldValue(elem, "height");
          elemHeight = t396_elem__getHeight(elem, elemHeight);
          elemHeight = parseFloat(elemHeight).toFixed(1);
          var elemWidth = t396_elem__getFieldValue(elem, "width");
          elemWidth = t396_elem__getWidth(elem, elemWidth);
          elemWidth = parseFloat(elemWidth).toFixed(1);
          var elemStyles = window.getComputedStyle(atom);
          var elemColor = elemStyles.backgroundColor;
          var elemBorder = elemStyles.borderWidth;
          var div = elem.querySelector("div");
          var isImage = !1;
          if (div && getComputedStyle(div, null).backgroundImage !== "none") {
            isImage = !0;
          }
          if (
            (elemHeight <= 2 || elemWidth <= 2) &&
            elemBorder === "0px" &&
            !isImage
          ) {
            elem.innerHTML =
              '<svg class="tn-atom" xmlns="http://www.w3.org/2000/svg" width="' +
              elemWidth +
              '" height="' +
              elemHeight +
              '" viewBox="0 0 ' +
              elemWidth +
              " " +
              elemHeight +
              '" fill="none">' +
              '<rect width="' +
              elemWidth +
              '" height="' +
              elemHeight +
              '" fill="' +
              elemColor +
              '"/>' +
              "</svg>";
            var svg = elem.querySelector("svg");
            var svgStyles = window.getComputedStyle(svg);
            svg.style.backgroundColor = "unset";
            svg.style.display = "block";
            if (elemHeight <= 2) {
              var svgHeight =
                parseInt(svgStyles.height, 10) +
                parseInt(svgStyles.borderBlockWidth, 10);
              elem.style.marginLeft =
                "-" + svgHeight / window.tn_scale_factor + "px";
              elem.style.marginTop =
                "-" + svgHeight / window.tn_scale_factor + "px";
            }
            if (elemWidth <= 2) {
              var svgWidth =
                parseInt(svgStyles.width, 10) +
                parseInt(svgStyles.borderBlockWidth, 10);
              elem.style.marginLeft =
                "-" + Math.floor(svgWidth / window.tn_scale_factor) + "px";
              elem.style.marginTop = "-" + window.tn_scale_factor + "px";
            }
          }
        }
        if (
          elem.getAttribute("data-elem-type") === "text" &&
          resolution < 1200 &&
          atom
        ) {
          atom.style.webkitTextSizeAdjust = "auto";
        }
        if (atom) atom.style.transformOrigin = "center";
      }
    }
  });
}
function t396_doResize(recid) {
  var isOnlyScalable = t396_isOnlyScalableBrowser();
  var record = document.getElementById("rec" + recid);
  var allRecords = document.getElementById("allrecords");
  var resolution = t396_detectResolution();
  var scaleStyle = record ? record.querySelector(".t396__scale-style") : null;
  t396_removeElementFromDOM(scaleStyle);
  if (!isOnlyScalable) {
    var elements = record ? record.querySelectorAll(".t396__elem") : [];
    Array.prototype.forEach.call(elements, function (element) {
      element.style.zoom = "";
      var atom = element.querySelector(".tn-atom");
      if (atom) atom.style.transformOrigin = "";
    });
  } else {
    var atoms = record ? record.querySelectorAll(".tn-atom") : [];
    Array.prototype.forEach.call(atoms, function (atom) {
      var atomWrapper = atom.closest(".tn-atom__scale-wrapper");
      var atomParent = atomWrapper ? atomWrapper.parentNode : null;
      if (atomParent) atomParent.removeChild(atomWrapper);
      if (atomParent) atomParent.appendChild(atom);
    });
  }
  var artBoard = record ? record.querySelector(".t396__artboard") : null;
  var artBoardWidth = artBoard ? artBoard.clientWidth : 0;
  window.tn_window_width = window.isMobile
    ? document.documentElement.clientWidth
    : window.innerWidth;
  window.tn_scale_factor =
    Math.round((window.tn_window_width / resolution) * 100) / 100;
  window.tn_scale_offset =
    (artBoardWidth * window.tn_scale_factor - artBoardWidth) / 2;
  t396_switchResolution(resolution);
  t396_updateTNobj();
  t396_ab__renderView(artBoard);
  t396_allelems__renderView(artBoard);
  var tildaMode = allRecords ? allRecords.getAttribute("data-tilda-mode") : "";
  var isScaled = t396_ab__getFieldValue(artBoard, "upscale") === "window";
  if (isScaled && tildaMode !== "edit") t396_scaleBlock(recid);
}
function t396_detectResolution() {
  var windowWidth = window.isMobile
    ? document.documentElement.clientWidth
    : window.innerWidth;
  var resolution = 1200;
  var breakpoints = [1200, 960, 640, 480, 320];
  for (var i = 0; i < breakpoints.length - 1; i++) {
    if (windowWidth < breakpoints[i]) {
      resolution = breakpoints[i + 1];
    }
  }
  return resolution;
}
function t396_initTNobj() {
  tn_console("func: initTNobj");
  window.tn = {};
  window.tn.canvas_min_sizes = ["320", "480", "640", "960", "1200"];
  window.tn.canvas_max_sizes = ["480", "640", "960", "1200", ""];
  window.tn.ab_fields = [
    "height",
    "width",
    "bgcolor",
    "bgimg",
    "bgattachment",
    "bgposition",
    "filteropacity",
    "filtercolor",
    "filteropacity2",
    "filtercolor2",
    "height_vh",
    "valign",
  ];
}
function t396_updateTNobj() {
  tn_console("func: updateTNobj");
  var allRecords = document.getElementById("allrecords");
  var allRecPaddingLeft = allRecords
    ? window.getComputedStyle(allRecords).paddingLeft || "0"
    : "0";
  allRecPaddingLeft = parseInt(allRecPaddingLeft, 10);
  var allRecPaddingRight = allRecords
    ? window.getComputedStyle(allRecords).paddingRight || "0"
    : "0";
  allRecPaddingRight = parseInt(allRecPaddingRight, 10);
  if (
    window.zero_window_width_hook &&
    window.zero_window_width_hook === "allrecords" &&
    allRecords
  ) {
    window.tn.window_width =
      allRecords.clientWidth - (allRecPaddingLeft + allRecPaddingRight);
  } else {
    window.tn.window_width = document.documentElement.clientWidth;
  }
  window.tn.window_height = document.documentElement.clientHeight;
  window.tn.curResolution;
  var breakpoints = [1200, 960, 640, 480, 320];
  for (var i = 0; i < breakpoints.length; i++) {
    if (+window.tn.curResolution === breakpoints[i]) {
      window.tn.canvas_min_width = breakpoints[i];
      window.tn.canvas_max_width =
        i === 0 ? window.tn.window_width : breakpoints[i - 1];
    }
  }
  window.tn.grid_width = window.tn.canvas_min_width;
  window.tn.grid_offset_left =
    (window.tn.window_width - window.tn.grid_width) / 2;
}
var t396_waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
function t396_switchResolution(resolution, resolutionMax) {
  tn_console("func: switchResolution");
  if (typeof resolutionMax === "undefined") {
    var breakpoints = [1200, 960, 640, 480, 320];
    breakpoints.forEach(function (breakpoint, i) {
      if (+resolution === breakpoint) {
        resolutionMax = i === 0 ? "" : breakpoints[i - 1];
      }
    });
  }
  window.tn.curResolution = resolution;
  window.tn.curResolution_max = resolutionMax;
}
function t396_artboard_build(data, recid) {
  tn_console("func: t396_artboard_build. Recid:" + recid);
  tn_console(data);
  var record = document.getElementById("rec" + recid);
  var allRecords = document.getElementById("allrecords");
  var artBoard = record ? record.querySelector(".t396__artboard") : null;
  if (!artBoard) return !1;
  t396_ab__renderView(artBoard);
  var elements = artBoard.querySelectorAll(".tn-elem");
  Array.prototype.forEach.call(elements, function (element) {
    var dataType = element.getAttribute("data-elem-type");
    switch (dataType) {
      case "text":
        t396_addText(artBoard, element);
        break;
      case "image":
        t396_addImage(artBoard, element);
        break;
      case "shape":
        t396_addShape(artBoard, element);
        break;
      case "button":
        t396_addButton(artBoard, element);
        break;
      case "video":
        t396_addVideo(artBoard, element);
        break;
      case "html":
        t396_addHtml(artBoard, element);
        break;
      case "tooltip":
        t396_addTooltip(artBoard, element);
        break;
      case "form":
        t396_addForm(artBoard, element);
        break;
      case "gallery":
        t396_addGallery(artBoard, element);
        break;
    }
  });
  artBoard.classList.remove("rendering");
  artBoard.classList.add("rendered");
  var artBoardOverflow = artBoard.getAttribute("data-artboard-ovrflw");
  if (
    (artBoardOverflow === "visible" || artBoardOverflow === "visibleX") &&
    allRecords
  ) {
    allRecords.style.overflow = "hidden";
  }
  if (artBoardOverflow === "auto") {
    var diff = Math.abs(artBoard.offsetHeight - artBoard.clientHeight);
    if (diff !== 0) {
      artBoard.style.paddingBottom = diff + "px";
    }
  }
  if (window.isMobile) {
    var style = document.createElement("style");
    style.textContent =
      "@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}";
    record.insertAdjacentElement("beforeend", style);
  }
}
function t396_ab__renderView(artBoard) {
  if (!artBoard) return !1;
  var fields = window.tn.ab_fields;
  var allRecords = document.getElementById("allrecords");
  var artBoardHeightVH;
  for (var i = 0; i < fields.length; i++) {
    t396_ab__renderViewOneField(artBoard, fields[i]);
  }
  var artBoardMinHeight = t396_ab__getFieldValue(artBoard, "height");
  var artBoardMaxHeight = t396_ab__getHeight(artBoard);
  var isTildaModeEdit = allRecords
    ? allRecords.getAttribute("data-tilda-mode") === "edit"
    : !1;
  var isScaled = t396_ab__getFieldValue(artBoard, "upscale") === "window";
  artBoardHeightVH = t396_ab__getFieldValue(artBoard, "height_vh");
  if (isScaled && !isTildaModeEdit && artBoardHeightVH) {
    var scaledMinHeight =
      parseInt(artBoardMinHeight, 10) * window.tn_scale_factor;
  }
  var offsetTop;
  if (
    artBoardMinHeight === artBoardMaxHeight ||
    (scaledMinHeight && scaledMinHeight >= artBoardMaxHeight)
  ) {
    offsetTop = 0;
  } else {
    var artBoardVerticalAlign = t396_ab__getFieldValue(artBoard, "valign");
    switch (artBoardVerticalAlign) {
      case "top":
        offsetTop = 0;
        break;
      case "center":
        if (scaledMinHeight) {
          offsetTop = parseFloat(
            ((artBoardMaxHeight - scaledMinHeight) / 2).toFixed(1)
          );
        } else {
          offsetTop = parseFloat(
            ((artBoardMaxHeight - artBoardMinHeight) / 2).toFixed(1)
          );
        }
        break;
      case "bottom":
        if (scaledMinHeight) {
          offsetTop = parseFloat(
            (artBoardMaxHeight - scaledMinHeight).toFixed(1)
          );
        } else {
          offsetTop = parseFloat(
            (artBoardMaxHeight - artBoardMinHeight).toFixed(1)
          );
        }
        break;
      case "stretch":
        offsetTop = 0;
        artBoardMinHeight = artBoardMaxHeight;
        break;
      default:
        offsetTop = 0;
        break;
    }
  }
  artBoard.setAttribute("data-artboard-proxy-min-offset-top", offsetTop);
  artBoard.setAttribute("data-artboard-proxy-min-height", artBoardMinHeight);
  artBoard.setAttribute("data-artboard-proxy-max-height", artBoardMaxHeight);
  var filter = artBoard.querySelector(".t396__filter");
  var carrier = artBoard.querySelector(".t396__carrier");
  artBoardHeightVH = t396_ab__getFieldValue(artBoard, "height_vh");
  artBoardHeightVH = parseFloat(artBoardHeightVH);
  if (window.isMobile && artBoardHeightVH) {
    var height =
      (document.documentElement.clientHeight * artBoardHeightVH) / 100;
    artBoard.style.height = height + "px";
    if (filter) filter.style.height = height + "px";
    if (carrier) carrier.style.height = height + "px";
  }
}
function t396_addText(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addText");
  var fieldsString =
    "top,left,width,container,axisx,axisy,widthunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
}
function t396_addImage(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addImage");
  var fieldsString =
    "img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
  var images = element.querySelectorAll("img");
  Array.prototype.forEach.call(images, function (img) {
    img.addEventListener("load", function () {
      t396_elem__renderViewOneField(element, "top");
      if (img.src) {
        setTimeout(function () {
          t396_elem__renderViewOneField(element, "top");
        }, 2000);
      }
    });
    if (img.complete) {
      t396_elem__renderViewOneField(element, "top");
      if (img.src) {
        setTimeout(function () {
          t396_elem__renderViewOneField(element, "top");
        }, 2000);
      }
    }
    img.addEventListener("tuwidget_done", function () {
      t396_elem__renderViewOneField(element, "top");
    });
  });
}
function t396_addShape(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addShape");
  var fieldsString = "width,height,top,left,";
  fieldsString +=
    "container,axisx,axisy,widthunits,heightunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
}
function t396_addButton(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addButton");
  var fieldsString =
    "top,left,width,height,container,axisx,axisy,caption,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
  return element;
}
function t396_addVideo(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addVideo");
  var fieldsString = "width,height,top,left,";
  fieldsString +=
    "container,axisx,axisy,widthunits,heightunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
  var videoEl = element.querySelector(".tn-atom__videoiframe");
  var atom = element.querySelector(".tn-atom");
  if (atom) atom.style.backgroundColor = "#000";
  var videoCover = atom ? atom.getAttribute("data-atom-video-has-cover") : "";
  if (!videoCover) videoCover = "";
  if (videoCover === "y" && atom) {
    atom.addEventListener("click", function () {
      var iframe = videoEl ? videoEl.querySelector("iframe") : null;
      var dataOriginal = iframe ? iframe.getAttribute("data-original") : "";
      if (iframe) iframe.setAttribute("src", dataOriginal);
      atom.style.backgroundImage = "none";
      var playBtn = atom.querySelector(".tn-atom__video-play-link");
      if (playBtn) playBtn.style.display = "none";
    });
  }
  var allRecords = document.getElementById("allrecords");
  var autoplay = t396_elem__getFieldValue(element, "autoplay");
  var showinfo = t396_elem__getFieldValue(element, "showinfo");
  var loop = t396_elem__getFieldValue(element, "loop");
  var mute = t396_elem__getFieldValue(element, "mute");
  var startSec = t396_elem__getFieldValue(element, "startsec");
  var endSec = t396_elem__getFieldValue(element, "endsec");
  var tildaMode = allRecords ? allRecords.getAttribute("data-tilda-mode") : "";
  var url = "";
  var script = document.createElement("script");
  script.textContent =
    'lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});';
  var youtubeID = videoEl ? videoEl.getAttribute("data-youtubeid") : "";
  if (youtubeID) {
    url = "//youtube.com/embed/";
    url += youtubeID + "?rel=0&fmt=18&html5=1";
    url += "&showinfo=" + (showinfo === "y" ? "1" : "0");
    if (loop === "y") {
      url += "&loop=1&playlist=" + youtubeID;
    }
    if (startSec > 0) {
      url += "&start=" + startSec;
    }
    if (endSec > 0) {
      url += "&end=" + endSec;
    }
    if (mute === "y") {
      url += "&mute=1";
    }
    if (videoCover === "y") {
      url += "&autoplay=1";
      var instFlag = "y";
      var iframeClass = "";
      if (autoplay === "y" && mute === "y" && window.lazy === "y") {
        instFlag = "lazy";
        iframeClass = ' class="t-iframe"';
      }
      videoEl.innerHTML =
        '<iframe id="youtubeiframe"' +
        iframeClass +
        ' width="100%" height="100%" data-original="' +
        url +
        '" frameborder="0" allowfullscreen data-flag-inst="' +
        instFlag +
        '"></iframe>';
      if (autoplay === "y" && mute === "y" && window.lazy === "y") {
        element.insertAdjacentElement("beforeend", script);
      }
      if (autoplay === "y" && mute === "y") {
        atom.click();
      }
    } else {
      if (tildaMode !== "edit" && autoplay === "y") {
        url += "&autoplay=1";
      }
      if (window.lazy === "y") {
        videoEl.innerHTML =
          '<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="' +
          url +
          '" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>';
        element.insertAdjacentElement("beforeend", script);
      } else {
        videoEl.innerHTML =
          '<iframe id="youtubeiframe" width="100%" height="100%" src="' +
          url +
          '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>';
      }
    }
  }
  var vimeoID = videoEl ? videoEl.getAttribute("data-vimeoid") : "";
  if (vimeoID) {
    url = "//player.vimeo.com/video/";
    url += vimeoID + "?color=ffffff&badge=0";
    if (showinfo === "y") {
      url += "&title=1&byline=1&portrait=1";
    } else {
      url += "&title=0&byline=0&portrait=0";
    }
    if (loop === "y") {
      url += "&loop=1";
    }
    if (mute === "y") {
      url += "&muted=1";
    }
    if (videoCover === "y") {
      url += "&autoplay=1";
      videoEl.innerHTML =
        '<iframe data-original="' +
        url +
        '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    } else {
      if (tildaMode !== "edit" && autoplay === "y") {
        url += "&autoplay=1";
      }
      if (window.lazy === "y") {
        videoEl.innerHTML =
          '<iframe class="t-iframe" data-original="' +
          url +
          '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        element.insertAdjacentElement("beforeend", script);
      } else {
        videoEl.innerHTML =
          '<iframe src="' +
          url +
          '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      }
    }
  }
}
function t396_addHtml(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addHtml");
  var fieldsString = "width,height,top,left,";
  fieldsString +=
    "container,axisx,axisy,widthunits,heightunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
}
function t396_addTooltip(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addTooltip");
  var fieldsString = "width,height,top,left,";
  fieldsString +=
    "container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
  var tooltip = element.querySelector(".tn-atom__pin");
  var tooltipContent = element.querySelector(".tn-atom__tip");
  var tooltipOpenTrigger = element.getAttribute("data-field-tipopen-value");
  if (window.isMobile || tooltipOpenTrigger === "click") {
    t396_setUpTooltip_mobile(element, tooltip, tooltipContent);
  } else {
    t396_setUpTooltip_desktop(element, tooltip, tooltipContent);
  }
  setTimeout(function () {
    var atomImages = document.querySelectorAll(".tn-atom__tip-img");
    Array.prototype.forEach.call(atomImages, function (img) {
      var imgOriginal = img.getAttribute("data-tipimg-original");
      if (imgOriginal) img.src = imgOriginal;
    });
  }, 3000);
}
function t396_addForm(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addForm");
  var fieldsString = "width,top,left,";
  fieldsString += "inputs,container,axisx,axisy,widthunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
}
function t396_addGallery(artBoard, element) {
  element = t396_getEl(element);
  if (!element) return;
  tn_console("func: addForm");
  var fieldsString = "width,height,top,left,";
  fieldsString +=
    "imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits";
  element.setAttribute("data-fields", fieldsString);
  t396_elem__renderView(element);
}
function t396_elem__setFieldValue(
  element,
  prop,
  val,
  flag_render,
  flag_updateui,
  resolution
) {
  element = t396_getEl(element);
  if (!element) return;
  if (!resolution) resolution = window.tn.curResolution;
  if (+resolution < 1200 && prop !== "zindex") {
    element.setAttribute(
      "data-field-" + prop + "-res-" + resolution + "-value",
      val
    );
  } else {
    element.setAttribute("data-field-" + prop + "-value", val);
  }
  if (flag_render === "render") elem__renderViewOneField(element, prop);
  if (flag_updateui === "updateui") panelSettings__updateUi(element, prop, val);
}
function t396_elem__getFieldValue(element, prop) {
  element = t396_getEl(element);
  if (!element) return;
  var resolution = window.tn.curResolution;
  var breakpoints = [1200, 960, 640, 480, 320];
  var dataField;
  breakpoints.forEach(function (breakpoint, i) {
    if (i === 0 && +resolution >= breakpoint) {
      dataField = element.getAttribute("data-field-" + prop + "-value");
    }
    if (i > 0 && +resolution === breakpoint) {
      dataField = element.getAttribute(
        "data-field-" + prop + "-res-" + breakpoint + "-value"
      );
      if (i > 1 && !dataField) {
        var slicedBreakpoints = breakpoints.slice(1, i);
        for (var n = slicedBreakpoints.length - 1; n >= 0; n--) {
          dataField = element.getAttribute(
            "data-field-" + prop + "-res-" + slicedBreakpoints[n] + "-value"
          );
          if (dataField) break;
        }
      }
      if (!dataField)
        dataField = element.getAttribute("data-field-" + prop + "-value");
    }
  });
  return dataField ? dataField : "";
}
function t396_elem__renderView(element) {
  element = t396_getEl(element);
  tn_console("func: elem__renderView");
  var fields = element ? element.getAttribute("data-fields") : "";
  if (!fields) return !1;
  fields = fields.split(",");
  fields.forEach(function (field) {
    t396_elem__renderViewOneField(element, field);
  });
}
function t396_elem__renderViewOneField(element, field) {
  element = t396_getEl(element);
  if (!element) return;
  var value = t396_elem__getFieldValue(element, field);
  var elementType;
  var borderWidth;
  var borderStyle;
  var currentValue;
  var slidesMain;
  var slidesImg;
  switch (field) {
    case "left":
      value = t396_elem__convertPosition__Local__toAbsolute(
        element,
        field,
        value
      );
      element.style.left = parseFloat(value).toFixed(1) + "px";
      break;
    case "top":
      value = t396_elem__convertPosition__Local__toAbsolute(
        element,
        field,
        value
      );
      element.style.top = parseFloat(value).toFixed(1) + "px";
      break;
    case "width":
      value = t396_elem__getWidth(element, value);
      element.style.width = parseFloat(value).toFixed(1) + "px";
      elementType = element.getAttribute("data-elem-type");
      switch (elementType) {
        case "tooltip":
          var pinSvgIcon = element.querySelectorAll(".tn-atom__pin-icon");
          Array.prototype.forEach.call(pinSvgIcon, function (pin) {
            var pinSize = parseFloat(value).toFixed(1) + "px";
            pin.style.width = pinSize;
            pin.style.height = pinSize;
          });
          element.style.height = parseInt(value).toFixed(1) + "px";
          break;
        case "gallery":
          borderWidth = t396_elem__getFieldValue(element, "borderwidth");
          borderStyle = t396_elem__getFieldValue(element, "borderstyle");
          if (!borderStyle || !borderWidth || borderStyle === "none") {
            borderWidth = 0;
          }
          value -= borderWidth * 2;
          currentValue = parseFloat(value).toFixed(1) + "px";
          slidesMain = element.querySelector(".t-slds__main");
          slidesImg = element.querySelectorAll(".tn-atom__slds-img");
          element.style.width = currentValue;
          if (slidesMain) slidesMain.style.width = currentValue;
          Array.prototype.forEach.call(slidesImg, function (img) {
            img.style.width = currentValue;
          });
          break;
      }
      break;
    case "height":
      elementType = element.getAttribute("data-elem-type");
      if (elementType === "tooltip") return;
      value = t396_elem__getHeight(element, value);
      element.style.height = parseFloat(value).toFixed(1) + "px";
      if (elementType === "gallery") {
        borderWidth = t396_elem__getFieldValue(element, "borderwidth");
        borderStyle = t396_elem__getFieldValue(element, "borderstyle");
        if (!borderStyle || !borderWidth || borderStyle === "none") {
          borderWidth = 0;
        }
        value -= borderWidth * 2;
        currentValue = parseFloat(value).toFixed(1) + "px";
        slidesMain = element.querySelector(".t-slds__main");
        slidesImg = element.querySelectorAll(".tn-atom__slds-img");
        element.style.height = currentValue;
        if (slidesMain) slidesMain.style.height = currentValue;
        Array.prototype.forEach.call(slidesImg, function (img) {
          img.style.height = currentValue;
        });
      }
      break;
    case "container":
      t396_elem__renderViewOneField(element, "left");
      t396_elem__renderViewOneField(element, "top");
      break;
    case "inputs":
      var textArea = element.querySelector(".tn-atom__inputs-textarea");
      value = textArea ? textArea.value : "";
      try {
        t_zeroForms__renderForm($(element), value);
      } catch (err) {}
      break;
  }
  if (
    field === "width" ||
    field === "height" ||
    field === "fontsize" ||
    field === "fontfamily" ||
    field === "letterspacing" ||
    field === "fontweight" ||
    field === "img"
  ) {
    t396_elem__renderViewOneField(element, "left");
    t396_elem__renderViewOneField(element, "top");
  }
}
function t396_elem__convertPosition__Local__toAbsolute(element, field, value) {
  element = t396_getEl(element);
  if (!element) return;
  var artBoard = element.closest(".t396__artboard");
  var verticalAlignValue = t396_ab__getFieldValue(artBoard, "valign");
  var isScaled = t396_ab__getFieldValue(artBoard, "upscale") === "window";
  var allRecords = document.getElementById("allrecords");
  var tildaMode = allRecords ? allRecords.getAttribute("data-tilda-mode") : "";
  var isTildaModeEdit = tildaMode === "edit";
  var isOnlyScalable = t396_isOnlyScalableBrowser();
  var isScaledElement = !isTildaModeEdit && isScaled && isOnlyScalable;
  var isZoomedElement = !isTildaModeEdit && isScaled && !isOnlyScalable;
  var valueAxisY = t396_elem__getFieldValue(element, "axisy");
  var valueAxisX = t396_elem__getFieldValue(element, "axisx");
  var container = t396_elem__getFieldValue(element, "container");
  value = parseInt(value);
  var elementContainer;
  var offsetLeft;
  var offsetTop;
  var elementWidth;
  var elementContainerWidth;
  var elementHeight;
  var elementContainerHeight;
  switch (field) {
    case "left":
      elementContainer = container === "grid" ? "grid" : "window";
      offsetLeft = container === "grid" ? window.tn.grid_offset_left : 0;
      elementContainerWidth =
        container === "grid" ? window.tn.grid_width : window.tn.window_width;
      var elementLeftUnits = t396_elem__getFieldValue(element, "leftunits");
      if (elementLeftUnits === "%") {
        value = t396_roundFloat((elementContainerWidth * value) / 100);
      }
      if (!isTildaModeEdit && isScaled) {
        if (container === "grid" && isOnlyScalable)
          value = value * window.tn_scale_factor;
      } else {
        value = offsetLeft + value;
      }
      if (valueAxisX === "center") {
        elementWidth = t396_elem__getWidth(element);
        if (isScaledElement && elementContainer !== "window") {
          elementContainerWidth *= window.tn_scale_factor;
          elementWidth *= window.tn_scale_factor;
        }
        value = elementContainerWidth / 2 - elementWidth / 2 + value;
      }
      if (valueAxisX === "right") {
        elementWidth = t396_elem__getWidth(element);
        if (isScaledElement && elementContainer !== "window") {
          elementContainerWidth *= window.tn_scale_factor;
          elementWidth *= window.tn_scale_factor;
        }
        value = elementContainerWidth - elementWidth + value;
      }
      if (isScaledElement && elementContainer !== "window") {
        elementWidth = t396_elem__getWidth(element);
        value =
          value + (elementWidth * window.tn_scale_factor - elementWidth) / 2;
      }
      break;
    case "top":
      var artBoardParent = element.parentNode;
      var proxyMinOffsetTop = artBoardParent
        ? artBoardParent.getAttribute("data-artboard-proxy-min-offset-top")
        : "0";
      var proxyMinHeight = artBoardParent
        ? artBoardParent.getAttribute("data-artboard-proxy-min-height")
        : "0";
      var proxyMaxHeight = artBoardParent
        ? artBoardParent.getAttribute("data-artboard-proxy-max-height")
        : "0";
      var getElementHeight = function (element) {
        var height = t396_elem__getHeight(element);
        if (element && element.getAttribute("data-elem-type") === "image") {
          var width = t396_elem__getWidth(element);
          var fileWidth = t396_elem__getFieldValue(element, "filewidth");
          var fileHeight = t396_elem__getFieldValue(element, "fileheight");
          if (fileWidth && fileHeight) {
            var ratio = parseInt(fileWidth) / parseInt(fileHeight);
            height = width / ratio;
          }
        }
        return height;
      };
      elementContainer = container === "grid" ? "grid" : "window";
      offsetTop = container === "grid" ? parseFloat(proxyMinOffsetTop) : 0;
      elementContainerHeight =
        container === "grid"
          ? parseFloat(proxyMinHeight)
          : parseFloat(proxyMaxHeight);
      var elTopUnits = t396_elem__getFieldValue(element, "topunits");
      if (elTopUnits === "%") {
        value = elementContainerHeight * (value / 100);
      }
      if (isScaledElement && elementContainer !== "window") {
        value *= window.tn_scale_factor;
      }
      if (isZoomedElement && elementContainer !== "window") {
        offsetTop =
          verticalAlignValue === "stretch"
            ? 0
            : offsetTop / window.tn_scale_factor;
      }
      value = offsetTop + value;
      var artBoardHeightVH = t396_ab__getFieldValue(
        artBoardParent,
        "height_vh"
      );
      var artBoardMinHeight = t396_ab__getFieldValue(artBoardParent, "height");
      var artBoardMaxHeight = t396_ab__getHeight(artBoardParent);
      if (isScaled && !isTildaModeEdit && artBoardHeightVH) {
        var scaledMinHeight =
          parseInt(artBoardMinHeight, 10) * window.tn_scale_factor;
      }
      if (valueAxisY === "center") {
        elementHeight = getElementHeight(element);
        if (isScaledElement && elementContainer !== "window") {
          if (verticalAlignValue !== "stretch") {
            elementContainerHeight =
              elementContainerHeight * window.tn_scale_factor;
          } else {
            if (scaledMinHeight) {
              elementContainerHeight =
                scaledMinHeight > artBoardMaxHeight
                  ? scaledMinHeight
                  : artBoardMaxHeight;
            } else {
              elementContainerHeight = artBoardParent.clientHeight;
            }
          }
          elementHeight *= window.tn_scale_factor;
        }
        if (
          !isTildaModeEdit &&
          isScaled &&
          !isOnlyScalable &&
          elementContainer !== "window" &&
          verticalAlignValue === "stretch"
        ) {
          if (scaledMinHeight) {
            elementContainerHeight =
              scaledMinHeight > artBoardMaxHeight
                ? scaledMinHeight
                : artBoardMaxHeight;
          } else {
            elementContainerHeight = artBoardParent.clientHeight;
          }
          elementContainerHeight =
            elementContainerHeight / window.tn_scale_factor;
        }
        value = elementContainerHeight / 2 - elementHeight / 2 + value;
      }
      if (valueAxisY === "bottom") {
        elementHeight = getElementHeight(element);
        if (isScaledElement && elementContainer !== "window") {
          if (verticalAlignValue !== "stretch") {
            elementContainerHeight =
              elementContainerHeight * window.tn_scale_factor;
          } else {
            if (scaledMinHeight) {
              elementContainerHeight =
                scaledMinHeight > artBoardMaxHeight
                  ? scaledMinHeight
                  : artBoardMaxHeight;
            } else {
              elementContainerHeight = artBoardParent.clientHeight;
            }
          }
          elementHeight *= window.tn_scale_factor;
        }
        if (
          !isTildaModeEdit &&
          isScaled &&
          !isOnlyScalable &&
          elementContainer !== "window" &&
          verticalAlignValue === "stretch"
        ) {
          if (scaledMinHeight) {
            elementContainerHeight =
              scaledMinHeight > artBoardMaxHeight
                ? scaledMinHeight
                : artBoardMaxHeight;
          } else {
            elementContainerHeight = artBoardParent.clientHeight;
          }
          elementContainerHeight =
            elementContainerHeight / window.tn_scale_factor;
        }
        value = elementContainerHeight - elementHeight + value;
      }
      if (isScaledElement && elementContainer !== "window") {
        elementHeight = getElementHeight(element);
        value =
          value + (elementHeight * window.tn_scale_factor - elementHeight) / 2;
      }
      break;
  }
  return value;
}
function t396_ab__setFieldValue(artBoard, prop, val, resolution) {
  if (!resolution) resolution = window.tn.curResolution;
  if (resolution < 1200) {
    if (artBoard)
      artBoard.setAttribute(
        "data-artboard-" + prop + "-res-" + resolution,
        val
      );
  } else {
    if (artBoard) artBoard.setAttribute("data-artboard-" + prop, val);
  }
}
function t396_ab__getFieldValue(artBoard, prop) {
  if (!artBoard) return;
  var resolution = window.tn.curResolution;
  var breakpoints = [1200, 960, 640, 480, 320];
  var dataField;
  breakpoints.forEach(function (breakpoint, i) {
    if (i === 0 && +resolution >= breakpoint) {
      dataField = artBoard.getAttribute("data-artboard-" + prop);
    }
    if (i > 0 && +resolution === breakpoint) {
      dataField = artBoard.getAttribute(
        "data-artboard-" + prop + "-res-" + breakpoint
      );
      if (i > 1 && !dataField) {
        var slicedBreakpoints = breakpoints.slice(1, i);
        for (var n = slicedBreakpoints.length - 1; n >= 0; n--) {
          dataField = artBoard.getAttribute(
            "data-artboard-" + prop + "-res-" + slicedBreakpoints[n]
          );
          if (dataField) break;
        }
      }
      if (!dataField)
        dataField = artBoard.getAttribute("data-artboard-" + prop);
    }
  });
  return dataField ? dataField : "";
}
function t396_ab__renderViewOneField(artBoard, field) {
  t396_ab__getFieldValue(artBoard, field);
}
function t396_allelems__renderView(artBoard) {
  if (!artBoard) return !1;
  tn_console(
    "func: allelems__renderView: abid:" +
      artBoard.getAttribute("data-artboard-recid")
  );
  var ArtBoardelements = artBoard.querySelectorAll(".tn-elem");
  Array.prototype.forEach.call(ArtBoardelements, function (element) {
    t396_elem__renderView(element);
  });
}
function t396_ab__filterUpdate(artBoard) {
  var filter = artBoard.querySelector(".t396__filter");
  if (!filter) return;
  var filterColorRgb = filter.getAttribute("data-filtercolor-rgb");
  var filterColorRgb2 = filter.getAttribute("data-filtercolor2-rgb");
  var filterOpacity = filter.getAttribute("data-filteropacity");
  var filterOpacity2 = filter.getAttribute("data-filteropacity2");
  if (filterColorRgb && !filterColorRgb2) {
    filter.style.backgroundColor =
      "rgba(" + filterColorRgb + "," + filterOpacity + ")";
  } else if (!filterColorRgb && filterColorRgb2) {
    filter.style.backgroundColor =
      "rgba(" + filterColorRgb2 + "," + filterOpacity2 + ")";
  } else if (filterColorRgb && filterColorRgb2) {
    filter.style.background =
      "-webkit-gradient(linear, left top, left bottom, from(rgba(" +
      filterColorRgb +
      "," +
      filterOpacity +
      ")), to(rgba(" +
      filterColorRgb2 +
      "," +
      filterOpacity2 +
      ")) )";
  } else {
    filter.style.backgroundColor = "transparent";
  }
}
function t396_ab__getHeight(artBoard, artBoardHeight) {
  if (!artBoardHeight)
    artBoardHeight = t396_ab__getFieldValue(artBoard, "height");
  artBoardHeight = parseFloat(artBoardHeight);
  var artBoardHeightVH = t396_ab__getFieldValue(artBoard, "height_vh");
  if (artBoardHeightVH) {
    artBoardHeightVH = parseFloat(artBoardHeightVH);
    if (!isNaN(artBoardHeightVH)) {
      var artBoardHeightVHpx =
        (window.tn.window_height * artBoardHeightVH) / 100;
      if (artBoardHeight < artBoardHeightVHpx) {
        artBoardHeight = artBoardHeightVHpx;
      }
    }
  }
  return artBoardHeight;
}
function t396_hex2rgb(hexStr) {
  var hex = parseInt(hexStr.substring(1), 16);
  var r = (hex & 0xff0000) >> 16;
  var g = (hex & 0x00ff00) >> 8;
  var b = hex & 0x0000ff;
  return [r, g, b];
}
String.prototype.t396_replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
function t396_elem__getWidth(element, value) {
  element = t396_getEl(element);
  if (!value) value = t396_elem__getFieldValue(element, "width");
  value = parseFloat(value);
  var elWidthUnits = t396_elem__getFieldValue(element, "widthunits");
  if (elWidthUnits === "%") {
    var elementContainer = t396_elem__getFieldValue(element, "container");
    if (elementContainer === "window") {
      value = (window.tn.window_width * value) / 100;
    } else {
      value = (window.tn.grid_width * value) / 100;
    }
  }
  return value;
}
function t396_elem__getHeight(element, value) {
  element = t396_getEl(element);
  if (!value) value = t396_elem__getFieldValue(element, "height");
  value = parseFloat(value);
  var elemType = element.getAttribute("data-elem-type");
  if (
    elemType === "shape" ||
    elemType === "video" ||
    elemType === "html" ||
    elemType === "gallery"
  ) {
    var elHeightUnits = t396_elem__getFieldValue(element, "heightunits");
    if (elHeightUnits === "%") {
      var artBoard = element.parentNode;
      var proxyMinHeight = artBoard
        ? artBoard.getAttribute("data-artboard-proxy-min-height")
        : "0";
      var proxyMaxHeight = artBoard
        ? artBoard.getAttribute("data-artboard-proxy-max-height")
        : "0";
      var artBoardMinHeight = parseFloat(proxyMinHeight);
      var artBoardMaxHeight = parseFloat(proxyMaxHeight);
      var elementContainer = t396_elem__getFieldValue(element, "container");
      if (elementContainer === "window") {
        value = artBoardMaxHeight * (value / 100);
      } else {
        value = artBoardMinHeight * (value / 100);
      }
    }
  } else if (elemType !== "button") {
    value = element.clientHeight;
  }
  return value;
}
function t396_roundFloat(n) {
  n = Math.round(n * 100) / 100;
  return n;
}
function tn_console(str) {
  if (+window.tn_comments === 1) console.log(str);
}
function t396_setUpTooltip_desktop(element, tooltip, tooltipContent) {
  element = t396_getEl(element);
  var timer;
  if (tooltip) {
    tooltip.addEventListener("mouseover", function () {
      var visibleEls = document.querySelectorAll(".tn-atom__tip_visible");
      Array.prototype.forEach.call(visibleEls, function (visibleEl) {
        var curTipEl = visibleEl.closest(".t396__elem");
        var cirTipElID = curTipEl ? curTipEl.getAttribute("data-elem-id") : "";
        if (cirTipElID !== element.getAttribute("data-elem-id")) {
          t396_hideTooltip(curTipEl, visibleEl);
        }
      });
      clearTimeout(timer);
      if (tooltipContent && tooltipContent.style.display === "block") return;
      t396_showTooltip(element, tooltipContent);
    });
    tooltip.addEventListener("mouseout", function () {
      timer = setTimeout(function () {
        t396_hideTooltip(element, tooltipContent);
      }, 300);
    });
  }
}
function t396_setUpTooltip_mobile(element, tooltip, tooltipContent) {
  element = t396_getEl(element);
  if (tooltip) {
    tooltip.addEventListener("click", function () {
      if (
        tooltipContent &&
        tooltipContent.style.display === "block" &&
        tooltip.classList.contains("tn-atom__pin")
      ) {
        t396_hideTooltip(element, tooltipContent);
      } else {
        t396_showTooltip(element, tooltipContent);
      }
    });
  }
  var elementID = element.getAttribute("data-elem-id");
  document.addEventListener("click", function (e) {
    if (e.target.closest(".tn-atom__pin")) {
      var zbEl = e.target.closest(".t396__elem");
      var clickedPinId = zbEl ? zbEl.getAttribute("data-elem-id") : "";
      if (clickedPinId === elementID) return;
    }
    t396_hideTooltip(element, tooltipContent);
  });
}
function t396_hideTooltip(element, tooltipContent) {
  if (tooltipContent) tooltipContent.style.display = "";
  if (tooltipContent) tooltipContent.style.left = "";
  if (tooltipContent) tooltipContent.style.transform = "";
  if (tooltipContent) tooltipContent.style.right = "";
  if (tooltipContent) tooltipContent.classList.remove("tn-atom__tip_visible");
  if (element) element.style.zIndex = "";
}
function t396_showTooltip(element, tooltipContent) {
  element = t396_getEl(element);
  var pos = element.getAttribute("data-field-tipposition-value");
  if (!pos) pos = "top";
  var elSize = element.clientHeight;
  var elTop = element.getBoundingClientRect().top + window.pageYOffset;
  var elBottom = elTop + elSize;
  var elLeft = element.getBoundingClientRect().left + window.pageXOffset;
  var elRight = elLeft + elSize;
  var winTop = window.pageYOffset;
  var winWidth = document.documentElement.clientWidth;
  var winBottom = winTop + document.documentElement.clientHeight;
  if (tooltipContent) tooltipContent.style.display = "block";
  if (tooltipContent) tooltipContent.style.zIndex = "-9999";
  if (tooltipContent) tooltipContent.style.transform = "translateX(-10000px)";
  var tipElHeight = tooltipContent ? tooltipContent.offsetHeight : 0;
  var tipElWidth = tooltipContent ? tooltipContent.offsetWidth : 0;
  if (tooltipContent) tooltipContent.style.display = "";
  if (tooltipContent) tooltipContent.style.zIndex = "";
  if (tooltipContent) tooltipContent.style.transform = "";
  var padding = 15;
  var tipElRight;
  var tipElLeft;
  var tipElTop;
  var tipElBottom;
  if (pos === "right" || pos === "left") {
    tipElRight = elRight + padding + tipElWidth;
    tipElLeft = elLeft - padding - tipElWidth;
    if (
      (pos === "right" && tipElRight > winWidth) ||
      (pos === "left" && tipElLeft < 0)
    ) {
      pos = "top";
    }
  }
  if (pos === "top" || pos === "bottom") {
    tipElRight = elRight + (tipElWidth / 2 - elSize / 2);
    tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);
    if (tipElRight > winWidth) {
      var rightOffset = -(winWidth - elRight - padding);
      if (tooltipContent) tooltipContent.style.left = "auto";
      if (tooltipContent) tooltipContent.style.transform = "none";
      if (tooltipContent) tooltipContent.style.right = rightOffset + "px";
    }
    if (tipElLeft < 0) {
      var leftOffset = -(elLeft - padding);
      if (tooltipContent) tooltipContent.style.left = leftOffset + "px";
      if (tooltipContent) tooltipContent.style.transform = "none";
    }
  }
  if (pos === "top") {
    tipElTop = elTop - padding - tipElHeight;
    tipElBottom = elBottom + padding + tipElHeight;
    if (winBottom > tipElBottom && winTop > tipElTop) {
      pos = "bottom";
    }
  }
  if (pos === "bottom") {
    tipElTop = elTop - padding - tipElHeight;
    tipElBottom = elBottom + padding + tipElHeight;
    if (winBottom < tipElBottom && winTop < tipElTop) {
      pos = "top";
    }
  }
  if (tooltipContent) tooltipContent.setAttribute("data-tip-pos", pos);
  if (tooltipContent) tooltipContent.style.display = "block";
  if (tooltipContent) tooltipContent.classList.add("tn-atom__tip_visible");
  if (element) element.style.zIndex = "1000";
}
function t396_hex2rgba(hexStr, opacity) {
  if (!hexStr) return !1;
  var hex = parseInt(hexStr.substring(1), 16);
  var r = (hex & 0xff0000) >> 16;
  var g = (hex & 0x00ff00) >> 8;
  var b = hex & 0x0000ff;
  return [r, g, b, parseFloat(opacity)];
}
function t396_removeElementFromDOM(el) {
  el = t396_getEl(el);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}
function t396_getEl(el) {
  if (el instanceof jQuery) {
    return el.length ? el.get(0) : null;
  } else {
    return el;
  }
}
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.oMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    while (el && el.nodeType === 1) {
      if (Element.prototype.matches.call(el, s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    }
    return null;
  };
}
function t412_init(recId) {
  var rec = document.querySelector("#rec" + recId);
  if (!rec) return;
  var orderLinks = rec.querySelectorAll('a[href^="#order"]');
  if (orderLinks.length !== 0) {
    Array.prototype.forEach.call(orderLinks, function (orderLink) {
      orderLink.addEventListener("click", function () {
        var linkElement = this;
        var payBoxElement = document.querySelector(".js-payment-systembox");
        t412_setCoordinateToPaymentBox(linkElement, payBoxElement);
        payBoxElement.style.marginTop = "0";
        payBoxElement.style.marginLeft = "0";
        window.addEventListener("resize", function () {
          if (
            getComputedStyle(payBoxElement, null).display === "block" &&
            linkElement
          ) {
            t412_setCoordinateToPaymentBox(linkElement, payBoxElement);
          }
        });
      });
    });
  }
}
function t412_setCoordinateToPaymentBox(linkElement, payBoxElement) {
  var oldTopCoord = 0;
  var newTopCoord = 0;
  var linkTopOffset =
    linkElement.getBoundingClientRect().top + window.pageYOffset;
  var linkLeftOffset =
    linkElement.getBoundingClientRect().left + window.pageXOffset;
  var offsetParent = linkElement.closest(".t412__col");
  var offsetParentDimensions = t412_getElementDimension(offsetParent);
  var payBoxDimensions = t412_getElementDimension(payBoxElement);
  var paddingParent =
    offsetParentDimensions.paddingLeft + offsetParentDimensions.paddingRight;
  var top =
    linkTopOffset + offsetParentDimensions.height - payBoxDimensions.height;
  var left =
    linkLeftOffset +
    (offsetParentDimensions.width - paddingParent) / 2 -
    payBoxDimensions.width / 2;
  oldTopCoord = payBoxElement.style.top;
  payBoxElement.style.top = top + "px";
  payBoxElement.style.left = left + "px";
  newTopCoord = payBoxElement.style.top;
  var difference = 21;
  if (parseInt(oldTopCoord, 10) - parseInt(newTopCoord, 10) === difference) {
    payBoxElement.style.top = top + difference + "px";
  }
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.oMatchesSelector;
  }
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;
      while (el && el.nodeType === 1) {
        if (Element.prototype.matches.call(el, s)) {
          return el;
        }
        el = el.parentElement || el.parentNode;
      }
      return null;
    };
  }
}
function t412_unifyHeights(recId) {
  var rec = document.querySelector("#rec" + recId);
  if (!rec) return;
  var container = rec.querySelector(" .t412 .t-container");
  if (!container) return;
  var allTitles = container.querySelectorAll(".t412__title");
  var allDescriptions = container.querySelectorAll(".t412__descr");
  var allWrappers = container.querySelectorAll(".t412__wrapper");
  var highestTitle = 0;
  var highestDescription = 0;
  var highestWrapper = 0;
  Array.prototype.forEach.call(allTitles, function (title) {
    title.style.height = "auto";
    var titleDimension = t412_getElementDimension(title);
    if (titleDimension.height > highestTitle) {
      highestTitle = titleDimension.height;
    }
  });
  if (window.innerWidth >= 960 && t412_isVisible(container)) {
    Array.prototype.forEach.call(allTitles, function (title) {
      title.style.height = highestTitle + "px";
    });
  } else {
    Array.prototype.forEach.call(allTitles, function (title) {
      title.style.height = "auto";
    });
  }
  Array.prototype.forEach.call(allDescriptions, function (description) {
    description.style.height = "auto";
    var descriptionDimension = t412_getElementDimension(description);
    if (descriptionDimension.height > highestDescription) {
      highestDescription = descriptionDimension.height;
    }
  });
  if (window.innerWidth >= 960 && t412_isVisible(container)) {
    Array.prototype.forEach.call(allDescriptions, function (description) {
      description.style.height = highestDescription + "px";
    });
  } else {
    Array.prototype.forEach.call(allDescriptions, function (description) {
      description.style.height = "auto";
    });
  }
  Array.prototype.forEach.call(allWrappers, function (wrapper) {
    wrapper.style.height = "auto";
    var wrapperDimension = t412_getElementDimension(wrapper);
    if (wrapperDimension.height > highestWrapper) {
      highestWrapper = wrapperDimension.height;
    }
  });
  if (window.innerWidth >= 960 && t412_isVisible(container)) {
    Array.prototype.forEach.call(allWrappers, function (wrapper) {
      wrapper.style.height = highestWrapper + "px";
    });
  } else {
    Array.prototype.forEach.call(allWrappers, function (wrapper) {
      wrapper.style.height = "auto";
    });
  }
}
function t412_getElementDimension(element) {
  return {
    height: parseFloat(getComputedStyle(element).height.replace("px", ""), 10),
    width: parseFloat(getComputedStyle(element).width.replace("px", ""), 10),
    paddingLeft: parseFloat(
      getComputedStyle(element).paddingLeft.replace("px", ""),
      10
    ),
    paddingRight: parseFloat(
      getComputedStyle(element).paddingRight.replace("px", ""),
      10
    ),
  };
}
function t412_isVisible(element) {
  return !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  );
}
function t456_setListMagin(recid, imglogo) {
  var rec = document.getElementById("rec" + recid);
  if (!rec || window.innerWidth <= 980) return;
  var menu = rec.querySelector(".t456");
  var leftSide = menu ? menu.querySelector(".t456__leftwrapper") : null;
  var list = menu ? menu.querySelector(".t456__list") : null;
  var leftSideWidth = leftSide ? leftSide.offsetWidth : 0;
  if (list)
    list.style.marginRight =
      (imglogo ? leftSideWidth : leftSideWidth + 30) + "px";
}
function t456_highlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) === "/") {
    url = url.slice(0, -1);
  }
  if (pathname.substr(pathname.length - 1) === "/") {
    pathname = pathname.slice(0, -1);
  }
  if (pathname.charAt(0) === "/") {
    pathname = pathname.slice(1);
  }
  if (pathname === "") {
    pathname = "/";
  }
  var shouldBeActiveElements = document.querySelectorAll(
    ".t456__list_item a[href='" +
      url +
      "'], " +
      ".t456__list_item a[href='" +
      url +
      "/'], " +
      ".t456__list_item a[href='" +
      pathname +
      "'], " +
      ".t456__list_item a[href='/" +
      pathname +
      "'], " +
      ".t456__list_item a[href='" +
      pathname +
      "/'], " +
      ".t456__list_item a[href='/" +
      pathname +
      "/']"
  );
  Array.prototype.forEach.call(shouldBeActiveElements, function (link) {
    link.classList.add("t-active");
  });
}
function t456_checkAnchorLinks(recid) {
  if (window.innerWidth < 980) return;
  var rec = document.getElementById("rec" + recid);
  var navLinks = rec
    ? rec.querySelectorAll(".t456__list_item a[href*='#']")
    : [];
  navLinks = Array.prototype.filter.call(navLinks, function (navLink) {
    return !navLink.classList.contains("tooltipstered");
  });
  if (navLinks.length) {
    t456_catchScroll(navLinks);
  }
}
function t456_catchScroll(navLinks) {
  navLinks = Array.prototype.slice.call(navLinks);
  var clickedSectionID = null;
  var sections = [];
  var sectionToNavigationLinkID = {};
  var interval = 100;
  var lastCall;
  var timeoutID;
  navLinks = navLinks.reverse();
  navLinks.forEach(function (link) {
    var currentSection = t456_getSectionByHref(link);
    if (currentSection && currentSection.id) {
      sections.push(currentSection);
      sectionToNavigationLinkID[currentSection.id] = link;
    }
  });
  t456_updateSectionsOffsets(sections);
  sections.sort(function (a, b) {
    var firstTopOffset = parseInt(a.getAttribute("data-offset-top"), 10) || 0;
    var secondTopOffset = parseInt(b.getAttribute("data-offset-top"), 10) || 0;
    return secondTopOffset - firstTopOffset;
  });
  window.addEventListener(
    "resize",
    t_throttle(function () {
      t456_updateSectionsOffsets(sections);
    }, 200)
  );
  if (typeof jQuery !== "undefined") {
    $(".t456").bind("displayChanged", function () {
      t456_updateSectionsOffsets(sections);
    });
  } else {
    var menuEls = document.querySelectorAll(".t456");
    Array.prototype.forEach.call(menuEls, function (menu) {
      menu.addEventListener("displayChanged", function () {
        t456_updateSectionsOffsets(sections);
      });
    });
  }
  setInterval(function () {
    t456_updateSectionsOffsets(sections);
  }, 5000);
  t456_highlightNavLinks(
    navLinks,
    sections,
    sectionToNavigationLinkID,
    clickedSectionID
  );
  navLinks.forEach(function (navLink, i) {
    navLink.addEventListener("click", function () {
      var clickedSection = t456_getSectionByHref(navLink);
      if (
        !navLink.classList.contains("tooltipstered") &&
        clickedSection &&
        clickedSection.id
      ) {
        navLinks.forEach(function (link, index) {
          if (index === i) {
            link.classList.add("t-active");
          } else {
            link.classList.remove("t-active");
          }
        });
        clickedSectionID = clickedSection.id;
      }
    });
  });
  window.addEventListener("scroll", function () {
    var dateNow = new Date().getTime();
    if (lastCall && dateNow < lastCall + interval) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        lastCall = dateNow;
        clickedSectionID = t456_highlightNavLinks(
          navLinks,
          sections,
          sectionToNavigationLinkID,
          clickedSectionID
        );
      }, interval - (dateNow - lastCall));
    } else {
      lastCall = dateNow;
      clickedSectionID = t456_highlightNavLinks(
        navLinks,
        sections,
        sectionToNavigationLinkID,
        clickedSectionID
      );
    }
  });
}
function t456_updateSectionsOffsets(sections) {
  sections.forEach(function (section) {
    var sectionTopPos =
      section.getBoundingClientRect().top + window.pageYOffset;
    section.setAttribute("data-offset-top", sectionTopPos);
  });
}
function t456_getSectionByHref(curlink) {
  if (!curlink) return;
  var href = curlink.getAttribute("href");
  var curLinkValue = href ? href.replace(/\s+/g, "") : "";
  if (curLinkValue.indexOf("/") === 0) curLinkValue = curLinkValue.slice(1);
  if (href && curlink.matches('[href*="#rec"]')) {
    curLinkValue = curLinkValue.replace(/.*#/, "");
    return document.getElementById(curLinkValue);
  } else {
    var selector = href ? href.trim() : "";
    var slashIndex = selector.indexOf("#") !== -1 ? selector.indexOf("#") : !1;
    if (typeof slashIndex === "number") {
      selector = selector.slice(slashIndex + 1);
    } else {
      slashIndex = selector.indexOf("/") !== -1 ? selector.indexOf("/") : !1;
      if (typeof slashIndex === "number")
        selector = selector.slice(slashIndex + 1);
    }
    var fullSelector = '.r[data-record-type="215"] a[name="' + selector + '"]';
    return document.querySelector(fullSelector)
      ? document.querySelector(fullSelector).closest(".r")
      : null;
  }
}
function t456_highlightNavLinks(
  navLinks,
  sections,
  sectionToNavigationLinkID,
  clickedSectionID
) {
  var scrollPosition = window.pageYOffset;
  var scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  var returnValue = clickedSectionID;
  var lastSection = sections.length ? sections[sections.length - 1] : null;
  var lastSectionTopPos = lastSection
    ? lastSection.getAttribute("data-offset-top")
    : "0";
  lastSectionTopPos = parseInt(lastSectionTopPos, 10) || 0;
  if (
    sections.length &&
    clickedSectionID === null &&
    lastSectionTopPos > scrollPosition + 300
  ) {
    navLinks.forEach(function (link) {
      link.classList.remove("t-active");
    });
    return null;
  }
  for (var i = 0; i < sections.length; i++) {
    var sectionTopPos = sections[i].getAttribute("data-offset-top");
    var navLink = sections[i].id
      ? sectionToNavigationLinkID[sections[i].id]
      : null;
    if (
      scrollPosition + 300 >= sectionTopPos ||
      (i === 0 && scrollPosition >= scrollHeight - window.innerHeight)
    ) {
      if (
        clickedSectionID === null &&
        navLink &&
        !navLink.classList.contains("t-active")
      ) {
        navLinks.forEach(function (link) {
          link.classList.remove("t-active");
        });
        if (navLink) navLink.classList.add("t-active");
        returnValue = null;
      } else if (
        clickedSectionID !== null &&
        sections[i].id &&
        clickedSectionID === sections[i].id
      ) {
        returnValue = null;
      }
      break;
    }
  }
  return returnValue;
}
function t456_setBg(recid) {
  var menuBlocks = document.querySelectorAll(".t456");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    if (window.innerWidth > 980) {
      if (menu.getAttribute("data-bgcolor-setbyscript") === "yes") {
        menu.style.backgroundColor = menu.getAttribute("data-bgcolor-rgba");
      }
    } else {
      menu.style.backgroundColor = menu.getAttribute("data-bgcolor-hex");
      menu.setAttribute("data-bgcolor-setbyscript", "yes");
      if (menu.style.transform) menu.style.transform = "";
      if (menu.style.opacity) menu.style.opacity = "";
    }
  });
}
function t456_appearMenu(recid) {
  if (window.innerWidth <= 980) return;
  var menuBlocks = document.querySelectorAll(".t456");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    var appearOffset = menu.getAttribute("data-appearoffset");
    if (appearOffset) {
      if (appearOffset.indexOf("vh") !== -1) {
        appearOffset = Math.floor(
          window.innerHeight * (parseInt(appearOffset) / 100)
        );
      }
      appearOffset = parseInt(appearOffset, 10);
      var menuHeight = menu.clientHeight;
      if (
        typeof appearOffset === "number" &&
        window.pageYOffset >= appearOffset
      ) {
        if (menu.style.transform === "translateY(-" + menuHeight + "px)") {
          t456_slideUpElement(menu, menuHeight, "toBottom");
        }
      } else if (menu.style.transform === "translateY(0px)") {
        t456_slideUpElement(menu, menuHeight, "toTop");
      } else {
        menu.style.transform = "translateY(-" + menuHeight + "px)";
        menu.style.opacity = "0";
      }
    }
  });
}
function t456_slideUpElement(menu, menuHeight, direction) {
  var diff = direction === "toTop" ? 0 : menuHeight;
  var diffOpacity = direction === "toTop" ? 1 : 0;
  var timerID = setInterval(function () {
    menu.style.transform = "translateY(-" + diff + "px)";
    menu.style.opacity = diffOpacity.toString();
    diffOpacity = direction === "toTop" ? diffOpacity - 0.1 : diffOpacity + 0.1;
    diff =
      direction === "toTop" ? diff + menuHeight / 20 : diff - menuHeight / 20;
    if (direction === "toTop" && diff >= menuHeight) {
      menu.style.transform = "translateY(-" + menuHeight + "px)";
      menu.style.opacity = "0";
      clearInterval(timerID);
    }
    if (direction === "toBottom" && diff <= 0) {
      menu.style.transform = "translateY(0px)";
      menu.style.opacity = "1";
      clearInterval(timerID);
    }
  }, 10);
}
function t456_changebgopacitymenu(recid) {
  if (window.innerWidth <= 980) return;
  var menuBlocks = document.querySelectorAll(".t456");
  Array.prototype.forEach.call(menuBlocks, function (menu) {
    var bgColor = menu.getAttribute("data-bgcolor-rgba");
    var bgColorAfterScroll = menu.getAttribute("data-bgcolor-rgba-afterscroll");
    var bgOpacity = menu.getAttribute("data-bgopacity");
    var bgOpacityTwo = menu.getAttribute("data-bgopacity-two");
    var menuShadow = menu.getAttribute("data-menushadow") || "0";
    var menuShadowValue = menuShadow === "100" ? menuShadow : "0." + menuShadow;
    menu.style.backgroundColor =
      window.pageYOffset > 20 ? bgColorAfterScroll : bgColor;
    if (
      (window.pageYOffset > 20 && bgOpacityTwo === "0") ||
      (window.pageYOffset <= 20 && bgOpacity === "0.0") ||
      menuShadow === " "
    ) {
      menu.style.boxShadow = "none";
    } else {
      menu.style.boxShadow = "0px 1px 3px rgba(0,0,0," + menuShadowValue + ")";
    }
  });
}
function t456_createMobileMenu(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var menu = rec.querySelector(".t456");
  var burger = rec.querySelector(".t456__mobile");
  if (burger) {
    burger.addEventListener("click", function () {
      if (burger.classList.contains("t456_opened")) {
        t456_fadeOut(menu, 300);
        burger.classList.remove("t456_opened");
      } else {
        t456_fadeIn(menu, 300, function () {
          if (menu.style.transform) menu.style.transform = "";
          if (menu.style.opacity) menu.style.opacity = "";
        });
        burger.classList.add("t456_opened");
      }
    });
  }
  window.addEventListener(
    "resize",
    t_throttle(function () {
      if (window.innerWidth > 980) {
        if (menu) menu.style.opacity = "";
        if (menu) menu.style.display = "";
        if (burger) burger.classList.remove("t456_opened");
      }
    }, 200)
  );
}
function t456_fadeOut(element, duration, callback) {
  if (!element) return !1;
  var opacity = 1;
  duration = parseInt(duration, 10);
  var speed = duration > 0 ? duration / 10 : 40;
  var timer = setInterval(function () {
    element.style.opacity = opacity;
    opacity -= 0.1;
    if (opacity <= 0.1) {
      element.style.opacity = "0";
      element.style.display = "none";
      if (typeof callback === "function") {
        callback();
      }
      clearInterval(timer);
    }
  }, speed);
}
function t456_fadeIn(element, duration, callback) {
  if (!element) return !1;
  if (
    (getComputedStyle(element).opacity === "1" ||
      getComputedStyle(element).opacity === "") &&
    getComputedStyle(element).display !== "none"
  )
    return !1;
  var opacity = 0;
  duration = parseInt(duration, 10);
  var speed = duration > 0 ? duration / 10 : 40;
  element.style.opacity = opacity;
  element.style.display = "block";
  var timer = setInterval(function () {
    element.style.opacity = opacity;
    opacity += 0.1;
    if (opacity >= 1) {
      element.style.opacity = "1";
      if (typeof callback === "function") {
        callback();
      }
      clearInterval(timer);
    }
  }, speed);
}
function t585_init(recId) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var accordion = rec.querySelectorAll(".t585__accordion")[0];
  var headers = rec.querySelectorAll(".t585__header");
  var isLazy = document
    .getElementById("allrecords")
    .getAttribute("data-tilda-lazy");
  var accordionScroll;
  if (accordion) {
    accordionScroll = accordion.getAttribute("data-scroll-to-expanded");
    accordion = accordion.getAttribute("data-accordion");
  } else {
    accordion = "false";
    accordionScroll = "false";
  }
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener("click", function () {
      var element = this;
      var container = element.nextElementSibling;
      var activeHeight = 0;
      var isAccordionDown = !1;
      if (element.classList.contains("t585__opened")) {
        element.classList.remove("t585__opened");
        t585_accordionHide(container);
      } else {
        if (accordionScroll === "true" && accordion === "true") {
          activeHeight = t585__getOldAction(rec);
          isAccordionDown = t585__getAccordionPosition(headers, element);
        }
        if (accordion === "true") t585_accordionAllHide(headers);
        element.classList.add("t585__opened");
        container.style.display = "block";
        var height = container.scrollHeight;
        container.style.maxHeight = "0px";
        setTimeout(function () {
          container.style.maxHeight = height + "px";
          if (accordionScroll === "true") {
            t585__calcHeight(element, container, activeHeight, isAccordionDown);
          }
        }, 0);
      }
      if (window.lazy === "y" || isLazy === "yes") {
        t_onFuncLoad("t_lazyload_update", function () {
          t_lazyload_update();
        });
      }
    });
  }
}
function t585_accordionAllHide(headers) {
  for (var i = 0; i < headers.length; i++) {
    var elementHide = headers[i];
    elementHide.classList.remove("t585__opened");
    t585_accordionHide(elementHide.nextElementSibling);
  }
}
function t585_accordionHide(container) {
  if (!container.style.maxHeight)
    container.style.maxHeight = container.scrollHeight + "px";
  setTimeout(function () {
    container.style.maxHeight = "0px";
  }, 0);
}
function t585__getOldAction(rec) {
  var activeHeader = rec.querySelector(".t585__opened");
  var activeHeight = 0;
  if (activeHeader) var activeContainer = activeHeader.nextElementSibling;
  if (activeContainer) activeHeight = activeContainer.offsetHeight;
  return activeHeight;
}
function t585__getAccordionPosition(headers, element) {
  var oldIndex;
  var newIndex;
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    if (header.classList.contains("t585__opened")) oldIndex = i;
    if (header === element) newIndex = i;
  }
  return oldIndex < newIndex ? !0 : !1;
}
function t585__calcHeight(element, container, activeHeight, isAccordionDown) {
  var windowHeight = window.innerHeight;
  var windowScroll = window.scrollY;
  var containerHeight = container.scrollHeight;
  var accordionHeight = containerHeight + element.offsetHeight;
  var elementTopOffset = element.getBoundingClientRect().top + windowScroll;
  var target = isAccordionDown
    ? elementTopOffset - activeHeight
    : elementTopOffset;
  if (target < windowScroll || accordionHeight > windowHeight) {
    t585__scroll(target);
  }
}
function t585__scroll(target) {
  var duration = 400;
  var start =
    (window.pageYOffset || document.documentElement.scrollTop) -
    (document.documentElement.clientTop || 0);
  var change = target - start;
  var currentTime = 0;
  var increment = 16;
  document.body.setAttribute("data-scrollable", "true");
  function t585__easeInOutCubic(currentTime) {
    if ((currentTime /= duration / 2) < 1) {
      return (change / 2) * currentTime * currentTime * currentTime + start;
    } else {
      return (
        (change / 2) * ((currentTime -= 2) * currentTime * currentTime + 2) +
        start
      );
    }
  }
  function t585__animateScroll() {
    currentTime += increment;
    window.scrollTo(0, t585__easeInOutCubic(currentTime));
    if (currentTime < duration) {
      setTimeout(t585__animateScroll, increment);
    } else {
      document.body.removeAttribute("data-scrollable");
    }
  }
  t585__animateScroll();
}
function t599_init(recId) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var container = rec.querySelector(".t599");
  if (!container) return;
  var titles = rec.querySelectorAll(".t599__title");
  var descriptions = rec.querySelectorAll(".t599__descr");
  var prices = rec.querySelectorAll(".t599__price");
  var subtitles = rec.querySelectorAll(".t599__subtitle");
  if (titles.length > 0) t599_equalHeight(titles);
  if (descriptions.length > 0) t599_equalHeight(descriptions);
  if (prices.length > 0) t599_equalHeight(prices);
  if (subtitles.length > 0) t599_equalHeight(subtitles);
}
function t599_equalHeight(elements) {
  var maxHeight = 0;
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.height = "";
  }
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var elementStyle = getComputedStyle(element, null);
    var elementPaddingTop = parseInt(elementStyle.paddingTop) || 0;
    var elementPaddingBottom = parseInt(elementStyle.paddingBottom) || 0;
    var elementHeight =
      element.clientHeight - (elementPaddingTop + elementPaddingBottom);
    if (elementHeight > maxHeight) maxHeight = elementHeight;
  }
  if (window.innerWidth >= 960) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.height = maxHeight + "px";
    }
  } else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.height = "";
    }
  }
}
function t604_init(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  t604_imageHeight(recid);
  t604_arrowWidth(recid);
  t604_show(recid);
  t604_hide(recid);
  window.addEventListener(
    "resize",
    t_throttle(function () {
      t_onFuncLoad("t_slds_updateSlider", function () {
        t_slds_updateSlider(recid);
      });
      t604_arrowWidth(recid);
    })
  );
  if (typeof jQuery !== "undefined") {
    $(rec)
      .find(".t604")
      .bind("displayChanged", function () {
        t_onFuncLoad("t_slds_updateSlider", function () {
          t_slds_updateSlider(recid);
        });
        t604_arrowWidth(recid);
      });
  } else {
    var currentBlock = rec.querySelector(".t604");
    if (currentBlock) {
      currentBlock.addEventListener("displayChanged", function () {
        t_onFuncLoad("t_slds_updateSlider", function () {
          t_slds_updateSlider(recid);
        });
        t604_arrowWidth(recid);
      });
    }
  }
}
function t604_show(recid) {
  var rec = document.getElementById("rec" + recid);
  var playBtns = rec.querySelectorAll(".t604__play");
  Array.prototype.forEach.call(playBtns, function (play) {
    play.addEventListener("click", function () {
      var parent = play.parentElement;
      var videoBg = parent ? parent.querySelector(".t-slds__bgimg") : null;
      if (videoBg) videoBg.style.opacity = "0";
      var sliderVideo = play.getAttribute("data-slider-video-type");
      var url = play.getAttribute("data-slider-video-url");
      var nextEl = play.nextElementSibling;
      if (nextEl) nextEl.style.zIndex = "3";
      var iframe;
      switch (sliderVideo) {
        case "youtube":
          iframe = document.createElement("iframe");
          iframe.classList.add("t604__iframe");
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.src =
            "https://www.youtube.com/embed/" +
            url +
            "?autoplay=1&enablejsapi=1";
          iframe.frameBorder = "0";
          iframe.setAttribute("webkitallowfullscreen", "");
          iframe.setAttribute("mozallowfullscreen", "");
          iframe.setAttribute("allowfullscreen", "");
          if (nextEl) nextEl.innerHTML = "";
          if (nextEl) nextEl.appendChild(iframe);
          break;
        case "vimeo":
          var idMatch = /vimeo[^/]*\/(\d+)\/?(\w*)\/?/i.exec(url);
          var id = idMatch ? idMatch[1] : null;
          var hash = idMatch ? "?h=" + idMatch[2] : null;
          iframe = document.createElement("iframe");
          iframe.classList.add("t604__iframe");
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.src =
            "https://player.vimeo.com/video/" +
            id +
            hash +
            "?autoplay=1&amp;api=1";
          iframe.frameBorder = "0";
          iframe.setAttribute("webkitallowfullscreen", "");
          iframe.setAttribute("mozallowfullscreen", "");
          iframe.setAttribute("allowfullscreen", "");
          if (nextEl) nextEl.innerHTML = "";
          if (nextEl) nextEl.appendChild(iframe);
          break;
      }
    });
  });
}
function t604_hide(recid) {
  var rec = document.getElementById("rec" + recid);
  var frames = rec.querySelectorAll(".t604__frame");
  rec.addEventListener("updateSlider", function () {
    Array.prototype.forEach.call(frames, function (frame) {
      frame.innerHTML = "";
      frame.style.zIndex = "";
    });
  });
}
function t604_imageHeight(recid) {
  var rec = document.getElementById("rec" + recid);
  var images = rec.querySelectorAll(".t604__separator");
  Array.prototype.forEach.call(images, function (image) {
    var imgHeight = image.getAttribute("data-slider-image-height");
    var imgWidth = image.getAttribute("data-slider-image-width");
    var imgRatio = imgHeight / imgWidth;
    var imgPadding = imgRatio * 100;
    image.style.paddingBottom = imgPadding + "%";
  });
}
function t604_arrowWidth(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var arrows = rec.querySelectorAll(".t-slds__arrow_wrapper");
  var slide = rec.querySelector(".t-slds__wrapper");
  var slideWidth = slide ? slide.offsetWidth : 0;
  var arrowWidth = window.innerWidth - slideWidth;
  Array.prototype.forEach.call(arrows, function (arrow) {
    arrow.style.width = window.innerWidth > 960 ? arrowWidth / 2 + "px" : "";
  });
}
function t670_init(recid) {
  t670_imageHeight(recid);
  t670_show(recid);
  t670_hide(recid);
}
function t670_show(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var playBtns = rec.querySelectorAll(".t670__play");
  Array.prototype.forEach.call(playBtns, function (play) {
    play.addEventListener("click", function () {
      var videoType = play.getAttribute("data-slider-video-type");
      var url;
      var nextEl;
      var prevEl;
      var iframe;
      var video;
      var source;
      switch (videoType) {
        case "youtube":
          url = play.getAttribute("data-slider-video-url");
          nextEl = play.nextElementSibling;
          prevEl = play.previousElementSibling.previousElementSibling;
          if (nextEl) {
            iframe = document.createElement("iframe");
            iframe.classList.add("t670__iframe");
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.src =
              "https://www.youtube.com/embed/" +
              url +
              "?autoplay=1&enablejsapi=1";
            iframe.frameBorder = "0";
            iframe.setAttribute("webkitallowfullscreen", "");
            iframe.setAttribute("mozallowfullscreen", "");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("allow", "autoplay");
            nextEl.innerHTML = "";
            nextEl.insertAdjacentElement("beforeend", iframe);
          }
          if (prevEl && prevEl.classList.contains("t-bgimg"))
            prevEl.style.opacity = "0";
          break;
        case "vimeo":
          url = play.getAttribute("data-slider-video-url");
          nextEl = play.nextElementSibling;
          prevEl = play.previousElementSibling.previousElementSibling;
          var idMatch = /vimeo[^/]*\/(\d+)\/?(\w*)\/?/i.exec(url);
          var id = idMatch ? idMatch[1] : null;
          var hash = idMatch ? "?h=" + idMatch[2] : null;
          if (nextEl) {
            iframe = document.createElement("iframe");
            iframe.classList.add("t670__iframe");
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.src =
              "https://player.vimeo.com/video/" + id + hash + "&amp;api=1";
            iframe.frameBorder = "0";
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("allow", "autoplay; fullscreen");
            nextEl.innerHTML = "";
            nextEl.insertAdjacentElement("beforeend", iframe);
          }
          if (prevEl && prevEl.classList.contains("t-bgimg"))
            prevEl.style.opacity = "0";
          break;
        case "mp4":
          url = play.getAttribute("data-slider-video-url");
          nextEl = play.nextElementSibling;
          prevEl = play.previousElementSibling.previousElementSibling;
          if (nextEl) {
            video = document.createElement("video");
            source = document.createElement("source");
            video.insertAdjacentElement("beforeend", source);
            video.classList.add("t670__video");
            video.controls = !0;
            source.src = url;
            nextEl.innerHTML = "";
            nextEl.insertAdjacentElement("beforeend", video);
          }
          if (prevEl && prevEl.classList.contains("t-bgimg"))
            prevEl.style.opacity = "0";
          break;
      }
      if (nextEl) nextEl.style.zIndex = "3";
    });
  });
}
function t670_hide(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var elBody = rec.querySelector(".t670__frame");
  rec.addEventListener("updateSlider", function () {
    if (elBody) elBody.innerHTML = "";
    if (elBody) elBody.style.zIndex = "";
  });
}
function t670_imageHeight(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var images = rec.querySelectorAll(".t670__separator");
  Array.prototype.forEach.call(images, function (img) {
    var width = img.getAttribute("data-slider-image-width") || 0;
    var height = img.getAttribute("data-slider-image-height") || 0;
    var ratio = height / width;
    var padding = ratio * 100;
    img.style.paddingBottom = padding + "%";
  });
}
function t734_init(recid) {
  var rec = document.getElementById("rec" + recid);
  if (!rec) return;
  var coverBlock = document.querySelector(".t830");
  if (coverBlock) {
    var slidesWrapper = rec.querySelector(".t-slds__items-wrapper");
    if (
      slidesWrapper &&
      slidesWrapper.classList.contains("t-slds_animated-none")
    ) {
      t_onFuncLoad("t_sldsInit", function () {
        t_sldsInit(recid);
      });
    } else {
      setTimeout(function () {
        t_onFuncLoad("t_sldsInit", function () {
          t_sldsInit(recid);
        });
      }, 500);
    }
  } else {
    t_onFuncLoad("t_sldsInit", function () {
      t_sldsInit(recid);
    });
  }
  var currentCoverBlock = rec.querySelector(".t734");
  if (currentCoverBlock) {
    if (typeof jQuery !== "undefined") {
      $(currentCoverBlock).on("displayChanged", function () {
        t_onFuncLoad("t_slds_updateSlider", function () {
          t_slds_updateSlider(recid);
        });
      });
    } else {
      currentCoverBlock.addEventListener("displayChanged", function () {
        t_onFuncLoad("t_slds_updateSlider", function () {
          t_slds_updateSlider(recid);
        });
      });
    }
  }
}
function t778__init(recid) {
  t_onFuncLoad("t_prod__init", function () {
    t_prod__init(recid);
  });
  t778_initPopup(recid);
  t778__hoverZoom_init(recid);
  t778__updateLazyLoad(recid);
  t778__alignButtons_init(recid);
  t778__showMore(recid);
  if (typeof t_store_addProductQuantityEvents !== "undefined") {
    t778_initProductQuantity(recid);
  }
  $("body").trigger("twishlist_addbtn");
}
function t778_initProductQuantity(recid) {
  var el = $("#rec" + recid);
  var productList = el.find(".t778__col, .t778__product-full");
  productList.each(function (i, product) {
    t_store_addProductQuantityEvents($(product));
  });
}
function t778__showMore(recid) {
  var el = $("#rec" + recid).find(".t778");
  var showmore = el.find(".t778__showmore");
  var cards_count = parseInt(el.attr("data-show-count"), 10);
  if (cards_count > 0) {
    if (showmore.text() === "") {
      showmore.find("td").text(t778__dict("loadmore"));
    }
    showmore.show();
    el.find(".t778__col").hide();
    var cards_size = el.find(".t778__col").size();
    var x = cards_count;
    var y = cards_count;
    t778__showSeparator(el, x);
    el.find(".t778__col:lt(" + x + ")").show();
    showmore.click(function () {
      x = x + y <= cards_size ? x + y : cards_size;
      el.find(".t778__col:lt(" + x + ")").show();
      el.trigger("displayChanged");
      if (x == cards_size) {
        showmore.hide();
      }
      t778__showSeparator(el, x);
      if (
        window.lazy === "y" ||
        $("#allrecords").attr("data-tilda-lazy") === "yes"
      ) {
        t_onFuncLoad("t_lazyload_update", function () {
          t_lazyload_update();
        });
      }
    });
  }
}
function t778__dict(msg) {
  var dict = [];
  dict.loadmore = {
    EN: "Load more",
    RU: "Загрузить еще",
    FR: "Charger plus",
    DE: "Mehr laden",
    ES: "Carga más",
    PT: "Carregue mais",
    UK: "Завантажити ще",
    JA: "もっと読み込む",
    ZH: "裝載更多",
  };
  var lang = window.browserLang;
  if (typeof dict[msg] !== "undefined") {
    if (typeof dict[msg][lang] !== "undefined" && dict[msg][lang] != "") {
      return dict[msg][lang];
    } else {
      return dict[msg].EN;
    }
  }
  return 'Text not found "' + msg + '"';
}
function t778__showSeparator(el, x) {
  el.find(".t778__separator_number").addClass("t778__separator_hide");
  el.find(".t778__separator_hide").each(function () {
    if ($(this).attr("data-product-separator-number") <= x) {
      $(this).removeClass("t778__separator_hide");
    }
  });
}
function t778__hoverZoom_init(recid) {
  if (window.isMobile) {
    return;
  }
  var rec = $("#rec" + recid);
  try {
    if (rec.find("[data-hover-zoom]")[0]) {
      if (!jQuery.cachedZoomScript) {
        jQuery.cachedZoomScript = function (url) {
          var options = { dataType: "script", cache: !0, url: url };
          return jQuery.ajax(options);
        };
      }
      $.cachedZoomScript(
        "https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js"
      ).done(function (script, textStatus) {
        if (textStatus == "success") {
          setTimeout(function () {
            t_hoverZoom_init(recid, ".t-slds__container");
          }, 500);
        } else {
          console.log("Upload script error: " + textStatus);
        }
      });
    }
  } catch (e) {
    console.log("Zoom image init error: " + e.message);
  }
}
function t778__updateLazyLoad(recid) {
  var scrollContainer = $("#rec" + recid + " .t778__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
    scrollContainer.bind(
      "scroll",
      t_throttle(function () {
        if (
          window.lazy === "y" ||
          $("#allrecords").attr("data-tilda-lazy") === "yes"
        ) {
          t_onFuncLoad("t_lazyload_update", function () {
            t_lazyload_update();
          });
        }
      })
    );
  }
}
function t778__alignButtons_init(recid) {
  var el = $("#rec" + recid);
  if (el.find("[data-buttons-v-align]")[0]) {
    try {
      t778__alignButtons(recid);
      $(window).bind(
        "resize",
        t_throttle(function () {
          if (
            typeof window.noAdaptive !== "undefined" &&
            window.noAdaptive === !0 &&
            window.isMobile
          ) {
            return;
          }
          t778__alignButtons(recid);
        })
      );
      el.find(".t778").bind("displayChanged", function () {
        t778__alignButtons(recid);
      });
      if (window.isMobile) {
        $(window).on("orientationchange", function () {
          t778__alignButtons(recid);
        });
      }
    } catch (e) {
      console.log("buttons-v-align error: " + e.message);
    }
  }
}
function t778__alignButtons(recid) {
  var rec = $("#rec" + recid);
  var contents = rec.find(".t778__content");
  var maxHeight = 0;
  var maxHeightBtns = 0;
  var itemsInRow = rec.find(".t-container").attr("data-blocks-per-row") * 1;
  var mobileView = $(window).width() <= 480;
  var tableView = $(window).width() <= 960 && $(window).width() > 480;
  var mobileOneRow =
    $(window).width() <= 960 && rec.find(".t778__container_mobile-flex")[0]
      ? !0
      : !1;
  var mobileTwoItemsInRow =
    $(window).width() <= 480 && rec.find(".t778 .mobile-two-columns")[0]
      ? !0
      : !1;
  if (mobileView) {
    itemsInRow = 1;
  }
  if (tableView) {
    itemsInRow = 2;
  }
  if (mobileTwoItemsInRow) {
    itemsInRow = 2;
  }
  if (mobileOneRow) {
    itemsInRow = 999999;
  }
  var i = 1;
  var textWrappersInRow = [];
  var btnWrappersInRow = [];
  $.each(contents, function (key, content) {
    var textWrapper = $(content).find(".t778__textwrapper");
    if (textWrapper.length > 0) {
      textWrapper = textWrapper[0];
      textWrapper.style.height = "auto";
      if (itemsInRow === 1) {
        textWrapper.style.height = "auto";
      } else {
        textWrappersInRow.push(textWrapper);
        if (textWrapper.offsetHeight > maxHeight) {
          maxHeight = textWrapper.offsetHeight;
        }
        if (maxHeight > 0) {
          $(textWrappersInRow).css("height", maxHeight);
        }
      }
    }
    var btnWrapper = $(content).find(".t778__btn-wrapper");
    if (btnWrapper.length > 0) {
      btnWrapper = btnWrapper[0];
      btnWrapper.style.marginTop = "";
      if (itemsInRow === 1) {
        btnWrapper.style.marginTop = "";
      } else {
        btnWrappersInRow.push(btnWrapper);
        if (btnWrapper.offsetHeight > maxHeightBtns) {
          maxHeightBtns = btnWrapper.offsetHeight;
        }
        $.each(btnWrappersInRow, function (key, btn) {
          if (maxHeightBtns > btn.offsetHeight) {
            btn.style.marginTop = maxHeightBtns - btn.offsetHeight + "px";
          }
        });
      }
    }
    if (i === itemsInRow) {
      i = 0;
      maxHeight = 0;
      textWrappersInRow = [];
      maxHeightBtns = 0;
      btnWrappersInRow = [];
    }
    i++;
  });
}
function t778_initPopup(recid) {
  var rec = $("#rec" + recid);
  rec.find('[href^="#prodpopup"]').each(function (e) {
    var el_popup = rec.find(".t-popup");
    var el_prod = $(this).closest(".js-product");
    var lid_prod = el_prod.attr("data-product-lid");
    $(".r")
      .find('a[href$="#!/tproduct/' + recid + "-" + lid_prod + '"]')
      .click(function (e) {
        if (rec.find("[data-product-lid=" + lid_prod + "]").length) {
          rec
            .find("[data-product-lid=" + lid_prod + '] [href^="#prodpopup"]')
            .triggerHandler("click");
        }
      });
  });
  rec.find('[href^="#prodpopup"]').one("click", function (e) {
    e.preventDefault();
    var el_popup = rec.find(".t-popup");
    var el_prod = $(this).closest(".js-product");
    var lid_prod = el_prod.attr("data-product-lid");
    t_onFuncLoad("t_sldsInit", function () {
      t_sldsInit(recid + " #t778__product-" + lid_prod + "");
    });
  });
  rec.find('[href^="#prodpopup"]').click(function (e) {
    e.preventDefault();
    if (
      $(e.target).hasClass("t1002__addBtn") ||
      $(e.target).parents().hasClass("t1002__addBtn")
    ) {
      return;
    }
    t778_showPopup(recid);
    var el_popup = rec.find(".t-popup");
    var el_prod = $(this).closest(".js-product");
    var lid_prod = el_prod.attr("data-product-lid");
    el_popup.find(".js-product").css("display", "none");
    var el_fullprod = el_popup.find(
      '.js-product[data-product-lid="' + lid_prod + '"]'
    );
    el_fullprod.css("display", "block");
    var analitics = el_popup.attr("data-track-popup");
    if (analitics > "") {
      var virtTitle = el_fullprod.find(".js-product-name").text();
      if (!virtTitle) {
        virtTitle = "prod" + lid_prod;
      }
      Tilda.sendEventToStatistics(analitics, virtTitle);
    }
    var curUrl = window.location.href;
    if (
      curUrl.indexOf("#!/tproduct/") < 0 &&
      curUrl.indexOf("%23!/tproduct/") < 0
    ) {
      if (typeof history.replaceState != "undefined") {
        window.history.replaceState(
          "",
          "",
          window.location.href + "#!/tproduct/" + recid + "-" + lid_prod
        );
      }
    }
    t778_updateSlider(recid + " #t778__product-" + lid_prod + "");
    setTimeout(function () {
      if (
        window.lazy === "y" ||
        $("#allrecords").attr("data-tilda-lazy") === "yes"
      ) {
        t_onFuncLoad("t_lazyload_update", function () {
          t_lazyload_update();
        });
      }
    }, 500);
  });
  if ($("#record" + recid).length == 0) {
    t778_checkUrl(recid);
  }
  t778_copyTypography(recid);
}
function t778_checkUrl(recid) {
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf("#!/tproduct/");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
    tprodIndex = curUrl.indexOf("%23!/tproduct/");
  }
  if (tprodIndex >= 0) {
    var curUrl = curUrl.substring(tprodIndex, curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf("-") + 1, curUrl.length);
    var rec = $("#rec" + recid);
    if (
      curUrl.indexOf(recid) >= 0 &&
      rec.find("[data-product-lid=" + curProdLid + "]").length
    ) {
      rec
        .find("[data-product-lid=" + curProdLid + '] [href^="#prodpopup"]')
        .triggerHandler("click");
    }
  }
}
function t778_updateSlider(recid) {
  var el = $("#rec" + recid);
  t_onFuncLoad("t_slds_SliderWidth", function () {
    t_slds_SliderWidth(recid);
  });
  var sliderWrapper = el.find(".t-slds__items-wrapper");
  var sliderWidth = el.find(".t-slds__container").width();
  var pos = parseFloat(sliderWrapper.attr("data-slider-pos"));
  sliderWrapper.css({
    transform: "translate3d(-" + sliderWidth * pos + "px, 0, 0)",
  });
  t_onFuncLoad("t_slds_UpdateSliderHeight", function () {
    t_slds_UpdateSliderHeight(recid);
  });
  t_onFuncLoad("t_slds_UpdateSliderArrowsHeight", function () {
    t_slds_UpdateSliderArrowsHeight(recid);
  });
}
function t778_showPopup(recid) {
  var el = $("#rec" + recid);
  var popup = el.find(".t-popup");
  popup.css("display", "block");
  setTimeout(function () {
    popup.find(".t-popup__container").addClass("t-popup__container-animated");
    popup.addClass("t-popup_show");
    if (
      window.lazy === "y" ||
      $("#allrecords").attr("data-tilda-lazy") === "yes"
    ) {
      t_onFuncLoad("t_lazyload_update", function () {
        t_lazyload_update();
      });
    }
  }, 50);
  $("body").addClass("t-body_popupshowed");
  $("body").trigger("twishlist_addbtn");
  el.find(".t-popup").mousedown(function (e) {
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if (e.clientX > windowWithoutScrollBar) {
      return;
    }
    if (e.target == this) {
      t778_closePopup();
    }
  });
  el.find(".t-popup__close, .t778__close-text").click(function (e) {
    t778_closePopup();
  });
  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      t778_closePopup();
    }
  });
}
function t778_closePopup() {
  $("body").removeClass("t-body_popupshowed");
  $("body").trigger("twishlist_addbtn");
  $(".t-popup").removeClass("t-popup_show");
  var curUrl = window.location.href;
  var indexToRemove = curUrl.indexOf("#!/tproduct/");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
    indexToRemove = curUrl.indexOf("%23!/tproduct/");
  }
  curUrl = curUrl.substring(0, indexToRemove);
  setTimeout(function () {
    $(".t-popup").scrollTop(0);
    $(".t-popup").not(".t-popup_show").css("display", "none");
    if (typeof history.replaceState != "undefined") {
      window.history.replaceState("", "", curUrl);
    }
  }, 300);
}
function t778_removeSizeStyles(styleStr) {
  if (
    typeof styleStr != "undefined" &&
    (styleStr.indexOf("font-size") >= 0 ||
      styleStr.indexOf("padding-top") >= 0 ||
      styleStr.indexOf("padding-bottom") >= 0)
  ) {
    var styleStrSplitted = styleStr.split(";");
    styleStr = "";
    for (var i = 0; i < styleStrSplitted.length; i++) {
      if (
        styleStrSplitted[i].indexOf("font-size") >= 0 ||
        styleStrSplitted[i].indexOf("padding-top") >= 0 ||
        styleStrSplitted[i].indexOf("padding-bottom") >= 0
      ) {
        styleStrSplitted.splice(i, 1);
        i--;
        continue;
      }
      if (styleStrSplitted[i] == "") {
        continue;
      }
      styleStr += styleStrSplitted[i] + ";";
    }
  }
  return styleStr;
}
function t778_copyTypography(recid) {
  var rec = $("#rec" + recid);
  var titleStyle = rec.find(".t778__title").attr("style");
  var descrStyle = rec.find(".t778__descr").attr("style");
  rec
    .find(".t-popup .t778__title")
    .attr("style", t778_removeSizeStyles(titleStyle));
  rec
    .find(".t-popup .t778__descr, .t-popup .t778__text")
    .attr("style", t778_removeSizeStyles(descrStyle));
}
function t778_unifyHeights(recid) {
  var t778_el = $("#rec" + recid),
    t778_blocksPerRow = t778_el
      .find(".t778__container")
      .attr("data-blocks-per-row"),
    t778_cols = t778_el.find(".t778__textwrapper"),
    t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;
  if ($(window).width() <= 480 && t778_mobScroll == 0) {
    t778_cols.css("height", "auto");
    return;
  }
  var t778_perRow = +t778_blocksPerRow;
  if ($(window).width() <= 960 && t778_mobScroll > 0) {
    var t778_perRow = t778_cols.length;
  } else {
    if ($(window).width() <= 960) {
      var t778_perRow = 2;
    }
  }
  for (var i = 0; i < t778_cols.length; i += t778_perRow) {
    var t778_maxHeight = 0,
      t778_row = t778_cols.slice(i, i + t778_perRow);
    t778_row.each(function () {
      var t778_curText = $(this).find(".t778__textwrapper"),
        t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
        t778_itemHeight =
          t778_curText.outerHeight() + t778_curBtns.outerHeight();
      if (t778_itemHeight > t778_maxHeight) {
        t778_maxHeight = t778_itemHeight;
      }
    });
    t778_row.css("height", t778_maxHeight);
  }
}
function t796_init(recId) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var container = rec.querySelector(".t796");
  if (!container) return;
  var windowWidth = window.innerWidth;
  var screenMin = rec.getAttribute("data-screen-min");
  var screenMax = rec.getAttribute("data-screen-max");
  if (screenMin && windowWidth < parseInt(screenMin, 10)) return !1;
  if (screenMax && windowWidth > parseInt(screenMax, 10)) return !1;
  var shapeBorder = rec.querySelector(".t796__shape-border");
  var shapeRecId = container.getAttribute("data-shape-rec-ids");
  if (shapeRecId) {
    shapeRecId = shapeRecId.split(",");
    for (var i = 0; i < shapeRecId.length; i++) {
      var shapeId = shapeRecId[i];
      var currentRec = document.querySelector("#rec" + shapeId);
      var currentShape = shapeBorder.cloneNode(!0);
      t796_setColor(rec, currentShape);
      t796_addDivider(currentRec, currentShape);
    }
  } else {
    var excludesBlocks = [
      215, 316, 390, 651, 702, 706, 708, 750, 756, 766, 825, 862, 868, 943,
    ];
    var excludes = "";
    for (var i = 0; i < excludesBlocks.length; i++) {
      excludes += ':not([data-record-type="' + excludesBlocks[i] + '"])';
    }
    if (excludes.slice(-1) === ",") {
      excludes = excludes.slice(0, -1);
    }
    var recs = [];
    if (
      shapeBorder.classList.contains("t796__shape-border_top") ||
      shapeBorder.classList.contains("t796__shape-border_top-flip")
    ) {
      recs = t796__nextAll(rec, excludes);
    }
    if (
      shapeBorder.classList.contains("t796__shape-border_bottom") ||
      shapeBorder.classList.contains("t796__shape-border_bottom-flip")
    ) {
      recs = t796__prevAll(rec, excludes);
    }
    if (recs.length !== 0) {
      var currentShape = shapeBorder.cloneNode(!0);
      t796_setColor(rec, currentShape);
      t796_addDivider(recs[0], currentShape);
    }
  }
}
function t796_setColor(rec, shape) {
  if (shape.getAttribute("data-fill-color")) return;
  var nearestBlock;
  if (
    shape.classList.contains("t796__shape-border_bottom") ||
    shape.classList.contains("t796__shape-border_bottom-flip")
  ) {
    var nextBlock = rec.nextElementSibling;
    if (nextBlock) {
      nearestBlock = nextBlock.matches(".r") ? nextBlock : !1;
    }
  } else {
    var prevBlock = rec.previousElementSibling;
    if (prevBlock) {
      nearestBlock = prevBlock.matches(".r") ? prevBlock : !1;
    }
  }
  if (!nearestBlock) return;
  var fillColor = nearestBlock.getAttribute("data-bg-color");
  if (!fillColor) return;
  shape.querySelector(".t796__svg").style.fill = fillColor;
}
function t796_addDivider(rec, shape) {
  if (!rec) return;
  rec.setAttribute("data-animationappear", "off");
  rec.classList.remove("r_hidden");
  var cover = rec.querySelector(".t-cover");
  var zeroBlock = rec.querySelector(".t396");
  if (cover || zeroBlock) {
    if (cover) {
      var showLayers = cover.querySelectorAll(".t557__snow-layer");
      if (showLayers.length > 0) shape.style.zIndex = 1;
      var coverFilter = cover.querySelector(".t-cover__filter");
      if (coverFilter) coverFilter.insertAdjacentElement("afterend", shape);
    }
    if (zeroBlock) {
      zeroBlock.insertAdjacentElement("afterend", shape);
      rec.style.position = "relative";
      var zeroFilter = zeroBlock.querySelector(".t396__filter");
      if (zeroFilter) {
        var zIndex = 1;
        var zeroArtboard = zeroBlock.querySelector(".t396__artboard");
        var isVisible =
          getComputedStyle(zeroArtboard, null).overflow === "visible";
        if (!isVisible) zIndex = 99;
        shape.style.zIndex = zIndex;
      }
    }
    shape.style.display = "block";
  } else {
    var wrapper = rec;
    var recordType = parseInt(rec.getAttribute("data-record-type"));
    if (!wrapper) return !0;
    wrapper.appendChild(shape);
    wrapper.style.position = "relative";
    var excludesBlocks = [
      125, 331, 554, 746, 754, 776, 778, 786, 858, 896, 897, 924, 915, 943, 951,
    ];
    if (excludesBlocks.indexOf(recordType) === -1) {
      var firstDiv = wrapper.querySelector("div");
      firstDiv.style.position = "relative";
      firstDiv.style.zIndex = "1";
      firstDiv.classList.add("t796_cont-near-shape-divider");
    }
    var blocks = [195, 279, 675, 694, 734, 823, 938];
    if (blocks.indexOf(recordType) !== -1) {
      shape.style.zIndex = 1;
    }
    shape.style.display = "block";
  }
}
function t796__nextAll(element, selector) {
  var nextElements = [];
  var nextElement = element;
  while (nextElement.nextElementSibling) {
    nextElement = nextElement.nextElementSibling;
    if (nextElement.matches(selector)) {
      nextElements.push(nextElement);
    }
  }
  return nextElements;
}
function t796__prevAll(element, selector) {
  var prevElements = [];
  var prevElement = element;
  while (prevElement.previousElementSibling) {
    prevElement = prevElement.previousElementSibling;
    if (prevElement.matches(selector)) {
      prevElements.push(prevElement);
    }
  }
  return prevElements;
}
function t890_init(recId, offset) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var container = rec.querySelector(".t890");
  if (!container) return;
  var button = rec.querySelector(".t890__arrow");
  var windowOffset = "";
  if (offset) {
    windowOffset = offset;
  } else {
    windowOffset = window.innerHeight;
  }
  rec.setAttribute("data-animationappear", "off");
  rec.style.opacity = 1;
  window.addEventListener(
    "scroll",
    t_throttle(function () {
      if (window.pageYOffset > windowOffset) {
        container.style.display = "block";
      } else {
        t890__fadeOut(container);
      }
    }, 200)
  );
  button.addEventListener("click", t890__scrollToTop);
}
function t890__fadeOut(el) {
  if (el.style.display === "none") return;
  var opacity = 1;
  var timer = setInterval(function () {
    el.style.opacity = opacity;
    opacity -= 0.1;
    if (opacity <= 0.1) {
      clearInterval(timer);
      el.style.display = "none";
      el.style.opacity = null;
    }
  }, 20);
}
function t890__scrollToTop() {
  var duration = 700;
  var start =
    (window.pageYOffset || document.documentElement.scrollTop) -
    (document.documentElement.clientTop || 0);
  var change = 0 - start;
  var currentTime = 0;
  var increment = 16;
  document.body.setAttribute("data-scrollable", "true");
  function t890__easeInOutCubic(currentTime) {
    if ((currentTime /= duration / 2) < 1) {
      return (change / 2) * currentTime * currentTime * currentTime + start;
    } else {
      return (
        (change / 2) * ((currentTime -= 2) * currentTime * currentTime + 2) +
        start
      );
    }
  }
  function t890__animateScroll() {
    currentTime += increment;
    window.scrollTo(0, t890__easeInOutCubic(currentTime));
    if (currentTime < duration) {
      setTimeout(t890__animateScroll, increment);
    } else {
      document.body.removeAttribute("data-scrollable");
    }
  }
  t890__animateScroll();
}
function t923_init(recId) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var container = rec.querySelector(".t923");
  if (!container) return;
  t923_unifyHeights(recId);
  window.addEventListener(
    "resize",
    t_throttle(function () {
      t923_unifyHeights(recId);
    })
  );
  if (typeof jQuery !== "undefined") {
    $(container).on("displayChanged", function () {
      t923_unifyHeights(recId);
    });
  } else {
    container.addEventListener("displayChanged", function () {
      t923_unifyHeights(recId);
    });
  }
  window.addEventListener("load", function () {
    t923_unifyHeights(recId);
  });
}
function t923_unifyHeights(recId) {
  var rec = document.getElementById("rec" + recId);
  if (!rec) return;
  var container = rec.querySelector(".t923");
  if (!container) return;
  var cols = rec.querySelectorAll(".t923__content");
  var maxHeight = 0;
  for (var i = 0; i < cols.length; i++) {
    cols[i].style.height = "";
  }
  for (var i = 0; i < cols.length; i++) {
    var col = cols[i];
    var colText = col.querySelector(".t923__textwrapper");
    var colBtn = col.querySelectorAll(
      ".t923__btn-wrapper, .t923__btntext-wrapper"
    )[0];
    var colHeight = colText.offsetHeight + (colBtn ? colBtn.offsetHeight : 0);
    if (colHeight > maxHeight) maxHeight = colHeight;
  }
  for (var i = 0; i < cols.length; i++) {
    cols[i].style.height = maxHeight + "px";
  }
  t_onFuncLoad("t_slds_updateSlider", function () {
    t_slds_updateSlider(recId);
  });
}
