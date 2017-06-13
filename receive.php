<?php

$filename = 'chat/messages.txt';
$last = $_GET['last'] != null ? (int) $_GET['last'] : 0;

if (!file_exists($filename)) {
    $message = ["who"=>"Drita", "what"=>"Vous discutez dans un sac, dites quelque chose !"];
    file_put_contents($filename, [json_encode($message), "\n"]);
}

$messages = [];

$waiting = 10;
// même si sleep n'est pas pris en compte.
set_time_limit($waiting + 1);

// Lecture des lignes...
while ($waiting > 0) {
    $handle = fopen($filename, "r");
    if (!$handle) {
        break;
    }

    // Saut à la position / ligne voulue
    fseek($handle, $last);

    while(($line = fgets($handle, 4096)) !== false) {
        $message = json_decode($line);
        $message->who = htmlspecialchars($message->who);
        $message->what = htmlspecialchars($message->what);
        $messages[] = $message;
    }

    // S'il y a eu des messages, on quitte.
    if (!empty($messages)) {
        $last = ftell($handle);
        fclose($handle);
        break;
    }

    // Sinon, on attend.
    fclose($handle);
    sleep(1);
    $waiting--;
}

header("Content-Type", "application/json; charset=utf-8");
echo json_encode(compact("messages", "last"));
