// using fetch with ES7 async & await

class easyHTTP{
  async get(url){
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async post(url, data){
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  }

  async put(url, data){
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  }

  async delete(url){
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    });
    let result;
    if(res.ok){
      result = 'User deleted';
    }else{
      result = res.status;
    }    
    return result;
  }
}