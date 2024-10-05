export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._nameInput = document.querySelector(".edit-profile-popup__input_name");
    this._aboutInput = document.querySelector(
      ".edit-profile-popup__input_about"
    );
  }
  getUserInfo() {
    return {
      userName: this._nameInput.value,
      userDescription: this._aboutInput.value,
    };
  }
  setUserInfo() {
    this._userInfo = this.getUserInfo();
    this._profileName.textContent = this._userInfo.userName;
    this._profileDescription.textContent = this._userInfo.userDescription;
  }
}
