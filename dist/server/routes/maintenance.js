"use strict";
var express = require("express");
var router = express.Router();
var config = require('../config');
var db = require('../database/db.service');
var authentication = require('../authentication');
router.post('/maintenance', function (req, res) {
    //req.isAuthenticated()
    if (true) {
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return res.send(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.RENTAL_MAINTENANCE + ' WHERE userid = ? AND type= ? AND location= ?', [req.body.id, req.body.type, req.body.location], function (err, rows) {
                    if (err) {
                        console.error('error', err);
                        return res.send(err);
                    }
                    if (rows.length > 0) {
                        //update db with the repeated value
                        var updateMysql = {
                            userid: parseInt(req.body.id),
                            type: req.body.type,
                            location: req.body.location,
                            description: req.body.description || 'default desc',
                            cost: config.maintenance_cost[req.body.type + "_" + req.body.location] || 100
                        };
                        var updateQuery = 'UPDATE  ' + config.db_tables.RENTAL_MAINTENANCE + ' set repeated= true';
                        connection.query(updateQuery, [], function (err, rows) {
                            //connection.release();
                            if (err) {
                                connection.release();
                                return res.status(500).send(err);
                            }
                            var selectQuery = 'SELECT * from ' + config.db_tables.RENTAL_MAINTENANCE;
                            connection.query(selectQuery, [], function (err, rows) {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send(err);
                                }
                                connection.release();
                                return res.status(200).send(rows);
                            });
                        });
                    }
                    else {
                        // if there is no user with that username, create the user
                        var newUserMysql_1 = {
                            userid: parseInt(req.body.id),
                            type: req.body.type,
                            location: req.body.location,
                            description: req.body.description || 'default desc',
                            cost: config.maintenance_cost[req.body.type + "_" + req.body.location] || 100
                        };
                        var insertQuery = 'INSERT INTO ' + config.db_tables.RENTAL_MAINTENANCE + ' (userid, type, location, repeated, description, cost ) values (?,?,?,?,?,?)';
                        connection.query(insertQuery, [newUserMysql_1.userid, newUserMysql_1.type, newUserMysql_1.location, false, newUserMysql_1.description, newUserMysql_1.cost], function (err, rows) {
                            connection.release();
                            if (err) {
                                console.error('error', err);
                                return res.send(err);
                            }
                            var selectQuery = 'SELECT * from ' + config.db_tables.RENTAL_MAINTENANCE + ' where type=';
                            '+newUserMysql.type+';
                            ' && location=';
                            '+newUserMysql.location+';
                            ' && userid=';
                            '+newUserMysql.userid+';
                            '';
                            connection.query(selectQuery, [], function (err, rows) {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send(err);
                                }
                                connection.release();
                                return res.status(200).send(rows);
                            });
                            return res.status(200).send(newUserMysql_1);
                        });
                    }
                });
            }
        });
    }
    //res.status(200).json();
});
module.exports = router;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ3JCOzRCQUVELElBQUksV0FBVyxHQUFHLGdCQUFnQixHQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUMsY0FBYyxDQUFBOzRCQUFBLHFCQUFxQixDQUFBOzRCQUFBLGVBQWUsQ0FBQTs0QkFBQSx5QkFBeUIsQ0FBQTs0QkFBQSxhQUFhLENBQUE7NEJBQUEsdUJBQXVCLENBQUE7NEJBQUEsRUFBRSxDQUFDOzRCQUN6TCxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsVUFBQyxHQUFRLEVBQUUsSUFBUztnQ0FDcEQsSUFBRyxHQUFHLEVBQUM7b0NBQ1AsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUNoQztnQ0FDRCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xDLENBQUMsQ0FBQyxDQUFDOzRCQUVILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBWSxDQUFDLENBQUM7d0JBQzNDLENBQUMsQ0FBQyxDQUFDO3FCQUNIO2dCQUNGLENBQUMsQ0FBQyxDQUFDO2FBQ0g7UUFDRixDQUFDLENBQUMsQ0FBQztLQUNMO0lBQ0QseUJBQXlCO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRUgsaUJBQVMsTUFBTSxDQUFDIiwiZmlsZSI6InJvdXRlcy9tYWludGVuYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmxldCBkYiA9IHJlcXVpcmUoJy4uL2RhdGFiYXNlL2RiLnNlcnZpY2UnKTtcbmNvbnN0IGF1dGhlbnRpY2F0aW9uID0gcmVxdWlyZSgnLi4vYXV0aGVudGljYXRpb24nKTtcblxuXG5cbnJvdXRlci5wb3N0KCcvbWFpbnRlbmFuY2UnLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XG4vL3JlcS5pc0F1dGhlbnRpY2F0ZWQoKVxuXHRpZih0cnVlKSB7XG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXMuc2VuZChlcnIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NICcrY29uZmlnLmRiX3RhYmxlcy5SRU5UQUxfTUFJTlRFTkFOQ0UrJyBXSEVSRSB1c2VyaWQgPSA/IEFORCB0eXBlPSA/IEFORCBsb2NhdGlvbj0gPycsIFtyZXEuYm9keS5pZCwgcmVxLmJvZHkudHlwZSwgcmVxLmJvZHkubG9jYXRpb25dLCAoZXJyOiBhbnksIHJvd3M6IGFueSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc2VuZChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJvd3MubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBkYiB3aXRoIHRoZSByZXBlYXRlZCB2YWx1ZVxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlTXlzcWwgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VyaWQ6IHBhcnNlSW50KHJlcS5ib2R5LmlkKSxcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IHJlcS5ib2R5LnR5cGUsIC8vIHVzZSB0aGUgZ2VuZXJhdGVIYXNoIGZ1bmN0aW9uIGluIG91ciBcblx0XHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uOiByZXEuYm9keS5sb2NhdGlvbixcblx0XHRcdFx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiByZXEuYm9keS5kZXNjcmlwdGlvbiB8fCAnZGVmYXVsdCBkZXNjJyxcblx0XHRcdFx0XHRcdFx0XHRcdGNvc3Q6IGNvbmZpZy5tYWludGVuYW5jZV9jb3N0W3JlcS5ib2R5LnR5cGUrXCJfXCIrcmVxLmJvZHkubG9jYXRpb25dIHx8IDEwMFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGxldCB1cGRhdGVRdWVyeSA9ICdVUERBVEUgICcrY29uZmlnLmRiX3RhYmxlcy5SRU5UQUxfTUFJTlRFTkFOQ0UrJyBzZXQgcmVwZWF0ZWQ9IHRydWUnO1xuXHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHVwZGF0ZVF1ZXJ5LCBbXSwoZXJyOiBhbnksIHJvd3M6IGFueSk9PntcblxuXHRcdFx0XHRcdFx0XHRcdC8vY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYoZXJyKXtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBmcm9tICcrY29uZmlnLmRiX3RhYmxlcy5SRU5UQUxfTUFJTlRFTkFOQ0U7IFxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoc2VsZWN0UXVlcnksW10sKGVycjogYW55LCByb3dzOiBhbnkpPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihlcnIpe1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJvd3MpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTsgXG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gdXNlciB3aXRoIHRoYXQgdXNlcm5hbWUsIGNyZWF0ZSB0aGUgdXNlclxuXHRcdFx0XHRcdFx0XHRcdGxldCBuZXdVc2VyTXlzcWwgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VyaWQ6IHBhcnNlSW50KHJlcS5ib2R5LmlkKSxcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IHJlcS5ib2R5LnR5cGUsIC8vIHVzZSB0aGUgZ2VuZXJhdGVIYXNoIGZ1bmN0aW9uIGluIG91ciBcblx0XHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uOiByZXEuYm9keS5sb2NhdGlvbixcblx0XHRcdFx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiByZXEuYm9keS5kZXNjcmlwdGlvbiB8fCAnZGVmYXVsdCBkZXNjJyxcblx0XHRcdFx0XHRcdFx0XHRcdGNvc3Q6IGNvbmZpZy5tYWludGVuYW5jZV9jb3N0W3JlcS5ib2R5LnR5cGUrXCJfXCIrcmVxLmJvZHkubG9jYXRpb25dIHx8IDEwMFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0XHRsZXQgaW5zZXJ0UXVlcnkgPSAnSU5TRVJUIElOVE8gJytjb25maWcuZGJfdGFibGVzLlJFTlRBTF9NQUlOVEVOQU5DRSsnICh1c2VyaWQsIHR5cGUsIGxvY2F0aW9uLCByZXBlYXRlZCwgZGVzY3JpcHRpb24sIGNvc3QgKSB2YWx1ZXMgKD8sPyw/LD8sPyw/KSc7IFxuXG5cdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeShpbnNlcnRRdWVyeSwgW25ld1VzZXJNeXNxbC51c2VyaWQsIG5ld1VzZXJNeXNxbC50eXBlLCBuZXdVc2VyTXlzcWwubG9jYXRpb24sIGZhbHNlLCBuZXdVc2VyTXlzcWwuZGVzY3JpcHRpb24sIG5ld1VzZXJNeXNxbC5jb3N0IF0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnNlbmQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIGZyb20gJytjb25maWcuZGJfdGFibGVzLlJFTlRBTF9NQUlOVEVOQU5DRSsnIHdoZXJlIHR5cGU9JycrbmV3VXNlck15c3FsLnR5cGUrJycgJiYgbG9jYXRpb249JycrbmV3VXNlck15c3FsLmxvY2F0aW9uKycnICYmIHVzZXJpZD0nJytuZXdVc2VyTXlzcWwudXNlcmlkKycnJzsgXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHNlbGVjdFF1ZXJ5LFtdLChlcnI6IGFueSwgcm93czogYW55KT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZXJyKXtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChyb3dzKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQobmV3VXNlck15c3FsKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0fVxuXHQvL3Jlcy5zdGF0dXMoMjAwKS5qc29uKCk7XG59KTtcblxuZXhwb3J0ID0gcm91dGVyO1xuIl19
