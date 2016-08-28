(ns ohds.initial-census
  (require [clj-http.client :as client]
           [cheshire.core :refer :all]
           [crypto.password.bcrypt :as password]
           [ohds.service :refer :all]))

(def urls {:location "/locations"
           :individual "/individuals"
           :socialGroup "/socialGroups"
           :residency "/residencies"
           :membership "/memberships"
           :relationship "/relationships"
           :user "/users"
           :fieldworker "/fieldWorkers"
           :death "/deaths"
           :inMigration "/inMigrations"
           :outMigration "/outMigrations"
           :pregnancyObservation "/pregnancyObservations"
           :pregnancyOutcome "/pregnancyOutcomes"
           :pregnancyResult "/pregnancyResults"
           :locationHierarchy "/locationHierarchies"
           :locationHierarchyLevel "/locationHierarchyLevels"
           :visit "/visits"})

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

(defn all-hierarchies []
  (->>  (bulk-url (:locationHierarchy urls))
        (http-get)
        (parse-body)
        (group-by #(get-in % [:parent :uuid]))))

(defn all-hierarchy-levels []
  (->> (bulk-url (:locationHierarchyLevel urls))
       (http-get)
       (parse-body)
       (filter #(not= "UNKNOWN_STATUS" (:name %)))
       (map #(select-keys % [:uuid :name :keyIdentifier]))))

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
    (create-entity (:fieldworker urls) request)))


;;;;;;;;;;;;;;;;;;;;;
;;; Transformers ;;;;
;;;;;;;;;;;;;;;;;;;;;

(defprotocol Entity->Rest
  (create [this])
  (fetch [this]))

(defn shape-entity
  [keyname entity & parent]
  (let [reshaped {keyname (dissoc entity :collectedByUuid :locationHierarchyUuid)
                  :collectedByUuid (:collectedByUuid entity)}]
    (if parent
      (assoc reshaped :locationHierarchyUuid (:locationHierarchyUuid entity))
      reshaped)))

(defn nest-uuid
  [k entity]
  (assoc entity k {:uuid (k entity)}))

(defn post-entity
  [k entity & parent]
  (if parent
    (let [e  (shape-entity k entity parent)]
      (create-entity (k urls) e))
    (let [e  (shape-entity k entity)]
      (create-entity (k urls) e))))

(defn fetch-entity
  [k entity]
  (get-one (k urls) (:uuid entity)))

(defrecord LocationHierarchy []
  Entity->Rest
  (create [this]
    (let [parent (:locationHierarchyUuid this)]
      (->> this
           (nest-uuid :level)
           (post-entity :locationHierarchy))))
  (fetch [this]
    (fetch-entity :locationHierarchy this)))

(defrecord LocationHierarchyLevel []
  Entity->Rest
  (create [this]
    (->> this
         (post-entity :locationHierarchyLevel)))
  (fetch [this]
    (fetch-entity :locationHierarchyLevel this)))

(defrecord Location []
  Entity->Rest
  (create [this]
    (post-entity :location this (:locationHierarchyUuid this)))
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
    (post-entity :socialGroup this))
  (fetch [this]
    (fetch-entity :socialGroup this)))

(defrecord Residency []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :individual)
         (nest-uuid :location)
         (post-entity :residency)))
  (fetch [this]
    (fetch-entity :residency this)))

(defrecord Membership []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :individual)
         (nest-uuid :socialGroup)
         (post-entity :membership)))
  (fetch [this]
    (fetch-entity :membership this)))

(defrecord Relationship []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :individualA)
         (nest-uuid :individualB)
         (post-entity :relationship)))
  (fetch [this]
    (fetch-entity :relationship this)))

(defrecord Death []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :individual)
         (nest-uuid :visit)
         (post-entity :death)))
  (fetch [this]
    (fetch-entity :death)))

(defrecord InMigration []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :visit)
         (nest-uuid :individual)
         (nest-uuid :residency)
         (post-entity :inMigration)))
  (fetch [this]
    (fetch-entity :inMigration)))

(defrecord OutMigration []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :visit)
         (nest-uuid :individual)
         (nest-uuid :residency)
         (post-entity :outMigration)))
  (fetch [this]
    (fetch-entity :outMigration)))

(defrecord PregnancyObservation []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :mother)
         (nest-uuid :visit)
         (post-entity :pregnancyObservation)))
  (fetch [this]
    (fetch-entity :pregnancyObservation)))

(defrecord PregnancyOutcome []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :mother)
         (nest-uuid :father)
         (nest-uuid :visit)
         (post-entity :pregnancyOutcome)))
  (fetch [this]
    (fetch-entity :pregnancyObservation)))

(defrecord PregnancyResult []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :child)
         (nest-uuid :pregnancyOutcome)
         (post-entity :pregnancyResult)))
  (fetch [this]
    (fetch-entity :pregnancyResult)))

(defrecord Visit []
  Entity->Rest
  (create [this]
    (->> this
         (nest-uuid :location)
         (post-entity :visit )))
  (fetch [this]
    (fetch-entity :visit)))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


(defn all-locations
  "Get all locations"
  []
  (->> (get-all  (bulk-url (:location urls)))
       (map #(select-keys % [:uuid :extId]))))

(defn get-residencies
  [hierarchy-id]
  (get-some (:residency urls) hierarchy-id))

(defn get-individuals-at-location
  [location-id]
  (let [hierarchy (get-in (fetch (map->Location {:uuid location-id}))
                          [:locationHierarchy :uuid])
        residencies (get-residencies hierarchy)]
    (->>
     residencies
     (filter #(= (get-in % [:location :uuid])
                 location-id))
     (map #(get-in % [:individual :uuid]))
     (map #(fetch (map->Individual {:uuid %})))
     doall)))

;;;;;;;;;;;;;;;;;;;;;;
;;;; Manual Tests ;;;;
(comment
  (find-user {:username "user"
              :password "password"})

  (find-fieldworker {:username "fieldworker"
                     :password "password"})

  (all-locations)
  (bulk-url (:location urls))


  (let [loc (create (map->Location {:name "test location 123"
                                    :extId "test location 123"
                                    :type "RURAL"
                                    :locationHierarchyUuid "4bb8e526-d7cf-46e3-937c-ea6fe66b676b"
                                    :collectionDateTime "2016-08-01T00:56:55.920Z"
                                    :collectedByUuid "UNKNOWN_STATUS"}))

        grp (create (map->SocialGroup {:groupName "test group"
                                       :extId "test group"
                                       :groupType "COHORT"
                                       :collectionDateTime "2016-08-01T00:00:00.000Z"
                                       :collectedByUuid "UNKNOWN_STATUS"}))

        ind (create (map->Individual {:firstName "tester"
                                      :extId "tester"
                                      :gender "FEMALE"
                                      :collectionDateTime "2016-08-01T00:00:00.000Z"
                                      :collectedByUuid "UNKNOWN_STATUS"}))]

    [(create (map->Residency {:individual ind
                              :location loc
                              :startType "BIRTH_MIGRATION"
                              :startDate "2015-01-01T00:00:00.000Z"
                              :collectionDateTime "2016-08-01T00:00:00.000Z"
                              :collectedByUuid "UNKNOWN_STATUS"}))

     (create (map->Membership {:socialGroup grp
                               :individual ind
                               :startType "BIRTH_MIGRATION"
                               :startDate "2015-01-01T00:00:00.000Z"
                               :collectionDateTime "2016-08-01T00:00:00.000Z"
                               :collectedByUuid "UNKNOWN_STATUS"
                               }))
     (create (map->Relationship {:individualA ind
                                 :individualB ind
                                 :relationshipType "SELF"
                                 :startDate "2015-01-01T00:00:00.000Z"
                                 :collectionDateTime "2016-08-01T00:00:00.000Z"
                                 :collectedByUuid "UNKNOWN_STATUS"
                                 }))]
    )

  (create (map->Death {:individual "UNKNOWN_STATUS"
                       :deathPlace "UNKNOWN_STATUS"
                       :deathCause "death"
                       :deathDate "2015-08-01T00:00:00.000Z"
                       :collectionDateTime "2016-08-01T00:00:00.000Z"
                       :collectedByUuid "UNKNOWN_STATUS"}))

  (create (map->InMigration
           {:individual "UNKNOWN_STATUS"
            :residency "UNKNOWN_STATUS"
            :origin "UNKNOWN STATUS"
            :visit "UNKNOWN_STATUS"
            :migrationType "INTERNAL_MIGRATION"
            :migrationDate "2015-08-01T00:00:00.000Z"
            :collectionDateTime "2016-08-01T00:00:00.000Z"
            :collectedByUuid "UNKNOWN_STATUS"}))

  (create (map->OutMigration
           {:individual "UNKNOWN_STATUS"
            :residency "UNKNOWN_STATUS"
            :destination "UNKNOWN STATUS"
            :visit "UNKNOWN_STATUS"
            :reason "GTFO"
            :migrationDate "2015-08-01T00:00:00.000Z"
            :collectionDateTime "2016-08-01T00:00:00.000Z"
            :collectedByUuid "UNKNOWN_STATUS"}))

  (create (map->PregnancyObservation
           {:mother "UNKNOWN_STATUS"
            :visit "UNKNOWN_STATUS"
            :pregnancyDate "2016-12-01T00:00:00.000Z"
            :expectedDeliveryDate "2017-08-01T00:00:00.000Z"
            :collectionDateTime "2017-04-01T00:00:00.000Z"
            :collectedByUuid "UNKNOWN_STATUS"}))

  (create (map->PregnancyOutcome
           {:mother "UNKNOWN_STATUS"
            :father "UNKNOWN_STATUS"
            :visit "UNKNOWN_STATUS"
            :outcomeDate "2016-11-01T00:00:00.000Z"
            :collectionDateTime "2017-04-01T00:00:00.000Z"
            :collectedByUuid "UNKNOWN_STATUS"}))

  (let [ind
        (create (map->Individual {:firstName "tester"
                                  :extId "tester"
                                  :gender "FEMALE"
                                  :collectionDateTime "2016-08-01T00:00:00.000Z"
                                  :collectedByUuid "UNKNOWN_STATUS"}))]
    (create (map->PregnancyResult
             {:type "LIVE_BIRTH"
              :pregnancyOutcome "UNKNOWN_STATUS"
              :child ind
              :collectionDateTime "2017-04-01T00:00:00.000Z"
              :collectedByUuid "UNKNOWN_STATUS"})))

  (create (map->LocationHierarchy {:level "UNKNOWN_STATUS"
                                   :parent "UNKNOWN_STATUS"
                                   :name "Foo Location Hierarchy"
                                   :extId "Foo Location Hierarchy"
                                   :collectedByUuid "UNKNOWN_STATUS"
                                   :collectionDateTime "2010-01-10T00:00:00.000Z"}))

  (create (map->LocationHierarchyLevel {:name "Foo Level"
                                        :keyIdentifier 3}))

  (get (all-hierarchies) nil)

)
