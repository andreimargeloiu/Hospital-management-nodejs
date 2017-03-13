
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL"); // the unordered list
    li = ul.getElementsByTagName('li'); // all list elements

    // Loop through all list items, and hide those who don't match the search query
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
