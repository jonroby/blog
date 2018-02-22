package routes

import (
    "net/http"
    "html/template"
)

func Index(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("templates/index.html")
    t.Execute(w, nil)
}
