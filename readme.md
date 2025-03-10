# gpt-todolist exercise project

## 簡易架構圖

資料庫架在雲端主機上，沒有用 docker 包 XD

![Screenshot 2025-03-10 at 10.40.35 AM](https://hackmd.io/_uploads/S17E-Cosyx.png)

# Todo List RESTful API 文件

## 基本資訊

- **基礎 URL**: `http://172.233.78.61:3000/api`
- **回應格式**: JSON

## 回應狀態碼

| 狀態碼 | 描述                             |
| ------ | -------------------------------- |
| 200    | 成功                             |
| 201    | 成功建立資源                     |
| 400    | 請求錯誤（例如：欄位未填寫正確） |
| 404    | 找不到資源                       |
| 500    | 伺服器錯誤                       |

## 回應格式

### 成功回應

```json
{
  "status": "success",
  "data": [ ... ] // 可能是陣列或物件
}
```

### 錯誤回應

```json
{
  "status": "failed",
  "message": "錯誤描述"
}
```

### 伺服器錯誤

```json
{
  "status": "error",
  "message": "伺服器錯誤"
}
```

## API 端點

### 1. 獲取所有待辦事項

- **URL**: `/todos`
- **方法**: `GET`
- **描述**: 回傳所有待辦事項列表

#### 成功回應範例 (200)

```json
{
  "status": "success",
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "完成專案提案",
      "completed": false,
      "created_at": "2025-03-10T08:30:00.000Z",
      "updated_at": "2025-03-10T08:30:00.000Z"
    },
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "title": "回覆客戶郵件",
      "completed": true,
      "created_at": "2025-03-09T14:20:00.000Z",
      "updated_at": "2025-03-10T09:15:00.000Z"
    }
  ]
}
```

### 2. 獲取特定待辦事項

- **URL**: `/todos/:id`
- **方法**: `GET`
- **描述**: 根據 ID 回傳特定待辦事項
- **參數**:
  - `id` (路徑參數): 待辦事項的唯一識別碼 (UUID)

#### 成功回應範例 (200)

```json
{
  "status": "success",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "完成專案提案",
    "completed": false,
    "created_at": "2025-03-10T08:30:00.000Z",
    "updated_at": "2025-03-10T08:30:00.000Z"
  }
}
```

#### 錯誤回應範例 (404)

```json
{
  "status": "failed",
  "message": "找不到該待辦事項"
}
```

### 3. 新增待辦事項

- **URL**: `/todos`
- **方法**: `POST`
- **描述**: 建立新的待辦事項
- **請求主體**:
  - `title` (必填): 待辦事項標題

#### 請求範例

```json
{
  "title": "準備週會報告"
}
```

#### 成功回應範例 (201)

```json
{
  "status": "success",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174002",
    "title": "準備週會報告",
    "completed": false,
    "created_at": "2025-03-10T10:15:30.000Z",
    "updated_at": "2025-03-10T10:15:30.000Z"
  }
}
```

#### 錯誤回應範例 (400)

```json
{
  "status": "failed",
  "message": "欄位未填寫正確"
}
```

### 4. 更新待辦事項

- **URL**: `/todos/:id`
- **方法**: `PUT`
- **描述**: 更新特定待辦事項
- **參數**:
  - `id` (路徑參數): 待辦事項的唯一識別碼 (UUID)
- **請求主體**:
  - `title` (選填): 更新的標題
  - `completed` (選填): 更新的完成狀態 (布林值)

#### 請求範例

```json
{
  "title": "修改後的週會報告",
  "completed": true
}
```

#### 成功回應範例 (200)

```json
{
  "status": "success",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174002",
    "title": "修改後的週會報告",
    "completed": true,
    "created_at": "2025-03-10T10:15:30.000Z",
    "updated_at": "2025-03-10T10:30:45.000Z"
  }
}
```

#### 錯誤回應範例 (404)

```json
{
  "status": "failed",
  "message": "找不到該待辦事項"
}
```

### 5. 刪除待辦事項

- **URL**: `/todos/:id`
- **方法**: `DELETE`
- **描述**: 刪除特定待辦事項
- **參數**:
  - `id` (路徑參數): 待辦事項的唯一識別碼 (UUID)

#### 成功回應範例 (200)

```json
{
  "status": "success",
  "data": {
    "message": "待辦事項已成功刪除"
  }
}
```

#### 錯誤回應範例 (404)

```json
{
  "status": "failed",
  "message": "找不到該待辦事項"
}
```
