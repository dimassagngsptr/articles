package helpers

import "api/src/configs"

func CountFilteredData(tableName, status, title string) int64 {
	var count int64
	query := configs.DB.Table(tableName).Where("title LIKE ? AND deleted_at IS NULL", "%"+title+"%")

	if status != "" {
		query = query.Where("status = ?", status)
	}

	query.Count(&count)
	return count
}
