"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
   console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span><button> delete </button></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitStory(e) {
  console.debug("submitStory");
  e.preventDefault();

  //const username = currentUser.username; //needed for generateStoryMarkup
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const url = document.getElementById("url").value;
  const newStory = await storyList.addStory ( currentUser, { title, author, url });
  const $newStory = generateStoryMarkup(newStory);
  $allStoriesList.prepend($newStory);

  $submitForm.trigger('reset');
  $submitForm.hide();
}
$submitForm.on("submit", submitStory);


//delete a story
async function deleteStory(evt) {
  //console.debug("deleteStory");

  //const $closestLi = $(evt.target).closest("li");
  const storyId = $(evt.target).closest('li').attr("id");
  $(evt.target).closest('li').remove();
  //await storyList.removeStory(currentUser, storyId);        to be further used in API

  // pull story list from API
  addUserStoriesOnPage();
}
$ownStories.on("click", deleteStory);



// adds favorites on page [array]
function addFavoritesOnPage() {
  console.debug("addFavoritesOnPage");

  $favoriteStories.empty();

  if (currentUser.favorites.length === 0) {
    $favoriteStories.append("No favorite story yet... ");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStories.append($story);
    }
  }

  $favoriteStories.show();
  $ownStories.hide();
}


// adds user's own stories

function addUserStoriesOnPage() {
 console.debug("addUserStoriesOnPage");

 $ownStories.empty();

 if (currentUser.ownStories.length === 0) {
   $ownStories.append("No stories added yet...");
 } else {
   // loop through all of users stories and generate HTML for them
   for (let story of currentUser.ownStories) {
     let $story = generateStoryMarkup(story, true);
     $ownStories.append($story);
   }
 }

 $ownStories.show();
 $favoriteStories.hide();
}