function add_paste() {
    if ( $("#new_text").val() == "" || $("#new_language").val() == "" ) {
        alert("fill in everything");
    } else {
        var new_id = create_id();
        var new_paste = { _id: new_id, language: $("#new_language").val(), text: $("#new_text").val() };
        new_paste = $.toJSON( new_paste );
        $.ajax({
            url: "http://paste.pleasework.net/couchdb/pastes/",
            dataType: "json",
            type: "POST",
            data: new_paste,
            success: function(msg) {
                window.location = "http://paste.pleasework.net/" + msg.id;
            } 
        });
    } 
}

function get_paste() {
    // this won't happily allow for any urls other than /
    var url = window.location.href.split("/");
    return url[url.length - 1]
}
    
function create_id() {
    // it's likely that this will cause collisions at some point
    var sha1 = hex_sha1( "" + Math.floor(Math.random() * 10000) + $("#new_text").val() );
    return sha1.substr(0, 8);
}

function beautify( data ) {
    // beautyOfCode is a wrapper for http://alexgorbatchev.com/SyntaxHighlighter/
    // it currently uses the CDN scripts, we'll want to change that to something local
    $.beautyOfCode.init({
        brushes: ['Xml', 'JScript', 'CSharp', 'Plain', 'Perl', 'Php', 'Bash', 'Css', 'Diff', 'Erlang', 'Python', 'Ruby', 'Sql', 'Cpp'],
        ready: function() {
            $('#language').text('Language: ' + data.language);
            $('#paste').text( data.text );
            $('#paste').addClass( data.language );
            $('#paste_url').html( "<a href=\"http://paste.pleasework.net/" + data._id + "\">http://paste.pleasework.net/" + data._id + "</a><br><br>");
            $.beautyOfCode.beautifyAll();
        }
    });
}
