const actbtns = document.querySelectorAll('.activityBtn');
const chartbtns = document.querySelectorAll('.chartBtn');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const distinput = document.querySelector('.distIP');
const caloriesinput = document.querySelector('.caloriesIP');
const activityerror = document.querySelector('.activityerror');
const calorieserror = document.querySelector('.calorieserror');

const workoutsucess = document.querySelector('.workoutsucess');

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
  const calories = parseInt(caloriesinput.value);

  if (distance && calories) {
    db.collection('workout').add({
      activity,
      distance,
      calories,
      date: new Date().toString()
    }).then(() => {
      workoutsucess.textContent = 'Entry saved'
      activityerror.textContent = '';
      calorieserror.textContent = '';
      distinput.value = '';
      caloriesinput.value = '';
    }).catch(err => console.log(err));
  } else if (distance && !calories) {
    calorieserror.textContent = 'Please enter calories'
    activityerror.textContent = '';
  } else if (!distance && calories) {
    activityerror.textContent = 'Please enter distance'
    calorieserror.textContent = '';
  } else {
    calorieserror.textContent = 'Please enter calories'
    activityerror.textContent = 'Please enter distance'
  }
});