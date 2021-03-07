const http = new easyHTTP();

// http.get('https://jsonplaceholder.typicode.com/posts')
// .then(data => console.log(data))
// .catch(err => console.log(err));

const data = {
  name: "John Doe",
  age: 30
}

// http.post('https://jsonplaceholder.typicode.com/posts', data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

// http.put('https://jsonplaceholder.typicode.com/posts/4', data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

http.delete('https://jsonplaceholder.typicode.com/posts/4')
.then(data => console.log(data))
.catch(err => console.log(err));