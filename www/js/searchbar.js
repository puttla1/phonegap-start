$(function() {
    var opts = $('#optlist option').map(function(){
          return [[this.value, $(this).text()]];
            });


    $('#airinput').keyup(function(){
        var rxp = new RegExp($('#airinput').val(), 'i');
          var optlist = $('#optlist').empty();
            opts.each(function(){
                    if (rxp.test(this[1])) {
                                optlist.append($('<option/>').attr('value', this[0]).text(this[1]));
                                      }
                      });
            optlist.prepend($('<option/>').attr('value', '').text("Airport"));
                  
    });
          
      });

