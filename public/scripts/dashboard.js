$(document).ready(function () {
      var flickerAPI = "http://localhost:3000/app/getdiseases";
      $.getJSON(flickerAPI).done(function(data) {
          var form = $("<form/>", {
              action:'/app/addpatient',
              method: 'post'
          });

          for (var prop in data) {
              if (data.hasOwnProperty(prop)) {
                  form.append('<input type="checkbox" name="PD[]" value="' + prop + '" >' + prop + '   ---   ' + data[prop] + '<br>');
              }
          }

          form.append('<input type="submit" value="Submit">');

          $("#show-diseases-form").append(form);
      });
});
