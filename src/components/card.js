const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, onDeleteCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardDeleteButton.addEventListener('click', () => onDeleteCard(cardElement));
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  return cardElement;
}

export function onDeleteCard(card) { 
    card.remove(); 
}

export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}
