(ns ohds.projectcode-service-test
  (:require [clojure.test :refer :all]
            [clj-http.fake :refer [with-fake-routes]]
            [schema-generators.generators :as g]
            [ring.mock.request :as mock]
            [cheshire.core :refer :all]
            [ohds.projectcode-service :refer :all]
            [ohds.model :refer :all]
            [ohds.fake-routes :refer :all]
            [clojure.spec :as spec]))


(deftest codegroup-tests
  (testing "codegroups returns a set"
    (with-fake-routes fake-routes
      (is (= #{"testGroup" "differentGroup"}
             (code-groups)))
      )))
