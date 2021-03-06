$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chat_window_1" ).remove();
});
$(document).on('click', '#btn-chat', function(e) {
    $("#chat-panel").append('<div class="row msg_container base_sent">    <div class="col-xs-10 col-md-10">        <div class="messages msg_sent">            <p>' + $('#btn-input').val() + '</p>            <time datetime="2009-11-13T20:00">Arjun</time>        </div>    </div>    <div class="col-md-2 col-xs-2 avatar">        <img src="images/lead.jpg" class=" img-responsive ">    </div></div>');
    $("#btn-input").val('');
    ajaxCall("http://localhost:3001/Answer", "POST", "{'Answer' : 'Fire in the hole'}")
    //$('#chat-panel').animate({ 
    //    scrollTop: $(document).height()-$(window).height()}, 
    //    1400, 
    //    "swing"
    // );
    $('#chat-panel').animate({scrollTop:$(document).height()}, 'swing');
});

function ajaxCall(url, method, body){
    $.ajax
    ({
        type: method,
        url: url,
        body: body,
        success: function(html)
        {
            setBotMessage(html);
            
            $('#chat-panel').animate({scrollTop:$(document).height()}, 'swing');
        }
    });
}

function setBotMessage(html){
    $("#chat-panel").remove(".typing-indicator");
    $("#chat-panel").append(
        '<div class="panel-body msg_container_base" id="chat-panel">'+
                    '<div class="row msg_container base_receive">'+
                        '<div class="col-md-2 col-xs-2 avatar">'+
                            '<img src="images/wpsquarelogo.png" class=" img-responsive ">'+
                        '</div>'+
                        '<div class="col-md-10 col-xs-10">'+
                            '<div class="messages msg_receive">'+
                                '<p>' + html + '</p>'+
                                '<time datetime="2009-11-13T20:00">Animbot</time>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>');
}
