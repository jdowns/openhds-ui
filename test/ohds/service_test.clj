(ns ohds.service-test
  (:require [clojure.test :refer :all]
            [cheshire.core :refer :all]
            [ohds.service :refer :all]))

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
