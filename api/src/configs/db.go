package configs

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)
var DB *gorm.DB

func InitDb() {
	url := os.Getenv("DB_URL")
	var err error
	DB, err = gorm.Open(mysql.Open(url), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
}
