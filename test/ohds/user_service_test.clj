(ns ohds.user-service-test
  (:require [clojure.test :refer :all]
            [crypto.password.bcrypt :as password]
            [cheshire.core :refer :all]
            [ohds.user-service :as ut]))

(deftest user-service-test
  (testing "find-user returns first uuid of matching user with credentials"
    (let [valid-password "valid-password"
          valid-pw-hash (password/encrypt valid-password)
          invalid-pw-hash (password/encrypt "another password...")
          users  [{:uuid "123"
                   :username "valid-user"
                   :passwordHash valid-pw-hash}
                  {:uuid "456"
                   :username "invalid-user"
                   :passwordHash invalid-pw-hash}]]
      (is (= "123"
             (ut/find-user' {:username "valid-user"
                             :password valid-password} users)))))
  (testing "find-fieldworker returns first uuid of matched fieldworker with credentials"
    (let [valid-password "valid-password"
          valid-pw-hash (password/encrypt valid-password)
          invalid-pw-hash (password/encrypt "another password...")
          users  [{:uuid "123"
                   :fieldWorkerId "valid-user"
                   :passwordHash valid-pw-hash}
                  {:uuid "456"
                   :fieldWorkerId "invalid-user"
                   :passwordHash invalid-pw-hash}]]
      (with-redefs [ut/all-fieldworkers (fn [] {:body (generate-string users)})]
        (is (= "123"
               (ut/find-fieldworker {:username "valid-user"
                                     :password valid-password})))))))
