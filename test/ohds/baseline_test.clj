(ns ohds.baseline-test
  (:require [clojure.test :refer :all]
            [clojure.spec :as s]
            [ohds.baseline :refer :all]
            [ohds.model :refer :all]))

(defn date?
  [d]
                                        ;regex match against date
  true
  )

(s/def ::collectedByUuid string?)
(s/def ::firstName string?)
(s/def ::lastName string?)
(s/def ::extId string?)
(s/def ::gender #{"MALE" "FEMALE"})
(s/def ::dateOfBirth )

(s/def ::location-body
  (s/keys :req-un [::firstName ::extId ::gender]
          :opt-un [::lastName ::dateOfBirth]))
(s/def ::location-request
  (s/keys :req-un [::location ::collectedByUuid]))

(s/def ::socialgroup-request some?)
(s/def ::individual-request some?)
(s/def ::membership-request some?)
(s/def ::residency-request some?)
(s/def ::relationship-request some?)
