(ns ohds.update-service
  (:require [ohds.service :as svc]
            [clj-http.client :as client]))


(defn post-entity
  [entity url]
  (client/post (svc/gen-url url)
               (svc/post-header entity)))

(defn post-out-migration
  [out-migration]
  (post-entity out-migration "/outMigrations"))

(defn post-in-migration
  [in-migration]
  (post-entity in-migration "/inMigrations"))

(defn post-death
  [death]
  (post-entity death "/deaths"))

(defn post-pregnancy-observation
  [observation]
  (post-entity observation "/pregnancyObservations"))

(defn post-pregnancy-outcome
  [outcome]
  (post-entity outcome "/pregnancyOutcomes"))

(defn post-pregnancy-result
  [outcome]
  (post-entity outcome "/pregnancyResults"))

(comment
  (post-out-migration
   {:outMigration {:migrationDate "1986-12-05T00:00:00.000Z"
                   :collectionDateTime "1986-12-05T00:00:00.000Z"}
    :collectedByUuid "UNKNOWN"})

  (post-in-migration
   {:inMigration {:migrationDate "1986-12-05T00:00:00.000Z"
                  :collectionDateTime "1986-12-05T00:00:00.000Z"
                  :migrationType "INTERNAL_MIGRATION"}
    :collectedByUuid "UNKNOWN"})

  (post-death
   {:death {:deathDate "1986-12-05T00:00:00.000Z"
            :collectionDateTime "1986-12-05T00:00:00.000Z"}
    :collectedByUuid "UNKNOWN"})

  (post-pregnancy-observation
   {:pregnancyObservation {:expectedDeliveryDate "2016-12-13T16:46:22.004Z"
                           :pregnancyDate "2016-03-13T16:46:22.004Z"
                           :collectionDateTime "2016-03-14T00:00:00.000Z"}
    :collectedByUuid "UNKNOWN"})

  (post-pregnancy-outcome
   {:pregnancyOutcome {:outcomeDate "2016-12-13T16:46:22.004Z"
                       :collectionDateTime "2017-03-14T00:00:00.000Z"}
    :collectedByUuid "UNKNOWN"})

  (post-pregnancy-result
   {:pregnancyResult {:type "LIVE_BIRTH"
                      :collectionDateTime "2017-03-14T00:00:00.000Z"}
    :collectedByUuid "UNKNOWN"})

  )
