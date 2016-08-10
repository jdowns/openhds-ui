(ns ohds.membership-service
  (:require [ohds.service :refer [create-entity]]))

(defn model->request
  "Transform frontend model to rest model"
  [{:keys [individual socialGroup startType startDate
           collectionDateTime collectedByUuid]}]
  {:membership  {:individual {:uuid individual}
                 :socialGroup {:uuid socialGroup}
                 :startType startType
                 :startDate startDate
                 :collectionDateTime collectionDateTime}
   :collectedByUuid collectedByUuid})

(defn create-membership
  [request]
  (->> (model->request request)
       (create-entity "/memberships")))
