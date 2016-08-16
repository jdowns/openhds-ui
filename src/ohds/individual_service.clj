(ns ohds.individual-service
  (:require [clj-http.client :as client]
            [ohds.service :refer [parse-body gen-url post-header auth-header get-one]]))


(defn post-individual
  [individual]
  (client/post (gen-url "/individuals")
               (post-header individual)))

(defn create-individual'
  [{:keys [firstName extId gender collectionDateTime collectedByUuid]}]
  (let [request
        {:individual {:firstName firstName
                      :extId extId
                      :gender gender
                      :collectionDateTime collectionDateTime}
         :collectedByUuid collectedByUuid}]
    (-> (post-individual request)
        (parse-body))))

(defn create-individual
  [request]
  (-> request
      create-individual'
      :uuid))


(defn get-individual
  "Get individual with uuid"
  [uuid]
  (get-one "/individuals" uuid))
