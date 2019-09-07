// switch between auth
const switchbtnauth = () => {
  const authFormElements = document.getElementsByClassName("auth-area");
  Array.from(authFormElements).forEach(form =>
    form.classList.toggle("form-hidden")
  );
};

// Side Navigation
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
let dialogbox = message => {
  // Get the modal
  const modal = document.querySelector("#dialogbox");

  const divMsg = document.querySelector(".dialog-content-js");

  divMsg.textContent = message;
  // Display the modal
  modal.style.display = "block";
};
// close message dialog box
const closeDialog = () => {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".comment-form").style.display = "none";
  document.querySelector(".mycomment-form").style.display = "none";
  document.querySelector(".new-article").style.display = "none";
  document.querySelector(".update-article").style.display = "none";
  document.querySelector(".dashboard-auth").style.display = "none";
  const modal = document.querySelector("#dialogbox");
  modal.style.display = "none";
};

const post = () => {
  // Get the comments
  const posts = document.querySelector(".comment-form");

  posts.style.display = "block";
};

const mypost = () => {
  // Get the comments
  const myposts = document.querySelector(".mycomment-form");

  myposts.style.display = "block";
};
const newArticle = () => {
  // post new article
  const posts = document.querySelector(".new-article");

  posts.style.display = "block";
};
const updateArticle = () => {
  // update  article
  const posts = document.querySelector(".update-article");

  posts.style.display = "block";
};
const opendashboard = () => {
  // update  article
  const posts = document.querySelector(".dashboard-auth");
  posts.style.display = "block";
};

// Get the listes
const openArticles = () => {
  // hide
  const manFlags = document.querySelector(".all-flags");
  manFlags.style.display = "none";
  const manUsers = document.querySelector(".all-users");
  manUsers.style.display = "none";
  const manaccount = document.querySelector(".AdminForm-wrapper");
  manaccount.style.display = "none";

  const adminflags = document.querySelector(".menulink-admin2");
  adminflags.style.border = " 3px solid var(--default-link-text-color)";
  const adminusers = document.querySelector(".menulink-admin3");
  adminusers.style.border = " 3px solid var(--default-link-text-color)";
  const adminaccount = document.querySelector(".menulink-admin4");
  adminaccount.style.border = " 3px solid var(--default-link-text-color)";

  // display
  const adminarticles = document.querySelector(".menulink-admin1");
  adminarticles.style.border = " 3px solid var(--color-primary)";

  const manArticles = document.querySelector(".all-articles");
  manArticles.style.display = "block";
};

// open liste flags
const openFlags = () => {
  // Get the comments
  const manArticles = document.querySelector(".all-articles");
  manArticles.style.display = "none";
  const manUsers = document.querySelector(".all-users");
  manUsers.style.display = "none";
  const manaccount = document.querySelector(".AdminForm-wrapper");
  manaccount.style.display = "none";

  const adminarticles = document.querySelector(".menulink-admin1");
  adminarticles.style.border = " 3px solid var(--default-link-text-color)";
  const adminusers = document.querySelector(".menulink-admin3");
  adminusers.style.border = " 3px solid var(--default-link-text-color)";
  const adminaccount = document.querySelector(".menulink-admin4");
  adminaccount.style.border = " 3px solid var(--default-link-text-color)";

  // display
  const manFlags = document.querySelector(".all-flags");
  manFlags.style.display = "block";
  const adminflags = document.querySelector(".menulink-admin2");
  adminflags.style.border = " 3px solid var(--color-primary)";
};

// open liste users
const openUsers = () => {
  const manArticles = document.querySelector(".all-articles");
  manArticles.style.display = "none";
  const manFlags = document.querySelector(".all-flags");
  manFlags.style.display = "none";
  const manaccount = document.querySelector(".AdminForm-wrapper");
  manaccount.style.display = "none";

  const adminarticles = document.querySelector(".menulink-admin1");
  adminarticles.style.border = " 3px solid var(--default-link-text-color)";
  const adminflags = document.querySelector(".menulink-admin2");
  adminflags.style.border = " 3px solid var(--default-link-text-color)";
  const adminaccount = document.querySelector(".menulink-admin4");
  adminaccount.style.border = " 3px solid var(--default-link-text-color)";

  // // display
  const manUsers = document.querySelector(".all-users");
  manUsers.style.display = "block";

  const adminusers = document.querySelector(".menulink-admin3");
  adminusers.style.border = " 3px solid var(--color-primary)";
};

// open admin account
const openAccount = () => {
  const manArticles = document.querySelector(".all-articles");
  manArticles.style.display = "none";
  const manFlags = document.querySelector(".all-flags");
  manFlags.style.display = "none";
  const manUsers = document.querySelector(".all-users");
  manUsers.style.display = "none";

  const adminarticles = document.querySelector(".menulink-admin1");
  adminarticles.style.border = " 3px solid var(--default-link-text-color)";
  const adminflags = document.querySelector(".menulink-admin2");
  adminflags.style.border = " 3px solid var(--default-link-text-color)";
  const adminusers = document.querySelector(".menulink-admin3");
  adminusers.style.border = " 3px solid var(--default-link-text-color)";

  // display
  const manaccount = document.querySelector(".AdminForm-wrapper");
  manaccount.style.display = "block";

  const adminaccount = document.querySelector(".menulink-admin4");
  adminaccount.style.border = " 3px solid var(--color-primary)";
};

// flag an article or Comment
const flag = () => {
  const reportflag = document.querySelector(".report");
  if (reportflag.style.color === "red") {
    reportflag.style.color = "black  ";
  } else {
    reportflag.style.color = "red";
  }
};
const flag2 = () => {
  const reportflag = document.querySelector(".report2");
  if (reportflag.style.color === "red") {
    reportflag.style.color = "black  ";
  } else {
    reportflag.style.color = "red";
  }
};
const flag3 = () => {
  const reportflag = document.querySelector(".report3");
  if (reportflag.style.color === "red") {
    reportflag.style.color = "black  ";
  } else {
    reportflag.style.color = "red";
  }
};

const flag5 = () => {
  const reportflag = document.querySelector(".report5");
  if (reportflag.style.color === "red") {
    reportflag.style.color = "black  ";
  } else {
    reportflag.style.color = "red";
  }
};
