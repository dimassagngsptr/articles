package routes

import (
	"api/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"info":    "Hello, wellcome to the API.😊",
			"message": "Server running...",
		})
	})
	api := app.Group("/article")
	api.Get("/", controllers.GetAllPosts)
	api.Get("/:id", controllers.GetPostDetail)
	api.Post("/", controllers.CreatePost)
	api.Put("/:id", controllers.UpdatePost)
	api.Delete("/:id", controllers.DeletePost)
}
