$(function() {
    $('#nickname').val(`invité-${Math.floor(Math.random()*10000)}`)
    $('#message').keyup(function(e) {
        if (e.which == 13) {
            $('#send').click()
        }
    })
    $('#send').click(function() {
        const message = $('#message').val()
        const nickname = $('#nickname').val()
        if ($.trim(message) != '' && $.trim(nickname) != '') {
            $.post('send.php', {
                nickname: nickname,
                message: message
            }, function() {
                receive()
                setTimeout(function() {
                    $('#chat').scrollTop($(
                        '#chat')[0].scrollHeight)
                }, 100)
            })
            $('#message').val('')
        }
    })

    setInterval(receive, 1000)
})

const receive = function() {
    $.get('receive.php', function(data) {
        const scroll = $('#chat').scrollTop() + $('#chat').height() >=
            $('#chat')[0].scrollHeight;

        data = JSON.parse(data)
        $('#chat').text('')
        $.each(data, function(id) {
            let line = data[id]
            if (line.match(/(\(.*\))(\[.*\])(.*)/)) {
                const coloredLine = line.replace(
                    /(\([^)]*\))(\[.*\])(.*)/,
                    '<div class="line"><div class="time">$1</div><div class="nickname">$2</div><div class="message">$3</div></div>'
                )
                $('#chat').append(coloredLine)
            } else {
                $('#chat').append(
                    $(
                        '<div>', {
                            text: line
                        }))
            }
        })
        if (scroll) {
            $('#chat').scrollTop($('#chat')[0].scrollHeight)
        }
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
