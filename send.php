<?php

$filename = 'chat/messages.txt';

$written = 0;

if (!empty($_POST['message']) && !empty($_POST['nickname']))
{
    $message = ["when"=>date('H:i:s'), "who" => $_POST['nickname'], "what" => $_POST['message']];

    $written = file_put_contents($filename, [json_encode($message), "\n"], FILE_APPEND | LOCK_EX);
}

header("Content-Type", "application/json; charset=utf-8");
echo json_encode(["ok" => $written > 0]);
