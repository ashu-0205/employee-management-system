const api = 'http://localhost:3000/employees';

function saveData() {
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const contact = document.getElementById('contact').value;
  const address = document.getElementById('address').value;
  const designation = document.getElementById('designation').value;
  const salary = document.getElementById('salary').value;

  const data = { name, gender, contact, address, designation, salary };

  if (id) {
    fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {
      clearForm();
      alert("Updated Successfully");
    });
  } else {
    fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {
      clearForm();
      alert("Added Successfully");
    });
  }
}

function loadData() {
  fetch(api)
  .then(res => res.json())
  .then(data => {
    let rows = '';
    data.forEach(e => {
      rows += `
      <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.gender}</td>
        <td>${e.contact}</td>
        <td>${e.address}</td>
        <td>${e.designation}</td>
        <td>${e.salary}</td>
        <td>
         <button onclick='editData(${JSON.stringify(e)})'>Edit</button>
          <button onclick="deleteData(${e.id})">Delete</button>
        </td>
      </tr>`;
    });
    document.getElementById('table').innerHTML = rows;
  });
}

function editData(e) {
  localStorage.setItem("editId", e.id);
  localStorage.setItem("editName", e.name);
  localStorage.setItem("editGender", e.gender);
  localStorage.setItem("editContact", e.contact);
  localStorage.setItem("editAddress", e.address);
  localStorage.setItem("editDesignation", e.designation);
  localStorage.setItem("editSalary", e.salary);

  window.location.href = "index.html";
}

function loadEditData() {
  const id = localStorage.getItem("editId");

  if (id) {
    document.getElementById('id').value = id;
    document.getElementById('name').value = localStorage.getItem("editName");
    document.getElementById('gender').value = localStorage.getItem("editGender");
    document.getElementById('contact').value = localStorage.getItem("editContact");
    document.getElementById('address').value = localStorage.getItem("editAddress");
    document.getElementById('designation').value = localStorage.getItem("editDesignation");
    document.getElementById('salary').value = localStorage.getItem("editSalary");

    localStorage.clear();
  }
}

function deleteData(id) {
  fetch(`${api}/${id}`, { method: 'DELETE' })
  .then(() => loadData());
}

function clearForm() {
  document.getElementById('id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('contact').value = '';
  document.getElementById('address').value = '';
  document.getElementById('designation').value = '';
  document.getElementById('salary').value = '';
}

function goBack() {
  window.location.href = "index.html";
}

function goToView() {
  window.location.href = "view.html";
}