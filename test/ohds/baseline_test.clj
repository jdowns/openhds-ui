(ns ohds.baseline-test
  (:require [clojure.test :refer :all]
            [clojure.spec :as s]
            [schema-generators.generators :as g]
            [ohds.baseline :refer :all]
            [ohds.model :refer :all]))

(defn datetime? [d]
  (re-matches #"\d\d\d\d\-\d\d\-\d\dT\d\d:\d\d:\d\d\.\d\dZ" d))

(s/def ::collectedByUuid string?)
(s/def ::firstName string?)
(s/def ::lastName string?)
(s/def ::extId string?)
(s/def ::gender #{"MALE" "FEMALE"})
(s/def ::dateOfBirth datetime?)
(s/def ::name string?)
(s/def ::extId string?)
(s/def ::type string?) ;;;TODO: this should be specific to an entity
(s/def ::locationHierarchyUuid string?)
(s/def ::latitude number?)
(s/def ::longitude number?)
(s/def ::altitude number?)
(s/def ::accuracy number?)

(s/def ::individual
  (s/keys :req-un [::firstName ::extId ::gender]
          :opt-un [::lastName ::dateOfBirth]))

(s/def ::location
  (s/keys :req-un [::name ::extId ::type ::collectionDateTime]
          :opt-un [::locationHierarchyUuid
                   ::latitude ::longitude
                   ::altitude ::accuracy]))

(s/def ::location-request
  (s/keys :req-un [::location ::collectedByUuid]))

(s/def ::socialgroup-request some?)
(s/def ::individual-request some?)
(s/def ::membership-request some?)
(s/def ::residency-request some?)
(s/def ::relationship-request some?)

(comment
  (submit
   (g/generate BaselineRequest))
  )
