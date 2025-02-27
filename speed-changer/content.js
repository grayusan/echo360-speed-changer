function clickSettingsButton(callback) {
    let settingsButton = document.querySelector(".video-btn.settings-btn");

    if (settingsButton) {
        settingsButton.click();

        let checkMenu = setInterval(() => {
            let settingsMenu = document.querySelector(".video-menu.settings-menu.open");
            if (settingsMenu) {
                clearInterval(checkMenu);
                if (callback) callback();
            }
        }, 100);
    } else {
        console.error("Settings button not found.");
    }
}

function updateSpeed(value) {
    let select = document.getElementById("speed-select");

    if (select && select.options.length > 1) {
        let firstOption = select.options[0];
        let secondOption = select.options[1];

        firstOption.value = value;
        firstOption.textContent = value;

        select.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        select.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

        setTimeout(() => {
            select.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            secondOption.selected = true;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            select.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        }, 300);

        setTimeout(() => {
            select.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            select.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

            select.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            firstOption.selected = true;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            select.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        }, 300);
    } else {
        console.error("Speed select menu not found or does not have enough options.");
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSpeed") {
        clickSettingsButton(() => {
            setTimeout(() => {
                updateSpeed(request.value);
            }, 500);
        });
    }
});