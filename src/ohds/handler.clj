(ns ohds.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [compojure.route :as route]
            [schema.core :as s]
            [ohds.handler-util :refer [ok-or-400 ok-or-401]]
            [ohds.initial-census :as census]
            [ohds.projectcode-service :as codes]
            [ohds.model :refer :all]
            [ohds.user-handler :refer [user-api]]))

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

      user-api

      (context "/locationHierarchy" []
        (POST "/" []
          :summary "Create new location hierarchy"
          :return (s/maybe s/Str)
          :body [request LocationHierarchyRequest]
          (do
            (ok-or-400 (census/create
                        (census/map->LocationHierarchy request)))))
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


      (context "/socialgroup" []
        (POST "/" []
          :summary "Create new social group"
          :return (s/maybe s/Str)
          :body [request SocialGroupRequest]
          (ok-or-400 (census/create
                      (census/map->SocialGroup request))))
        (GET "/:uuid" []
          :summary "Get social group by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->SocialGroup {:uuid uuid})))))

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
          (ok (census/all-locations)))

        (GET "/:uuid" []
          :summary "Get location identified by uuid"
          :path-params [uuid :- s/Str]
                                        ;return Location
          (ok (census/fetch
               (census/map->Location {:uuid uuid})))
          ))

      (context "/individual" []
        (POST "/" []
          :summary "Create new individual, residency, membership"
          :return (s/maybe s/Str)
          :body [request IndividualRequest]
          (ok-or-400 (census/create
                      (census/map->Individual request))))
        (GET "/:uuid" []
          :summary "Get individual by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->Individual {:uuid uuid}))))
        (GET "/byLocation/:location-id" []
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
                      (census/map->Membership request))))
        (GET "/:uuid" []
          :summary "Get membership by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->Membership {:uuid uuid})))))

      (context "/residency" []
        (POST "/" []
          :summary "Create new residency"
          :return (s/maybe s/Str)
          :body [request ResidencyRequest]
          (ok-or-400 (census/create
                      (census/map->Residency request))))
        (GET "/:uuid" []
          :summary "Get residency by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->Residency {:uuid uuid})))))

      (context "/relationship" []
          (POST "/" []
            :summary "Create new relationship"
            :return (s/maybe s/Str)
            :body [request RelationshipRequest]
            (ok-or-400 (census/create
                        (census/map->Relationship request))))
          (GET "/:uuid" []
            :summary "Get relationship by id"
            :path-params [uuid :- s/Str]
            (ok (census/fetch
                 (census/map->Relationship {:uuid uuid})))))

      (context "/death" []
        (POST "/" []
          :summary "Create new death event"
          :return (s/maybe s/Str)
          :body [request DeathRequest]
          (ok-or-400 (census/create
                      (census/map->Death request))))
        (GET "/:uuid" []
          :summary "Get death by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->Death {:uuid uuid})))))

      (context "/inMigration" []
        (POST "/" []
          :summary "Create new in migration event"
          :return (s/maybe s/Str)
          :body [request InMigrationRequest]
          (ok-or-400 (census/create
                      (census/map->InMigration request))))
        (GET "/:uuid" []
          :summary "Get inMigration by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->InMigration {:uuid uuid})))))

      (context "/outMigration" []
        (POST "/" []
          :summary "Create new out migration event"
          :return (s/maybe s/Str)
          :body [request OutMigrationRequest]
          (ok-or-400 (census/create
                      (census/map->OutMigration request))))
        (GET "/:uuid" []
          :summary "Get outMigration by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->OutMigration {:uuid uuid})))))

      (context "/pregnancyObservation" []
        (POST "/" []
          :summary "Create new pregnancy observation event"
          :return (s/maybe s/Str)
          :body [request PregnancyObservationRequest]
          (ok-or-400 (census/create
                      (census/map->PregnancyObservation request))))
        (GET "/:uuid" []
          :summary "Get pregnancy observation by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->PregnancyObservation {:uuid uuid})))))

      (context "/pregnancyOutcome" []
        (POST "/" []
          :summary "Create new pregnancy outcome event"
          :return (s/maybe s/Str)
          :body [request PregnancyOutcomeRequest]
          (ok-or-400 (census/create
                      (census/map->PregnancyOutcome request))))
        (GET "/:uuid" []
          :summary "Get pregnancy outcome by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->PregnancyOutcome {:uuid uuid})))))

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
              (if child-id
                (ok-or-400 (census/create
                            (census/map->PregnancyResult child-request)))
                (bad-request)))
            (ok-or-400 (census/create
                        (census/map->PregnancyResult request)))))
        (GET "/:uuid" []
          :summary "Get pregnancy result by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->PregnancyResult {:uuid uuid})))))

      (context "/visit" []
        (POST "/" []
          :summary "Create new visit"
          :return (s/maybe s/Str)
          :body [visit-request VisitRequest]
          (ok-or-400 (census/create
                      (census/map->Visit visit-request))))
        (GET "/:uuid" []
          :summary "Get visit by id"
          :path-params [uuid :- s/Str]
          (ok (census/fetch
               (census/map->Visit {:uuid uuid}))))))))

(def app
  (routes
   my-app
   (route/resources "/")))


(comment

  (get-in app [:childs 0 :childs 0 :childs 1 :childs 0 :childs 0 :info :summary])
  (first (:childs app))
  (second (:childs app))

  (census/fetch
   (census/map->Location
    {:uuid "cb9b7353-fdb4-4c94-99a5-67c9c0eb8709"}))
  )
