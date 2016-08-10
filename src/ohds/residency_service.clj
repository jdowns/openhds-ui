(ns ohds.residency-service
  (:require [ohds.service :refer [create-entity]]))

(defn model->request
  "Transform frontend model to rest model"
  [{:keys [individual location startType startDate
           collectionDateTime collectedByUuid]}]
  {:residency {:individual {:uuid individual}
               :location {:uuid location}
               :startType startType
               :startDate startDate
               :collectionDateTime collectionDateTime}
   :collectedByUuid collectedByUuid})

(defn create-residency
  [request]
  (println "create-residency " request)
  (->> (model->request request)
       (create-entity "/residencies")))
