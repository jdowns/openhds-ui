(ns ohds.initial-census-test
  (:require [clojure.test :refer :all]
            [cheshire.core :refer :all]
            [ohds.initial-census :refer :all]
            [clojure.spec :as spec]
            [ohds.fake-routes :refer [fake-routes]]
            [clj-http.fake :refer [with-fake-routes]]))

(deftest initial-census-tests
  (testing "fieldworker->user"
    (is (= {:username "username" :foo "foo" :pwhash "pwhash" :fieldWorkerId "username"}
           (fieldworker->user {:fieldWorkerId "username" :foo "foo" :pwhash "pwhash"})))))
