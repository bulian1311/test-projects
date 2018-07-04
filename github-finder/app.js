const github = new Github();
const ui = new UI();

const searchUser = document.querySelector('#search-user');

searchUser.addEventListener('keyup', event => {
  const userText = event.target.value;

  if (userText !== '') {
    github.getUser(userText).then(user => {
      if (user.profile.message === 'Not Found') {
        ui.showMessage('Not found', 'alert alert-danger');
      } else {
        ui.showProfile(user.profile);
        ui.showRepos(user.repos);
      }
    });
  } else {
    ui.clearProfile();
  }
});
