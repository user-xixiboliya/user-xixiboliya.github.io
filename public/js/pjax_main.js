(() => {
  // <stdin>
  var getRealPath = (pathname = window.location.pathname, desc = false) => {
    const names = pathname.split("/").filter((name) => {
      name = name.trim();
      return name.length > 0 && name !== "/" && name !== "index.html";
    });
    if (desc) {
      return names[0] || "/";
    } else {
      return names[names.length - 1] || "/";
    }
  };
  var scrollIntoViewAndWait = (element) => {
    return new Promise((resolve) => {
      if ("onscrollend" in window) {
        document.addEventListener("scrollend", resolve, { once: true });
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      } else {
        element.scrollIntoView({ block: "center", inline: "center" });
        resolve();
      }
    });
  };
  _$$(
    ".article-entry h1>a, .article-entry h2>a, .article-entry h3>a, .article-entry h4>a, .article-entry h5>a, .article-entry h6>a"
  ).forEach((element) => {
    if (window.siteConfig.icon_font) {
      element.innerHTML = window.siteConfig.anchor_icon ? `&#x${window.siteConfig.anchor_icon};` : "&#xe635;";
    } else {
      element.innerHTML = window.siteConfig.anchor_icon ? `&#x${window.siteConfig.anchor_icon};` : "&#xf292;";
    }
  });
  _$$(".article-entry img").forEach(
    (element) => {
      if (element.parentElement?.classList.contains("friend-icon") || element.parentElement?.tagName === "A" || element.classList.contains("no-lightbox"))
        return;
      const a = document.createElement("a");
      a.href ? a.href = element.src : a.setAttribute("href", element.src);
      a.dataset.pswpWidth = element.naturalWidth;
      a.dataset.pswpHeight = element.naturalHeight;
      a.target = "_blank";
      a.classList.add("article-gallery-item");
      element.parentNode?.insertBefore(a, element);
      element.parentNode?.removeChild(element);
      a.appendChild(element);
    }
  );
  window.lightboxStatus = "ready";
  window.dispatchEvent(new Event("lightbox:ready"));
  var isMobileNavAnim = false;
  _$("#main-nav-toggle")?.off("click").on("click", () => {
    if (isMobileNavAnim) return;
    isMobileNavAnim = true;
    document.body.classList.toggle("mobile-nav-on");
    _$("#mask").classList.remove("hide");
    setTimeout(() => {
      isMobileNavAnim = false;
    }, 300);
  });
  _$("#mask")?.off("click").on("click", () => {
    if (isMobileNavAnim || !document.body.classList.contains("mobile-nav-on"))
      return;
    document.body.classList.remove("mobile-nav-on");
    _$("#mask").classList.add("hide");
  });
  _$$(".sidebar-toc-btn").forEach((element) => {
    element.off("click").on("click", function() {
      if (this.classList.contains("current")) return;
      _$$(".sidebar-toc-btn").forEach(
        (element2) => element2.classList.add("current")
      );
      _$$(".sidebar-common-btn").forEach(
        (element2) => element2.classList.remove("current")
      );
      _$$(".sidebar-toc-sidebar").forEach(
        (element2) => element2.classList.remove("hidden")
      );
      _$$(".sidebar-common-sidebar").forEach(
        (element2) => element2.classList.add("hidden")
      );
    });
  });
  _$$(".sidebar-common-btn").forEach((element) => {
    element.off("click").on("click", function() {
      if (this.classList.contains("current")) return;
      _$$(".sidebar-common-btn").forEach(
        (element2) => element2.classList.add("current")
      );
      _$$(".sidebar-toc-btn").forEach(
        (element2) => element2.classList.remove("current")
      );
      _$$(".sidebar-common-sidebar").forEach(
        (element2) => element2.classList.remove("hidden")
      );
      _$$(".sidebar-toc-sidebar").forEach(
        (element2) => element2.classList.add("hidden")
      );
    });
  });
  (() => {
    const rootRealPath = getRealPath(window.location.pathname);
    _$$(".sidebar-menu-link-wrap").forEach((link) => {
      let linkPath = link.querySelector("a")?.getAttribute("href");
      if (linkPath && getRealPath(linkPath) === rootRealPath) {
        link.classList.add("link-active");
      }
    });
  })();
  _$$(".article-entry img").forEach(
    (element) => {
      if (element.classList.contains("lazyload")) return;
      element.classList.add("lazyload");
      element.setAttribute("data-src", element.src);
      element.setAttribute("data-sizes", "auto");
      element.removeAttribute("src");
    }
  );
  var sidebarTop = _$(".sidebar-top");
  if (sidebarTop) {
    sidebarTop.style.transition = "opacity 1s";
    sidebarTop.off("click").on("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    if (document.documentElement.scrollTop < 10) {
      sidebarTop.style.opacity = "0";
    }
  }
  var __sidebarTopScrollHandler;
  if (__sidebarTopScrollHandler) {
    window.off("scroll", __sidebarTopScrollHandler);
  }
  __sidebarTopScrollHandler = () => {
    const sidebarTop2 = _$(".sidebar-top");
    if (document.documentElement.scrollTop < 10) {
      sidebarTop2.style.opacity = "0";
    } else {
      sidebarTop2.style.opacity = "1";
    }
  };
  window.on("scroll", __sidebarTopScrollHandler);
  _$$("#mobile-nav #TableOfContents li").forEach((element) => {
    element.off("click").on("click", () => {
      if (isMobileNavAnim || !document.body.classList.contains("mobile-nav-on"))
        return;
      document.body.classList.remove("mobile-nav-on");
      _$("#mask").classList.add("hide");
    });
  });
  _$$("#mobile-nav .sidebar-menu-link-dummy").forEach((element) => {
    element.off("click").on("click", () => {
      if (isMobileNavAnim || !document.body.classList.contains("mobile-nav-on"))
        return;
      setTimeout(() => {
        document.body.classList.remove("mobile-nav-on");
        _$("#mask").classList.add("hide");
      }, 200);
    });
  });
  function tocInit() {
    if (!_$("#sidebar")) return;
    const navItems = getComputedStyle(_$("#sidebar")).display === "block" ? _$$("#sidebar .sidebar-toc-wrapper li") : _$$("#mobile-nav .sidebar-toc-wrapper li");
    if (!navItems.length) return;
    let activeLock = null;
    const anchorScroll = (event, index) => {
      event.preventDefault();
      const target = document.getElementById(
        decodeURI(event.currentTarget.getAttribute("href")).slice(1)
      );
      activeLock = index;
      scrollIntoViewAndWait(target).then(() => {
        activateNavByIndex(index);
        activeLock = null;
      });
    };
    const sections = [...navItems].map((element, index) => {
      const link = element.querySelector("a");
      link.off("click").on("click", (e) => anchorScroll(e, index));
      const anchor = document.getElementById(
        decodeURI(link.getAttribute("href")).slice(1)
      );
      if (!anchor) return null;
      const alink = anchor.querySelector("a");
      alink?.off("click").on("click", (e) => anchorScroll(e, index));
      return anchor;
    });
    const activateNavByIndex = (index) => {
      const target = navItems[index];
      if (!target || target.classList.contains("current")) return;
      _$$(".sidebar-toc-wrapper .active").forEach((element) => {
        element.classList.remove("active", "current");
      });
      sections.forEach((element) => {
        element?.classList.remove("active");
      });
      target.classList.add("active", "current");
      sections[index]?.classList.add("active");
      let parent = target.parentNode;
      while (!parent.matches(".sidebar-toc")) {
        if (parent.matches("li")) {
          parent.classList.add("active");
          const t = document.getElementById(
            decodeURI(parent.querySelector("a").getAttribute("href").slice(1))
          );
          if (t) {
            t.classList.add("active");
          }
        }
        parent = parent.parentNode;
      }
      if (_$(".sidebar-toc-sidebar").classList.contains("hidden")) {
        const tocWrapper = _$(".sidebar-toc-wrapper");
        tocWrapper.scrollTo({
          top: tocWrapper.scrollTop + target.offsetTop - tocWrapper.offsetHeight / 2,
          behavior: "smooth"
        });
      }
    };
    const findIndex = (entries) => {
      let index = 0;
      let entry = entries[index];
      if (entry.boundingClientRect.top > 0) {
        index = sections.indexOf(entry.target);
        return index === 0 ? 0 : index - 1;
      }
      for (; index < entries.length; index++) {
        if (entries[index].boundingClientRect.top <= 0) {
          entry = entries[index];
        } else {
          return sections.indexOf(entry.target);
        }
      }
      return sections.indexOf(entry.target);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const index = findIndex(entries) + (window.diffY > 0 ? 1 : 0);
        if (activeLock === null) {
          activateNavByIndex(index);
        }
      },
      {
        rootMargin: "0px 0px -100% 0px",
        threshold: 0
      }
    );
    sections.forEach((element) => {
      element && observer.observe(element);
    });
  }
  tocInit();
  _$(".sponsor-button-wrapper")?.off("click").on("click", () => {
    _$(".sponsor-button-wrapper")?.classList.toggle("active");
    _$(".sponsor-tip")?.classList.toggle("active");
    _$(".sponsor-qr")?.classList.toggle("active");
  });
  _$(".share-icon.icon-weixin")?.off("click").on("click", function(e) {
    const iconPosition = this.getBoundingClientRect();
    const shareWeixin = this.querySelector("#share-weixin");
    if (iconPosition.x - 148 < 0) {
      shareWeixin.style.left = `-${iconPosition.x - 10}px`;
    } else if (iconPosition.x + 172 > window.innerWidth) {
      shareWeixin.style.left = `-${310 - window.innerWidth + iconPosition.x}px`;
    } else {
      shareWeixin.style.left = "-138px";
    }
    if (e.target === this) {
      shareWeixin.classList.toggle("active");
    }
    if (_$(".share-weixin-canvas").children.length) {
      return;
    }
    const { cover, description, title, author } = window.REIMU_POST;
    _$("#share-weixin-banner").src = cover;
    _$("#share-weixin-title").innerText = title;
    _$("#share-weixin-desc").innerText = description.replace(/\s/g, " ");
    _$("#share-weixin-author").innerText = "By: " + author;
    QRCode.toDataURL(window.REIMU_POST.url, function(error, dataUrl) {
      if (error) {
        console.error(error);
        return;
      }
      _$("#share-weixin-qr").src = dataUrl;
      htmlToImage.toPng(_$(".share-weixin-dom"), {
        skipFonts: true,
        preferredFontFormat: "woff2",
        backgroundColor: "white"
      }).then((dataUrl2) => {
        const img = new Image();
        img.src = dataUrl2;
        _$(".share-weixin-canvas").appendChild(img);
      }).catch(() => {
        _$("#share-weixin-banner").remove();
        htmlToImage.toPng(_$(".share-weixin-dom"), {
          skipFonts: true,
          preferredFontFormat: "woff2",
          backgroundColor: "white"
        }).then((dataUrl2) => {
          const img = new Image();
          img.src = dataUrl2;
          _$(".share-weixin-canvas").appendChild(img);
        }).catch(() => {
          console.error("Failed to generate weixin share image.");
        });
      });
    });
  });
})();
