(ns ohds.integration-tests
  (:require [clj-webdriver.taxi :refer :all]))

(comment
  (def driver (new-driver  {:browser :firefox}))
  (set-driver! driver)

  (to driver "http://localhost:3000/app/index.html")
  (.sendKeys (input-text "#username" "fieldworker") "fieldworker")
  (def username-field)

  #_(.username-field)
  #_(-> "#password"
        (input-text "password")
        submit)
  )
