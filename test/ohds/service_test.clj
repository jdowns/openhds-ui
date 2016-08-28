(ns ohds.service-test
  (:require [clojure.test :refer :all]
            [cheshire.core :refer :all]
            [ohds.service :refer :all]
            [clojure.spec :as spec]
            [ohds.fake-routes :refer [fake-routes]]
            [clj-http.fake :refer [with-fake-routes]]))

(deftest header-tests
  (testing "auth-header adds basic auth credentials"
    (let [expected-keys [:openhds-rest :api-user :api-password]]
      (is (= auth-header
             {:basic-auth ["user" "password"]}))))
  (testing "post-header adds auth header, json content type and body"
    (let [body {:param1 :foo
                :param2 :bar}]
      (is (=
           {:content-type :json
            :basic-auth ["user" "password"]
            :body (generate-string {:param1 :foo
                                    :param2 :bar})}
           (post-header body))))))

(deftest get-tests
  (testing "get-all"
    (with-fake-routes fake-routes
      (is (some? (get-all "/locationHierarchies")))))
  (testing "get-one"
    (with-fake-routes fake-routes
      (is (spec/valid? :ohds.model/location-hierarchy
                       (get-one "/locationHierarchies" "some-uuid")))))
  (testing "get-some"
    (with-fake-routes fake-routes
      (is (every? #(spec/valid? :ohds.model/individual %)
                  (get-some "/individuals" "some-uuid"))))))
