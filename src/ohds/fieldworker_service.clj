(ns ohds.fieldworker-service
  (:require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as bcrypt]

           [ohds.service :refer [parse-body gen-url post-header auth-header]]))


(defn- all-users []
  (client/get (gen-url "/fieldWorkers/bulk.json")
              auth-header))

(defn- post-fieldworker [fieldworker]
  (client/post (gen-url "/fieldWorkers")
               (post-header fieldworker)))

(defn- find-fieldworker'
  "Find fieldworker that matches login attempt"
  [username password]
  (->>
   (all-users)
   parse-body
   (filter #(= username (:fieldWorkerId %)))
   (filter #(bcrypt/check password (:passwordHash %)))
   first))

(defn find-fieldworker
  "Find fieldworker that matches login attempt and return id"
  [{:keys [username password]}]
  (:uuid (find-fieldworker' username password)))

(defn create-fieldworker'
  "Create new fieldworker"
  [{:keys [password fieldWorkerId firstName lastName]}]
  (let [request
        (into {}
              (filter second
                      {:fieldWorker {:fieldWorkerId fieldWorkerId
                                     :firstName firstName
                                     :lastName lastName}
                       :password password}))]
    (-> (post-fieldworker request)
        (parse-body))))

(defn create-fieldworker
  "create new fieldworker, return id"
  [fieldworker]
  (:uuid (create-fieldworker' fieldworker)))

(comment
  (find-fieldworker' "tester" "foo")

  (create-fieldworker {:fieldWorkerId "testr"
                       :password "testr"})

  (post-fieldworker {:fieldWorker {:fieldWorkerId "testr"}
                     :password "testr"})
  )
