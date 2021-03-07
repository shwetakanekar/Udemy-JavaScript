document.getElementById('button1').addEventListener('click', loadCustomer);

document.getElementById('button2').addEventListener('click', loadCustomers);

function loadCustomer(){
  const xhr=new XMLHttpRequest();
  xhr.open('GET', 'customer.json', true);
  xhr.onload = function(){
    if(this.status===200){
      const customer = JSON.parse(this.responseText);
      document.getElementById('customer').innerHTML = `<ul>
        <li>ID: ${customer.id}</li>
        <li>Name: ${customer.name}</li>
        <li>Age: ${customer.age}</li>
      </ul>`
    };
  }
  xhr.send();
}

function loadCustomers(){
  const xhr=new XMLHttpRequest();
  xhr.open('GET', 'customers.json', true);
  xhr.onload = function(){
    if(this.status===200){
      const customers = JSON.parse(this.responseText);
      let customerData = '';
      customers.forEach(function(customer){
        customerData +=
        `<ul>
        <li>ID: ${customer.id}</li>
        <li>Name: ${customer.name}</li>
        <li>Age: ${customer.age}</li>
      </ul>`;
      })
      document.getElementById('customers').innerHTML = customerData;
    }
  }
  xhr.send();
}