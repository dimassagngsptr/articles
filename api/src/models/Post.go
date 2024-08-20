package models

import (
	"api/src/configs"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title    string `json:"title" validate:"min=20,required"`
	Content  string `json:"content" validate:"required,min=200"`
	Category string `json:"category" validate:"required"`
	Status   string `json:"status" validate:"oneof=Publish Draft Trash"`
}

func GetAllPosts(sort, title, status string, limit, offset int) []*Post {
	var items []*Post
	title = "%" + title + "%"
	query := configs.DB.Order(sort).Limit(limit).Offset(offset).Where("title LIKE ?", title)

	if status != "" {
		query = query.Where("status = ?", status)
	}

	query.Find(&items)
	return items
}

func GetPostDetail(id int) *Post {
	var items Post
	configs.DB.First(&items, "id = ?", id)
	return &items
}

func CreatePost(post *Post) error {
	result := configs.DB.Create(&post)
	return result.Error
}

func UpdatePost(id int, newPost *Post) error {
	result := configs.DB.Model(&Post{}).Where("id = ? ", id).Updates(newPost)
	return result.Error
}

func DeletePost(id int) error {
	result := configs.DB.Delete(&Post{}, "id = ?", id)
	return result.Error
}
