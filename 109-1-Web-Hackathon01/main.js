var cells = document.getElementsByClassName("date")
var input = document.getElementById("cal-input")
var color = document.getElementById("cal-color")
var button = document.getElementById("cal-button")
input.value = ''
color.value = '#b0b0b0'
var stated = ''
var theme = 'Theme-black'

button.onclick = function() {
    color.value = document.getElementById("cal-color").value;
    if (stated != "" && input.value != "") {
        var new_item = document.createElement('p')
        new_item.innerText = input.value
        new_item.style.color = color.value;
        stated.appendChild(new_item)
        input.value = ""
    }
}

input.addEventListener('keyup', event => {
    color.value = document.getElementById("cal-color").value;
    if (event.keyCode === 13 && event.target.value !== '' && stated != "") {
        var new_item = document.createElement('p')
        new_item.innerText = input.value
        new_item.style.color = color.value;
        stated.appendChild(new_item)
        input.value = ""
    }
});

[].forEach.call(document.getElementsByTagName('td'), function(item) {
    item.addEventListener('click', function() {
            if (stated != '') {
                stated.style.backgroundColor = "transparent"
                if (theme === "Theme-black") {
                    stated.style.color = 'black'
                } else if (theme === "Theme-red") {
                    stated.style.color = 'white'
                } else if (theme === "Theme-blue") {
                    stated.style.color = ' rgb(26, 32, 112)'
                } else if (theme === "Theme-purple") {
                    stated.style.color = 'rgb(255, 255, 255)'
                } else if (theme === "Theme-frozen") {
                    stated.style.color = 'rgb(255, 255, 255)'
                }
            }
            // 
            if (theme === "Theme-black") {
                item.style.backgroundColor = '#000000';
                item.style.color = 'white'
            } else if (theme === "Theme-red") {
                item.style.backgroundColor = 'rgba(255, 255, 255, 0.486)';
                item.style.color = 'rgb(215, 96, 93)'
            } else if (theme === "Theme-blue") {
                item.style.backgroundColor = 'rgba(49, 52, 99, 0.932)';
                item.style.color = 'rgb(168, 212, 210)'
            } else if (theme === "Theme-purple") {
                item.style.backgroundColor = ' rgba(255, 255, 255, 0.486)';
                item.style.color = ' rgb(49, 46, 140)'
            } else if (theme === "Theme-frozen") {
                item.style.backgroundColor = 'rgba(139, 215, 219, 0.486)';
                item.style.color = ' rgb(40, 72, 99)'
            }

            stated = item

        },
        false);
});

function getTheme() {
    var a = window.getComputedStyle(document.body)
    console.log(a)

}


//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme")
for (var i = 0; i < themeButton.length; ++i) {
    themeButton[i].addEventListener('click', e => {
        document.body.setAttribute('class', e.target.id)
        theme = e.target.id
        if (theme === "Theme-black") {
            stated.style.backgroundColor = '#000000';
            stated.style.color = 'white'
        } else if (theme === "Theme-red") {
            stated.style.backgroundColor = 'rgba(255, 255, 255, 0.486)';
            stated.style.color = 'rgb(215, 96, 93)'
        } else if (theme === "Theme-blue") {
            stated.style.backgroundColor = 'rgba(49, 52, 99, 0.932)';
            stated.style.color = 'rgb(168, 212, 210)'
        } else if (theme === "Theme-purple") {
            stated.style.backgroundColor = ' rgba(255, 255, 255, 0.486)';
            stated.style.color = ' rgb(49, 46, 140)'
        } else if (theme === "Theme-frozen") {
            stated.style.backgroundColor = 'rgba(139, 215, 219, 0.486)';
            stated.style.color = ' rgb(40, 72, 99)'
        }
    }, false)

}