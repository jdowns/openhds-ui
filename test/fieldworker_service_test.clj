(ns ohds.fieldworker-service-test
  (:require [clojure.test :refer :all]
            [crypto.password.bcrypt :as password]
            [cheshire.core :refer :all]
            [ohds.fieldworker-service :as ut]))

(deftest fieldworker-service-test
  (testing "find-fieldworker returns first uuid of matching user with credentials"
    (let [valid-password "valid-password"
          valid-pw-hash (password/encrypt valid-password)
          invalid-pw-hash (password/encrypt "another password...")
          users  [{:uuid "123"
                   :fieldWorkerId "valid-user"
                   :passwordHash valid-pw-hash}
                  {:uuid "456"
                   :fieldWorkerId "invalid-user"
                   :passwordHash invalid-pw-hash}]
          valid-request  {:username "valid-user"
                          :password valid-password}]
      (is (= "123"
             (ut/find-fieldworker' valid-request users))))))
