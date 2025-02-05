<?php
$link = mysqli_connect('localhost', 'skipads', 'FkE58r3TeKT4Cyh5', 'skipads', '3306');
if ($link->connect_error) {
    die("连接失败: " . $link->connect_error);
}
else{
$src = file_get_contents('php://input');
echo "接收到的原始数据: " . $src; 
file_put_contents('debug.log', $src);

$json = json_decode($src, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("JSON解析错误: " . json_last_error_msg());
}

function checkCredentials($username, $password, $pdo) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM devusers WHERE username = ? AND password = ?");
    $stmt->execute([$username, $password]);
    return $stmt->fetchColumn() > 0; }
$id = $json['id'];
$user = $json['user'];
$key = $json['key'];
$sign = $json['sign'];
$type = $json['type'];

if((sign + 76) / 2 - time() <= 3) 
{
    if(checkCredentials($user,$key) = 1){
        $skipparts = json_encode($json['skipparts']); 
        $sql = "INSERT INTO bilibili (id, skipparts,submit) VALUES ('$bv', '$skipparts','$user')";
        if (mysqli_query($link, $sql)) {
            echo "true";}
       else {
             echo "false: " . mysqli_error($link);} }

$link->close();
}
}
?>
