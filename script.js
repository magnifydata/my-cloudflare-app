const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username-input');
const profileDisplay = document.getElementById('profile-display');

async function findUser(event) {
    // Prevent the form from actually submitting and reloading the page
    event.preventDefault();

    const username = usernameInput.value;
    profileDisplay.innerHTML = `<p>Searching for ${username}...</p>`;
    profileDisplay.classList.add('visible');

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        // The GitHub API returns a 404 error if the user isn't found
        if (!response.ok) {
            throw new Error(`User not found. (Status: ${response.status})`);
        }

        const data = await response.json();
        displayUserProfile(data);

    } catch (error) {
        profileDisplay.innerHTML = `<p style="color: red;">${error.message}</p>`;
        console.error('Error fetching GitHub user:', error);
    }
}

function displayUserProfile(user) {
    const profileHTML = `
        <div class="profile-header">
            <img src="${user.avatar_url}" alt="Avatar for ${user.login}" class="profile-avatar">
            <div>
                <p class="profile-name">${user.name || 'No name provided'}</p>
                <p class="profile-login">@${user.login}</p>
            </div>
        </div>
        <p class="profile-bio">${user.bio || 'No bio provided.'}</p>
        <div class="profile-stats">
            <span><strong>${user.followers}</strong> Followers</span>
            <span><strong>${user.following}</strong> Following</span>
            <span><strong>${user.public_repos}</strong> Repos</span>
        </div>
    `;
    profileDisplay.innerHTML = profileHTML;
}

userForm.addEventListener('submit', findUser);
