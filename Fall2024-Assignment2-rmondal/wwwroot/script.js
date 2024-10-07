const apiUrl = 'https://api.bing.microsoft.com/v7.0/search';
const apiKey = 'b3030f2f02334829942373f44f0083b2';

// Function to perform the API search
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: apiUrl + '?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (var i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}" target="_blank">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }
            $('#searchResults').html(results);
            $('#searchResults').css('visibility', 'visible'); // No dialog, just visible
        })
        .fail(function () {
            alert('Error performing search');
        });
}

// Define the luckySearch function
function luckySearch() {
    var params = {
        'q': $('#query').val(),
        'count': 1,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: apiUrl + '?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
    })
        .done(function (data) {
            var page = `<p><a href="${data.webPages.value[0].url}" target="_blank">${data.webPages.value[0].name}</a>: ${data.webPages.value[0].snippet}</p>`;
                $('#luckyResults').html(page);
                $('#luckyResults').css('visibility', 'visible');
                $('#luckyResults').dialog();
        })
        .fail(function () {
            alert('Error performing search');
        });
}

// Function to change the background image
var currentImage = 0;
var images = [
    'https://plus.unsplash.com/premium_photo-1669239112427-bfbc84fcd74c?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1669829639756-bf38f2b1c4a1?q=80&w=1844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

];

function changeBackgroundImage() {
    currentImage = (currentImage + 1) % images.length;
    $('body').css('background-image', 'url(' + images[currentImage] + ')');
}

// Function to get the current time and display it
function displayCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var currentTime = hours.toString().padStart(2, '0') + ':' + minutes + ' ' + ampm;

    $('#time').html(currentTime);
    $('#time').css('visibility', 'visible');
    $('#time').dialog();
}

// Event listeners
$('#searchButton').click(apiSearch);
$('#luckyButton').click(luckySearch); // Call the luckySearch function here
$('#searchEngineName').click(changeBackgroundImage);
$('#timeButton').click(displayCurrentTime);