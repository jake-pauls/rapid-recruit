package main

import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    fmt.Println("Finding recruits...")

    router := gin.New()

    router.Use(gin.Recovery())

    api := router.Group("/api")

    api.GET("/recruit", func(c *gin.Context) {
        recruits := findRecruits()

        fmt.Println(recruits)

        jsonRecruits := marshallRecruitsToJSON(recruits)

        c.JSON(http.StatusOK, jsonRecruits)
    })

    api.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "ping" : "pong",
        })
    })

    port := fmt.Sprintf(":%d", 4040)

    server := &http.Server {
        Addr: port,
        Handler: router,
    }

    server.ListenAndServe()
}
