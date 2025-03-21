import "../pages/index.css";
import { createCard, onDeleteCard, handleLikeCard } from "../components/card";
import {
  openModal,
  closeModal,
  setupModalListeners,
} from "../components/modal";
import { enableValidation, clearValidation } from "../components/validation";
import {
  getUserInfo,
  editProfile,
  editAvatar,
  getCards,
  postNewCard,
} from "../components/api";

const placesList = document.querySelector(".places__list");
const profile = document.querySelector(".profile");
const profileAvatar = profile.querySelector(".profile__image-wrapper");
const profileAvatarImage = profile.querySelector(".profile__image");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");

const profilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = document.forms["edit-avatar"];
const editAvatarInput = editAvatarForm.elements.link;

const forms = document.forms;
const formEditProfile = forms["edit-profile"];
const formNewPlace = forms["new-place"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function openImagePopup(link, name) {
  openModal(imagePopup);
  imagePopupCaption.textContent = name;
  popupImage.alt = name;
  popupImage.src = link;
}

function renderLoading(isLoading, button, initialText) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = initialText;
  }
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  const name = formEditProfile.elements["name"].value;
  const about = formEditProfile.elements["description"].value;
  const submitButton = formEditProfile.querySelector(
    validationConfig.submitButtonSelector
  );
  const submitButtonText = submitButton.textContent;

  renderLoading(true, submitButton, submitButtonText);

  editProfile(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, submitButtonText);
    });
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.elements["link"].value,
  };

  const submitButton = formNewPlace.querySelector(
    validationConfig.submitButtonSelector
  );
  const submitButtonText = submitButton.textContent;

  renderLoading(true, submitButton, submitButtonText);

  postNewCard(cardData.name, cardData.link)
    .then((newCard) => {
      placesList.prepend(
        createCard(
          newCard,
          newCard.owner._id,
          onDeleteCard,
          handleLikeCard,
          openImagePopup
        )
      );
      closeModal(newCardPopup);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, submitButtonText);
    });
}

function handleEditAvatarFormSubmit(event) {
  event.preventDefault();

  const submitButton = editAvatarForm.querySelector(
    validationConfig.submitButtonSelector
  );
  const submitButtonText = submitButton.textContent;
  renderLoading(true, submitButton, submitButtonText);

  editAvatar(editAvatarInput.value)
    .then((userData) => {
      profileAvatarImage.src = userData.avatar + `?t=${Date.now()}`;
      closeModal(editAvatarPopup);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, submitButtonText);
    });
}

profileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);

  openModal(newCardPopup);
});

profileEditButton.addEventListener("click", () => {
  formEditProfile.elements["name"].value = profileTitle.textContent;
  formEditProfile.elements["description"].value =
    profileDescription.textContent;

  clearValidation(formEditProfile, validationConfig);

  openModal(profilePopup);
});

profileAvatar.addEventListener("click", () => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);

  openModal(editAvatarPopup);
});

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formNewPlace.addEventListener("submit", handleNewCardFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => popup.classList.add("popup_is-animated"));

setupModalListeners(profilePopup);
setupModalListeners(imagePopup);
setupModalListeners(newCardPopup);
setupModalListeners(editAvatarPopup);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatarImage.src = userData.avatar;

    const userId = userData._id;
    cards.forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          userId,
          onDeleteCard,
          handleLikeCard,
          openImagePopup
        )
      );
    });
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных: ${err.status}`);
  });
