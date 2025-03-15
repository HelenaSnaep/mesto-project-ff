import { setLike, removeLike, removeCard } from '../components/api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, userId, onDeleteCard, handleLikeCard, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

 
  if (cardData.owner._id !== userId) {
    cardDeleteButton.style.display = "none";
  }


  if (cardData.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', () => onDeleteCard(cardData._id, cardElement));
  cardLikeButton.addEventListener('click', function () {
    return handleLikeCard(cardData._id, cardLikeButton, cardLikeCounter);
  });
  
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  return cardElement;
}

export function handleLikeCard(cardID, button, likeCounter) {
  const isLiked = button.classList.contains('card__like-button_is-active');

  (isLiked ? removeLike(cardID) : setLike(cardID))
    .then((updatedCard) => {
      button.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = updatedCard.likes.length; 
    })
    .catch((err) => {
      console.log(`Код ошибки: ${err.status}`);
    });
}


export function onDeleteCard(cardID, cardElement) { 
  removeCard(cardID)
  .then(() => cardElement.remove())
  .catch((err) => console.log(`Ошибка удаления: ${err.status}`)); 
}


