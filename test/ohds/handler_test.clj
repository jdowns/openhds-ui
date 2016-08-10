(ns ohds.handler-test
  (:require [clojure.test :refer :all]
            [clj-http.fake :refer [with-fake-routes]]
            [ring.mock.request :as mock]
            [cheshire.core :refer :all]
            [ohds.handler :refer :all]))

(def passwordHash
  "$2a$04$DZnJbV03m2DcHu5GoAg6/OqVZu.wIjo5VwvjBEXVoxVy1eM.0sdc6")

(def fake-routes
  {"http://localhost:8080/users/bulk.json"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string
             [{:uuid "12345"
               :username "user"
               :passwordHash passwordHash}])})
   "http://localhost:8080/projectCodes/bulk.json"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string
             [{:uuid "123"
                :codeGroup "testGroup"
                :codeName "testCode"
                :codeValue "test"
                :description "a test"}
              {:uuid "456"
               :codeName "differentCode"
               :codeGroup "differentGroup"
               :codeValue "other"
               :description "a code"}])})
   "http://localhost:8080/fieldWorkers/bulk.json"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string
             [{:uuid "12345"
               :fieldWorkerId "user"
               :passwordHash passwordHash}])})})

(defn parse [result]
  (-> result :body slurp
      parse-string))

(deftest route-tests
  (testing "PUT /api/user"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :put "/api/user")
                     (mock/body  (generate-string
                                  {:username "user"
                                   :password "password"}))
                     (mock/content-type "application/json")))]
        (is (= "12345" (parse result))))))

  (testing "GET /api/projectcode/:group"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :get "/api/projectcode/testGroup")))]
        (is (=
             (list
              {"uuid" "123"
               "codeName" "testCode"
               "codeGroup" "testGroup"
               "codeValue" "test"
               "description" "a test"})
             (parse result))))))

  (testing "PUT /api/fieldworker"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :put "/api/user")
                     (mock/body  (generate-string
                                  {:username "user"
                                   :password "password"}))
                     (mock/content-type "application/json")))]
        (is (= "12345" (parse result))))))
  #_(testing "POST /api/fieldworker"
    (with-fake-routes fake-routes
      (let [result
            ]))))
