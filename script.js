// CRUD Operation
var selectedRow = null;
var form = document.getElementById("student-form");
var table = document.getElementById("student-report");
var removeErrorMsg = () => {
  var errorName = [
    "rollno-error",
    "name-error",
    "subject-error",
    "mark-error",
    "age-error",
  ];
  errorName.forEach((err) =>
    document.getElementById(err).classList.remove("show")
  );
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitclicked");
  var rollno = document.getElementById("rollno").value;
  var name = document.getElementById("name").value;
  var subject = document.getElementById("subject").value;
  var mark = document.getElementById("mark").value;
  var age = document.getElementById("age").value;
  if (
    rollno === "" &&
    name === "" &&
    subject === "" &&
    mark === "" &&
    age === ""
  ) {
    alert("Fill the Student Form");
  } else if (
    rollno === "" ||
    name === "" ||
    subject === "" ||
    mark === "" ||
    age === ""
  ) {
    if (rollno === "") {
      document.getElementById("rollno-error").classList.add("show");
    } else {
      document.getElementById("rollno-error").classList.remove("show");
    }
    if (name === "") {
      document.getElementById("name-error").classList.add("show");
    } else {
      document.getElementById("name-error").classList.remove("show");
    }
    if (subject === "") {
      document.getElementById("subject-error").classList.add("show");
    } else {
      document.getElementById("subject-error").classList.remove("show");
    }
    if (mark === "") {
      document.getElementById("mark-error").classList.add("show");
    } else {
      document.getElementById("mark-error").classList.remove("show");
    }
    if (age === "") {
      document.getElementById("age-error").classList.add("show");
    } else {
      document.getElementById("age-error").classList.remove("show");
    }
  } else {
    removeErrorMsg();
    var formData = readFormData();
    if (selectedRow == null) {
      insertFormData(formData);
    } else {
      updatedform(formData);
      selectedRow = null;
    }
    resetForm();
  }
});

var readFormData = () => {
  var formData = {};
  formData["rollno"] = document.getElementById("rollno").value;
  formData["name"] = document.getElementById("name").value;
  formData["subject"] = document.getElementById("subject").value;
  formData["mark"] = document.getElementById("mark").value;
  formData["age"] = document.getElementById("age").value;
  return formData;
};

var insertFormData = (data) => {
  table.getElementsByTagName("tbody")[0];

  var newRow = table.insertRow(table.length);
  cell0 = newRow.insertCell(0);
  cell0.innerHTML = "";
  cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.rollno;
  cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.name;
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.subject;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.mark;
  cell5 = newRow.insertCell(5);
  cell5.innerHTML = data.age;
  cell6 = newRow.insertCell(6);
  cell6.innerHTML = `<button class="btn edit-btn" onclick="onEdit(this)">Edit</button> <button class="btn delete-btn" onclick="onDelete(this)">Delete</button>`;
};

var onEdit = (td) => {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("rollno").value = selectedRow.cells[1].innerHTML;
  document.getElementById("name").value = selectedRow.cells[2].innerHTML;
  document.getElementById("subject").value = selectedRow.cells[3].innerHTML;
  document.getElementById("mark").value = selectedRow.cells[4].innerHTML;
  document.getElementById("age").value = selectedRow.cells[5].innerHTML;
};

var updatedform = (data) => {
  selectedRow.cells[1].innerHTML = data.rollno;
  selectedRow.cells[2].innerHTML = data.name;
  selectedRow.cells[3].innerHTML = data.subject;
  selectedRow.cells[4].innerHTML = data.mark;
  selectedRow.cells[5].innerHTML = data.age;
};

var onDelete = (td) => {
  if (confirm("Are you sure?")) {
    var row = td.parentElement.parentElement;
    document.getElementById("student-report").deleteRow(row.rowIndex);
  }
  resetForm();
};

var resetForm = () => {
  document.getElementById("rollno").value = "";
  document.getElementById("name").value = "";
  document.getElementById("mark").value = "";
  document.getElementById("age").value = "";
  document.getElementById("subject").selectedIndex = 0;
};

//Sort Operation
var studentName = document.getElementById("s-name");
var studentMark = document.getElementById("s-mark");
studentName.addEventListener("click", () => {
  sort(2);
});
studentMark.addEventListener("click", () => {
  sort(4);
});
var sort = (n) => {
  var i,
    x,
    y,
    sort,
    count = 0,
    dir = "asc",
    flag = true,
    rows = table.rows;
  while (flag) {
    flag = false;
    for (i = 1; i < rows.length - 1; i++) {
      sort = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (n == 2) {
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            sort = true;
            break;
          }
        } else if (dir == "des") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            sort = true;
            break;
          }
        }
      } else {
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            sort = true;
            break;
          }
        } else if (dir == "des") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            sort = true;
            break;
          }
        }
      }
    }
    if (sort) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      flag = true;
      count++;
    } else {
      if (dir == "asc" && count == 0) {
        dir = "des";
        flag = true;
      }
    }
  }
};
/* Search filter */

var searchFilter = () => {
  var input = document.getElementById("search");
  var search = input.value.toUpperCase();
  var searchTable = document.getElementById("student-report");
  var tableRow = searchTable.getElementsByTagName("tr");
  for (let j = 0; j < tableRow.length; j++) {
    var tableData = tableRow[j].getElementsByTagName("td")[2];
    if (tableData) {
      var text = tableData.textContent || tableData.innerHTML;
      if (text.toUpperCase().indexOf(search) > -1) {
        tableRow[j].style.display = "";
      } else {
        tableRow[j].style.display = "none ";
      }
    }
  }
};
