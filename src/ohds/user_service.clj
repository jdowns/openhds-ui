(ns ohds.user-service
  (require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as password]
           [ohds.service :refer :all]))

(def users-url "/users")
(def fieldworkers-url "/fieldWorkers")

(defn bulk-url
  [url]
  (str url "/bulk.json"))

(defn fieldworker->user
  [entity]
  (let [username (:fieldWorkerId entity)]
    (merge entity {:username username})))

(defn all-users []
  (http-get (bulk-url users-url)))

(defn all-fieldworkers []
  (http-get (bulk-url fieldworkers-url)))

(defn post-fieldworker
  [entity]
  (http-post fieldworkers-url entity))

(defn validate
  [expected-username expected-password
   {:keys [username passwordHash]}]
  (and (= username expected-username)
       (password/check expected-password passwordHash)))

(defn find-user'
  "Find user that matches login attempt"
  [{:keys [username password]} users]
  (->>
   users
   (filter (partial validate username password))
   first
   :uuid))

(defn find-user
  [login-attempt]
  (find-user' login-attempt (parse-body (all-users))))

(defn find-fieldworker
  [login-attempt]
  (find-user' login-attempt
              (map fieldworker->user (parse-body (all-fieldworkers)))))

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

(defn location->rest
  "Transform frontend location model to rest model"
  [{:keys [name extId type collectionDateTime collectedByUuid]}]
  {:location {:name name
              :extId extId
              :type type
              :collectionDateTime collectionDateTime}
   :collectedByUuid collectedByUuid})

(defn create-location
  "Create a new location and return it's id"
  [request]
  (->> (location->rest request)
       (create-entity "/locations")))

(defn all-locations
  "Get all locations"
  []
  (get-entity "/locations.bulk" :locations))

(defn location
  "Get location at uuid"
  [uuid]
  (get-one "/locations" uuid))

(comment
  (find-user {:username "user"
              :password "password"})

  (find-fieldworker {:username "fieldworker"
                     :password "password"})

  (create-location
   {:name "test location"
    :extId "test location"
    :type "RURAL"
    :collectionDateTime "2016-08-01T00:56:55.920Z"
    :collectedByUuid "UNKNOWN_STATUS"})
  )
