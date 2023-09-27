let student = document.getElementById("student");
let nama = document.getElementById("nama");
let email = document.getElementById("email");
let password = document.getElementById("password");
let error = document.getElementById("error");

let students = document.getElementById("students");

M.AutoInit();


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
        handleSubmit();
    }
}

let data = {};

const handleSubmit = async () => {
    try {
        const { data } = await axios.post('http://localhost:8000/api/students', {
                name: nama.value,
                email: email.value,
                password: password.value,
                picture: picture.files[0]
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        if (data.error) {
            window.alert(data.error);
            console.log(data.error);
        } else {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
        window.alert(error);
    }
}
getStudent();

async function getStudent(){
    try {
        const {data} = await axios.get('http://localhost:8000/api/students');
        const res = data.data;

        if(res){
            res.forEach(student => {
                students.innerHTML += `
                <div class="card-panel recipe white row" id="students">
                    <img src="http://localhost:8000${student.pic}" alt="recipe thumb">
                    <div class="recipe-details">
                        <div class="recipe-title">${student.name}</div>
                        <div class="recipe-ingredients">${student.email}</div>
                    </div>
                    <div class="recipe-delete">
                        <i class="material-icons">delete_outline</i>
                    </div>
                </div>
                `;
            });
        } else {
            students.innerHTML += `
                <div class="card-panel recipe white row" id="students">
                    <div class="recipe-title">No students found!</div>
                </div>
            `;
        }
    } catch(error){
        console.log(error);
    }
}

let fileInput = document.getElementById("picture");
let profileImage = document.querySelector("#profile");

function readURL(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();

        reader.onload = function (e) {
            $(profileImage).attr('src', e.target.result).width(160).height(160);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Add an event listener to trigger the function when the file input changes
fileInput.addEventListener('change', function() {
    readURL(this);
});

// console.log(readURL(this));