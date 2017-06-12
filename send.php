<?php

if (!empty($_POST['message']) && !empty($_POST['nickname']))
{
    file_put_contents('chat.txt', '(' . date('H:i:s') . ')[' . trim($_POST['nickname']) . ']' . trim($_POST['message']) . "\n", FILE_APPEND);
    echo 'OK';
}

?>
