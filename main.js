const actbtns = document.querySelectorAll('.activityBtn');
const chartbtns = document.querySelectorAll('.chartBtn');
const workoutform = document.querySelector('.workoutform');
const bmiform = document.querySelector('.bmiform');
const formAct = document.querySelector('.workoutform span');
const distinput = document.querySelector('.distIP');
const caloriesinput = document.querySelector('.caloriesIP');

const heightinput = document.querySelector('.heightIP');
const weightinput = document.querySelector('.weightIP');

const activityerror = document.querySelector('.activityerror');
const calorieserror = document.querySelector('.calorieserror');
const bmierror = document.querySelector('.bmierror');

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
workoutform.addEventListener('submit', e => {
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

// form submit
bmiform.addEventListener('submit', e => {
  e.preventDefault()

  const height = parseInt(heightinput.value);
  const weight = parseInt(weightinput.value);
  const id = 1001;

  if (height && weight) {

    var bmiRef = db.collection("bmi").doc("1001");

    // Set the "capital" field of the city 'DC'
    return bmiRef.update({
      height: height,
      weight: weight
    })
      .then(function () {
        bmierror.textContent = '';
        heightinput.value = '';
        weightinput.value = '';
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });

    // db.collection('bmi').update({
    //   id,
    //   height,
    //   weight,
    //   date: new Date().toString()
    // }).then(() => {
    //   bmierror.textContent = '';
    //   heightinput.value = '';
    //   weightinput.value = '';
    // }).catch(err => console.log(err));
  } else {
    bmierror.textContent = 'Please enter height and weight'
  }
});