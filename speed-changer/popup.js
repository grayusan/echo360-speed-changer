document.addEventListener("DOMContentLoaded", function () {
    let slider = document.getElementById("speed-slider");
    let valueDisplay = document.getElementById("speed-value");
    let applyButton = document.getElementById("apply-button");

    if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get("speedValue", (data) => {
            let speed = data.speedValue || "1.0"; 
            slider.value = speed;
            valueDisplay.textContent = speed;
        });

        slider.addEventListener("input", function () {
            let value = slider.value;
            valueDisplay.textContent = value;
            chrome.storage.local.set({ speedValue: value });
        });

        applyButton.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "updateSpeed", value: slider.value });
            });
        });
    } else {
        console.error("chrome.storage is not available.");
    }
});
