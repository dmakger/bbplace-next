"use strict";
exports.__esModule = true;
exports.TenderAPI = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var query_1 = require("@reduxjs/toolkit/query");
var interceptors_1 = require("@/api/interceptors");
var request_1 = require("@/api/request");
var args_tender_lib_1 = require("../lib/args.tender.lib");
var tender_lib_1 = require("../lib/tender.lib");
var auth_token_lib_1 = require("@/entities/Auth/lib/auth-token.lib");
exports.TenderAPI = react_1.createApi({
    reducerPath: 'tenderAPI',
    baseQuery: query_1.fetchBaseQuery({
        baseUrl: interceptors_1.options.baseURL + 'tender/api/Tenders'
    }),
    endpoints: function (build) { return ({
        //ALL TENDERS
        getAllTenders: build.query({
            query: function (args) { return ({
                url: request_1.getURL("/GetAllRequests/SingleList/Filter/", args_tender_lib_1.getArgsTender(args)),
                method: 'GET'
            }); }
        }),
        getAllTendersByTwoObjects: build.query({
            query: function (args) { return ({
                url: request_1.getURL("/GetAllRequests/Filter/", args_tender_lib_1.getArgsTender(args)),
                method: 'GET'
            }); }
        }),
        getCountAllTenders: build.query({
            query: function (args) { return ({
                url: "/GetAllRequests/Filter/" + (args === null || args === void 0 ? void 0 : args.limit) + "/CountPages/",
                method: 'GET',
                params: args === null || args === void 0 ? void 0 : args.params
            }); }
        }),
        // TENDERS BY [USER] AND [TYPE]
        getUserTenders: build.query({
            query: function (_a) {
                var userId = _a.userId, type = _a.type;
                return ({
                    url: "/GetUserTenders/" + userId + (type ? "?type=" + tender_lib_1.tenderTypeToEn(type) : '')
                });
            }
        }),
        deleteTender: build.mutation({
            query: function (_a) {
                var tenderId = _a.tenderId, type = _a.type;
                return ({
                    url: "/DeleteTender/" + type + "/" + tenderId,
                    method: 'DELETE',
                    // body,
                    headers: auth_token_lib_1.getHeaderAuthorization()
                });
            }
        }),
        // TENDER BY TYPE
        getTender: build.query({
            query: function (_a) {
                var tenderId = _a.tenderId, type = _a.type;
                return ({
                    url: "/GetTender/?id=" + tenderId + "&type=" + tender_lib_1.tenderTypeToEn(type)
                });
            }
        }),
        //SALE TENDERS
        getSaleTenderById: build.query({
            query: function (tenderId) { return ({
                url: "/GetSaleRequest/" + tenderId
            }); }
        }),
        getSaleTenders: build.query({
            query: function (args) { return ({
                url: request_1.getURL("/GetSaleRequests/OrderByDate/DESC/", args_tender_lib_1.getArgsTender(args)),
                method: 'GET'
            }); }
        }),
        getCountSaleTenders: build.query({
            query: function (args) { return ({
                url: "/GetSaleRequests/OrderByDate/DESC/" + (args === null || args === void 0 ? void 0 : args.limit) + "/CountPages/",
                method: 'GET',
                params: args === null || args === void 0 ? void 0 : args.params
            }); }
        }),
        //PURCHASE TENDERS
        getPurchaseTenderById: build.query({
            query: function (tenderId) { return ({
                url: "/GetPurchaseRequest/" + tenderId
            }); }
        }),
        getPurchaseTenders: build.query({
            query: function (args) { return ({
                url: request_1.getURL("/GetPurchaseRequests/OrderByDate/DESC/", args_tender_lib_1.getArgsTender(args)),
                method: 'GET'
            }); }
        }),
        getCountPurchaseTenders: build.query({
            query: function (args) { return ({
                url: "/GetPurchaseRequests/OrderByDate/DESC/" + (args === null || args === void 0 ? void 0 : args.limit) + "/CountPages/",
                method: 'GET',
                params: args === null || args === void 0 ? void 0 : args.params
            }); }
        }),
        createSaleTender: build.mutation({
            query: function (body) { return ({
                url: "/AddSaleRequest",
                method: 'POST',
                headers: auth_token_lib_1.getHeaderAuthorization(),
                body: body
            }); }
        })
    }); }
});
