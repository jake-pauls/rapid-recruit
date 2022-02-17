package main

import (
    "fmt"
    "net/http"
    "io/ioutil"

    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.New()

    router.Use(gin.Recovery())

    api := router.Group("/api")

    // Accepts keywords in a JSON array and passes it to colly
    api.POST("/recruit", func(c *gin.Context) {
        jsonData, err := ioutil.ReadAll(c.Request.Body)

        if err != nil {
            fmt.Println(err)
        }

        fmt.Println(string(jsonData))

        keywords := unmarshallKeywordsFromJSON(jsonData)

        url := getSearchURL(keywords)
        recruits := findRecruits(url)
        jsonRecruits := marshallRecruitsToJSON(recruits)

        c.JSON(http.StatusOK, jsonRecruits)
    })

    // Test endpoint
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
