// Variable to track menu state
let menuIsOpen = false;

// Variable to store the last focused element
let lastFocusedElement;

// Function to handle Esc key press for closing the menu
function handleMenuEscPress(event) {
  const profileContainer = document.querySelector("#store-dropdown-container");
  const alertsContainer = document.querySelector("#alerts-container");

  if (event.key === "Escape") {
    if (profileContainer.classList.contains("menu-active")) {
      closeMenu(profileContainer);
      lastFocusedElement.focus(); // Return focus to the last focused element
    }

    if (alertsContainer.classList.contains("menu-active")) {
      closeMenu(alertsContainer);
      document.querySelector("#notification-box").focus(); // Return focus to the notification box
    }
  }
}

// Function to open the menu
function openMenu(target) {
  target.classList.add("menu-active");
  const allMenuItems = target.querySelectorAll("[role='menuitem']");
  lastFocusedElement = document.activeElement; // Store the currently focused element
  allMenuItems[0].focus();
  menuIsOpen = true;

  // Add event listeners to each menu item for arrow key navigation
  allMenuItems.forEach((menuItem, index) => {
    menuItem.addEventListener("keydown", (event) =>
      handleArrowKeys(event, index, allMenuItems, target)
    );
  });
}

// Function to close the menu
function closeMenu(target) {
  target.classList.remove("menu-active");
  menuIsOpen = false;

  // Additional logic if needed when closing the menu
}

// Function to handle arrow key navigation within the menu
function handleArrowKeys(event, currentIndex, allMenuItems, target) {
  const key = event.key;

  if ((key === "ArrowUp" || key === "ArrowLeft") && currentIndex > 0) {
    allMenuItems[currentIndex - 1].focus();
  } else if (
    (key === "ArrowDown" || key === "ArrowRight") &&
    currentIndex < allMenuItems.length - 1
  ) {
    allMenuItems[currentIndex + 1].focus();
  } else if (
    (key === "ArrowLeft" || key === "ArrowUp") &&
    target === document.querySelector("#store-dropdown-container")
  ) {
    closeMenu(target);
    lastFocusedElement.focus(); // Return focus to the last focused element
  } else if (
    (key === "ArrowRight" || key === "ArrowDown") &&
    target === document.querySelector("#store-dropdown-container")
  ) {
    // Handle right arrow key if needed
  }

  // Check if focus is on the last element and the arrow key is "ArrowDown" or "ArrowRight"
  if ((key === "ArrowUp" || key === "ArrowLeft") && currentIndex === 0) {
    allMenuItems[allMenuItems.length - 1].focus(); // Set focus to the last element
  } else if (
    (key === "ArrowDown" || key === "ArrowRight") &&
    currentIndex === allMenuItems.length - 1
  ) {
    allMenuItems[0].focus(); // Set focus to the first element
  }
}

// Function to toggle the visibility of alerts or profile menu and handle menu state
function toggleMenu(event, target) {
  event.stopPropagation();

  if (
    event.key === "Enter" ||
    event.code === "Space" ||
    event.type === "click"
  ) {
    if (target.classList.contains("menu-active")) {
      closeMenu(target);
      lastFocusedElement.focus(); // Return focus to the last focused element
    } else {
      openMenu(target);
    }

    const isAriaExpandedDefined =
      event.target.getAttribute("aria-expanded") !== null;
    const isExpanded = isAriaExpandedDefined
      ? event.target.getAttribute("aria-expanded")
      : event.target.parentNode.getAttribute("aria-expanded");

    const newExpandedValue = isExpanded !== "true" ? "true" : "false";

    if (isAriaExpandedDefined) {
      event.target.setAttribute("aria-expanded", newExpandedValue);
    } else {
      event.target.parentNode.setAttribute("aria-expanded", newExpandedValue);
    }
  }
}

// Event listeners
document
  .querySelector("#notification-box")
  .addEventListener("click", (event) =>
    toggleMenu(event, document.querySelector("#alerts-container"))
  );
document
  .querySelector("#notification-box")
  .addEventListener("keyup", (event) => {
    if (event.key === "Enter" || event.code === "Space") {
      toggleMenu(event, document.querySelector("#alerts-container"));
    }
  });

document
  .querySelector("#profile-box")
  .addEventListener("click", (event) =>
    toggleMenu(event, document.querySelector("#store-dropdown-container"))
  );
document.querySelector("#profile-box").addEventListener("keyup", (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    toggleMenu(event, document.querySelector("#store-dropdown-container"));
  }
});

document.addEventListener("keyup", handleMenuEscPress);

function expandSetupGuide() {
  let setupGuideContainer = document.querySelector("#setup-guide-card");
  let arrowUp = document.querySelector("#arrow-up");
  let arrowDown = document.querySelector("#arrow-down");

  setupGuideContainer.style.height = "100%";
  arrowUp.style.display = "block";
  arrowDown.style.display = "none";
  document
    .querySelector("#setup-guide-chevron")
    .setAttribute("aria-label", "close setup guide");
}

function shrinkSetupGuide() {
  let setupGuideContainer = document.querySelector("#setup-guide-card");
  let arrowUp = document.querySelector("#arrow-up");
  let arrowDown = document.querySelector("#arrow-down");

  setupGuideContainer.style.height = "0px";
  arrowUp.style.display = "none";
  arrowDown.style.display = "block";
  document
    .querySelector("#setup-guide-chevron")
    .setAttribute("aria-label", "open setup guide");
}

function dismissTrial() {
  let selectPlanContainer = document.querySelector("#select-a-plan");
  selectPlanContainer.style.display = "none";
}

document
  .querySelector("#dismiss-trial")
  .addEventListener("click", dismissTrial);
document.querySelector("#dismiss-trial").addEventListener("keyup", (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    dismissTrial();
  }
});

document.querySelector("#arrow-up").addEventListener("click", shrinkSetupGuide);

document
  .querySelector("#arrow-down")
  .addEventListener("click", expandSetupGuide);
document
  .querySelector("#setup-guide-chevron")
  .addEventListener("keyup", (event) => {
    if (event.key === "Enter" || event.code === "Space") {
      let setupGuideContainer = document.querySelector("#setup-guide-card");
      if (setupGuideContainer.style.height == "0px") expandSetupGuide();
      else shrinkSetupGuide();
    }
  });

// Close menus if clicked outside the container
window.onclick = function (event) {
  let alertsContainer = document.querySelector("#alerts-container");
  let profileContainer = document.querySelector("#store-dropdown-container");

  let alertsButton = document.querySelector("#notification-box");
  let profileButton = document.querySelector("#profile-box");

  if (event.target !== alertsContainer && event.target !== alertsButton) {
    alertsContainer.classList.remove("menu-active");
  }

  if (event.target !== profileContainer && event.target !== profileButton) {
    profileContainer.classList.remove("menu-active");
  }
};

const guides = {
  1: "customize-store",
  2: "add-product",
  3: "add-domain",
  4: "name-store",
  5: "payment-provider",
};
let currentGuide = 1;

function mininizeAll() {
  for (let i = 1; i <= Object.keys(guides).length; i++) {
    if (i !== currentGuide) {
      document.querySelector(`#${guides[i]}-large`).style.height = "0px";
      document.querySelector(`#${guides[i]}-large`).style.padding = "0px";
      document.querySelector(`#${guides[i]}-mini`).style.display = "flex";
    }
  }
}

function showGuideMini(guide_num) {
  document.querySelector(`#${guides[guide_num]}-mini`).style.display = "flex";
}

function hideGuideMini(guide_num) {
  document.querySelector(`#${guides[guide_num]}-mini`).style.display = "none";
}

function expandGuideItem(guide_num) {
  document.querySelector(`#${guides[guide_num]}-large`).style.height = "100%";
  document.querySelector(`#${guides[guide_num]}-large`).style.padding =
    "8px 8px 12px 8px";
}

function guideClicked(guide_num) {
  currentGuide = guide_num;
  mininizeAll();
  hideGuideMini(guide_num);
  expandGuideItem(guide_num);
}

let checkboxStates = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};
let progress = 0;

function openNextIncomplete() {
  for (let i = 1; i <= Object.keys(checkboxStates).length; i++) {
    if (!checkboxStates[i]) {
      //Open the next incomplete guide
      guideClicked(i);

      //Focus on the checkbox of the next incomplete guide
      let guideCheckboxClass = `.${guides[i]}-checkbox-container`;
      let checkboxes = document.querySelectorAll(guideCheckboxClass);
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].focus();
      }
      break;
    }
  }
}

function updateProgress() {
  progress = 0;
  for (let i = 1; i <= Object.keys(checkboxStates).length; i++) {
    if (checkboxStates[i]) {
      progress += 72 / Object.keys(checkboxStates).length;
    }
  }

  let progress_bar = document.querySelector("#progress_bar");
  progress_bar.setAttribute("width", progress);
}

function updateCompletedGuide() {
  let completed = 0;
  for (let i = 1; i <= Object.keys(checkboxStates).length; i++) {
    if (checkboxStates[i]) {
      completed += 1;
    }
  }
  let completedText = document.querySelector("#completed-text");
  completedText.innerHTML = `${completed} / ${
    Object.keys(guides).length
  } completed`;
}

function handleTickCheckbox(checkbox_num) {
  let dashedCircleClass = `.${guides[checkbox_num]}-dashed-circle`;
  let spinnerClass = `.${guides[checkbox_num]}-spinner`;
  let tickClass = `.${guides[checkbox_num]}-tick`;

  let circles = document.querySelectorAll(dashedCircleClass);
  let spinners = document.querySelectorAll(spinnerClass);
  let ticks = document.querySelectorAll(tickClass);

  for (let i = 0; i < circles.length; i++) {
    circles[i].style.display = "none";
  }
  for (let i = 0; i < spinners.length; i++) {
    spinners[i].style.display = "block";
  }

  setTimeout(() => {
    for (let i = 0; i < spinners.length; i++) {
      spinners[i].style.display = "none";
    }
    for (let i = 0; i < ticks.length; i++) {
      ticks[i].style.display = "flex";
    }
  }, 300);

  let guideCheckboxClass = `.${guides[checkbox_num]}-checkbox-container`;
  let checkboxes = document.querySelectorAll(guideCheckboxClass);
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].setAttribute("aria-label", `unmark ${guides[checkbox_num]}`);
  }
}
function handleUntickCheckbox(checkbox_num) {
  let dashedCircleClass = `.${guides[checkbox_num]}-dashed-circle`;
  let spinnerClass = `.${guides[checkbox_num]}-spinner`;
  let tickClass = `.${guides[checkbox_num]}-tick`;

  let circles = document.querySelectorAll(dashedCircleClass);
  let spinners = document.querySelectorAll(spinnerClass);
  let ticks = document.querySelectorAll(tickClass);

  for (let i = 0; i < circles.length; i++) {
    circles[i].style.display = "block";
  }
  for (let i = 0; i < spinners.length; i++) {
    spinners[i].style.display = "none";
  }

  for (let i = 0; i < ticks.length; i++) {
    ticks[i].style.display = "none";
  }

  let guideCheckboxClass = `.${guides[checkbox_num]}-checkbox-container`;
  let checkboxes = document.querySelectorAll(guideCheckboxClass);
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].setAttribute("aria-label", `mark ${guides[checkbox_num]}`);
  }
}
function checkboxClicked(checkbox_num) {
  let guideCheckboxClass = `.${guides[checkbox_num]}-checkbox-container`;
  let checkboxes = document.querySelectorAll(guideCheckboxClass);

  let newCheckboxState = !checkboxStates[checkbox_num];
  checkboxStates[checkbox_num] = newCheckboxState;
  for (let i = 0; i < checkboxes.length; i++) {
    if (newCheckboxState) {
      handleTickCheckbox(checkbox_num);
      openNextIncomplete();
    } else handleUntickCheckbox(checkbox_num);
  }

  updateCompletedGuide();
  updateProgress();
}

// Add event listeners for checkbox clicks
for (let i = 1; i <= Object.keys(guides).length; i++) {
  let guideCheckboxClass = `.${guides[i]}-checkbox-container`;
  let checkboxes = document.querySelectorAll(guideCheckboxClass);

  for (let n = 0; checkboxes && n < checkboxes.length; n++) {
    checkboxes[n].addEventListener("click", (event) => {
      event.stopPropagation();
      let checkbox_num = event.currentTarget.getAttribute("checkbox_num");
      checkboxClicked(checkbox_num);
    });
    checkboxes[n].addEventListener("keyup", (event) => {
      if (event.key === "Space") {
        event.stopPropagation();
        let checkbox_num = event.currentTarget.getAttribute("checkbox_num");
        checkboxClicked(checkbox_num);
      }
    });
  }
}

// Add event listeners for dashed circles mouseover and mouseleave
let dashedCircles = document.querySelectorAll(".dashed-circles");
// let checkboxBtns = document.querySelectorAll(".checkbox-container");

function emptyCheckboxActive(target) {
  target.setAttribute("stroke-dasharray", "");
}
function emptyCheckboxInactive(target) {
  target.setAttribute("stroke-dasharray", "5 5");
}
for (let n = 0; dashedCircles && n < dashedCircles.length; n++) {
  dashedCircles[n].addEventListener("mouseover", (event) => {
    emptyCheckboxActive(event.target);
  });
  dashedCircles[n].addEventListener("mouseleave", (event) => {
    emptyCheckboxInactive(event.target);
  });
}
