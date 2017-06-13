$(function() {
    $('#nickname').val(`invité-${Math.floor(Math.random()*10000)}`)
    $('#message').keyup(function(e) {
        if (e.which == 13) {
            $('#send').click()
        }
    })
    $('#send').click(function(event) {
        const message = $('#message').val()
        const nickname = $('#nickname').val()
        if ($.trim(message) != '' && $.trim(nickname) != '') {
            $.post('send.php', {
                nickname: nickname,
                message: message
            }, function() {
                setTimeout(function() {
                    $('#chat').scrollTop($(
                        '#chat')[0].scrollHeight)
                }, 100)
            })
            $('#message').val('')
        }

        event.stopPropagation()
        event.preventDefault()
    })

    receive(0)
})

const receive = function(last) {
    $.getJSON('receive.php?last=' + last)
        .then(function(data) {
            $.each(data.messages, function(id, message) {
                const coloredLine =
                    '<div class="line"><div class="time">' +
                    message.when +
                    '</div><div class="nickname">' +
                    message.who +
                    '</div><div class="message">' +
                    message.what +
                    '</div></div>'

                $('#chat').append(coloredLine)
            })
            // Petit délai de gentillesse.
            setTimeout(function(){
                receive(data.last)
            }, Math.random() * 1000);
        })
        .catch(function() {
            receive(last)
        })
}

const coloring = function(match, time, nickname, message) {
    const timeDiv = $('<div', {
        "class": 'time',
        text: time
    })
    const nicknameDiv = $('<div', {
        "class": 'nickname',
        text: nickname
    })
    const messageDiv = $('<div', {
        "class": 'message',
        text: message
    })
    const line = $('<div>', {
        "class": 'line'
    })

    line.append(timeDiv).append(nicknameDiv).append(messageDiv)
    return line
}
