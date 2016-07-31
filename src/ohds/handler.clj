(ns ohds.handler
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [compojure.route :as route]
            [schema.core :as s]

            [ohds.user-service :as uc]
            [ohds.fieldworker-service :as fc]))

(s/defschema LoginAttempt
  {:username s/Str
   :password s/Str
   s/Any s/Any})

(s/defschema FieldWorkerRequest
  {:fieldWorkerId s/Str
   :password s/Str
   :firstName (s/maybe s/Str)
   :lastName (s/maybe s/Str)})


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
            (println "Create Fieldworker" id)
            (if (some? id)
              (ok id)
              (bad-request))))
        ))))

(def app
  (routes
   my-app
   (route/resources "/")))
