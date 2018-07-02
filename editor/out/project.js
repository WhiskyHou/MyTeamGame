"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Project = /** @class */ (function () {
    function Project() {
    }
    Object.defineProperty(Project.prototype, "projectRoot", {
        get: function () {
            var search = location.search;
            var param = new URLSearchParams(search);
            var root = decodeURIComponent(param.get("gameUrl"));
            return root;
        },
        enumerable: true,
        configurable: true
    });
    return Project;
}());
exports.project = new Project();
