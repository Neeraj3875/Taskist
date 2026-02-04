const dialog =document.getElementById('taskInputBox');

dialog.addEventListener('click', function(event) {
    if(event.target === dialog){
        dialog.close();
    }
});

