package routes

import (
    "os"
    "log"
    "net/http"
    "html/template"
    "database/sql"
    _ "github.com/lib/pq"
)

type Post struct {
	Title string
}

var db *sql.DB

func Index(w http.ResponseWriter, r *http.Request) {

    var datastoreName string
    if (os.Getenv("BLOG_ENV") == "DEV") {
        datastoreName = os.Getenv("BLOG_PG_CONN_DEV")
    } else {
        datastoreName = os.Getenv("BLOG_PG_CONN_PROD")
    }

    var err error
    db, err = sql.Open("postgres", datastoreName)
    if err != nil {
        log.Fatal(err)
    }

    rows, err := db.Query("SELECT * FROM posts")
    if err != nil {
        log.Fatal(err)
    }

    defer rows.Close()

    post := Post{}
    for rows.Next() {
        err = rows.Scan(&post.Title)
        if err != nil {
        	log.Fatal(err)
        }
    }

    t, _ := template.ParseFiles("templates/index.html")
    t.Execute(w, post)
}
