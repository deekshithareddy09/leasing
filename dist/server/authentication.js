"use strict";
/**
 * Created by laurence-ho on 21/07/17.
 */
var db = require('./database/db.service');
var config = require('./config');
var authentication = {};
authentication.checkAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send({ message: err });
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [req.params.username], function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        if (rows[0].level >= 11) {
                            next();
                        }
                        else {
                            res.status(403).send({ message: 'You have no permission' });
                        }
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ message: 'Please Login First' });
    }
};
authentication.checkManager = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send({ message: err });
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [req.params.username], function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        if (rows[0].level >= 5) {
                            next();
                        }
                        else {
                            res.status(403).send({ message: 'You have no permission' });
                        }
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ message: 'Please Login First' });
    }
};
authentication.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).send({ message: 'Please Login First' });
};
module.exports = authentication;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBQyxDQUFDLENBQUM7eUJBQzFEO3FCQUNEO2dCQUNGLENBQUMsQ0FBQyxDQUFDO2FBQ0g7UUFDRixDQUFDLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxDQUFDLENBQUM7S0FDdEQ7QUFDRixDQUFDLENBQUM7QUFFRixjQUFjLENBQUMsVUFBVSxHQUFHLFVBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFTO0lBQ3pELElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFO1FBQzFCLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDZDtJQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUM7QUFFRixpQkFBUyxjQUFjLENBQUMiLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbGF1cmVuY2UtaG8gb24gMjEvMDcvMTcuXG4gKi9cblxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RhdGFiYXNlL2RiLnNlcnZpY2UnKTtcbmxldCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xubGV0IGF1dGhlbnRpY2F0aW9uOiBhbnkgPSB7fTtcblxuYXV0aGVudGljYXRpb24uY2hlY2tBZG1pbiA9IChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IGFueSkgPT4ge1xuXHRpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NICcrY29uZmlnLmRiX3RhYmxlcy5VU0VSUysnIFdIRVJFIHVzZXJuYW1lID0gPycsIFtyZXEucGFyYW1zLnVzZXJuYW1lXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcblx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKHttZXNzYWdlOiBlcnJ9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHJvd3NbMF0ubGV2ZWwgPj0gMTEpIHtcblx0XHRcdFx0XHRcdFx0bmV4dCgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdZb3UgaGF2ZSBubyBwZXJtaXNzaW9uJ30pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdQbGVhc2UgTG9naW4gRmlyc3QnfSk7XG5cdH1cbn07XG5cbmF1dGhlbnRpY2F0aW9uLmNoZWNrTWFuYWdlciA9IChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IGFueSkgPT4ge1xuXHRpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NICcrY29uZmlnLmRiX3RhYmxlcy5VU0VSUysnIFdIRVJFIHVzZXJuYW1lID0gPycsIFtyZXEucGFyYW1zLnVzZXJuYW1lXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcblx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKHttZXNzYWdlOiBlcnJ9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHJvd3NbMF0ubGV2ZWwgPj0gNSkge1xuXHRcdFx0XHRcdFx0XHRuZXh0KCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXMuc3RhdHVzKDQwMykuc2VuZCh7bWVzc2FnZTogJ1lvdSBoYXZlIG5vIHBlcm1pc3Npb24nfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRyZXMuc3RhdHVzKDQwMykuc2VuZCh7bWVzc2FnZTogJ1BsZWFzZSBMb2dpbiBGaXJzdCd9KTtcblx0fVxufTtcblxuYXV0aGVudGljYXRpb24uaXNMb2dnZWRJbiA9IChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IGFueSkgPT4ge1xuXHRpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XG5cdFx0cmV0dXJuIG5leHQoKTtcblx0fVxuXHRyZXMuc3RhdHVzKDQwMykuc2VuZCh7bWVzc2FnZTogJ1BsZWFzZSBMb2dpbiBGaXJzdCd9KTtcbn07XG5cbmV4cG9ydCA9IGF1dGhlbnRpY2F0aW9uO1xuXG4iXX0=
