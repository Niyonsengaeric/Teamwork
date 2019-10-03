/* eslint-disable no-unused-vars */
const switchbtnauth = () => {
  const authFormElements = document.getElementsByClassName('auth-area');
  Array.from(authFormElements).forEach((form) => form.classList.toggle('form-hidden'));
};

const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
const dialogbox = (message) => {
  const modal = document.querySelector('#dialogbox');
  const divMsg = document.querySelector('.dialog-content-js');

  divMsg.textContent = message;
  modal.style.display = 'block';
};
const closeDialog = () => {
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('#flagreason').style.display = 'none';
  document.querySelector('.comment-form').style.display = 'none';
  document.querySelector('.mycomment-form').style.display = 'none';
  document.querySelector('.new-article').style.display = 'none';
  document.querySelector('.update-article').style.display = 'none';
  document.querySelector('.dashboard-auth').style.display = 'none';
  const modal = document.querySelector('#dialogbox');
  modal.style.display = 'none';
};

const post = () => {
  const posts = document.querySelector('.comment-form');

  posts.style.display = 'block';
};

const mypost = () => {
  const myposts = document.querySelector('.mycomment-form');

  myposts.style.display = 'block';
};
const newArticle = () => {
  const posts = document.querySelector('.new-article');

  posts.style.display = 'block';
};
const updateArticle = () => {
  const posts = document.querySelector('.update-article');

  posts.style.display = 'block';
};

const openArticles = () => {
  const manFlags = document.querySelector('.all-flags');
  manFlags.style.display = 'none';
  const manUsers = document.querySelector('.all-users');
  manUsers.style.display = 'none';
  const manaccount = document.querySelector('.AdminForm-wrapper');
  manaccount.style.display = 'none';

  const adminflags = document.querySelector('.menulink-admin2');
  adminflags.style.border = ' 3px solid var(--default-link-text-color)';
  const adminusers = document.querySelector('.menulink-admin3');
  adminusers.style.border = ' 3px solid var(--default-link-text-color)';
  const adminaccount = document.querySelector('.menulink-admin4');
  adminaccount.style.border = ' 3px solid var(--default-link-text-color)';

  const adminarticles = document.querySelector('.menulink-admin1');
  adminarticles.style.border = ' 3px solid var(--color-primary)';

  const manArticles = document.querySelector('.all-articles');
  manArticles.style.display = 'block';
};

const openFlags = () => {
  const manArticles = document.querySelector('.all-articles');
  manArticles.style.display = 'none';
  const manUsers = document.querySelector('.all-users');
  manUsers.style.display = 'none';
  const manaccount = document.querySelector('.AdminForm-wrapper');
  manaccount.style.display = 'none';

  const adminarticles = document.querySelector('.menulink-admin1');
  adminarticles.style.border = ' 3px solid var(--default-link-text-color)';
  const adminusers = document.querySelector('.menulink-admin3');
  adminusers.style.border = ' 3px solid var(--default-link-text-color)';
  const adminaccount = document.querySelector('.menulink-admin4');
  adminaccount.style.border = ' 3px solid var(--default-link-text-color)';

  const manFlags = document.querySelector('.all-flags');
  manFlags.style.display = 'block';
  const adminflags = document.querySelector('.menulink-admin2');
  adminflags.style.border = ' 3px solid var(--color-primary)';
};

const openUsers = () => {
  const manArticles = document.querySelector('.all-articles');
  manArticles.style.display = 'none';
  const manFlags = document.querySelector('.all-flags');
  manFlags.style.display = 'none';
  const manaccount = document.querySelector('.AdminForm-wrapper');
  manaccount.style.display = 'none';

  const adminarticles = document.querySelector('.menulink-admin1');
  adminarticles.style.border = ' 3px solid var(--default-link-text-color)';
  const adminflags = document.querySelector('.menulink-admin2');
  adminflags.style.border = ' 3px solid var(--default-link-text-color)';
  const adminaccount = document.querySelector('.menulink-admin4');
  adminaccount.style.border = ' 3px solid var(--default-link-text-color)';

  const manUsers = document.querySelector('.all-users');
  manUsers.style.display = 'block';

  const adminusers = document.querySelector('.menulink-admin3');
  adminusers.style.border = ' 3px solid var(--color-primary)';
};
const flag = () => {
  const flagreason = document.querySelector('#flagreason');
  const reportflag = document.querySelector('.report');
  flagreason.style.display = 'block';
  if (reportflag.style.color === 'red') {
    reportflag.style.color = 'black  ';
  } else {
    reportflag.style.color = 'red';
  }
};
const flag2 = () => {
  const flagreason = document.querySelector('#flagreason');
  flagreason.style.display = 'block';
  const reportflag = document.querySelector('.report2');
  if (reportflag.style.color === 'red') {
    reportflag.style.color = 'black  ';
  } else {
    reportflag.style.color = 'red';
  }
};

const flag5 = () => {
  const flagreason = document.querySelector('#flagreason');
  flagreason.style.display = 'block';
  const reportflag = document.querySelector('.report5');
  if (reportflag.style.color === 'red') {
    reportflag.style.color = 'black  ';
  } else {
    reportflag.style.color = 'red';
  }
};
const openArticle = () => {
  const displayArticle = document.querySelector('.commentArea');
  const displayComments = document.querySelector('.list-comment');
  const posts = document.querySelector('.comment-form');
  displayArticle.style.display = 'none';
  displayComments.style.display = 'none';
  posts.style.display = 'block';
};
const viewComments = () => {
  const displayArticle = document.querySelector('.commentArea');
  const displayComments = document.querySelector('.list-comment');
  displayArticle.style.display = 'block';
  displayComments.style.display = 'block';
};
