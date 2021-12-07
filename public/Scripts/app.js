/*
Student IDs:  301163248
              301000645
              301172984
Webapp name: app.js
Description: Immediately Invoked Function Expression
*/
// IIFE -- Immediately Invoked Function Expression

(function () {

    function Start() {
        console.log("App Started...");

        let delButton = document.querySelectorAll('.btn-danger');

        for (button of delButton) {
            button.addEventListener('click', (event) => {
                if (!confirm("Are you sure you want to delete contact?")) { //asking user a follow up question if they want to delete contact
                    event.preventDefault();
                    window.location.assign('/survey-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();