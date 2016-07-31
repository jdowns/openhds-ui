(ns ohds.user-service
  (require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as password]))

(defn parse-body
  "Extracts JSON body from http response and reformats as edn"
  [response]
  (-> response
      :body
      (parse-string keyword)))

(defn all-users []
  (client/get "http://localhost:8080/users/bulk.json"
              {:basic-auth ["user" "password"]}))

(defn find-user
  "Find user that matches login attempt"
  [{:keys [username password]}]
  (->>
   (all-users)
   (parse-body)
   (filter #(= username (:username %)))
   (filter #(password/check password (:passwordHash %)))
   (first)
   :uuid))

(comment
  (find-user {:username "user"
              :password "password"})
  )
