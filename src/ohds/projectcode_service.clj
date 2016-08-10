(ns ohds.projectcode-service
  (:require [clj-http.client :as client]
            [ohds.service :refer [parse-body gen-url post-header auth-header]]))

(defn project-codes
  []
  (->
   (gen-url "/projectCodes/bulk.json")
   (client/get auth-header)
   parse-body))

(defn code-groups
  []
  (set (map :codeGroup (project-codes))))

(defn codes
  [group]
  (->>
   (project-codes)
   (filter #(= (:codeGroup %)
               (name group)))
   flatten))

(comment
  (project-codes)
  (codes :locationType)
  (codes :socialGroupType)
  (codes "socialGroupType")
  )
