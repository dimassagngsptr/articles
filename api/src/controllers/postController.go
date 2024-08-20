package controllers

import (
	"api/src/helpers"
	"api/src/models"
	"fmt"
	"math"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetAllPosts(c *fiber.Ctx) error {
	pageOld := c.Query("page")
	limitOld := c.Query("limit")
	page, _ := strconv.Atoi(pageOld)
	if page == 0 {
		page = 1
	}
	limit, _ := strconv.Atoi(limitOld)
	if limit == 0 {
		limit = 5
	}
	offset := (page - 1) * limit
	sort := c.Query("sorting")
	if sort == "" {
		sort = "DESC"
	}
	sortby := c.Query("orderBy")
	if sortby == "" {
		sortby = "ID"
	}
	sort = sortby + " " + strings.ToLower(sort)
	keyword := c.Query("search")
	status := c.Query("status")
	posts := models.GetAllPosts(sort, keyword, status, limit, offset)
	totalData := helpers.CountFilteredData("posts", status, keyword)
	totalPage := math.Ceil(float64(totalData) / float64(limit))
	result := map[string]interface{}{
		"data":        posts,
		"currentPage": page,
		"limit":       limit,
		"totalData":   totalData,
		"totalPage":   totalPage,
	}
	return c.JSON(result)
}

func GetPostDetail(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	article := models.GetPostDetail(id)
	if article.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Article not found",
		})
	}
	return c.JSON(article)
}

func CreatePost(c *fiber.Ctx) error {
	var newPost models.Post
	if err := c.BodyParser(&newPost); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
		return err
	}
	errors := helpers.ValidateStruct(newPost)
	if len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}

	models.CreatePost(&newPost)
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Articles created successfully",
	})
}

func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var updatedPost models.Post
	if err := c.BodyParser(&updatedPost); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
		return err
	}
	err := models.UpdatePost(id, &updatedPost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to update articles with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Articles with ID %d updated successfully", id),
	})
}

func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := models.DeletePost(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": fmt.Sprintf("Failed to delete articles with ID %d", id),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": fmt.Sprintf("Articles with ID %d deleted successfully", id),
	})
}
