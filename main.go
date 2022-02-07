package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()
	router.SetTrustedProxies([]string{"127.0.0.1"})

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./client/dist", true)))

	// Start and run the server
	router.Run("localhost:3000")
}
