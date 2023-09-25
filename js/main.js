let student = document.getElementById("student");
let nama = document.getElementById("nama");
let email = document.getElementById("email");
let password = document.getElementById("password");
let error = document.getElementById("error");

let students = document.getElementById("students");

student.addEventListener("submit", (e) => {
    e.preventDefault();

    formValidation();
});

let formValidation = () => {
    if(nama.value === "") {
        error.innerHTML = "Sila masukkan nama";
        console.log("gagal");
    } else {
        console.log("berjaya");
        error.innerHTML = "";
        acceptData();
    }
}

let data = {};

let acceptData = () => {
    data['nama'] = nama.value;
    data['email'] = email.value;
    data['password'] = password.value;
    console.log(data);

    createStudent();
}

let createStudent = () => {
    students.innerHTML += `
        <div class="card-panel recipe white row" id="students">
            <img src="/img/dish.png" alt="recipe thumb">
            <div class="recipe-details">
                <div class="recipe-title">${data.nama}</div>
                <div class="recipe-ingredients">${data.email}</div>
            </div>
            <div class="recipe-delete">
                <i class="material-icons">delete_outline</i>
            </div>
        </div>
    `;

}