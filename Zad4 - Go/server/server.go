package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.POST("/products", addProduct)
	e.GET("/products", getProducts)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)

	e.Logger.Fatal(e.Start(":1323"))
}
