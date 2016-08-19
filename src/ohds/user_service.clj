(ns ohds.user-service
  (require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as password]
           [ohds.service :refer :all]))

(def urls {:location "/locations"
           :individual "/individuals"
           :socialgroup "/socialGroups"
           :residency "/residencies"
           :membership "/memberships"
           :relationship "/relationships"
           :user "/users"
           :fieldworker "/fieldWorkers"})

(defn bulk-url
  [url]
  (str url "/bulk.json"))

(defn fieldworker->user
  [entity]
  (let [username (:fieldWorkerId entity)]
    (merge entity {:username username})))

(defn all-users []
  (http-get (bulk-url (:user urls))))

(defn all-fieldworkers []
  (http-get (bulk-url (:fieldworker urls))))

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

(defn create-fieldworker
  "Create new fieldworker"
  [{:keys [password fieldWorkerId firstName lastName]}]
  (let [request
        (into {}
              (filter second
                      {:fieldWorker {:fieldWorkerId fieldWorkerId
                                     :firstName firstName
                                     :lastName lastName}
                       :password password}))]
    (create-entity fieldworkers-url request)))


;;;;;;;;;;;;;;;;;;;;;
;;; Transformers ;;;;
;;;;;;;;;;;;;;;;;;;;;

(defprotocol Entity->Rest
  (create [this])
  (fetch [this]))

(defn shape-entity
  [keyname entity]
  {keyname (dissoc entity :collectedByUuid)
   :collectedByUuid (:collectedByUuid entity)})

(defn nest-uuid
  [k entity]
  (assoc entity k {:uuid (k entity)}))

(defn post-entity
  [k entity]
  (create-entity (k urls) (shape-entity k entity)))

(defn fetch-entity
  [k entity]
  (get-one (k urls) (:uuid entity)))

(defrecord Location []
  Entity->Rest
  (create [this]
    (post-entity :location this))
  (fetch [this]
    (fetch-entity :location this)))

(defrecord Individual []
  Entity->Rest
  (create [this]
    (post-entity :individual this))
  (fetch [this]
    (fetch-entity :individual this)))

(defrecord SocialGroup []
  Entity->Rest
  (create [this]
    (post-entity :socialgroup this))
  (fetch [this]
    (fetch-entity :socialgroup this)))

(defrecord Residency []
  Entity->Rest
  (create [this]
    (->> (nest-uuid :individual this)
         (nest-uuid :location this)
         (post-entity :residency this)))
  (fetch [this]
    (fetch-entity :residency this)))

(defrecord Membership []
  Entity->Rest
  (create [this]
    (->> (nest-uuid :individual this)
         (nest-uuid :socialGroup this)
         (post-entity :membership this)))
  (fetch [this]
    (fetch-entity :membership this)))

(defrecord Relationship []
  Entity->Rest
  (create [this]
    (->> (nest-uuid :individualA this)
         (nest-uuid :individualB this)
         (post-entity :relationship this)))
  (fetch [this]
    (fetch-entity :relationship this)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


(defn all-locations
  "Get all locations"
  []
  (get-entity (bulk-url locations-url) :locations))


;;;;;;;;;;;;;;;;;;;;;;
;;;; Manual Tests ;;;;
(comment

  (create (map->Location {:name "test location"
                          :extId "test location"
                          :type "RURAL"
                          :collectionDateTime "2016-08-01T00:56:55.920Z"
                          :collectedByUuid "UNKNOWN_STATUS"}))



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
