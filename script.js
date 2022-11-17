//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;
//btns
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});
input.addEventListener(
  "keydown",
  function (e) {
    if (!e) {
      var e = window.event;
    }
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);
input.addEventListener("input", function () {
  noresults.style.display = "none";
  profilecontainer.classList.remove("active");
  searchbar.classList.add("active");
});
btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});
//functions
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      updateProfile(data);
      console.log(data);
      sessionStorage.setItem("pdata",JSON.stringify(data));
    })
    .catch((error) => {
      throw error;
    });
}



function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return "Not available";
      } else {
        return `${param1}`;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = `${data.name}`;
    user.innerHTML = `<a href=${data.html_url} target='_blank'>@${data.login}</a>`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]
      } ${datesegments[0]}`;
    bio.innerText =
      data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location);
    page.innerHTML = checkNull(`<a href=${data.blog} target='_blank'>Site Link</a>`, page);
    twitter.innerHTML = checkNull(`<a href=https://twitter.com/${data.twitter_username} target='_blank'>${data.twitter_username}</a>`, twitter);
    company.innerText = checkNull(data.company, company);
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}
//dark mode default
const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const localStorageDarkMode = localStorage.getItem("daresfesf");
if (localStorageDarkMode === null) {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
}
if (localStorageDarkMode) {
  darkMode = localStorageDarkMode;
  darkModeProperties();
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
  lightModeProperties();
}


function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/icon-sun.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/icon-moon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}
profilecontainer.classList.toggle("active");
searchbar.classList.toggle("active");
getUserData(url + "pranavgoel29");
