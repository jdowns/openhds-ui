(ns ohds.handler-util
  (:require [ring.util.http-response :refer :all]
            [cheshire.core :refer [parse-string]]))

(defn ok-or-error
  "Returns ok if body is not nil, otherwise error"
  [body error]
  (if (some? body)
    (ok body)
    (error)))

(defn ok-or-401
  [body]
  (ok-or-error body unauthorized))

(defn ok-or-400
  [body]
  (ok-or-error body bad-request))

(defn parse [result]
  (-> result :body slurp
      parse-string))
