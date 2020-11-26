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

var activity = 'cycling';
var chart = 'both';


let distFlag = true;
let calFlag = true;
let bothFlag = true;

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

chartbtns.forEach(btn => {
  btn.addEventListener('click', e => {
    chart = e.target.dataset.chart;
    chartbtns.forEach(btn => btn.classList.remove('Gactive'));
    e.target.classList.add('Gactive');

    if (chart === 'distance') {
      distFlag = true;
      calFlag = false;
      bothFlag = false;
    } else if (chart === 'calories') {
      distFlag = false;
      calFlag = true;
      bothFlag = false;
    } else {
      distFlag = true;
      calFlag = true;
      bothFlag = true;
    }
    update(data);
  });
});

// form submit
workoutform.addEventListener('submit', e => {
  e.preventDefault()
  const distance = parseInt(distinput.value);
  const calories = parseInt(caloriesinput.value);

  if (distance && calories) {

    db.collection('workout').doc(new Date().toISOString().slice(0,10).toString() + "_" + activity).set({
      activity,
      distance,
      calories,
      date: new Date().toISOString().slice(0,10).toString()
    }).then(() => {
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