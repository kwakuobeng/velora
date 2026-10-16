/* Velora — shared JS: nav, form validation, photo upload preview */

(function () {
  "use strict";

  /* —— Mobile nav —— */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* —— Quote form —— */
  var form = document.getElementById("quote-form");
  if (!form) return;

  var fileInput = document.getElementById("photos");
  var uploadZone = document.getElementById("upload-zone");
  var previewGrid = document.getElementById("preview-grid");
  var formCard = document.getElementById("form-card");
  var formSuccess = document.getElementById("form-success");
  var errorBanner = document.getElementById("form-error-banner");
  var submitBtn = document.getElementById("submit-btn");
  var selectedFiles = [];
  var MAX_FILES = 5;
  var MAX_SIZE = 5 * 1024 * 1024; // 5 MB each

  function showError(input, message) {
    input.classList.add("error");
    var group = input.closest(".form-group");
    var err = group && group.querySelector(".field-error");
    if (err) {
      err.textContent = message;
      err.classList.add("show");
    }
  }

  function clearError(input) {
    input.classList.remove("error");
    var group = input.closest(".form-group");
    var err = group && group.querySelector(".field-error");
    if (err) {
      err.textContent = "";
      err.classList.remove("show");
    }
  }

  function validateField(input) {
    clearError(input);
    var val = (input.value || "").trim();

    if (input.hasAttribute("required") && !val) {
      showError(input, "This field is required.");
      return false;
    }

    if (input.type === "tel" && val) {
      var digits = val.replace(/\D/g, "");
      if (digits.length < 10) {
        showError(input, "Enter a valid 10-digit phone number.");
        return false;
      }
    }

    if (input.type === "email" && val) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError(input, "Enter a valid email address.");
        return false;
      }
    }

    return true;
  }

  form.querySelectorAll("input, select, textarea").forEach(function (el) {
    if (el.type === "file") return;
    el.addEventListener("blur", function () { validateField(el); });
    el.addEventListener("input", function () {
      if (el.classList.contains("error")) validateField(el);
    });
  });

  /* File upload */
  function renderPreviews() {
    previewGrid.innerHTML = "";
    selectedFiles.forEach(function (file, idx) {
      var item = document.createElement("div");
      item.className = "preview-item";

      var img = document.createElement("img");
      img.alt = file.name;
      img.src = URL.createObjectURL(file);
      img.onload = function () { URL.revokeObjectURL(img.src); };

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "remove-btn";
      btn.setAttribute("aria-label", "Remove " + file.name);
      btn.innerHTML = "&times;";
      btn.addEventListener("click", function () {
        selectedFiles.splice(idx, 1);
        syncFileInput();
        renderPreviews();
      });

      item.appendChild(img);
      item.appendChild(btn);
      previewGrid.appendChild(item);
    });
  }

  function syncFileInput() {
    var dt = new DataTransfer();
    selectedFiles.forEach(function (f) { dt.items.add(f); });
    fileInput.files = dt.files;
  }

  function addFiles(fileList) {
    var incoming = Array.prototype.slice.call(fileList);
    for (var i = 0; i < incoming.length; i++) {
      if (selectedFiles.length >= MAX_FILES) {
        alert("You can upload up to " + MAX_FILES + " photos.");
        break;
      }
      var f = incoming[i];
      if (!f.type.match(/^image\//)) {
        alert('"' + f.name + '" is not an image. Please choose JPG, PNG, or WebP.');
        continue;
      }
      if (f.size > MAX_SIZE) {
        alert('"' + f.name + '" is larger than 5 MB.');
        continue;
      }
      selectedFiles.push(f);
    }
    syncFileInput();
    renderPreviews();
  }

  if (uploadZone && fileInput) {
    uploadZone.addEventListener("click", function () { fileInput.click(); });
    uploadZone.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fileInput.click();
      }
    });

    fileInput.addEventListener("change", function () {
      addFiles(fileInput.files);
    });

    ["dragenter", "dragover"].forEach(function (evt) {
      uploadZone.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.add("dragover");
      });
    });

    ["dragleave", "drop"].forEach(function (evt) {
      uploadZone.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.remove("dragover");
      });
    });

    uploadZone.addEventListener("drop", function (e) {
      addFiles(e.dataTransfer.files);
    });
  }

  /* Submit via Formspree (AJAX for success UX without leaving page) */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (errorBanner) errorBanner.classList.remove("show");

    var fields = form.querySelectorAll("input:not([type=file]), select, textarea");
    var valid = true;
    fields.forEach(function (el) {
      if (!validateField(el)) valid = false;
    });

    if (!valid) {
      var first = form.querySelector(".error");
      if (first) first.focus();
      return;
    }

    var action = form.getAttribute("action") || "";
    if (action.indexOf("YOUR_FORMSPREE_ID") !== -1) {
      if (errorBanner) {
        errorBanner.textContent =
          "Formspree is not configured yet. Replace YOUR_FORMSPREE_ID in quote.html with your real Formspree form ID, then try again.";
        errorBanner.classList.add("show");
      }
      return;
    }

    submitBtn.classList.add("btn-loading");
    submitBtn.textContent = "Sending…";

    var data = new FormData(form);
    // Ensure photos from our managed list are attached
    data.delete("photos");
    selectedFiles.forEach(function (f) {
      data.append("photos", f, f.name);
    });

    fetch(action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = "none";
          if (formCard) {
            var sidebar = document.querySelector(".form-sidebar");
            if (sidebar) sidebar.style.display = "none";
          }
          if (formSuccess) formSuccess.classList.add("show");
          form.reset();
          selectedFiles = [];
          renderPreviews();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          return res.json().then(function (body) {
            throw new Error((body && body.error) || "Submission failed. Please try again.");
          });
        }
      })
      .catch(function (err) {
        if (errorBanner) {
          errorBanner.textContent =
            err.message || "Something went wrong. Please try again or call us.";
          errorBanner.classList.add("show");
        }
      })
      .finally(function () {
        submitBtn.classList.remove("btn-loading");
        submitBtn.textContent = "Get Quote";
      });
  });
})();
