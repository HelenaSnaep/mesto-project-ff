import '../pages/index.css';
import { createCard, onDeleteCard, likeCard } from '../components/card';
import { openModal, closeModal, setupModalListeners } from '../components/modal';
import { initialCards } from './cards';

const placesList = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');


const profilePopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');


const forms = document.forms;
const formEditProfile = forms['edit-profile'];
const formNewPlace = forms['new-place'];

function openImagePopup(link, name) {
  openModal(imagePopup);
  imagePopupCaption.textContent = name;
  popupImage.alt = name;
  popupImage.src = link;
 
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = formEditProfile.elements['name'].value;
  profileDescription.textContent = formEditProfile.elements['description'].value;
  closeModal(profilePopup);
}

profileAddButton.addEventListener('click', () => openModal(newCardPopup));


profileEditButton.addEventListener('click', () => {
  formEditProfile.elements['name'].value = profileTitle.textContent;
  formEditProfile.elements['description'].value = profileDescription.textContent;
  openModal(profilePopup);
});

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

formNewPlace.addEventListener('submit', event => {
  event.preventDefault();
  const cardData = {
      link: formNewPlace.elements['link'].value,
      name: formNewPlace.elements['place-name'].value
  };
  const card = createCard(cardData, onDeleteCard, likeCard, openImagePopup);
  placesList.prepend(card);
  formNewPlace.reset();
  closeModal(newCardPopup);
});

 initialCards.forEach(function(cardData) {
    placesList.append(createCard(cardData, onDeleteCard, likeCard, openImagePopup));
});

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

setupModalListeners(profilePopup);
setupModalListeners(imagePopup);
setupModalListeners(newCardPopup);






