var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var submitBtn = document.getElementById('btnAdd');
var container = [];

if (localStorage.getItem('websites') != null) {
    container = JSON.parse(localStorage.getItem('websites'));
    displayData();
};
submitBtn.onclick = function () {
    if (submitBtn.innerHTML == 'Update') {
        changeData();
    }
    else {
        addItem();
    };
};


function addItem() {
    if (validateName() == true) {
        if (validateUrl() == true) {

            item = {
                name: siteName.value,
                url: siteUrl.value
            };
            container.push(item);
            localStorage.setItem('websites', JSON.stringify(container));
            displayData();
            clearData();
        }
        else {
            alert('false url');
        }
    }
    else {
        alert('false name');
    };
};

function displayData() {
    var cartoona = ``;
    for (var i = 0; i < container.length; i++){
        cartoona += `<div class="item row align-items-center m-1 bg-light py-3  rounded-2 mt-3">
                    <div class="col-md-8">
                        <span class='mx-2'>${i}</span>
                        <span class="fs-5 fw-bold">${container[i].name}</span>
                    </div>
                    <div class="col-md-4 d-flex justify-content-evenly">
                        <a href="${container[i].url}" target='_blank'><button class="btn btn-outline-info">Visit</button></a>
                        <button class="btn btn-outline-warning" onclick='updateData(${i});'>Update</button>
                        <button class="btn btn-outline-danger btn-delete" onclick='deleteData(${i});'>Delete</button>
                    </div>
                </div>`;
    };
    document.getElementById('rowData').innerHTML = cartoona;
};

function deleteData(deletedIndex) {
    container.splice(deletedIndex, 1);
    localStorage.setItem('websites', JSON.stringify(container));
    displayData();
};

var globalIndex;
function updateData(updateIndex) {
    siteName.focus();
    globalIndex = updateIndex;
    siteName.value = container[globalIndex].name,
    siteUrl.value = container[globalIndex].url;
    document.getElementById('btnAdd').innerHTML = 'Update';
};

function changeData() {
    if (validateName() == true) {
        if (validateUrl() == true) {
            container[globalIndex].name = siteName.value;
            container[globalIndex].url = siteUrl.value;
            localStorage.setItem('websites', JSON.stringify(container));
            displayData();
            document.getElementById('btnAdd').innerHTML = 'Add';
            clearData();
        } else {
            alert('false url');
        }
    } else {
        alert('false Name');
    }
};
function clearData() {
    siteName.value = '';
    siteUrl.value = '';
};



function validateName() {
    regex =/^[A-Z][a-z]{3,15}$/;
    if (regex.test(siteName.value) == true) {
        return true;
    } else {
        return false;
    };
};

function validateUrl() {
    regex =/^https:\/\/www\.[a-z]{4,15}\.com$/;
    if (regex.test(siteUrl.value) == true) {
        return true;
    } else {
        return false;
    };
};