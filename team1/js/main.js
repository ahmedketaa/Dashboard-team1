const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});

// handle login
$(document).ready(function() {
    // Handle form submission
    $('.login form').submit(function(e) {
      e.preventDefault(); // Prevent the form from submitting normally
  
      // Get the input values
      var userName = $('#userName').val();
      var password = $('#password').val();
  
      // Create an object to hold the login data
      var loginData = {
        email: userName,
        password: password
      };

  
      // Send the login request using Ajax
      $.ajax({
        url: 'https://graduation-project-nrnm.onrender.com/api/v1/employees/login',
        type: 'POST',
        data: JSON.stringify(loginData),
        contentType: "application/json",
      
        success: function(data) {
          // Handle the response data
          var token = data.token;
          localStorage.setItem('token', token);
            console.log(data);
            window.location.href='dash.html';
            // Login successful, redirect or perform further actions

          
        },
        error: function(xhr, status, error) {
          // Handle any errors that occur during the request
          console.error('Error:', error);
          console.log(xhr);
          console.log(status);
        }
      });
    });
  });

  let user;

displayAllUsers = function(){
  const token = localStorage.getItem("token");
  $.ajax({
    url:'https://graduation-project-nrnm.onrender.com/api/v1/users',
    method:'GET',
    headers: {
      "Authorization":`Bearer ${token}`,  
    },
    success : function(response){
      var cartona = '';
      console.log(response);
      user=response.data;
      localStorage.setItem("userCount",user.length);
      for (let i = 0; i < user.length; i++) {
    cartona +=`
    <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card-container p-3 mb-5">
              <span class="pro">PRO </span>
              <img class="round" src="./images/no result.png" alt="user" />
              <h3>${user[i].name}</h3>
              <h6>${user[i].email}</h6>
              <p>${user[i].id} <br/> ${user[i].phone}</p>
              <div class="buttons">
                <button class="primary" >
                  User Pets
                </button>
                <button class="primary ghost" onclick="deleteUser('${user[i].id}')">
                  Delete
                </button>
              </div>
              <div class="skills">
                
              </div>
            </div>
          </div>
    `
    
  }
  document.getElementById('prodId').innerHTML=cartona;
    },
    error : function(error){
      console.log(error);
    }

  });
}
$('#userList').click(function(){
  displayAllUsers();
})

// Delete  users
  
function deleteUser(i){
  alert(i)
  
  const token = localStorage.getItem('token');
  // const confirmDelete = confirm(`Are you sure you want to delete user of id ${i} ?`);
  $.ajax({
    url : `https://graduation-project-nrnm.onrender.com/api/v1/users/${i}`,
    method :'DELETE',
    headers:{
      "Authorization": `Bearer ${token}`
    },
    success:function(response){
      console.log(response);
      displayAllUsers();
    },
    error : function(error){
      console.log(error);
    }
  })
};


// CARS
let cars;
displayAllCars = function(){
  const token = localStorage.getItem("token");
  $.ajax({
    url:'https://graduation-project-nrnm.onrender.com/api/v1/cars/',
    method:'GET',
    headers: {
      "Authorization":`Bearer ${token}`,  
    },
    success : function(response){
     
      var cartona = '';
      console.log(response);
      cars=response.data;
      console.log(cars)
      for (let i = 0; i < cars.length; i++) {
        const plateNum =cars[i].plateNum ;
        const characters = plateNum.match(/[a-zA-Z]+/)[0];
        const numbers = plateNum.match(/\d+/)[0];
    cartona +=`
    <div class="col-lg-6 col-md-6 col-sm-6">
    <div class="card-container p-3 mb-5">
        <span class="pro">ADMIN</span>
       <h1>CAR</h1>
        <h3>Color: ${cars[i].color}</h3>
      <div class="plate-header">
        EGYPT  <span>مصر</span>
      </div>
      <div class="plate-body">
        <span class="letters">${characters}</span>
        <span class="sperate">
            
        </span>
        <span class="numbers">${numbers}</span>
      </div>
        <div class="buttons">
          <button class="primary">
            Update
          </button>
          <button class="primary ghost" onclick="deleteUser('${cars[i].plateNum}')">
            Delete
          </button>
        </div>
        <div class="skills"></div>
</div>
 </div>
    `
    
  }
  document.getElementById('prodId').innerHTML=cartona;
    },
    error : function(error){
      console.log(error);
    }

  });
}

$('#cars').click(function(){
  displayAllCars();
})
// Delete Car

function deleteUser(i){
  alert(i)
  
  const token = localStorage.getItem('token');
  // const confirmDelete = confirm(`Are you sure you want to delete user of id ${i} ?`);
  $.ajax({
    url : `https://graduation-project-nrnm.onrender.com/api/v1/cars/${i}`,
    method :'DELETE',
    headers:{
      "Authorization": `Bearer ${token}`
    },
    success:function(response){
      console.log(response);
      displayAllCars();
    },
    error : function(error){
      console.log(error);
    }
  })
};