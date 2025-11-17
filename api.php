<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "connection.php";

$method = $_SERVER['REQUEST_METHOD'];
$input  = json_decode(file_get_get_contents("php://input"), true);

// Action (optional)
$action = $input['action'] ?? null;

// Table name
$table = $input['table'] ?? $_GET['table'] ?? null;

if (!$table) {
    echo json_encode(["error" => "Table name is required"]);
    exit;
}


/* ============================================================
   1. CREATE TABLE
   ============================================================ */
if ($action === "create_table") {

    if (!isset($input['columns']) || !is_array($input['columns'])) {
        echo json_encode(["error" => "Column definitions are required"]);
        exit;
    }

    $columns = $input['columns'];

    // Build column SQL
    $columnSqlParts = ["id INT AUTO_INCREMENT PRIMARY KEY"];

    foreach ($columns as $colName => $type) {
        $columnSqlParts[] = "$colName $type";
    }

    $columnSql = implode(", ", $columnSqlParts);

    $sql = "CREATE TABLE IF NOT EXISTS $table ($columnSql)";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Table created successfully"]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }

    exit;
}


/* ============================================================
   2. STANDARD CRUD OPERATIONS
   ============================================================ */
switch ($method) {

    // READ
    case "GET":
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM $table WHERE id=?");
            $stmt->bind_param("i", $id);
        } else {
            $stmt = $conn->prepare("SELECT * FROM $table");
        }

        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        echo json_encode($rows);
        break;

    // CREATE (INSERT)
    case "POST":
        if (!isset($input['data'])) {
            echo json_encode(["error" => "Data is required"]);
            exit;
        }

        if ($action === "create_table") {
            // Already handled above
            exit;
        }

        $columns = array_keys($input['data']);
        $values = array_values($input['data']);

        $colString = implode(",", $columns);
        $placeholders = implode(",", array_fill(0, count($values), "?"));

        $stmt = $conn->prepare("INSERT INTO $table ($colString) VALUES ($placeholders)");

        $types = str_repeat("s", count($values));
        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "id" => $stmt->insert_id]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    // UPDATE
    case "PUT":
        if (!isset($input['id']) || !isset($input['data'])) {
            echo json_encode(["error" => "ID and data are required"]);
            exit;
        }

        $id = intval($input['id']);
        $setParts = [];
        $values = [];

        foreach ($input['data'] as $col => $val) {
            $setParts[] = "$col=?";
            $values[] = $val;
        }

        $setString = implode(",", $setParts);
        $sql = "UPDATE $table SET $setString WHERE id=?";

        $stmt = $conn->prepare($sql);

        $values[] = $id;
        $types = str_repeat("s", count($values) - 1) . "i";

        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    // DELETE
    case "DELETE":
        if (!isset($_GET['id'])) {
            echo json_encode(["error" => "ID is required"]);
            exit;
        }

        $id = intval($_GET['id']);

        $stmt = $conn->prepare("DELETE FROM $table WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
}
?>
