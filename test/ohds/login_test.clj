(ns ohds.login-test
  (:require [clojure.test :refer :all]
            [ohds.user-handler :refer :all]
            [ohds.fake-routes :refer :all]
            [ohds.handler-util :refer [parse]]
            [ohds.model :refer :all]
            [ring.mock.request :as mock]
            [cheshire.core :refer [generate-string]]
            [schema-generators.generators :as g]
            [clj-http.fake :refer [with-fake-routes]]))

(deftest login-tests
  (testing "PUT /api/user"
    (testing "valid login"
      (with-fake-routes fake-routes
        (let [result
              (user-api (-> (mock/request :put "/user")
                            (mock/body  (generate-string
                                         {:username "user"
                                          :password "password"}))
                            (mock/content-type "application/json")))]
          (is (= "12345" (parse result))))))

    (testing "invalid login"
      (with-fake-routes fake-routes
        (let [result
              (user-api (-> (mock/request :put "/user")
                            (mock/body (generate-string
                                        {:username "user"
                                         :password "badpassword"}))
                            (mock/content-type "application/json")))]
          (is (= {:status 401, :headers {}, :body nil}
                 result))))))
  (testing "PUT /api/fieldworker"
    (with-fake-routes fake-routes
      (let [result
            (user-api (-> (mock/request :put "/fieldworker")
                          (mock/body (generate-string
                                      {:username "user"
                                       :password "password"}))
                          (mock/content-type "application/json")))]
        (is (= "12345" (parse result))))))
  (testing "PUT /api/fieldworker invalid login"
    (with-fake-routes fake-routes
      (let [result
            (user-api (-> (mock/request :put "/fieldworker")
                          (mock/body (generate-string
                                      {:username "user"
                                       :password "badpassword"}))
                          (mock/content-type "application/json")))]
        (is (= {:status 401, :headers {}, :body nil}
               result))))))

(deftest create-user-tests
  (testing "POST /api/fieldworker"
    (with-fake-routes fake-routes
      (let [result
            (user-api (-> (mock/request :post "/fieldworker")
                          (mock/body (generate-string
                                      (g/generate FieldWorkerRequest)))
                          (mock/content-type "application/json")))]
        (is (= 200
               (:status result)))
        (is (= "new-fw-id"
               (parse result)))))))
