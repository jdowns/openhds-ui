(ns ohds.location-service
  (:require [clj-http.client :as client]
            [ohds.service :refer [parse-body gen-url post-header auth-header]]))


(defn post-location
  [location]
  (client/post (gen-url "/locations")
               (post-header location)))

(defn create-location'
  "Create new location"
  [{:keys [name extId type collectionDateTime collectedByUuid]}]
  (let [request
        {:location {:name name
                    :extId extId
                    :type type
                    :collectionDateTime collectionDateTime
                    }
         :collectedByUuid collectedByUuid}]
    (println request)
    (-> (post-location request)
        (parse-body))))

(defn create-location
  [location]
  (:uuid (create-location' location)))

(comment
  (parse-body (client/get (gen-url "/locations/bulk.json")
                          auth-header))

  (create-location
   {:name "floof"
    :extId "floof"
    :type "RURAL"
    :collectionDateTime "2016-08-01T00:56:55.920Z"
    :collectedByUuid "fbf0953f-6f32-4fef-a111-43cf63059100"})
  )
