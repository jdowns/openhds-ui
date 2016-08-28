(ns ohds.fake-routes
  (:require [cheshire.core :refer :all]
            [clojure.spec :as spec]
            [clojure.spec.gen :as gen]
            [ohds.model :refer :all]))

(def passwordHash
  "$2a$04$DZnJbV03m2DcHu5GoAg6/OqVZu.wIjo5VwvjBEXVoxVy1eM.0sdc6")

(def fake-routes
  {"http://localhost:8080/users/bulk.json"
   (fn [request]
     (case (:request-method request)
       :get {:status 200 :headers {}
             :body (generate-string
                    [{:uuid "12345"
                      :username "user"
                      :passwordHash passwordHash}])}))
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
   "http://localhost:8080/locationHierarchies/some-uuid.json"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string (gen/generate (spec/gen :ohds.model/location-hierarchy)))})
   "http://localhost:8080/locationHierarchies"
   (fn [request]
     (case (:request-method request)
       :post
       {:status 201 :headers {}
        :body (generate-string (gen/generate (spec/gen :ohds.model/location-hierarchy)))}
       :get
       {:status 200 :headers {}
        :body (generate-string (drop 3 (spec/exercise :ohds.model/location-hierarchy)))}
       ))
   "http://localhost:8080/socialGroups"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/individuals"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/individuals/bylocationhierarchy.json?locationHierarchyUuid=some-uuid"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string  (drop 3 (spec/exercise :ohds.model/individual)))})
   "http://localhost:8080/locations"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/memberships"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/relationships"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/deaths"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/inMigrations"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/outMigrations"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/pregnancyObservations"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/pregnancyOutcomes"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/pregnancyResults"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/visits"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/residencies"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/locationHierarchyLevels"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string {:uuid "1234"})})
   "http://localhost:8080/locationHierarchies/bulk.json"
   (fn [request]
     {:status 200 :headers {}
      :body (slurp "dev-resources/test/LocationHierarchies.bulk.json")})
   "http://localhost:8080/fieldWorkers/bulk.json"
   (fn [request]
     {:status 200 :headers {}
      :body (generate-string
             [{:uuid "12345"
               :fieldWorkerId "user"
               :passwordHash passwordHash}])})})
