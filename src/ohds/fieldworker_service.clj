(ns ohds.fieldworker-service
  (:require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as password]

           [ohds.service :refer [parse-body gen-url post-header auth-header]]))


(defn all-users []
  (client/get (gen-url "/fieldWorkers/bulk.json")
              auth-header))

(defn post-fieldworker [fieldworker]
  (client/post (gen-url "/fieldWorkers")
               (post-header fieldworker)))

(defn validate-password
  [expected pw-hash]
  (password/check expected pw-hash))

(defn find-fieldworker'
  "Find user that matches login attempt"
  [{:keys [username password]} users]
  (println "field-fieldworker'" username password users)
  (->>
   users
   (filter #(= username (:fieldWorkerId %)))
   (filter #(validate-password password (:passwordHash %)))
   (first)
   :uuid))

(defn find-fieldworker
  [login-attempt]
  (find-fieldworker' login-attempt (parse-body (all-users))))


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
  (find-fieldworker' {:username "tester"
                      :password "foo"} (parse-body (all-users)))

  (create-fieldworker {:fieldWorkerId "testr"
                       :password "testr"})

  (post-fieldworker {:fieldWorker {:fieldWorkerId "testr"}
                     :password "testr"})
  )
