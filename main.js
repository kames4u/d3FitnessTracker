const actbtns = document.querySelectorAll('.activityBtn');
const chartbtns = document.querySelectorAll('.chartBtn');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const distinput = document.querySelector('.distIP');
const caloriesinput = document.querySelector('.distIP');
const error = document.querySelector('.error');
const sucess = document.querySelector('.sucess');

var activity = 'cycling';

actbtns.forEach(btn => {
  btn.addEventListener('click', e => {
    activity = e.target.dataset.activity;
    actbtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    distinput.setAttribute('id', activity);
    formAct.textContent = activity;
    update(data)
  });
});

// form submit
form.addEventListener('submit', e => {
    e.preventDefault()
    const distance = parseInt(distinput.value);
    if(distance){
      db.collection('workout').add({
        distance, 
        activity,
        date: new Date().toString()
      }).then(() => {
        sucess.textContent = 'Entry saved'
        error.textContent = '';
        distinput.value = '';
      }).catch(err => console.log(err));
    } else {
      error.textContent = 'Please enter a valid distance'
    }
  
  });