package app

import (
    "net/http"
    "blog/routes"
)

func init() {
    // fs := http.FileServer(http.Dir("static"))
 //  	http.Handle("/static/", http.StripPrefix("/static/", fs))

    http.HandleFunc("/", routes.Index)
}
