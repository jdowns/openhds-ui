(ns ohds.residency-service
  (:require [ohds.service :refer [create-entity get-some]]
            [ohds.location-service :as location]
            [ohds.individual-service :as individual]))

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
  (->> (model->request request)
       (create-entity "/residencies")))

(defn get-residencies
  [hierarchy-id]
  (get-some "/residencies" hierarchy-id))

(defn get-individuals-at-location
  [location-id]
  (let [hierarchy (get-in (location/location location-id) [:locationHierarchy :uuid])
        residencies (get-residencies hierarchy)]
    (->>
     residencies
     (filter #(= (get-in % [:location :uuid])
                 location-id))
     (map #(get-in % [:individual :uuid]))
     (map individual/get-individual)
     doall)))

(comment
  (->>
   (get-residencies "775eec55-6190-4905-8422-00631134e54c")
   (filter #(= (get-in % [:location :uuid])
               "770615e2-745d-42c5-b793-1f4d0b5feba2"))
   (map #(get-in % [:individual :uuid])))




  )
