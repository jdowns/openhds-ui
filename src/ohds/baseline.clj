(ns ohds.baseline
  (:require [ohds.service :as svc]
            [ohds.model :refer :all]))

(defn location-request
  [{:keys [collectedByUuid collectionDateTime location]}]
  {:location (assoc location :collectionDateTime collectionDateTime)
   :collectedByUuid collectedByUuid})

(defn socialgroup-request
  [{:keys [collectedByUuid collectionDateTime socialGroup]}]
  {:socialGroup (assoc socialGroup
                       :collectionDateTime collectionDateTime)
   :collectedByUuid collectedByUuid})

(defn individual-request
  [individual {:keys [collectedByUuid collectionDateTime]}]
  {:individual (assoc individual
                      :collectionDateTime collectionDateTime)
   :collectedByUuid collectedByUuid})

(defn residency-request
  [residency individual-id location-id
   {:keys [collectedByUuid collectionDateTime]}]
  {:residency (assoc residency
                     :collectionDateTime collectionDateTime
                     :individual {:uuid individual-id}
                     :location {:uuid location-id})
   :collectedByUuid collectedByUuid})

(defn membership-request
  [membership individual-id group-id
   {:keys [collectedByUuid collectionDateTime]}]
  {:membership (assoc membership
                      :collectionDateTime collectionDateTime
                      :individual {:uuid individual-id}
                      :socialGroup {:uuid group-id})
   :collectedByUuid collectedByUuid})

(defn relationship-request
  [relationship individualA individualB
   {:keys [collectedByUuid collectionDateTime]}]
  {:relationship (assoc relationship
                        :individualA {:uuid individualA}
                        :individualB {:uuid individualB}
                        :collectionDateTime collectionDateTime)
   :collectedByUuid collectedByUuid})

(defn post-location
  [baseline]
  (->>
   (location-request baseline)
   (svc/create-entity "/locations")))

(defn post-group
  [baseline]
  (->>
   (socialgroup-request baseline)
   (svc/create-entity "/socialGroups")))

(defn post-individual
  [collection-meta individual]
  (->>
   (individual-request collection-meta individual)
   (svc/create-entity "/individuals")))

(defn post-individuals
  [{:keys [individuals] :as baseline}]
  (map (partial post-individual baseline) individuals))

(defn post-residency
  [location collection-meta individual]
  (->>
   (residency-request collection-meta individual location)
   (svc/create-entity "/residency")))

(defn post-residencies
  [individuals location baseline]
  (map (partial post-residency location baseline) individuals))

(defn post-membership
  [individual socialgroup collection-meta]
  (->>
   (membership-request collection-meta individual socialgroup)
   (svc/create-entity "/memberships")))

(defn post-memberships
  [individual socialgroup baseline]
  (map (partial post-membership socialgroup baseline) individuals))

(defn post-relationship
  [individual baseline]
  (->> (relationship-request baseline individual)
       (svc/create-entity "/relationships")))

(defn post-relationships
  [individuals baseline]
  (map (partial post-relationship baseline) individuals))

(defn submit
  [baseline]
  (let [loc (post-location baseline)
        grp (post-group baseline)
        inds (post-individuals baseline)]
    (post-residencies inds loc baseline)
    (post-memberships inds grp baseline)
    (post-relationships inds baseline)
    loc))


(comment
  (submit
   {:location
    {:name "place" :extId "ABC"
     :locationHierarchyUuid "UNKNOWN"
     :type "RURAL"}
    :collectionDateTime "2016-01-01T00:00:00.000Z"
    :collectedByUuid "UNKNOWN"
    })
  )
