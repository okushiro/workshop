
var newPostRef = firebase.database().ref();

$('#new').click(function() {
    make();
});

$('#del').click(function() {
    out();
    save();
});

$('#reset').click(function() {
    newPostRef.remove();
    location.reload(true);
});

function make() {
    var sticky = $('<div class="sticky">Drag & Double Click!</div>');
    console.log("makeが動いてる");
    sticky.appendTo('body')
    .css('background-color', $('#color').val())
    .draggable({stop: {save, out}})
    .dblclick(function() {
        $(this).html('<textarea>' + $(this).html() + '</textarea>')
        .children()
        .focus()
        .blur(function() {
            $(this).parent().html($(this).val());
            save();
        });
    }).mousedown(function() {
        $('.sticky').removeClass('selected');
        $(this).addClass('selected');
    });
    
    return sticky;
}

function out(){
    $('.selected').remove();
}

function save(){
    var items = [];
    $('.sticky').each(function() {
      items.push({
        css: {
          left: $(this).css('left'),
          top: $(this).css('top'),
          backgroundColor: $(this).css('background-color')
        },
        html: $(this).html()
      });
    });
    newPostRef.set(JSON.stringify(items));
    console.log("saveが動いてる");
}
    
newPostRef.on('value', function(data){
    let v = data.val();
    let k = data.key;
    if(v==null){return};
    console.log(v);
    var items = JSON.parse(v);
    $.each(items, function(i, item) {
        make().css(item.css).html(item.html);
    });
});

