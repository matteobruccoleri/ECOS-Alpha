const allBtnDownload = document.querySelectorAll(".btn_blue");
const parcoursBtnDownload = document.querySelectorAll(".parcours_phase_btn");
const modalDownloadAppli = document.querySelector(".modal_download_wrapper");
const modal = document.querySelector(".modal_download");

allBtnDownload.forEach((btnDownload) => {
  btnDownload.addEventListener("click", () => {
    modalDownloadAppli.style.visibility = "visible";
    modalDownloadAppli.classList.add("display");
    modal.classList.add("anim_download");
  });
});

parcoursBtnDownload.forEach((btnDownload) => {
  btnDownload.addEventListener("click", () => {
    modalDownloadAppli.style.visibility = "visible";
    modalDownloadAppli.classList.add("display");
    modal.classList.add("anim_download");
  });
});

const close_modal = document.querySelector(".modal_close");
close_modal.addEventListener("click", () => {
  modal.classList.remove("anim_download");
  modalDownloadAppli.style.visibility = "hidden";
  modalDownloadAppli.classList.remove("display");
});

// Écouter les événements mousedown sur le document entier
document.addEventListener("mousedown", (event) => {
  // Vérifier si le clic a été effectué en dehors du marqueur
  if (
    !event.target.closest(".modal_download") &&
    event.target.closest(".modal_download_wrapper")
  ) {
    modal.classList.remove("anim_download");
    modalDownloadAppli.classList.remove("display");
    setTimeout(() => {
      modalDownloadAppli.style.visibility = "hidden";
    }, 100);
  }
});

//Parcours
const imagesParRole = {
  medecin: ["img/medecin-1.png", "img/medecin-2.png", "img/medecin-3.png"],
  patient: ["img/medecin-1.png", "img/medecin-2.png"],
  evaluateur: [
    "img/medecin-1.png",
    "img/medecin-2.png",
    "img/evaluateur-3.png",
  ],
};
let roleActif = "medecin";

//Progress bar
function adjustProgressBar() {
  const activePhases = Array.from(
    document.querySelectorAll(".parcours_phase")
  ).filter((phase) => phase.style.display !== "none");
  const progressBar = document.querySelector(".parcours_progress_bar");

  if (activePhases.length > 1) {
    const startTop =
      activePhases[0].getBoundingClientRect().top + window.scrollY;
    const endTop =
      activePhases[activePhases.length - 1].getBoundingClientRect().top +
      window.scrollY;
    const height = endTop - startTop;

    progressBar.style.height = `${height}px`;
  }
}

document.addEventListener("scroll", function () {
  const phases = document.querySelectorAll(".parcours_phase");
  const progressFill = document.querySelector(".progress_fill");
  const progressBar = document.querySelector(".parcours_progress_bar");
  let windowHeight = window.innerHeight;
  let triggerPoint = windowHeight * 0.6;
  let lastActivePhaseIndex = -1;

  const progressFillMaxHeight = progressBar.offsetHeight;
  progressFill.style.maxHeight = `${progressFillMaxHeight}px`;

  phases.forEach((phase, index) => {
    let phaseTop = phase.getBoundingClientRect().top;
    let phaseDisplay = window.getComputedStyle(phase).display;

    if (phase.classList.contains("phase-active")) {
      lastActivePhaseIndex = index;
    }

    if (phaseTop < triggerPoint && phaseDisplay !== "none") {
      phase.classList.add("phase-active");

      if (imagesParRole[roleActif] && imagesParRole[roleActif][index]) {
        document.querySelector(".parcours_img").src =
          imagesParRole[roleActif][index];
      }

      if (index === 1) {
        let fillPercentage = Math.min(
          100,
          Math.max(0, (1 - phaseTop / triggerPoint) * 100)
        );
        progressFill.style.height = `${fillPercentage}%`;
      }
    } else {
      phase.classList.remove("phase-active");
      if (index === 1) {
        progressFill.style.height = `0%`;
      }
    }
  });

  if (window.innerWidth > 1024) {
    if (lastActivePhaseIndex !== -1) {
      updatePopupContent(lastActivePhaseIndex);
    }
  }
});

//changer la taille de la progress bar dynamiquement
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const targetElement = mutation.target;
      if (targetElement.classList.contains("phase-active")) {
        adjustProgressBar();
      }
    }
  });
});
const phases = document.querySelectorAll(".parcours_phase");
phases.forEach(function (phase) {
  observer.observe(phase, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

//Popup
document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("open_popup");
  const closeX = document.getElementById("close_popup");
  const closeButton = document.getElementById("btn_close_popup");
  const popupContainer = document.querySelector(".popup_container");

  // Fonction pour ouvrir la popup
  function openPopup() {
    popupContainer.classList.add("active");
    console.log("popup ouverte");
  }

  // Fonction pour fermer la popup
  function closePopup() {
    popupContainer.classList.remove("active");
  }

  document.querySelectorAll(".parcours_img_button").forEach((button) => {
    button.addEventListener("click", function () {
      openPopup();
    });
  });
  openButton.addEventListener("click", openPopup);
  closeButton.addEventListener("click", closePopup);
  closeX.addEventListener("click", closePopup);

  // Fermer la popup en cliquant sur l'arrière-plan
  popupContainer.addEventListener("click", function (event) {
    if (event.target === popupContainer) {
      closePopup();
    }
  });

  // Empêcher la fermeture de la popup lors du clic sur son contenu
  document.querySelector(".popup").addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

//Mise à jour du contenu de la popup
function updatePopupContent(phaseIndex) {
  const popupTitle = document.querySelector(".popup_title");
  const popupText = document.querySelector(".popup_text");
  const popupImage = document.querySelector(".popup_img");

  popupTitle.style.background = "";
  popupTitle.style.backgroundClip = "";
  popupTitle.style.webkitBackgroundClip = "";
  popupTitle.style.webkitTextFillColor = "";

  switch (phaseIndex) {
    case 0:
      popupTitle.textContent = "Étape 1";
      popupTitle.style.background =
        "linear-gradient(87deg, #0A68CF 3.41%, #469EFF 28.39%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
      popupImage.src = "./img/iphone-7.png";
      break;
    case 1:
      popupTitle.textContent = "Étape 2";
      popupTitle.style.background =
        "linear-gradient(265deg, #FFE9E9 65.15%, #FF7474 79.87%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
      popupImage.src = "./img/iphone-7.png";
      break;
    case 2:
      popupTitle.textContent = "Étape 3";
      popupTitle.style.background =
        "linear-gradient(260deg, #FFEED3 54.11%, #FFB850 83.54%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
      popupImage.src = "./img/iphone-8.png";
      break;
    case 3:
      popupTitle.textContent = "Étape 1";
      popupTitle.style.background =
        "linear-gradient(87deg, #0A68CF 3.41%, #469EFF 28.39%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
      popupImage.src = "./img/iphone-10.png";
      break;
    case 4:
      popupTitle.textContent = "Étape 2";
      popupTitle.style.background =
        "linear-gradient(265deg, #FFE9E9 65.15%, #FF7474 79.87%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
      popupImage.src = "./img/iphone-10.png";
      break;
    case 5:
      popupTitle.textContent = "Étape 3";
      popupTitle.style.background =
        "linear-gradient(260deg, #FFEED3 54.11%, #FFB850 83.54%)";
      popupTitle.style.backgroundClip = "text";
      popupTitle.style.webkitBackgroundClip = "text";
      popupTitle.style.webkitTextFillColor = "transparent";
      popupText.textContent =
        "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
      popupImage.src = "./img/iphone-9.png";
      break;
  }
}

//onglets mobile
document.getElementById("btn_phase_1").addEventListener("click", function () {
  updatePopupContent(3);
});
document.getElementById("btn_phase_2").addEventListener("click", function () {
  updatePopupContent(4);
});
document.getElementById("btn_phase_3").addEventListener("click", function () {
  updatePopupContent(5);
});

//Onglets
function changeTab() {
  const links = document.querySelectorAll(".parcours_nav a");
  const navBackground = document.querySelector(".nav-background");
  const phase_1 = document.getElementById("phase_1");
  const phase_2 = document.getElementById("phase_2");
  const phase_3 = document.getElementById("phase_3");
  const texte_1 = document.getElementById("texte_phase_1");
  const texte_2 = document.getElementById("texte_phase_2");
  const texte_3 = document.getElementById("texte_phase_3");
  const phase_1_numero = document.getElementById("titre_phase_1");
  const phase_2_numero = document.getElementById("titre_phase_2");
  const phase_3_numero = document.getElementById("titre_phase_3");
  const image = document.querySelector(".parcours_img");
  const phase_3_container = document.getElementById("phase_3_container");
  const phase_2_container = document.getElementById("phase_2_container");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const linkWidth = this.offsetWidth;
      const linkLeftOffset = this.offsetLeft;
      navBackground.style.width = `${linkWidth}px`;
      navBackground.style.transform = `translateX(${linkLeftOffset}px)`;

      document
        .querySelector(".parcours_nav a.active")
        ?.classList.remove("active");
      this.classList.add("active");

      roleActif = this.getAttribute("data-role");
      image.src = imagesParRole[roleActif][0];

      const role = this.getAttribute("data-role");

      switch (role) {
        case "medecin":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent =
            "Préparation des étudiants. Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
          phase_2.textContent = "Simulation";
          texte_2.textContent =
            "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
          phase_3.textContent = "Résultat";
          texte_3.textContent =
            "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          break;
        case "patient":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Test tab 2";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Test tab 2";
          phase_1_numero.textContent = "Phase 1/2";
          phase_2_numero.textContent = "Phase 2/2";
          phase_2_container.style.marginBottom = "300px";
          phase_3_container.style.display = "none";
          break;
        case "evaluateur":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Test tab 3";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Test tab 3";
          phase_3.textContent = "Résultat";
          texte_3.textContent = "Test tab 3";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          break;
      }
      adjustProgressBar();
    });
  });
  document.querySelector(".parcours_nav a[data-role='medecin']").click();

  if (links.length > 0) {
    links[0].dispatchEvent(new Event("click"));
  }
}

//Onglets responsive
function changeTabMobile() {
  const links = document.querySelectorAll(".parcours_nav a");
  const navBackground = document.querySelector(".nav-background");
  const phase_1 = document.getElementById("phase_1_mobile");
  const phase_2 = document.getElementById("phase_2_mobile");
  const phase_3 = document.getElementById("phase_3_mobile");
  const texte_1 = document.getElementById("texte_phase_1_mobile");
  const texte_2 = document.getElementById("texte_phase_2_mobile");
  const texte_3 = document.getElementById("texte_phase_3_mobile");
  const phase_1_numero = document.getElementById("titre_phase_1_mobile");
  const phase_2_numero = document.getElementById("titre_phase_2_mobile");
  const phase_3_numero = document.getElementById("titre_phase_3_mobile");
  const image = document.querySelector(".parcours_img");
  const phase_3_img = document.getElementById("evaluateur_img");
  const phase_3_container = document.getElementById("phase_3_container_mobile");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const linkWidth = this.offsetWidth;
      const linkLeftOffset = this.offsetLeft;
      navBackground.style.width = `${linkWidth}px`;
      navBackground.style.transform = `translateX(${linkLeftOffset}px)`;

      document
        .querySelector(".parcours_nav a.active")
        ?.classList.remove("active");
      this.classList.add("active");

      roleActif = this.getAttribute("data-role");
      image.src = imagesParRole[roleActif][0];

      const role = this.getAttribute("data-role");

      switch (role) {
        case "medecin":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent =
            "Préparation des étudiants. Le patient prend connaissance de sa fiche, et l'évaluateur de sa grille. Lorsqu'ils sont prêts, le médecin lance le chronomètre pour lire les consignes";
          phase_2.textContent = "Simulation";
          texte_2.textContent =
            "Lorsqu'il est prêt, le médecin lance un nouveau chronomètre pour lancer la partie";
          phase_3.textContent = "Résultat";
          texte_3.textContent =
            "L'évaluateur termine son évaluation, même après 8 minutes. Le médecin a ensuite accès à la grille et la correction détaillée";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          phase_3_img.src = "./img/medecin-3.png";
          break;
        case "patient":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Test tab 2";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Test tab 2";
          phase_1_numero.textContent = "Phase 1/2";
          phase_2_numero.textContent = "Phase 2/2";
          phase_3_container.style.display = "none";
          break;
        case "evaluateur":
          phase_1.textContent = "Préparation des joueurs";
          texte_1.textContent = "Test tab 3";
          phase_2.textContent = "Simulation";
          texte_2.textContent = "Test tab 3";
          phase_3.textContent = "Résultat";
          texte_3.textContent = "Test tab 3";
          phase_3_container.style.display = "flex";
          phase_1_numero.textContent = "Phase 1/3";
          phase_2_numero.textContent = "Phase 2/3";
          phase_3_numero.textContent = "Phase 3/3";
          phase_3_img.src = "./img/evaluateur-3.png";
          break;
      }
    });
  });
  document.querySelector(".parcours_nav a[data-role='medecin']").click();

  if (links.length > 0) {
    links[0].dispatchEvent(new Event("click"));
  }
}
function adjustBehaviorBasedOnScreenSize() {
  if (window.innerWidth < 1024) {
    changeTabMobile();
  } else {
    changeTab();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  adjustBehaviorBasedOnScreenSize();
});
window.addEventListener("resize", adjustBehaviorBasedOnScreenSize);

//phase 3 inactive en desktop
function toggleDivVisibility() {
  const div = document.getElementById("phase_3_container_mobile");
  if (window.innerWidth < 1024) {
    div.style.display = "flex";
  } else {
    div.style.display = "none";
  }
}
window.addEventListener("resize", toggleDivVisibility);
toggleDivVisibility();
