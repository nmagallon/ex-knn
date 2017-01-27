child_process = require('child_process');
gulp = require('gulp');
mute = require('mute');
mocha = require('mocha');
request = require('request');
q = require('q');

cache = {};

function storeCache() {
    for (var key in require.cache) {
        cache[key] = true;
    }
}

function clearCache() {
    for (var key in require.cache) {
        if (!cache[key] && !/\.node$/.test(key)) {
            delete require.cache[key];
        }
    }
}

function local() {
    storeCache();
    var deferred = q.defer();
    unmute = mute();
    var m = new mocha({
        reporter: 'json'
    });
    m.addFile('./test/test.js');
    r = m.run(function(failures) {
        var testResults = r.testResults;
        unmute();
        clearCache();
        deferred.resolve(testResults);
    });
    return deferred.promise;
};

function send(data) {
    var deferred = q.defer();

    var auth = {};

    function job() {
        var d = q.defer();
        auth['job_id'] = process.env.TRAVIS_JOB_ID;
        d.resolve();
        return d.promise;
    }

    function git(cat) {
        var d = q.defer();
        child_process.exec(`git config user.${cat}`, function(err, out, code) {
            if (err) {
                d.reject(err);
            } else {
                auth[cat] = out.trim();
                d.resolve();
            }
        });
        return d.promise;
    }

    function name() {
        return git("name");
    }

    function email() {
        return git("email");
    }

    function post() {
        var d = q.defer();
        request.post('http://162.243.185.121/local', {
            body: {
                auth: auth,
                data: data
            },
            json: true
        }, function(err, res, body) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(body);
            }
        });
        return d.promise;
    }

    function id() {
        if (process.env.TRAVIS_JOB_ID) {
            return job()
        } else {
            return name().then(email);
        }
    }

    id()
        .then(post)
        .then(function() {
            deferred.resolve();
        })
        .catch(function() {
            deferred.resolve();
        });

    return deferred.promise;
}

function make() {
    storeCache();
    var deferred = q.defer();

    var m = new mocha({
        reporter: 'list'
    });

    m.addFile('./test/test.js');

    r = m.run(function(failures) {
        var testResults = r.testResults;
        clearCache();
        if (failures) {
            deferred.reject(failures);
        } else {
            deferred.resolve();
        }

    });

    return deferred.promise;
}

gulp.task('test', function() {
    local()
        .then(send)
        .then(make)
        .catch(function(err) {
            process.exit(1);
        });
});