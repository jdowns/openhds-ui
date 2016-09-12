(ns ohds.model
  (:require #_[schema.experimental.abstract-map :as abstract-map]
            [schema.core :as s]
            [clojure.spec :as spec]
            [clojure.spec.gen :as gen]
            ))

;; TODO use abstract-map extension to pull out common fields

#_(s/defschema EntityRequest
  (abstract-map/abstract-map-schema
   :type
   {:collectionDateTime s/Str
    :collectedByUuid s/Str}))

(def Relationships
  (s/enum "SELF" "SPOUSE" "SON_OR_DAUGHTER" "BROTHER_OR_SISTER"
          "PARENT" "GRANDCHILD" "NOT_RELATED" "UNKNOWN"))

(s/defschema BaselineRequest
  {:collectedByUuid java.util.UUID
   :collectionDateTime java.util.Date
   :location {:name s/Str
              :extId s/Str
              :type (s/enum "RURAL" "URBAN")
              :locationHierarchyUuid java.util.UUID
              (s/optional-key :longitude) s/Num
              (s/optional-key :latitude) s/Num
              (s/optional-key :accuracy) s/Num
              (s/optional-key :altitude) s/Num}
   :socialGroup {:groupName s/Str
                 :extId s/Str
                 :groupType (s/enum "FAMILY" "COHORT")}
   :individuals [{:firstName s/Str
                  :extId s/Str
                  :gender (s/enum "MALE" "FEMALE")
                  :membershipType Relationships
                  :membershipStartDate java.util.Date
                  (s/optional-key :dateOfBirth) java.util.Date
                  (s/optional-key :lastName) s/Str}]
   :relationships [{:individualAIndex s/Int
                    :individualBIndex s/Int
                    :startDate java.util.Date
                    :startType Relationships}]})

(s/defschema LoginAttempt
  {:username s/Str
   :password s/Str
   s/Any s/Any})

(s/defschema FieldWorkerRequest
  {:fieldWorkerId s/Str
   :password s/Str
   :firstName (s/maybe s/Str)
   :lastName (s/maybe s/Str)})

(s/defschema ProjectCode
  {:uuid s/Str
   :codeName s/Str
   :codeGroup s/Str
   :codeValue s/Str
   :description s/Str})

(s/defschema LocationRequest
  {:name s/Str
   :extId s/Str
   :type s/Str
   :locationHierarchyUuid s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema SocialGroupRequest
  {:groupName s/Str
   :extId s/Str
   :groupType s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema IndividualRequest
  {:firstName s/Str
   :extId s/Str
   :gender s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str
   :location s/Str})

(s/defschema ResidencyRequest
  {:individual s/Str
   :location s/Str
   :startType s/Str
   :startDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema MembershipRequest
  {:individual s/Str
   :socialGroup s/Str
   :startType s/Str
   :startDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema RelationshipRequest
  {:individualA s/Str
   :individualB s/Str
   :relationshipType s/Str
   :startDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema VisitRequest
  {:extId s/Str
   :location s/Str
   :visitDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema DeathRequest
  {:visit s/Str
   :individual s/Str
   :deathPlace s/Str
   :deathCause s/Str
   :deathDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema InMigrationRequest
  {:individual s/Str
   :residency s/Str
   :origin s/Str
   :migrationType s/Str
   :migrationDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema OutMigrationRequest
  {:individual s/Str
   :visit s/Str
   :destination s/Str
   :reason s/Str
   :migrationDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema PregnancyObservationRequest
  {:mother s/Str
   :visit s/Str
   :pregnancyDate s/Str
   :expectedDeliveryDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema PregnancyOutcomeRequest
  {:mother s/Str
   :father s/Str
   :visit s/Str
   :outcomeDate s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str})

(s/defschema ChildRequest
  {:firstName s/Str
   :extId s/Str
   :gender s/Str})

(s/defschema PregnancyResultRequest
  {:type s/Str
   :pregnancyOutcome s/Str
   :collectionDateTime s/Str
   :collectedByUuid s/Str
   (s/optional-key :child) ChildRequest})

(s/defschema LocationHierarchyRequest
  {:level s/Str
   :parent s/Str
   :name s/Str
   :extId s/Str
   :collectedByUuid s/Str
   :collectionDateTime s/Str})

(s/defschema LocationHierarchyLevelRequest
  {:keyIdentifier s/Int
   :name s/Str})

(s/defschema Location
  {:extId s/Str
   :uuid s/Str})

(s/defschema Individual
  {:extId s/Str
   :uuid s/Str})

(s/defschema Entity
  {:uuid s/Str
   (s/optional-key :extId) s/Str})

(s/defschema LocationHierarchyLevel
  {:uuid s/Str
   :name s/Str
   (s/optional-key :keyIdentifier) s/Int})



(comment
  (abstract-map/extend-schema
   LocationRequest
   EntityRequest
   [:location] {:uuid s/Str})

  (s/validate LocationRequest
              {:type :location
               :collectionDateTime "f"
               :collectedByUuid "g"
               :uuid "abc"})
  )

;;; TODO: move these to test

(spec/def ::uuid string?)
(spec/def ::name string?)
(spec/def ::extId string?)
(spec/def ::status int?)
(spec/def ::headers map?)

(spec/def ::body #(string? (-> % slurp)))

(spec/def ::parent
  (spec/keys :req-un [::uuid]))

(spec/def ::level
  (spec/keys :req-un [::uuid]))

(spec/def ::location-hierarchy
  (spec/keys :req-un [::uuid ::name ::extId]
             :opt-un [::parent ::level]))

(spec/def ::individual ;;; TODO: more required keys here
  (spec/keys :req-un [::uuid ::name ::extId]))

(spec/def ::entity-response
  (spec/keys :req-un [::status ::headers ::body]))
