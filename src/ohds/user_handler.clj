(ns ohds.user-handler
  (:require [compojure.api.sweet :refer :all]
            [ohds.model :refer :all]
            [ohds.initial-census :as census]
            [ohds.handler-util :refer [ok-or-400 ok-or-401]]
            [schema.core :as s]))

(def user-api
  (api
   (context "/user" []
     (PUT "/" []
       :summary "Log in user"
       :return (s/maybe s/Str)
       :body [login-attempt LoginAttempt]
       (ok-or-401 (census/find-user login-attempt))))

   (context "/fieldworker" []
     (PUT "/" []
       :summary "Log in fieldworker"
       :return (s/maybe s/Str)
       :body [login-attempt LoginAttempt]
       (ok-or-401 (census/find-fieldworker login-attempt)))

     (POST "/" []
       :summary "Create new fieldworker"
       :return (s/maybe s/Str)
       :body [fieldworker-request FieldWorkerRequest]
       (ok-or-400 (census/create-fieldworker fieldworker-request))))))
