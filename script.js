let moon = document.querySelector('.moon');
let sun = document.querySelector('.sun');

moon.addEventListener('click', function() {
    document.body.dataset.theme = '2';
});

sun.addEventListener('click', function() {
    document.body.dataset.theme = '1';
});