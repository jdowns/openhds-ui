(ns ohds.relationship-service
  (:require [ohds.service :refer [create-entity]]))

(defn model->request
  "Transform frontend model to rest model"
  [{:keys [individualA individualB relationshipType startDate
           collectionDateTime collectedByUuid]}]
  {:relationship  {:individualA {:uuid individualA}
                 :individualB {:uuid individualA}
                 :relationshipType relationshipType
                 :startDate startDate
                 :collectionDateTime collectionDateTime}
   :collectedByUuid collectedByUuid})

(defn create-relationship
  [request]
  (println "got relationship request")
  (->> (model->request request)
       (create-entity "/relationships")))

(comment
  (create-relationship
   {:individualA "UNKNOWN"
    :individualB "UNKNOWN"
    :relationshipType "SELF"
    :startDate "2016-07-31T15:18:27.953Z[UTC]"
    :collectionDateTime "2016-07-31T16:18:27.977Z[UTC]"
    :collectedByUuid "UNKNOWN"})
  )
