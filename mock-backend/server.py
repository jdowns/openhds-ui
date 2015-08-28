from flask import Flask, request
from datetime import timedelta
from flask import make_response, current_app
from functools import update_wrapper

app = Flask(__name__)

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator



@app.route('/fieldWorkers/<id_>', methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def fieldWorkers(id_=None):
    print request.data
    print id_
    return str((request.data, id_))

@app.route('/locations', methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def locations(uuid=None):
    print request.data
    print uuid
    return str((request.data, uuid))


@app.route('/individuals/<uuid>', methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def individuals(uuid=None):
    print request.data
    print uuid
    return str((request.data, id_))

if __name__ == '__main__':
    app.run(debug=True)