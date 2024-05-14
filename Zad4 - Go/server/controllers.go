package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func getProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}

func addProduct(c echo.Context) error {
	product := new(Product)
	if err := c.Bind(product); err != nil {
		return err
	}
	products[product.ID] = product
	return c.JSON(http.StatusCreated, product)
}

func updateProduct(c echo.Context) error {
	product := new(Product)
	if err := c.Bind(product); err != nil {
		return err
	}
	products[product.ID] = product
	return c.JSON(http.StatusOK, product)
}

func deleteProduct(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return err
	}
	delete(products, id)
	return c.NoContent(http.StatusNoContent)
}
