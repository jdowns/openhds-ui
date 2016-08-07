(ns ohds.user-service
  (require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as password]
           [ohds.service :refer :all]))


(defn all-users []
  (client/get "http://localhost:8080/users/bulk.json"
              {:basic-auth ["user" "password"]}))

(defn validate-password
  [expected pw-hash]
  (password/check expected pw-hash))

(defn find-user'
  "Find user that matches login attempt"
  [{:keys [username password]} users]
  (->>
   users
   (filter #(= username (:username %)))
   (filter #(validate-password password (:passwordHash %)))
   (first)
   :uuid))

(defn find-user
  [login-attempt]
  (find-user' login-attempt (parse-body (all-users))))

(comment
  (find-user {:username "user"
              :password "password"})
  )
