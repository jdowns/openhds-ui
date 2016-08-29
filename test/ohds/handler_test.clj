(ns ohds.handler-test
  (:require [clojure.test :refer :all]
            [clj-http.fake :refer [with-fake-routes]]
            [schema-generators.generators :as g]
            [ring.mock.request :as mock]
            [cheshire.core :refer :all]
            [ohds.handler :refer :all]
            [ohds.model :refer :all]
            [ohds.handler-util :refer :all]
            [ohds.fake-routes :refer :all]
            [clojure.spec :as spec]))

(deftest route-tests
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

  (testing "POST /api/locationHierarchy"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/locationHierarchy")
                     (mock/body (generate-string
                                 (g/generate LocationHierarchyRequest)))
                     (mock/content-type "application/json")))]
        (is (spec/valid? :ohds.model/entity-response result)))))

  (testing "GET /api/locationHiearchy"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :get "/api/locationHierarchy")))]
        ;;; TODO: check the structure more carefully
        (is (some? result)))))

  (testing "POST /api/locationHierarchyLevel"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/locationHierarchyLevel")
                     (mock/body (generate-string
                                 (g/generate LocationHierarchyLevelRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/socialgroup"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/socialgroup")
                     (mock/body (generate-string
                                 (g/generate SocialGroupRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/location"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/location")
                     (mock/body (generate-string
                                 (g/generate LocationRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/individual"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/individual")
                     (mock/body (generate-string
                                 (g/generate IndividualRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/membership"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/membership")
                     (mock/body (generate-string
                                 (g/generate MembershipRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/residency"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/residency")
                     (mock/body (generate-string
                                 (g/generate ResidencyRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/death"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/death")
                     (mock/body (generate-string
                                 (g/generate DeathRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/inMigration"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/inMigration")
                     (mock/body (generate-string
                                 (g/generate InMigrationRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/outMigration"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/outMigration")
                     (mock/body (generate-string
                                 (g/generate OutMigrationRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/pregnancyObservation"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/pregnancyObservation")
                     (mock/body (generate-string
                                 (g/generate PregnancyObservationRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/pregnancyOutcome"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/pregnancyOutcome")
                     (mock/body (generate-string
                                 (g/generate PregnancyOutcomeRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  (testing "POST /api/pregnancyOutcome"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/pregnancyOutcome")
                     (mock/body (generate-string
                                 (g/generate PregnancyOutcomeRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

  #_(testing "POST /api/visit"
    (with-fake-routes fake-routes
      (let [result
            (app (-> (mock/request :post "/api/visit")
                     (mock/body (generate-string
                                 (g/generate VisitRequest)))
                     (mock/content-type "application/json")))]
        (is (= "1234" (parse result))))))

)
