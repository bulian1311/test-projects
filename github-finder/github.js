class Github {
  constructor() {
    this.clientId = 'd445072575702371a92b';
    this.clientSecret = 'cd82aa70f6260c723504a9f45de327a72e1767b4';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const usersUrl = `https://api.github.com/users/${user}?client_id=${
      this.clientId
    }&client_secret=${this.clientSecret}`;

    const reposUrl = `https://api.github.com/users/${user}/repos?per_page=${
      this.repos_count
    }&sort=${this.repos_sort}&client_id=${this.clientId}&client_secret=${
      this.clientSecret
    }`;

    const profileResponse = await fetch(usersUrl);
    const reposResponse = await fetch(reposUrl);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return { profile, repos };
  }
}
