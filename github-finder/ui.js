class UI {
  constructor() {
    this.profile = document.querySelector('#profile');
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }

  showMessage(message, className) {
    this.clearMessage();
    const div = document.createElement('div');
    div.className = 'alert ' + className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.search-container');
    const search = document.querySelector('.search');

    container.insertBefore(div, search);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  clearMessage() {
    const message = document.querySelector('.alert');
    if (message) {
      message.remove();
    }
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${
              user.html_url
            }" target="_blank" class="btn btn-primary btn-block">Профиль</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Репозитории: ${
              user.public_repos
            }</span>
            <span class="badge badge-info">Gists: ${user.public_gists}</span>
            <span class="badge badge-secondary">Подписчики: ${
              user.followers
            }</span>
            <span class="badge badge-success">Подписан на: ${
              user.following
            }</span>
            <br>
            <ul class="list-group mt-4">
              <li class="list-group-item">Компания: ${user.company}</li>
              <li class="list-group-item">Сайт: ${user.blog}</li>
              <li class="list-group-item">Место нахождения: ${
                user.location
              }</li>
              <li class="list-group-item">Зарегестрирован: ${
                user.created_at
              }</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  showRepos(repos) {
    let output = '';

    repos.forEach(repo => {
      output += `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-6">
            <a target="_blank" href="${repo.html_url}">${repo.name}</a>
          </div>
          <div class="col-md-6">
            <span class="badge badge-primary">Звезды: ${
              repo.stargazers_count
            }</span>
            <span class="badge badge-info">Отслеживают: ${repo.watchers}</span>
            <span class="badge badge-secondary">Форки: ${
              repo.forks_count
            }</span>
          </div>
        </div>
      </div>
      `;
    });

    document.querySelector('#repos').innerHTML = output;
  }
}
