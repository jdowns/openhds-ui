(ns ohds.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [compojure.route :as route]
            [schema.core :as s]
            [ohds.user-service :as user]
            [ohds.fieldworker-service :as fieldworker]
            [ohds.projectcode-service :as codes]
            [ohds.location-service :as location]
            [ohds.socialgroup-service :as socialgroup]
            [ohds.individual-service :as individual]
            [ohds.membership-service :as membership]
            [ohds.relationship-service :as relationship]
            [ohds.residency-service :as residency]
            [ohds.visit-service :as visit]
            [ohds.census-service :as census]))

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

(s/defschema NewCensusRequest
  {:collectionDateTime s/Str ; todo: make this time
   :colelctedByUuid s/Str ; todo: make this uuid
   :location {:name s/Str ; todo: add locHiera and coords
              :extId s/Str
              :type s/Str}
   :socialGroup {:groupName s/Str
                 :extId s/Str
                 :groupType s/Str}
   :individuals [{:firstName s/Str ; todo: add optional data
                  :extId s/Str
                  :gender s/Str
                  :membershipDate s/Str
                  :membershipStartType s/Str
                  :residencyDate s/Str
                  :residencyStartType s/Str}]
   :relationships [{:individualA s/Int ; index in :individuals
                    :individualB s/Int ; index in :individuals
                    :relationshipType s/Str
                    :startDate s/Str}]})

(s/defschema LocationRequest
  {:name s/Str
   :extId s/Str
   :type s/Str
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

(s/defschema Location
  {:extId s/Str
   :uuid s/Str})

(s/defschema Individual
  {:extId s/Str
   :uuid s/Str})

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
          (ok-or-403 (user/find-user login-attempt))))

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
          (ok-or-403 (fieldworker/find-fieldworker login-attempt)))

        (POST "/" []
          :summary "Create new fieldworker"
          :return (s/maybe s/Str)
          :body [fieldworker-request FieldWorkerRequest]
          (ok-or-400 (fieldworker/create-fieldworker fieldworker-request))))

      (context "/census" []
        (POST "/" []
          :summary "New Census location"
          :return (s/maybe [s/Str])
          :body [request NewCensusRequest]
          (ok-or-400 (census/create request))))

      (context "/socialgroup" []
        (POST "/" []
          :summary "Create new social group"
          :return (s/maybe s/Str)
          :body [socialgroup-request SocialGroupRequest]
          (ok-or-400 (socialgroup/create-socialgroup socialgroup-request))))

      (context "/location" []
        (POST "/" []
          :summary "Create new location"
          :return (s/maybe s/Str)
          :body [location-request LocationRequest]
          (ok-or-400 (location/create-location location-request)))
        (GET "/" []
          :summary "Get all locations"
          :return [Location]
          (ok (location/all-locations))))

      (context "/individual" []
        (POST "/" []
          :summary "Create new individual, residency, membership"
          :return (s/maybe s/Str)
          :body [individual-request IndividualRequest]
          (ok-or-400 (individual/create-individual individual-request)))
        (GET "/:location-id" []
          :summary "Get all individuals at location"
          :path-params [location-id :- s/Str]
          :return [Individual]
          (ok
           (map
            #(select-keys % [:extId :uuid])
            (residency/get-individuals-at-location location-id)))))

      (context "/membership" []
        (POST "/" []
          :summary "Create new membersip"
          :return (s/maybe s/Str)
          :body [membership-request MembershipRequest]
          (ok-or-400 (membership/create-membership membership-request))))

      (context "/residency" []
        (POST "/" []
          :summary "Create new residency"
          :return (s/maybe s/Str)
          :body [residency-request ResidencyRequest]
          (ok-or-400 (residency/create-residency residency-request))))

      (context "/relationship" []
          (POST "/" []
            :summary "Create new relationship"
            :return (s/maybe s/Str)
            :body [relationship-request RelationshipRequest]
            (ok-or-400 (relationship/create-relationship relationship-request))))

      (context "/visit" []
        (POST "/" []
          :summary "Create new visit"
          :return (s/maybe s/Str)
          :body [visit-request VisitRequest]
          (ok-or-400 (visit/create-visit visit-request)))))))

(def app
  (routes
   my-app
   (route/resources "/")))
