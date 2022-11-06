$( function() {

  $('.table').hide();
  $('.progress').hide();

  $('#btn_search').on('click', function() {
    let cep = $('#input_cep').val();
    let link = 'https://viacep.com.br/ws/' + cep + '/json/';

    validate( cep );

    $.ajax({
      url: link,
      method: 'get',
      success: function( res )
      {
        $('#input_cep').val('');

        $.each(res, function(index, item) {
          $('#' + index).html(item);

          if ( item == '' )
          {
            $('#' + index).html('Dados não encontrado');
          }
        });
      }
    });
    
  });

  function validate( numb_cep )
  {
    if ( numb_cep == '' )
    {
      $('#message').html('Por favor, preencher o campo');
    }
    else
    {
      $('.progress').show();
      $('.table').hide();

      let stops = [25, 50, 75, 100];

      $.each(stops, function(i, value) {
        setTimeout( () => {
          $('.progress-bar').css('width', value + '%').attr('aria-valuenow', value);

          if ( value == 100 )
          { 
            $('.progress').hide();
            $('.table').show();
          }
        }, i * 1500);
      });
      
    }
  }
});