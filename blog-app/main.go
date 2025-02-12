package main

import (
	"blog-app/controllers"
	"blog-app/middleware"
	"blog-app/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

func main() {
	r := gin.Default()
	models.ConnectDatabase()

	// Allow CORS from anywhere
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Public Routes
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// Protected Routes
	authorized := r.Group("/")
	authorized.Use(middleware.AuthMiddleware())
	{
		authorized.POST("/blogs", controllers.CreateBlog)
		authorized.GET("/blogs", controllers.GetBlogs)
		authorized.GET("/blogs/:id", controllers.GetBlogByID)
		authorized.PUT("/blogs/:id", controllers.UpdateBlog)
		authorized.DELETE("/blogs/:id", controllers.DeleteBlog)
		authorized.POST("/blogs/:id/comments", controllers.CreateComment)
	}

	r.Run(":8080")
}
