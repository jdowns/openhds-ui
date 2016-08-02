(ns ohds.socialgroup-service
  (:require [clj-http.client :as client]
            [ohds.service :refer [parse-body gen-url post-header auth-header]]))

(defn- post-socialgroup [socialgroup]
  (client/post (gen-url "/socialGroups")
               (post-header socialgroup)))

(defn create-socialgroup'
  "Create new socialgroup"
  [{:keys [groupName extId groupType collectionDateTime collectedByUuid]}]
  (let [request
        {:socialGroup {:groupName groupName
                       :extId extId
                       :groupType groupType
                       :collectionDateTime collectionDateTime}
         :collectedByUuid collectedByUuid}]
    (-> (post-socialgroup request)
        (parse-body))))

(defn create-socialgroup
  [socialgroup]
  (-> (create-socialgroup' socialgroup)
      :uuid))
