(ns ohds.location-service
  (:require [ohds.service :refer [create-entity]]))

(defn model->request
  "Transform frontend model to rest model"
  [{:keys [name extId type collectionDateTime collectedByUuid]}]
  {:location {:name name
              :extId extId
              :type type
              :collectionDateTime collectionDateTime}
   :collectedByUuid collectedByUuid})

(defn create-location
  "Create a new location and return it's id"
  [request]
  (->> (model->request request)
       (create-entity "/locations")))

(comment
  (create-location
   {:name "test location"
    :extId "test location"
    :type "RURAL"
    :collectionDateTime "2016-08-01T00:56:55.920Z"
    :collectedByUuid "fbf0953f-6f32-4fef-a111-43cf63059100"})
  )
