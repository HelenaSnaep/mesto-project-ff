// @todo: Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardData, onDeleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  cardDeleteButton.addEventListener("click", onDeleteCard);

  return cardElement;
}
// @todo: Функция удаления карточки
function onDeleteCard(event) {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) {
    placesList.append(createCard(cardData, onDeleteCard));
})