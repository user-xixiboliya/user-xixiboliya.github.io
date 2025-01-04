(() => {
  const codeFigcaption = `
  <div class="code-figcaption">
    <div class="code-left-wrap">
      <div class="code-decoration"></div>
      <div class="code-lang"></div>
    </div>
    <div class="code-right-wrap">
      <div class="code-copy icon-copy"></div>
      <div class="icon-chevron-down code-expand"></div>
    </div>
  </div>`;
  const reimuConfig = window.siteConfig?.code_block || {};
  const expandThreshold = reimuConfig.expand;
  _$$("div.highlight").forEach((element) => {
    if (!element.querySelector(".code-figcaption")) {
      element.insertAdjacentHTML("afterbegin", codeFigcaption);
    }
    if (expandThreshold !== undefined) {
      if (
        expandThreshold === false ||
        (typeof expandThreshold === "number" &&
          element.querySelectorAll("code[data-lang] .line").length > expandThreshold)
      ) {
        element.classList.add("code-closed");
      }
    }
  });
  // 代码收缩
  _$$(".code-expand").forEach((element) => {
    element.off("click").on("click", () => {
      const figure = element.closest("div.highlight");
      if (figure.classList.contains("code-closed")) {
        figure.classList.remove("code-closed");
      } else {
        figure.classList.add("code-closed");
      }
    });
  });

  // 代码语言
  _$$("div.highlight").forEach((element) => {
    // 判断是否有line-numbers
    let code: HTMLElement;
    if (element.querySelector("table")) {
      code = element.querySelector("tr td:last-of-type code") as HTMLElement;
    } else {
      code = element.querySelector("code") as HTMLElement;
    }
    if (!code) {
      return;
    }
    const codeLanguage = code.dataset.lang;
    if (!codeLanguage) {
      return;
    }
    const langName = codeLanguage
      .replace("line-numbers", "")
      .trim()
      .replace("language-", "")
      .trim()
      .toUpperCase();

    const wrapper = code.closest(".highlight");
    if (wrapper) {
      const lang = wrapper.querySelector(".code-lang") as HTMLDivElement;
      if (lang) {
        lang.innerText = langName;
      }
    }
  });

  if (!window.ClipboardJS) {
    return;
  }

  // 代码复制
  const clipboard = new ClipboardJS(".code-copy", {
    text: (trigger) => {
      const selection = window.getSelection();
      const range = document.createRange();

      let td =
        trigger.parentNode.parentNode.parentNode.querySelector(
          "tr td:last-of-type",
        );

      if (!td) {
        td = trigger.parentNode.parentNode.parentNode.querySelector("code");
      }

      range.selectNodeContents(td);
      selection.removeAllRanges();
      selection.addRange(range);

      let selectedText = selection.toString();
      if (window.siteConfig.clipboard.copyright?.enable) {
        if (
          selectedText.length >= window.siteConfig.clipboard.copyright?.count
        ) {
          selectedText =
            selectedText +
              "\n\n" +
              window.siteConfig.clipboard.copyright?.content || "";
        }
      }
      return selectedText;
    },
  });
  clipboard.on("success", (e) => {
    e.trigger.classList.add("icon-check");
    e.trigger.classList.remove("icon-copy");
    _$("#copy-tooltip").innerText = window.siteConfig.clipboard.success;
    _$("#copy-tooltip").style.opacity = "1";
    setTimeout(() => {
      _$("#copy-tooltip").style.opacity = "0";
      e.trigger.classList.add("icon-copy");
      e.trigger.classList.remove("icon-check");
    }, 1000);
    e.clearSelection();
  });

  clipboard.on("error", (e) => {
    e.trigger.classList.add("icon-times");
    e.trigger.classList.remove("icon-copy");
    _$("#copy-tooltip").innerText = window.siteConfig.clipboard.fail;
    _$("#copy-tooltip").style.opacity = "1";
    setTimeout(() => {
      _$("#copy-tooltip").style.opacity = "0";
      e.trigger.classList.add("icon-copy");
      e.trigger.classList.remove("icon-times");
    }, 1000);
  });

  // clear clipboard when pjax:send
  if (window.Pjax) {
    window.addEventListener(
      "pjax:send",
      () => {
        clipboard.destroy();
      },
      { once: true },
    );
  }
})();
