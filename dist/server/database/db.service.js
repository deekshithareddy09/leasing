"use strict";
var _this = this;
var mysql = require("mysql");
var config = require('../config');
var db = (function () {
    _this.pool = mysql.createPool(config.db_options);
    _this.getConnection = function (cb) {
        _this.pool.getConnection(cb);
    };
    _this.query = function (sql, values) { return new Promise(function (resolve, reject) {
        _this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            else {
                connection.query(sql, values, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
        });
    }); };
    return _this;
})();
module.exports = db;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFiYXNlL2RiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQStCWTtBQS9CWiw2QkFBZ0M7QUFDaEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWxDLElBQU0sRUFBRSxHQUFHLENBQUM7SUFDWCxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxFQUFPO1FBQzVCLEtBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBQyxHQUFRLEVBQUUsTUFBVyxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNuRSxLQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFDLEdBQVEsRUFBRSxVQUFlO1lBQ2pELElBQUksR0FBRyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ04sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQUMsR0FBUSxFQUFFLE9BQVk7b0JBQ3BELFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFckIsSUFBSSxHQUFHLEVBQUU7d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDakI7eUJBQU07d0JBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNqQjtnQkFDRixDQUFDLENBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsRUFoQnNDLENBZ0J0QyxDQUFDO0lBRUgsT0FBTyxLQUFJLENBQUM7QUFDYixDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsaUJBQVMsRUFBRSxDQUFDIiwiZmlsZSI6ImRhdGFiYXNlL2RiLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbXlzcWwgPSByZXF1aXJlKCdteXNxbCcpO1xubGV0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG5jb25zdCBkYiA9ICgoKSA9PiB7XG5cdHRoaXMucG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woY29uZmlnLmRiX29wdGlvbnMpO1xuXG5cdHRoaXMuZ2V0Q29ubmVjdGlvbiA9IChjYjogYW55KSA9PiB7XG5cdFx0dGhpcy5wb29sLmdldENvbm5lY3Rpb24oY2IpO1xuXHR9O1xuXG5cdHRoaXMucXVlcnkgPSAoc3FsOiBhbnksIHZhbHVlczogYW55KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dGhpcy5wb29sLmdldENvbm5lY3Rpb24oKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpID0+IHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoc3FsLCB2YWx1ZXMsIChlcnI6IGFueSwgcmVzdWx0czogYW55KSA9PiB7XG5cdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxuZXhwb3J0ID0gZGI7Il19
