(ns ohds.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [compojure.route :as route]
            [schema.core :as s]

            [ohds.user-service :as uc]
            [ohds.fieldworker-service :as fc]
            [ohds.projectcode-service :as pc]
            [ohds.location-service :as lc]))

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
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

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
          (let [id (uc/find-user login-attempt)]
            (if (some? id)
              (ok id)
              (unauthorized)))))

      (context "/projectcode" []
        (GET "/:group" []
          :summary "Get all project codes for a group"
          :return [ProjectCode]
          :path-params [group :- s/Str]
          (ok (pc/codes group))
          ))
      (context "/fieldworker" []
        (PUT "/" []
          :summary "Log in fieldworker"
          :return (s/maybe s/Str)
          :body [login-attempt LoginAttempt]
          (let [id (fc/find-fieldworker login-attempt)]
            (if (some? id)
              (ok id)
              (unauthorized))))

        (POST "/" []
          :summary "Create new fieldworker"
          :return (s/maybe s/Str)
          :body [fieldworker-request FieldWorkerRequest]
          (let [id (fc/create-fieldworker fieldworker-request)]
            (if (some? id)
              (ok id)
              (bad-request))))
        )
      (context "/location" []
        (POST "/" []
          :summary "Create new location"
          :return (s/maybe s/Str)
          :body [location-request LocationRequest]
          (let [id (lc/create-location location-request)]
            (println "Create Fieldworker" id)
            (if (some? id)
              (ok id)
              (bad-request))))))))

(def app
  (routes
   my-app
   (route/resources "/")))
