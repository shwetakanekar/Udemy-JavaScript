const data = [
  {
    name: "John Doe",
    age: 30,
    profession: "Architect",
    gender: 'male',
    lookingfor: 'female',
    image: 'https://randomuser.me/api/portraits/men/17.jpg'
  },
  {
    name: "Sarah Johnson",
    age: 27,
    profession: "Doctor",
    gender: 'female',
    lookingfor: 'male',
    image: 'https://randomuser.me/api/portraits/women/10.jpg'
  },
  {
    name: "Joe Smith",
    age: 26,
    profession: "Engineer",
    gender: 'male',
    lookingfor: 'female',
    image: 'https://randomuser.me/api/portraits/men/27.jpg'
  }
];

document.getElementById('next').addEventListener('click', getNextProfile);


//Display profile details
function getNextProfile(){
  const currentProfile = profiles.next().value;

  if(currentProfile != undefined){
    document.getElementById('profileInfo').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Profession: ${currentProfile.profession}</li>
        <li class="list-group-item">${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
      </ul>`;

    document.getElementById('profileImage').innerHTML = `<img src="${currentProfile.image}">`
  }else{
    window.location.reload();
  }
}

//Iterator
const profileScroller = function (profiles){
  let index = 0;

  return {
    next: function(){
      return index < profiles.length ?
      { value: profiles[index++], done: false} :
      { done: true};
    }
  };
}



const profiles = profileScroller(data);
//Display 1st profile when page loads
getNextProfile();
