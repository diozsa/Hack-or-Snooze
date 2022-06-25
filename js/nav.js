"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar*/
 function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $("#submit-form").show();
  $allStoriesList.show();
}
 $navSubmit.on("click", navSubmitClick);

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-all", navAllStories);

// Show favorite stories 

function navFavClick(evt) {
  console.debug("navFavClick", evt);
  hidePageComponents();
  addFavoritesOnPage();
}

$body.on("click", "#nav-favorites", navFavClick);

//Show user stories

function navOwnStories(evt) {
  console.debug("navOwnStories", evt);
  hidePageComponents();
  addUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navOwnStories);



/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}