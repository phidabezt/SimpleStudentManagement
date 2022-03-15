var stdList = new StudentList()
var validate = new Validation()

getStorage()

// play some with prototype
Student.prototype.mathScore = 0
Student.prototype.physicScore = 0
Student.prototype.chemScore = 0
Student.prototype.aveScore = 0
Student.prototype.rank = ''
// add prototype
Student.prototype.aveCalculate = function() {
   this.aveScore = (Number(this.mathScore) + Number(this.physicScore) + Number(this.chemScore)) / 3
   console.log(this.aveScore)
}

Student.prototype.ranking = function() {
   if (this.aveScore <= 10 && this.aveScore >=8) {
      this.rank = 'Giỏi'
   } else if (this.aveScore < 8 && this.aveScore >= 6.5) {
      this.rank = 'Khá'
   } else if (this.aveScore < 6.5 && this.aveScore >= 5) {
      this.rank = "Trung bình"
   } else {
      this.rank = "Yếu"
   }
}


function DomID(id) {
   return document.getElementById(id);
}

function invalidColor(ID) {
   DomID(ID).style.borderColor = "red"
   DomID(ID).style.boxShadow = "0 0 0 0.2rem rgb(205 92 92 / 25%)"
}

function validColor(ID) {
   DomID(ID).style.borderColor = "green"
   DomID(ID).style.boxShadow = "0 0 0 0.2rem rgb(50 205 50 / 25%)"
}

function addStudent() {
   var studentID = DomID("studentID").value
   var name = DomID("name").value
   var ID = DomID("ID").value
   var email = DomID("email").value
   var phoneNumber = DomID("phoneNumber").value
   var foul = 0

   if (isInputEmpty('studentID', studentID)) {
      foul++
   }

   if (isInputEmpty('name', name)) {
      foul++
   }

   if (isInputEmpty('ID', ID)) {
      foul++
   }

   if (isInputEmpty('email', email)) {
      foul++
   }

   if (!isValidEmail('email', email)) {
      foul++
   }

   if (isInputEmpty('phoneNumber', phoneNumber)) {
      foul++
   }

   if (!isValidNumber('phoneNumber', phoneNumber)) {
      foul++
   }

   if (foul != 0) {
      return
   }

   var student = new Student(studentID, name, email, phoneNumber, ID)
   student.mathScore = DomID('mathScore').value
   student.physicScore = DomID('physicScore').value
   student.chemScore = DomID('chemScore').value
   student.aveCalculate()
   student.ranking()
   stdList.add(student)
   udpateStudentList(stdList)
}

function isValidNumber(ID, value) {
   if (validate.validatePhoneNB(value)) {
      validColor(ID)
      return true
   } else {
      invalidColor(ID)
      return false
   }
}

function isValidEmail(ID, value) {
   if (validate.validateEmail(value)) {
      validColor(ID)
      return true
   } else {
      invalidColor(ID)
      return false
   }
}

function isInputEmpty(ID, value) {
   if (validate.isEmpty(value)) {
      invalidColor(ID)
      return true
   } else {
      validColor(ID)
      return false
   }
}

function udpateStudentList(stdList) {
   var lstTableStudent = DomID('tbodyStudent')
   lstTableStudent.innerHTML = ''

   for (var i = 0; i < stdList.studentList.length; i++) {
      var std = stdList.studentList[i]
      var trStudent = document.createElement('tr')
      trStudent.id = std.studentID
      trStudent.className = 'trStudent'
      trStudent.setAttribute('onclick' ,'alternateStudent('+std.studentID+')')

      var td_checkBox = document.createElement('td')
      var ckbStudentID = document.createElement('input')
      ckbStudentID.setAttribute('type', 'checkbox')
      ckbStudentID.setAttribute('class', 'ckbStudent')
      ckbStudentID.setAttribute('value', std.studentID)
      td_checkBox.appendChild(ckbStudentID)


      var td_studentID = createTagTD('studentID', std.studentID)
      var td_name = createTagTD('name', std.name)
      var td_email = createTagTD('email', std.email)
      var td_ID = createTagTD('ID', std.ID)
      var td_phoneNumber = createTagTD('phoneNumber', std.phoneNB)

      var td_aveScore = createTagTD('aveScore', std.aveScore) 
      var td_rank = createTagTD('rank', std.rank)
      
      trStudent.appendChild(td_checkBox)
      trStudent.appendChild(td_studentID)
      trStudent.appendChild(td_name)
      trStudent.appendChild(td_email)
      trStudent.appendChild(td_ID)
      trStudent.appendChild(td_phoneNumber)
      trStudent.appendChild(td_aveScore)
      trStudent.appendChild(td_rank)

      lstTableStudent.appendChild(trStudent)
   }
}

function createTagTD(className, value) {
   var td = document.createElement('td')
   td.className = className
   td.innerHTML = value
   return td
}

function setStorage() {
   var jsonStudentList = JSON.stringify(stdList.studentList)
   localStorage.setItem('StudentList', jsonStudentList)
}

function getStorage() {
   var jsonStudentList = localStorage.getItem('StudentList')
   var stdListParse = JSON.parse(jsonStudentList)
   stdList.studentList = stdListParse
   udpateStudentList(stdList)
}

function removeStd() {
   var checkStudent = document.getElementsByClassName('ckbStudent')
   var selectedStudent = []
   for (var i = 0; i < checkStudent.length; i++) {
      if (checkStudent[i].checked) {
         selectedStudent.push(checkStudent[i].value)
         console.log(checkStudent[i].value)
      }
   }
   console.log(selectedStudent)
   stdList.remove(selectedStudent)
   udpateStudentList(stdList)
}

function searchStudent() {
   var keyword = DomID('keyword').value
   var searchResult = stdList.searchStudent(keyword)
   udpateStudentList(searchResult)
}

function alternateStudent(std_ID) {
   var std = stdList.searchStudentById(std_ID)
   if (std != null) {
      DomID('studentID').value = std.studentID
      DomID('name').value = std.name
      DomID('ID').value = std.ID
      DomID('email').value = std.email
      DomID('phoneNumber').value = std.phoneNB
   }
}

function saveInfo() {
   var studentID = DomID("studentID").value
   var name = DomID("name").value
   var ID = DomID("ID").value
   var email = DomID("email").value
   var phoneNumber = DomID("phoneNumber").value
   var foul = 0

   if (isInputEmpty('studentID', studentID)) {
      foul++
   }

   if (isInputEmpty('name', name)) {
      foul++
   }

   if (isInputEmpty('ID', ID)) {
      foul++
   }

   if (isInputEmpty('email', email)) {
      foul++
   }

   if (!isValidEmail('email', email)) {
      foul++
   }

   if (isInputEmpty('phoneNumber', phoneNumber)) {
      foul++
   }

   if (!isValidNumber('phoneNumber', phoneNumber)) {
      foul++
   }

   if (foul != 0) {
      return
   }

   var student = new Student(studentID, name, email, phoneNumber, ID)
   stdList.alternate(student)
   udpateStudentList(stdList)
}