<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
$link = mysqli_connect('localhost', 'skipads', 'FkE58r3TeKT4Cyh5', 'skipads', '3306');
if (!$link) die("连接失败: " . mysqli_connect_error());

mysqli_set_charset($link, "utf8");

$id = $_GET['id'] ?? null;
$type = $_GET['type'] ?? null;

if ($type == "bilibili" ) {
    $stmt = $link->prepare("SELECT skipparts FROM bilibili WHERE id = ?");
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $stmt->bind_result($skippart);

    $skipparts = [];
    while ($stmt->fetch()) $skipparts[] = $skippart;

    echo json_encode([
        "status" => $skipparts ? "success" : "error",
        "id" => $id,
        "skipparts" => $skipparts ?: ["未找到记录"]
    ], JSON_UNESCAPED_UNICODE);

    $stmt->close();
} 
elseif ($type == "joyfun")
{
     $stmt = $link->prepare("SELECT skipparts FROM joyfun WHERE id = ?");
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $stmt->bind_result($skippart);

    $skipparts = [];
    while ($stmt->fetch()) $skipparts[] = $skippart;

    echo json_encode([
        "status" => $skipparts ? "success" : "error",
        "id" => $id,
        "skipparts" => $skipparts ?: ["未找到记录"]
    ], JSON_UNESCAPED_UNICODE);

    $stmt->close();

}
else {
    echo json_encode(["status" => "error", "message" => "缺少参数"], JSON_UNESCAPED_UNICODE);
}

mysqli_close($link);
?>
