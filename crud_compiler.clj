(data location
      [* hierarchy
       * sort
       * name
       * latitude
       * longitude
       * altitude
       * accuracy])

(crud-client open-hds basic-auth
 [locations get]
 [locations post [location]]
 [locations.UUID get]
 [locations.UUID put [location]]
 [locations.UUID delete]
 [locations.external.ID get])


;var basicAuth = ...;
;var openHds =
;{
;  get: function () { return $.get('/locations', auth=basicAuth) },
;  post: function () { return $.post('/locations', auth=basicAuth, data)}
;  uuid: { get: function (uuid) {return $.get ('/locations/' + uuid, auth=basicAuth);},
;         post: function (uuid, location){return $.post ('/locations/' + uuid, body=location, auth=basicAuth);},
;         delete: function (uuid){return $.delete ('/locations/' + uuid, body=location, auth=basicAuth) ;},},
; external: {id: {get: function (id) {return $.get ('/locations/external/' + id, auth=basicAuth}}}}}

(defmacro crud-client [name auth & requests]
  "Creates a crud client based on the specification provided:
   <name> <auth> [<uri> method [request-body]] "
  '()
  )
