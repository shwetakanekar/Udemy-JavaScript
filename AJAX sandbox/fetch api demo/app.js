document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJson);

document.getElementById('button3').addEventListener('click', getExternal);

function getText(){
  fetch('test.txt')
    .then(res => {
      if(res.ok){
        return res.text();
      }else{
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .then(data => document.getElementById('div1').innerHTML = data)
    .catch(err => document.getElementById('div1').innerHTML = err);
}

function getJson(){
  fetch('posts.json')
    .then(res => {
      if(res.ok){
        return res.json();
      }else{
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .then(posts => {
      let data = '';
      posts.forEach(post => {
        data += 
        `<li>${post.title}</li>
         <li>${post.body}</li>
         <br>`
      });
      document.getElementById('div1').innerHTML = data;
    })
    .catch(err => document.getElementById('div1').innerHTML = err);
}


function getExternal(){
  fetch('https://api.github.com/users')
    .then(res => {
      if(res.ok){
        return res.json();
      }else{
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .then(users => {
      let data = '';
      users.forEach(user => data += `<li>${user.login}</li>`);
      document.getElementById('div1').innerHTML = data;
    })
    .catch(err => document.getElementById('div1').innerHTML = err);
}