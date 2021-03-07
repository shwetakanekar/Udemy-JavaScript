const posts = [
  {title:"post 1", body:"This is post 1"},
  {title:"post 2", body:"This is post 2"}
];

function getPosts(){
  setTimeout(function(){
    let output='';
    posts.forEach(function(post){
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}


// Using callback fn

// function createPost(post, callback){
//   setTimeout(function(){
//     posts.push(post);
//     callback();
//   }, 3000);
// }

// createPost( {title:"post 3", body:"This is post 3"}, getPosts);


//Using ES6 Promise

function createPost(post){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      posts.push(post);
      const err = false;
      if(!err){
        resolve();
      }else{
        reject('Error: something went wrong');
      }
    }, 3000);
  });
}

createPost( {title:"post 3", body:"This is post 3"})
.then(getPosts)
.catch(function(err){
  console.log(err);
});