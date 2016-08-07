(ns ohds.service
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clj-http.client :as client]
            [cheshire.core :refer :all]))

(defn get-config []
  (->> "config.edn"
       io/resource
       slurp
       edn/read-string))

(def config (atom (get-config)))

(def auth-header
  (let [{:keys [api-user api-password]} @config]
    {:basic-auth [api-user api-password]}))

(defn post-header
  [body]
  (merge auth-header
         {:content-type :json
          :body (generate-string body)}))

(defn gen-url
  [path]
  (let [host (:openhds-rest @config)]
    (str host path)))

(defn parse-body
  "Extracts JSON body from http response and reformats as edn"
  [response]
  (-> response
      :body
      (parse-string true)))

(defn http-post
  [url body]
  (client/post (gen-url url)
               (post-header body)))

(defn create-entity
  [url body]
  (println "in create entity" url body)
  (-> url
      (http-post body)
      ((fn [response] (println response)
         response))
      parse-body
      :uuid))
