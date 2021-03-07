const http = new easyHTTP();

// http.get('https://jsonplaceholder.typicode.com/posts')
// .then(data => console.log(data))
// .catch(err => console.log(err));

const data = {
  name: "Sara Mathews",
  age: 20
}

// http.post('https://jsonplaceholder.typicode.com/posts', data)
// .then(result => console.log(result))
// .catch(err => console.log(err));

// http.put('https://jsonplaceholder.typicode.com/posts/8', data)
// .then(result => console.log(result))
// .catch(err => console.log(err));

http.delete('https://jsonplaceholder.typicode.com/posts/8', data)
.then(result => console.log(result))
.catch(err => console.log(err));