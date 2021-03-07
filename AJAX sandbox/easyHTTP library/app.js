const http = new easyHTTP();


// http.get('https://jsonplaceholder.typicode.com/posts', function(err, posts){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(posts);
//   }
// });

const data = {
  title: "my data",
  body: "my custom data"
};

// http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, posts){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(posts);
//   }
// });

// http.put('https://jsonplaceholder.typicode.com/posts/2', data, function(err, posts){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(posts);
//   }
// });

http.delete('https://jsonplaceholder.typicode.com/posts/4', function(err, posts){
  if(err){
    console.log(err);
  }else{
    console.log(posts);
  }
});