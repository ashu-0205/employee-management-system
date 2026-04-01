const api = 'http://localhost:3000/employees';

// SAVE (CREATE + UPDATE)
function saveData() {
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const salary = document.getElementById('salary').value;

  if (id) {
    fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, salary })
    }).then(() => {
      clearForm();
    });
  } else {
    fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, salary })
    }).then(() => {
      clearForm();
    });
  }
}

// LOAD TABLE DATA
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
        <td>${e.salary}</td>
        <td>
          <button onclick="editData(${e.id}, '${e.name}', ${e.salary})">Edit</button>
          <button onclick="deleteData(${e.id})">Delete</button>
        </td>
      </tr>`;
    });
    document.getElementById('table').innerHTML = rows;
  });
}

// EDIT (redirect + store data)
function editData(id, name, salary) {
  localStorage.setItem("editId", id);
  localStorage.setItem("editName", name);
  localStorage.setItem("editSalary", salary);

  window.location.href = "index.html";
}

// DELETE
function deleteData(id) {
  fetch(`${api}/${id}`, { method: 'DELETE' })
  .then(() => loadData());
}

// NAVIGATION
function goToView() {
  window.location.href = "view.html";
}

function goBack() {
  window.location.href = "index.html";
}

// CLEAR FORM
function clearForm() {
  document.getElementById('id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('salary').value = '';
}

// LOAD EDIT DATA INTO FORM
window.onload = function () {
  const id = localStorage.getItem("editId");

  if (id) {
    document.getElementById("id").value = id;
    document.getElementById("name").value = localStorage.getItem("editName");
    document.getElementById("salary").value = localStorage.getItem("editSalary");

    localStorage.clear();
  }
};