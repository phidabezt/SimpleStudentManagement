function StudentList() {
   this.studentList = [];
   this.add = function(newStudent) {
      this.studentList.push(newStudent)
   }

   this.remove = function(removeStudent) {
      for (var i = 0; i < removeStudent.length; i++) {
         for (var j = 0; j < this.studentList.length; j++) {
            var std = this.studentList[j]
            if (removeStudent[i] == std.studentID) {
               this.studentList.splice(j, 1)
            }
         }
      }
   }

   this.alternate = function(alternateStudent) {
      for (var i = 0; i < this.studentList.length; i++) {
         var tempStd = this.studentList[i]
         if (tempStd.studentID == alternateStudent.studentID) {
            tempStd.name = alternateStudent.name
            tempStd.email = alternateStudent.email
            tempStd.ID = alternateStudent.ID
            tempStd.phoneNB = alternateStudent.phoneNB
         }
      }
   }

   this.searchStudent = function(keyword) {
      var searchList = new StudentList();
      for(var i = 0; i < this.studentList.length; i++) {
         var std = this.studentList[i]
         if (std.name.toLowerCase().trim().search(keyword) != -1) {
            searchList.add(std)
         }
      }
      return searchList
   }

   this.searchStudentById = function(id) {
      for (var i = 0; i < this.studentList.length; i++) {
         if (this.studentList[i].studentID == id) {
            return this.studentList[i]
         }
      }
      return null
   }
}