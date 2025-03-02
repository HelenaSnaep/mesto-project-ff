function handleEscapeKeyPress(event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeKeyPress);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeKeyPress);
}

export function setupModalListeners(modal) {
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('mousedown', event => {
        if (event.target.classList.contains('popup')) {
            closeModal(modal);
        }
    });
}