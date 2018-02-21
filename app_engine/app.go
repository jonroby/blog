package app

import (
    "net/http"
    "blog/routes"
)

func init() {
 	http.Handle("/static/", http.StripPrefix("/static/",
                            http.FileServer(http.Dir("../static"))))

    http.HandleFunc("/", routes.Index)
}
