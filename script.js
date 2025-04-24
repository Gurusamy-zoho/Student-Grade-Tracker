const students = [];
const studentNames = [];
const studentAverages = [];
const studentRollNo = [];


const ctx = document.getElementById('gradeChart').getContext('2d');
const gradeChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: studentNames,
    datasets: [{
      label: 'Average Marks',
      data: studentAverages,
      backgroundColor: 'rgba(0, 123, 255, 0.6)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1,
      borderRadius: 0
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
    }
  }
});

function getGrade(avg) {
  if (avg >= 90) return 'A+';
  else if (avg >= 80) return 'A';
  else if (avg >= 70) return 'B';
  else if (avg >= 60) return 'C';
  else if (avg >= 50) return 'D';
  else return 'F';
}


function addStudent() {
  const rollno = document.getElementById('roll-input').value.trim();
  const name = document.getElementById('name-input').value.trim();
  const tamil = parseFloat(document.getElementById('tamil-input').value);
  const english = parseFloat(document.getElementById('english-input').value);
  const maths = parseFloat(document.getElementById('maths-input').value);
  const science = parseFloat(document.getElementById('science-input').value);
  const social = parseFloat(document.getElementById('social-input').value);

  // if (!rollno || !name || isNaN(tamil) || isNaN(english) || isNaN(maths) || isNaN(science) || isNaN(social)) {
  //   alert("Please fill all fields with valid numbers.");
  //   return;
  // }

  if(rollno===''){
    setError("roll-input","add-roll-error","Enter a rollno")
    return;
  }

  else{
   setSuccess("roll-input","add-roll-error")
  }

  if(!validRollNo(rollno)){
    setError("roll-input","add-roll-error","Please enter a valid rollno!")
    return;
  }

  else{
    setSuccess("roll-input","add-roll-error")
  }

  if(name===''){
    setError("name-input","add-name-error","Enter a name")
    return;
  }

  else{
   setSuccess("name-input","add-name-error")
  }

  if(validName(name)){
    setError("name-input","add-name-error","Alphabetic characters only allowed")
    return;
  }

  else{
    setSuccess("name-input","add-name-error")
  }


  if(tamilInput==''){
    setError("tamil-input","add-tamil-input","Enter a mark")
  }

  else{
     setError("tamil-input","add-tamil-input");
  }



  const errBox  = document.getElementById("add-roll-error");
  const rollInp = document.getElementById("roll-input");

  // if (!rollno || !isValidSixDigit(rollNo)) {
  //   errBox.textContent = "Give a 7‑digit roll‑no that doesn't start with 0";
  //   errBox.classList.add("error-msg");
  //   document.getElementById("get-rollno-input").style="border:1.5px solid red"
  //   // rollInp.classList.add("error-input");
  //   return;
  // }

  // errBox.textContent=""
  // errBox.classList.remove("error-msg");
  // // rollInp.classList.remove("error-input");
  // document.getElementById("get-rollno-input").style=" border: 1.5px solid #ccc;"

  if (localStorage.getItem(`${rollno}`)) {
   showBox("This student rollo no already exsits.")
    return;
  }

  const total = tamil + english + maths + science + social;
  const avg = total / 5;
  const grade = getGrade(avg);

  const student = { rollno, name, tamil, english, maths, science, social, total, avg, grade };

  localStorage.setItem(`${rollno}`, JSON.stringify(student));

  students.push(student);
  studentRollNo.push(rollno);

  showBox("User added successfully")

  updateUI();
  clearForm();
}

function loadStudentsFromLocalStorage() {
  students.length = 0;
  studentRollNo.length = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    if (!isNaN(key)) {
      const student = JSON.parse(localStorage.getItem(key));
      students.push(student);
      studentRollNo.push(student.rollno);
    }
  }

  updateUI();
}

function updateUI() {
  const tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';
  studentNames.length = 0;
  studentAverages.length = 0;

  students.forEach((s) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${s.rollno}</td>
      <td>${s.name}</td>
      <td>${s.tamil}</td>
      <td>${s.english}</td>
      <td>${s.maths}</td>
      <td>${s.science}</td>
      <td>${s.social}</td>
      <td>${s.total}</td>
      <td>${s.avg.toFixed(2)}</td>
      <td>${s.grade}</td>
    `;
    studentNames.push(s.name);
    studentAverages.push(s.avg);
  });

  gradeChart.update();

}

function clearForm() {
  document.getElementById('roll-input').value = '';
  document.getElementById('name-input').value = '';
  document.getElementById('tamil-input').value = '';
  document.getElementById('english-input').value = '';
  document.getElementById('maths-input').value = '';
  document.getElementById('science-input').value = '';
  document.getElementById('social-input').value = '';
}

clearForm();
loadStudentsFromLocalStorage();

function getSpecificStudentData(){
  let rollNo = document.getElementById("get-rollno-input").value;
  let specificTableBody = document.getElementById('specificTable').getElementsByTagName('tbody')[0];
    
  specificTableBody.innerHTML = '';

    // if(!rollNo || !isValidSixDigit(rollNo)){
    //   document.getElementById("get-Error").innerText = "Given six digits valid rollno, not strating with zero";
    //   document.getElementById("get-Error").style.fontSize="14px"
    //   document.getElementById("get-Error").style.color="red"
    //   document.getElementById("get-rollno-input").style="border:1.5px solid red"
    //   return;
    // }

    // const errBox  = document.getElementById("get-Error");
    // const rollInp = document.getElementById("get-rollno-input");

    // if (!rollNo || !isValidSixDigit(rollNo)) {
    //   errBox.textContent = "Give a 7‑digit roll‑no that doesn't start with 0";
    //   errBox.classList.add("error-msg");
    //   document.getElementById("get-rollno-input").style="border:1.5px solid red"
    //   // rollInp.classList.add("error-input");
    //   return;
    // }

    // errBox.textContent=""
    // errBox.classList.remove("error-msg");
    // // rollInp.classList.remove("error-input");
    // document.getElementById("get-rollno-input").style=" border: 1.5px solid #ccc;"

    if(rollNo==''){
      setError('get-rollno-input','get-Error','Enter a roll number')
      return;
   }

   else{
     setSuccess('get-rollno-input','get-Error')
   }

   if(!validRollNo(rollNo)){
     setError('get-rollno-input','get-Error','Please enter valid RollNo')
     return;
   }

   else{
     setSuccess('get-rollno-input','get-Error')
   }


    let isConatins =  false
    setTimeout(()=>{for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (rollNo==key) {
         document.getElementById("specificTable").style="display:block;"
        const Specificstudent = JSON.parse(localStorage.getItem(key));
        const specificRow =  specificTableBody.insertRow();
        specificRow.innerHTML = `
          <td>${Specificstudent.rollno}</td>
          <td>${Specificstudent.name}</td>
          <td>${Specificstudent.tamil}</td>
          <td>${Specificstudent.english}</td>
          <td>${Specificstudent.maths}</td>
          <td>${Specificstudent.science}</td>
          <td>${Specificstudent.social}</td>
          <td>${Specificstudent.total}</td>
          <td>${Specificstudent.avg}</td>
          <td>${Specificstudent.grade}</td>
        `;

        isConatins =  true
        
      }
    }

    if(isConatins==false){
      showBox("Match not found!")
      return
    }
  },100) 
    document.getElementById("get-rollno-input").value=""
  }

  function updateStudent() {
    const roll = document.getElementById('update-roll-input').value.trim();
    const name = document.getElementById('update-name-input').value.trim();
    const tamilInput = document.getElementById('update-tamil-input').value.trim();
    const englishInput = document.getElementById('update-english-input').value.trim();
    const mathsInput = document.getElementById('update-maths-input').value.trim();
    const scienceInput = document.getElementById('update-science-input').value.trim();
    const socialInput = document.getElementById('update-social-input').value.trim();
  
    const studentData = localStorage.getItem(roll);
    if (!studentData) {
      showBox("Student with this Roll No does not exist.")
      return;
    }
  
    const student = JSON.parse(studentData);

    if (name !== "") student.name = name;
    if (tamilInput !== "") student.tamil = parseFloat(tamilInput);
    if (englishInput !== "") student.english = parseFloat(englishInput);
    if (mathsInput !== "") student.maths = parseFloat(mathsInput);
    if (scienceInput !== "") student.science = parseFloat(scienceInput);
    if (socialInput !== "") student.social = parseFloat(socialInput);

    const marks = [student.tamil, student.english, student.maths, student.science, student.social];
    student.total = marks.reduce((a, b) => a + b, 0);
    student.avg = student.total / 5;
    student.grade = getGrade(student.avg);
  
    localStorage.setItem(roll, JSON.stringify(student));
  
    showBox("Student updated successfully!")

    location.reload()
  }
  

  function deleteStudent(roll) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    
    if (confirmDelete) {
      localStorage.removeItem(roll);
      location.reload();
    }
  }
  
  function removeSpecificStudentData(){
    let removeRollNo = document.getElementById("remove-roll-input").value;
    
    if(removeRollNo==''){
       setError('remove-roll-input','remove-Error','Enter a roll number')
       return;
    }

    else{
      setSuccess('remove-roll-input','remove-Error')
    }

    if(!validRollNo(removeRollNo)){
      setError('remove-roll-input','remove-Error','Please enter valid RollNo')
    }

    else{
      setSuccess('remove-roll-input','remove-Error')
    }


    if(tamilInput==''){
      setError('remove-roll-input','remove-Error','Enter a roll number')
      return;
   }

   else{
     setSuccess('remove-roll-input','remove-Error')
   }

   if(!validRollNo(removeRollNo)){
     setError('remove-roll-input','remove-Error','Please enter valid RollNo')
   }

   else{
     setSuccess('remove-roll-input','remove-Error')
   }

    setTimeout(()=>{for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (removeRollNo==key) {
        deleteStudent(removeRollNo)
    }
  }
},500);
  }

  function showBox(msg) {
    document.getElementById("alert-msg").innerText=msg
    document.getElementById("topBox").classList.add("show");
    return;
  }

  function hideBox() {
    document.getElementById("topBox").classList.remove("show");
  }


  function setError(inputId,spanId,message){
    const inputBox = document.getElementById(`${inputId}`)
    const spanMsg = document.getElementById(`${spanId}`)

    spanMsg.innerText = message
    inputBox.classList.add('InputError')
    spanMsg.classList.add('error')
    inputBox.classList.remove('InputSuccess')
    spanMsg.classList.remove('success')
  }

  function setSuccess(inputId,spanId){
    const inputBox = document.getElementById(`${inputId}`)
    const spanMsg = document.getElementById(`${spanId}`)
    
    spanMsg.innerText = ''
    inputBox.classList.remove('InputError')
    spanMsg.classList.remove('error')
    inputBox.classList.add('InputSuccess')
    spanMsg.classList.add('success')
  }

  function validRollNo(RollNo){
    return /^[1-9]\d{6}$/.test(RollNo);
  }

  function validName(name) {
    return /^[A-Za-z\s]$/.test(name.trim());
  }
  
  function validMark(mark) {
    const num = Number(mark);
    return num >= 0 && num <= 100;
  }
  