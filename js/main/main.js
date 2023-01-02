const SearchError = document.getElementById('search-error');

// Submit form
function submitForm(e) {
  e.preventDefault();
  document.getElementById('favouriteMsg').innerHTML = '';
  const githubUsername = document.getElementById('github-username').value;

  fetchUser(githubUsername);
}

// Fetch user by username with github API
async function fetchUser(username) {
  SearchError.classList.add('hidden');

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return SearchError.classList.remove('hidden');
    }
    sessionStorage.setItem("pdata", JSON.stringify(parsedResponse));
    return updateDOM(parsedResponse);
    
  } catch (err) {
    return console.log(err);
  }
}

// Updates DOM with new user data
function updateDOM(user) {
  const joinedAt = user.created_at.split('T')[0];
  const parsedJoinedAt = joinedAt.split('-');

  const year = parsedJoinedAt[0];
  const month = parsedJoinedAt[1];
  const day = parsedJoinedAt[2];

  // Converts month to shortened text version
  const date = new Date(year, month, day);
  date.setMonth(month - 1);

  const monthTxt = date.toLocaleString('en', { month: 'short' });

  const userImg = document.getElementById('user-img');
  const userImgMobile = document.getElementById('user-img-mobile');

  const userName = document.getElementById('user-name');
  const userTimeJoined = document.getElementById('user-joined-time');
  const userUsername = document.getElementById('user-username');

  const userBio = document.getElementById('user-bio');

  const userRepos = document.getElementById('user-repos');
  const userFollowers = document.getElementById('user-followers');
  const userFollowing = document.getElementById('user-following');

  const userLocation = document.getElementById('user-location');
  const userTwitter = document.getElementById('user-twitter');
  const userWebsite = document.getElementById('user-website');
  const userOrganization = document.getElementById('user-organization');

  userImg.src = user.avatar_url;
  userImgMobile.src = user.avatar_url;

  userTimeJoined.dateTime = joinedAt;
  userTimeJoined.innerText = `Joined ${day} ${monthTxt} ${year}`;

  // If user has not set name use username
  if (!user.name || user.name.length < 1) {
    userName.innerText = user.login;
  } else {
    userName.innerText = user.name;
  }
  userUsername.innerHTML = `<a href=${user.html_url} target='_blank'>@${user.login}</a>`;

  // If user has not set bio display no bio text and lower opacity
  if (!user.bio || user.bio.length < 1) {
    userBio.classList.add('opacity-75');
    userBio.innerText = 'This profile has no bio';
  } else {
    userBio.classList.remove('opacity-75');
    userBio.innerText = user.bio;
  }

  userRepos.innerText = user.public_repos;
  userFollowers.innerText = user.followers;
  userFollowing.innerText = user.following;

  if (!user.location || user.location.length < 1) {
    userLocation.classList.add('opacity-50');
    userLocation.querySelector('.user-link').innerText = 'Not Available';
  } else {
    userLocation.classList.remove('opacity-50');
    userLocation.querySelector('.user-link').innerText = user.location;
  }

  if (!user.twitter_username || user.twitter_username.length < 1) {
    userTwitter.classList.add('opacity-50');
    userTwitter.querySelector('.user-link').innerText = 'Not Available';
    userTwitter.querySelector('.user-link').removeAttribute('href');
  } else {
    userTwitter.classList.remove('opacity-50');
    userTwitter.querySelector('.user-link').innerText = `@${user.twitter_username}`;
    userTwitter.querySelector('.user-link').href = `https://twitter.com/${user.twitter_username}`;
  }

  if (!user.blog || user.blog.length < 1) {
    userWebsite.classList.add('opacity-50');
    userWebsite.querySelector('.user-link').innerText = 'Not Available';
    userWebsite.querySelector('.user-link').removeAttribute('href');
  } else {
    const userWebsiteShort = user.blog.split('/')[2];

    userWebsite.classList.remove('opacity-50');
    userWebsite.querySelector('.user-link').innerText = userWebsiteShort;
    userWebsite.querySelector('.user-link').href = user.blog;
  }

  if (!user.company || user.company.length < 1) {
    userOrganization.classList.add('opacity-50');
    userOrganization.querySelector('.user-link').innerText = 'Not Available';
    // userOrganization.querySelector('.user-link').removeAttribute('href');
  } else {
    // const userOrganizationWithoutAt = user.company.split('@')[1];

    userOrganization.classList.remove('opacity-50');
    userOrganization.querySelector('.user-link').innerText = user.company;
    // userOrganization.querySelector('.user-link').href = `https://github.com/${userOrganizationWithoutAt}`;
  }
}


// Default user to be displayed
fetchUser('pranavgoel29');