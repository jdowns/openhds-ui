(ns ohds.projectcode-service
  (:require [clj-http.client :as client]
            [ohds.service :refer [parse-body gen-url post-header auth-header]]))

(def project-codes
  (atom
   (->
    (gen-url "/projectCodes/bulk.json")
    (client/get auth-header)
    parse-body)))

(defn code-groups
  []
  (set (map :codeGroup @project-codes)))

(defn codes
  [group]
  (filter #(= (:codeGroup %) (name group))
          @project-codes))

(comment
  (codes :locationType)
  (codes :socialGroupType)
  (codes "socialGroupType")
  )
