function Validation() {
   this.isEmpty = function (value) {
      return value.trim() === "";
   };

   this.validateEmail = function (value) {
      var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(value.toLowerCase().trim());
   };

   this.validatePhoneNB = function(value) {
      var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return (re.test(value) && value.length >= 10)
      }
}
