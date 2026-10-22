// Assignment 5 - JavaScript Basics (DOM Manipulation & Events)
// Tamerlan Aitken, IT-2503


// ---------- Part 1 ----------

// Task 1. userProfile object with different data types
const userProfile = {
    name: "Tamerlan",    // string
    birthYear: 2007,     // number
    isDeveloper: true,   // boolean
    hobbies: ["football", "video games", "music"]   // array
};

console.log("userProfile:", userProfile);
console.log("name is " + typeof userProfile.name);
console.log("birthYear is " + typeof userProfile.birthYear);
console.log("isDeveloper is " + typeof userProfile.isDeveloper);
console.log("hobbies is array: " + Array.isArray(userProfile.hobbies));


// Task 2. arithmetic calculations
function getAge() {
    let currentYear = new Date().getFullYear();
    let age = currentYear - userProfile.birthYear;
    return age;
}

function getMonths() {
    let months = getAge() * 12;
    return months;
}

function getHobbiesCount() {
    return userProfile.hobbies.length;
}

// this function shows the profile and calculations on the page
function showProfile() {
    document.getElementById("nameText").textContent = userProfile.name;
    document.getElementById("yearText").textContent = userProfile.birthYear;

    if (userProfile.isDeveloper === true) {
        document.getElementById("devText").textContent = "Yes";
    } else {
        document.getElementById("devText").textContent = "No";
    }

    document.getElementById("hobbiesText").textContent = userProfile.hobbies.join(", ");

    let age = getAge();
    let months = getMonths();
    let count = getHobbiesCount();

    document.getElementById("ageText").textContent = age;
    document.getElementById("monthsText").textContent = months;
    document.getElementById("countText").textContent = count;

    console.log("Age: " + age);
    console.log("Months: " + months);
    console.log("Hobbies count: " + count);
}

showProfile();


// ---------- Part 2 ----------

// Task 4. event listener for the form
let form = document.getElementById("profileForm");
let message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // so the page does not reload

    let username = document.getElementById("usernameInput").value.trim();
    let year = document.getElementById("yearInput").value;
    let currentYear = new Date().getFullYear();

    // check that fields are not empty
    if (username === "" || year === "") {
        message.textContent = "Please fill in both fields!";
        message.style.color = "red";
        return;
    }

    year = Number(year);

    // check that year is correct
    if (year < 1900 || year > currentYear) {
        message.textContent = "Please enter a correct birth year!";
        message.style.color = "red";
        return;
    }

    // update the object
    userProfile.name = username;
    userProfile.birthYear = year;

    console.log("Profile updated:", userProfile);
    showProfile();

    message.textContent = "Profile updated successfully!";
    message.style.color = "green";

    // change style of profile box
    document.getElementById("profileBox").style.backgroundColor = "#e8f5e9";

    form.reset();
});


// ---------- Part 3 ----------

// Task 5. add and remove list items
let hobbyList = document.getElementById("hobbyList");
let itemInput = document.getElementById("itemInput");
let addBtn = document.getElementById("addBtn");
let removeBtn = document.getElementById("removeBtn");
let listMessage = document.getElementById("listMessage");

// put hobbies from the object into the list
for (let i = 0; i < userProfile.hobbies.length; i++) {
    let li = document.createElement("li");
    li.textContent = userProfile.hobbies[i];
    hobbyList.appendChild(li);
}

addBtn.addEventListener("click", function() {
    let text = itemInput.value.trim();

    if (text === "") {
        listMessage.textContent = "Write something first!";
        listMessage.style.color = "red";
        return;
    }

    let li = document.createElement("li");
    li.textContent = text;
    hobbyList.appendChild(li);

    userProfile.hobbies.push(text);
    showProfile();

    listMessage.textContent = "Item added: " + text;
    listMessage.style.color = "green";
    itemInput.value = "";
});

removeBtn.addEventListener("click", function() {
    let lastItem = hobbyList.lastElementChild;

    if (lastItem === null) {
        listMessage.textContent = "The list is empty!";
        listMessage.style.color = "red";
        return;
    }

    hobbyList.removeChild(lastItem);
    userProfile.hobbies.pop();
    showProfile();

    listMessage.textContent = "Last item removed";
    listMessage.style.color = "green";
});
