const github = new Github;
const ui = new UI;

const searchUser = document.getElementById('search-user');


searchUser.addEventListener('keyup', (e) => {
  const userName = e.target.value;
  if(userName !== ''){
    github.getUser(userName)
      .then(data => {
        if(data.profile.message === "Not Found"){
          //alert msg
          ui.showAlert('User not found!');
        }else{
          //display profile
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      })
  }else{
    //clear profile
    ui.clearProfile();
  }
});