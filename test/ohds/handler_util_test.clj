(ns ohds.handler-util-test
  (:require [clojure.test :refer :all]
            [ohds.handler-util :refer :all]))

(deftest handler-helper-tests ;;;TODO: creates should be 201
  (testing "ok-or-400 returns ok if body is truthy"
    (is (= {:status 200 :body {} :headers {}}
           (ok-or-400 {}))))
  (testing "ok-or-400 returns 400 if body if falsy"
    (is (= {:status 400 :body nil :headers {}}
           (ok-or-400 nil))))
  (testing "ok-or-401 returns ok if body is truthy"
    (is (= {:status 200 :body {} :headers {}}
           (ok-or-401 {})))
    (is (= {:status 401 :body nil :headers {}}
           (ok-or-401 nil)))))
