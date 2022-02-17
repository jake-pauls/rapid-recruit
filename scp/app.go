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
    router.Use(CORS())

    api := router.Group("/api")

    // Accepts keywords in a JSON array and passes it to colly
    api.POST("/recruit", func(c *gin.Context) {
        fmt.Println(c.Request.Body)

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

func CORS() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
            c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
            c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
            c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

            if c.Request.Method == "OPTIONS" {
                    c.AbortWithStatus(204)
                    return
            }

            c.Next()
    }
}
