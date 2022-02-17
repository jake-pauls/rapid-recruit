package main

import (
    "strings"

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

func findRecruits() []Recruit {
    var recruits []Recruit

    url := getSearchURL()

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

func getSearchURL() string {
    browser := rod.New().MustConnect()
    defer browser.MustClose()

    page := browser.MustPage("https://google.com")
    page.MustElement("input[name=q]").MustInput("site:linkedin.com/in AND \"Unity Developer\" AND \"Vancouver\"")
    page.Keyboard.Press('\r')

    return page.MustWaitLoad().MustInfo().URL
}

func marshallRecruitsToJSON(recruits []Recruit) OutRecruit {
    var jsonRecruiter OutRecruit

    for _, recruit := range recruits {
        jsonRecruiter.Array = append(jsonRecruiter.Array, recruit)
    }

    return jsonRecruiter
}
