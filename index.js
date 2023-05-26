var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require("puppeteer");
var dotenv = require("dotenv");
var sql = require('./sql_functions');
require("dotenv").config();
function timeout(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, browser_1, page, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, 13, 15]);
                    console.log("Connecting...");
                    return [4 /*yield*/, puppeteer.launch({ headless: false })];
                case 1:
                    browser_1 = _a.sent();
                    console.log("Connected.");
                    return [4 /*yield*/, browser_1.newPage()];
                case 2:
                    page = _a.sent();
                    page.setDefaultNavigationTimeout(2 * 60 * 1000);
                    return [4 /*yield*/, page.goto("https://www.grailed.com/categories/all")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1620, height: 1024 })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, timeout(5000)];
                case 5:
                    _a.sent();
                    page.evaluate(function (_) {
                        window.scrollBy(0, window.innerHeight * 2);
                    });
                    return [4 /*yield*/, timeout(2500)];
                case 6:
                    _a.sent();
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i <= 5)) return [3 /*break*/, 11];
                    return [4 /*yield*/, scrapeFeed(page, i)];
                case 8:
                    _a.sent();
                    page.evaluate(function (_) {
                        window.scrollBy(0, window.innerHeight * 1.5);
                    });
                    return [4 /*yield*/, timeout(4000)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 7];
                case 11: return [2 /*return*/, browser_1.close()];
                case 12:
                    e_1 = _a.sent();
                    console.error("error", e_1);
                    return [3 /*break*/, 15];
                case 13: return [4 /*yield*/, (browser === null || browser === void 0 ? void 0 : browser.close())];
                case 14:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
run();
//scrapes 40 at a time
//document.querySelector("#CategoryPage > div.FiltersInstantSearch > div.feed-and-filters > div.right > div > div:nth-child(43)")
var scrapeFeed = function (page, iter) { return __awaiter(_this, void 0, void 0, function () {
    var allElements, elements, i, innerElement, ePrice, priceText, price, eTitle, title, eSize, size, eDesc, desc, eLink, linkJson, link, eImgLink, imgLinkJson, imgLink;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$$("#CategoryPage > div.FiltersInstantSearch > div.feed-and-filters > div.right > div.feed > div")];
            case 1:
                allElements = _a.sent();
                elements = allElements.slice(iter * 8);
                if (!elements) return [3 /*break*/, 19];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < 8)) return [3 /*break*/, 18];
                innerElement = elements[i];
                return [4 /*yield*/, innerElement.$("div > div > span")];
            case 3:
                ePrice = _a.sent();
                return [4 /*yield*/, page.evaluate(function (e1) { return e1 === null || e1 === void 0 ? void 0 : e1.textContent; }, ePrice)];
            case 4:
                priceText = _a.sent();
                price = +(priceText === null || priceText === void 0 ? void 0 : priceText.slice(1));
                return [4 /*yield*/, innerElement.$("a.listing-item-link > div.ListingMetadata-module__metadata___\\+RWy0 > div.ListingMetadata-module__designerAndSize___lbEdw > p.ListingMetadata-module__designer___h3Tc\\+")];
            case 5:
                eTitle = _a.sent();
                return [4 /*yield*/, page.evaluate(function (e1) { return e1 === null || e1 === void 0 ? void 0 : e1.textContent; }, eTitle)];
            case 6:
                title = _a.sent();
                if (title === undefined)
                    return [3 /*break*/, 17];
                return [4 /*yield*/, innerElement.$("a.listing-item-link > div.ListingMetadata-module__metadata___\\+RWy0 > div.ListingMetadata-module__designerAndSize___lbEdw > p.ListingMetadata-module__size___e9naE")];
            case 7:
                eSize = _a.sent();
                return [4 /*yield*/, page.evaluate(function (e1) { return e1 === null || e1 === void 0 ? void 0 : e1.textContent; }, eSize)];
            case 8:
                size = _a.sent();
                return [4 /*yield*/, innerElement.$("a.listing-item-link > div.ListingMetadata-module__metadata___\\+RWy0 > div:nth-child(2) > p.ListingMetadata-module__title___Rsj55")];
            case 9:
                eDesc = _a.sent();
                return [4 /*yield*/, page.evaluate(function (e1) { return e1 === null || e1 === void 0 ? void 0 : e1.textContent; }, eDesc)];
            case 10:
                desc = _a.sent();
                return [4 /*yield*/, innerElement.$("a.listing-item-link")];
            case 11:
                eLink = _a.sent();
                return [4 /*yield*/, (eLink === null || eLink === void 0 ? void 0 : eLink.getProperty('href'))];
            case 12:
                linkJson = _a.sent();
                return [4 /*yield*/, (linkJson === null || linkJson === void 0 ? void 0 : linkJson.jsonValue())];
            case 13:
                link = _a.sent();
                return [4 /*yield*/, innerElement.$("a.listing-item-link > div.listing-cover-photo > div.lazyload-wrapper > img")];
            case 14:
                eImgLink = _a.sent();
                return [4 /*yield*/, (eImgLink === null || eImgLink === void 0 ? void 0 : eImgLink.getProperty('src'))];
            case 15:
                imgLinkJson = _a.sent();
                return [4 /*yield*/, (imgLinkJson === null || imgLinkJson === void 0 ? void 0 : imgLinkJson.jsonValue())];
            case 16:
                imgLink = _a.sent();
                console.log("".concat(iter * 8 + i + 1, "."));
                console.log("Size: ".concat(size));
                console.log("Price: ".concat(price));
                console.log("Title: ".concat(title));
                console.log("Desc: ".concat(desc));
                console.log("Image Link: ".concat(imgLink));
                console.log("Link: ".concat(link, "\n"));
                sql.insertData(title, size, price, desc, imgLink, link);
                _a.label = 17;
            case 17:
                i++;
                return [3 /*break*/, 2];
            case 18: return [2 /*return*/, null];
            case 19:
                console.log("Element not found");
                _a.label = 20;
            case 20: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=index.js.map