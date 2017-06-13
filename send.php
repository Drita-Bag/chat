<?php

if (!empty($_POST['message']) && !empty($_POST['nickname']))
{
    file_put_contents('chat.txt', '[' . trim($_POST['nickname']) . ']' . trim($_POST['message']) . "\n", FILE_APPEND);
}

?>
