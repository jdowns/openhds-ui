(ns ohds.visit-service
  (:require [clj-http.client :as client]
            [ohds.service :refer [parse-body gen-url post-header auth-header]]))

(defn post-visit
  [visit]
  (client/post (gen-url "/visits")
               (post-header visit)))

(defn create-visit'
  [{:keys [extId location visitDate collectionDateTime collectedByUuid]}]
  (let [request
        {:visit {:extId extId
                 :location {:uuid location}
                 :visitDate visitDate
                 :collectionDateTime collectionDateTime}
         :collectedByUuid collectedByUuid}]
    (-> (post-visit request)
        (parse-body))))

(defn create-visit
  [request]
  (-> request
      create-visit'
      :uuid))

(comment
  (create-visit
   {:extId "foo"
    :location "30d64a06-23fe-474d-ad5c-6210cd601d47"
    :visitDate "2016-01-01T00:00:00.000Z"
    :collectionDateTime "2016-08-10T00:00:00.000Z"
    :collectedByUuid "UNKNOWN"})
  )
