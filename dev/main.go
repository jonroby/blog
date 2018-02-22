package main

import (
    "net/http"
    "blog/routes"
)

func main() {
    http.Handle("/static/", http.StripPrefix("/static/",
                            http.FileServer(http.Dir("static"))))

    http.HandleFunc("/", routes.Index)

    http.ListenAndServe(":8080", nil)
}
