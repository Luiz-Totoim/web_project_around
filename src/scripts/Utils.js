export function openPopup(popup) {
    popup.style.display = "flex";
    setTimeout(() => {
        popup.classList.add("popup_opened");
    }, 100);
}

export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    setTimeout(() => {
        popup.style.display = "none";
    }, 1000);
}

export function openModal(modal) {
    modal.style.display = "block";
}

export function closeModal(modal) {
    modal.style.display = "none";
}
