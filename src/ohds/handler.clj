(ns ohds.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [compojure.route :as route]
            [schema.core :as s]
            [ohds.initial-census :as census]
            [ohds.projectcode-service :as codes]))

;; TODO use abstract-map extension to pull out common fields
(s/defschema LoginAttempt
  {:username s/Str
   :password s/Str
   s/Any s/Any})

(s/defschema FieldWorkerRequest
  {:fieldWorkerId s/Str
   :password s/Str
   :firstName (s/maybe s/Str)
   :lastName (s/maybe s/Str)})

(s/defschema ProjectCode
  {:uuid s/Str
   :codeName s/Str
   :codeGroup s/Str
   :codeValue s/Str
   :description s/Str})

(s/defschema LocationRequest
  {:name s/Str
   :extId s/Str
   :type s/Str
   :locationHierarchyUuid s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema SocialGroupRequest
  {:groupName s/Str
   :extId s/Str
   :groupType s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema IndividualRequest
  {:firstName s/Str
   :extId s/Str
   :gender s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str
   :location s/Str})

(s/defschema ResidencyRequest
  {:individual s/Str
   :location s/Str
   :startType s/Str
   :startDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema MembershipRequest
  {:individual s/Str
   :socialGroup s/Str
   :startType s/Str
   :startDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema RelationshipRequest
  {:individualA s/Str
   :individualB s/Str
   :relationshipType s/Str
   :startDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema VisitRequest
  {:extId s/Str
   :location s/Str
   :visitDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema DeathRequest
  {:visit s/Str
   :individual s/Str
   :deathPlace s/Str
   :deathCause s/Str
   :deathDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema InMigrationRequest
  {:individual s/Str
   :residency s/Str
   :origin s/Str
   :migrationType s/Str
   :migrationDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema OutMigrationRequest
  {:individual s/Str
   :visit s/Str
   :destination s/Str
   :reason s/Str
   :migrationDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema PregnancyObservationRequest
  {:mother s/Str
   :visit s/Str
   :pregnancyDate s/Str
   :expectedDeliveryDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema PregnancyOutcomeRequest
  {:mother s/Str
   :father s/Str
   :visit s/Str
   :outcomeDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema ChildRequest
  {:firstName s/Str
   :extId s/Str
   :gender s/Str})

(s/defschema PregnancyResultRequest
  {:type s/Str
   :pregnancyOutcome s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str
   (s/optional-key :child) ChildRequest})

(s/defschema LocationHierarchyRequest
  {:level s/Str
   :parent s/Str
   :name s/Str
   :extId s/Str
   :collectedByUuid s/Str
   :collectionDateTime s/Str})

(s/defschema LocationHierarchyLevelRequest
  {:keyIdentifier s/Int
   :name s/Str})

(s/defschema Location
  {:extId s/Str
   :uuid s/Str})

(s/defschema Individual
  {:extId s/Str
   :uuid s/Str})

(s/defschema LocationHierarchyLevel
  {:uuid s/Str
   :name s/Str
   (s/optional-key :keyIdentifier) s/Int})

(defn ok-or-error
  "Returns ok if body is not nil, otherwise error"
  [body error]
  (if (some? body)
    (ok body)
    (error)))

(defn ok-or-403
  [body]
  (ok-or-error body unauthorized))

(defn ok-or-400
  [body]
  (ok-or-error body bad-request))

(def my-app
  (api
    {:swagger
     {:ui "/api-docs"
      :spec "/swagger.json"
      :data {:info {:title "Ohds"
                    :description "Compojure Api example"}
             :tags [{:name "api", :description "some apis"}]}}}

    (context "/api" []
      :tags ["api"]

      (context "/user" []
        (PUT "/" []
          :summary "Log in user"
          :return (s/maybe s/Str)
          :body [login-attempt LoginAttempt]
          (ok-or-403 (census/find-user login-attempt))))

      (context "/locationHierarchy" []
        (POST "/" []
          :summary "Create new location hierarchy"
          :return (s/maybe s/Str)
          :body [request LocationHierarchyRequest]
          (ok-or-400 (census/create
                      (census/map->LocationHierarchy request))))
        (GET "/" []
          :summary "Get all location hierarchies grouped by parent"
          (ok (census/all-hierarchies))))

      (context "/locationHierarchyLevel" []
        (POST "/" []
          :summary "Create new location hierarchy level"
          :return (s/maybe s/Str)
          :body [request LocationHierarchyLevelRequest]
          (ok-or-400 (census/create
                      (census/map->LocationHierarchyLevel request))))
        (GET "/" []
          :summary "Get all location hierarchy levels"
          :return [LocationHierarchyLevel]
          (ok (census/all-hierarchy-levels))))

      (context "/projectcode" []
        (GET "/:group" []
          :summary "Get all project codes for a group"
          :return [ProjectCode]
          :path-params [group :- s/Str]
          (ok (codes/codes group))))

      (context "/fieldworker" []
        (PUT "/" []
          :summary "Log in fieldworker"
          :return (s/maybe s/Str)
          :body [login-attempt LoginAttempt]
          (ok-or-403 (census/find-fieldworker login-attempt)))

        (POST "/" []
          :summary "Create new fieldworker"
          :return (s/maybe s/Str)
          :body [fieldworker-request FieldWorkerRequest]
          (ok-or-400 (census/create-fieldworker fieldworker-request))))

      (context "/socialgroup" []
        (POST "/" []
          :summary "Create new social group"
          :return (s/maybe s/Str)
          :body [request SocialGroupRequest]
          (ok-or-400 (census/create
                      (census/map->SocialGroup request)))))

      (context "/location" []
        (POST "/" []
          :summary "Create new location"
          :return (s/maybe s/Str)
          :body [request LocationRequest]
          (ok-or-400 (census/create
                      (census/map->Location request))))
        (GET "/" []
          :summary "Get all locations"
          :return [Location]
          (ok (census/all-locations))))

      (context "/individual" []
        (POST "/" []
          :summary "Create new individual, residency, membership"
          :return (s/maybe s/Str)
          :body [request IndividualRequest]
          (ok-or-400 (census/create
                      (census/map->Individual request))))
        (GET "/:location-id" []
          :summary "Get all individuals at location"
          :path-params [location-id :- s/Str]
          :return [Individual]
          (ok
           (map
            #(select-keys % [:extId :uuid])
            (census/get-individuals-at-location location-id)))))

      (context "/membership" []
        (POST "/" []
          :summary "Create new membersip"
          :return (s/maybe s/Str)
          :body [request MembershipRequest]
          (ok-or-400 (census/create
                      (census/map->Membership request)))))

      (context "/residency" []
        (POST "/" []
          :summary "Create new residency"
          :return (s/maybe s/Str)
          :body [request ResidencyRequest]
          (ok-or-400 (census/create
                      (census/map->Residency request)))))

      (context "/relationship" []
          (POST "/" []
            :summary "Create new relationship"
            :return (s/maybe s/Str)
            :body [request RelationshipRequest]
            (ok-or-400 (census/create
                        (census/map->Relationship request)))))

      (context "/death" []
        (POST "/" []
          :summary "Create new death event"
          :return (s/maybe s/Str)
          :body [request DeathRequest]
          (ok-or-400 (census/create
                      (census/map->Death request)))))

      (context "/inMigration" []
        (POST "/" []
          :summary "Create new in migration event"
          :return (s/maybe s/Str)
          :body [request InMigrationRequest]
          (ok-or-400 (census/create
                      (census/map->InMigration request)))))

      (context "/outMigration" []
        (POST "/" []
          :summary "Create new out migration event"
          :return (s/maybe s/Str)
          :body [request OutMigrationRequest]
          (ok-or-400 (census/create
                      (census/map->OutMigration request)))))

      (context "/pregnancyObservation" []
        (POST "/" []
          :summary "Create new pregnancy observation event"
          :return (s/maybe s/Str)
          :body [request PregnancyObservationRequest]
          (ok-or-400 (census/create
                      (census/map->PregnancyObservation request)))))

      (context "/pregnancyOutcome" []
        (POST "/" []
          :summary "Create new pregnancy outcome event"
          :return (s/maybe s/Str)
          :body [request PregnancyOutcomeRequest]
          (ok-or-400 (census/create
                      (census/map->PregnancyOutcome request)))))

      (context "/pregnancyResult" []
        (POST "/" []
          :summary "Create new pregnancy result event"
          :return (s/maybe s/Str)
          :body [request PregnancyResultRequest]
          (if (:child request)
            (let [child (merge (:child request)
                               (select-keys request [:collectionDateTime
                                                     :collectedByUuid]))
                  child-id  (census/create
                             (census/map->Individual child))
                  child-request (assoc request :child child-id)]
              (println "***" child)
              (println "***" child-id)
              (println "***" child-request)
              (if child-id
                (ok-or-400 (census/create
                            (census/map->PregnancyResult child-request)))
                (bad-request)))
            (ok-or-400 (census/create
                        (census/map->PregnancyResult request))))))

      (context "/visit" []
        (POST "/" []
          :summary "Create new visit"
          :return (s/maybe s/Str)
          :body [visit-request VisitRequest]
          (ok-or-400 (census/create
                      (census/map->Visit visit-request))))))))

(def app
  (routes
   my-app
   (route/resources "/")))
