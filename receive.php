<?php

$messages = @file('chat.txt');
if (!$messages) {
    echo json_encode(['(Maintenant)[Drita]Vous discutez dans mon sac, dites quelque chose !']);
    exit();
}

$messagesToSend = [];
foreach ($messages as $message)
{
    $messagesToSend[] = htmlspecialchars($message);
}
echo json_encode($messagesToSend);
?>
