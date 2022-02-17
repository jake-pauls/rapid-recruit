package main

import (
    "fmt"
    "strings"
    "encoding/json"

    "github.com/go-rod/rod"
    "github.com/gocolly/colly"
)

type Recruit struct {
    Name string `json:"name"`
    Title string `json:"title"`
    Company string `json:"company"`
    Url string `json:"url"`
}

type OutRecruit struct {
    Array []Recruit `json:"recruits"`
}

type Keywords struct {
    Array []string `json:"keywords"`
}

func findRecruits(url string) []Recruit {
    var recruits []Recruit

    c := colly.NewCollector()

    c.OnHTML("a[href]", func(e *colly.HTMLElement){
        h3 := strings.TrimSpace(e.ChildText("h3"))
        data := strings.Split(h3, " - ")

        if h3 != "" && strings.Contains(h3, "LinkedIn") {
            r := Recruit{
                Name: data[0],
                Title: data[1],
                Company: strings.Split(data[2], " | ")[0],
                Url: strings.Split(e.Attr("href"), "/url?q=")[1],
            }

            recruits = append(recruits, r)
        }
    })

    c.Visit(url)
    c.Wait()

    return recruits
}

func getSearchURL(keywords []string) string {
    url := "site:linkedin.com/in"

    browser := rod.New().MustConnect()
    defer browser.MustClose()

    // Construct search URL with keywords
    for _, k := range keywords {
        url += " AND \"" + k + "\""
    }

    page := browser.MustPage("https://google.com")
    page.MustElement("input[name=q]").MustInput(url)
    page.Keyboard.Press('\r')

    return page.MustWaitLoad().MustInfo().URL
}

/**
 * Converts an array of recruits to a marshalled JSON array
 */
func marshallRecruitsToJSON(recruits []Recruit) OutRecruit {
    var jsonRecruiter OutRecruit

    for _, recruit := range recruits {
        jsonRecruiter.Array = append(jsonRecruiter.Array, recruit)
    }

    return jsonRecruiter
}

/**
 * Returns keywords parsed/unmarshalled from a JSON array
 */
func unmarshallKeywordsFromJSON(jsonData []byte) []string {
    var keywords Keywords

    err := json.Unmarshal([]byte(jsonData), &keywords)

    if err != nil {
        fmt.Println(err)
    }

    return keywords.Array
}
