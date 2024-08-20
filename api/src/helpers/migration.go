package helpers

import (
	"api/src/configs"
	"api/src/models"
)

func Migration() {
	configs.DB.AutoMigrate(&models.Post{})
}