import ApiWrapper from "./api-wrapper";
import { getLoggedInUser, canUseDOM, replacePlaceHolder, getCurrentLanguage, blobToPdf, getErrorMap, getParkAsParameter } from "./utility";
import axios from "axios";
import UIConfig from "./UIConfig";

const preLoaderTarget = UIConfig.loader.defaultPreLoaderTarget;
const currUser = getLoggedInUser();

export class ServiceConfig {

    static config = {
        userDetails: {},
        cart: {},
        partnerDetails: {},
        cartMashUp: {},
    };

    static setUserDetails = data => {
        ServiceConfig.config.userDetails = data;
    };

    static getTenantId = () => {
        return currUser.tenantID;
    };

    static getPartnerId = () => {
        return currUser.partnerId;
    };

    static getUserToken = () => {
        return currUser.idToken;
    };

    static getParnterCreditUrl = (partnerUrl) => {
        return replacePlaceHolder("{partnerId}", ServiceConfig.getPartnerId(), partnerUrl);
    };


    static getLoggingUrl = () => {
        let logging = JSON.parse(localStorage.logging);
        return logging.logginApiUrl;
    }

    //replaced https://miralmeshup.azure-api.net/api/MyCart,key f8cd6a7f88f543a883e9271b00e4573e with
    // https://fe-dev-ux-apimgmt-service.azure-api.net/booking/myCart

    //fe-dev-ux-apimgmt-service : Azure use experience platform
    //fe-newdev-ux-appserver : 
    //sitapimgmt.azure-api.net : 
    //fe-dev-audlog-web.azurewebsites.net : 
    //cloudplatform.coveo.com :  use coveo
    //platform.cloud.coveo.com : use coveo

    static callPending = {
        sessionService: false,
        getCartService: false,
        getCartMashupService: false,
        getPartnerService: false,
    };

    static promiseStack = {
        sessionService: [],
        getCartService: [],
        getCartMashupService:[],
        getPartnerService: [],
    };

}

const callBackFunction = (promiseType, serviceName, configName, res) => {
    let length = ServiceConfig.promiseStack[serviceName].length;
    ServiceConfig.config[configName] = res;
    ServiceConfig.callPending[serviceName] = false;
    for (let index = 0; index < length; index++) {
        let curPromise = ServiceConfig.promiseStack[serviceName][index];
        curPromise[promiseType](res);
    }
    ServiceConfig.promiseStack[serviceName].length = 0;
}

export class CartService {
    static getCart(moduleName, serviceUrl) {
        if (canUseDOM()) {
            let promiseResolve,
                promiseReject,
                promiseFnObj,
                promise = new Promise((resolve, reject) => {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
            promiseFnObj = {
                resolveFn: promiseResolve,
                rejectFn: promiseReject,
            };
            ServiceConfig.promiseStack.getCartService.push(promiseFnObj);
            if (Object.keys(ServiceConfig.config.cart).length) {
                return new Promise((resolve, reject) => {
                    resolve(ServiceConfig.config.cart);
                });
            } else {
                if (!ServiceConfig.callPending.getCartService) {
                    let getCartConfig = {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        url: `${serviceUrl}/${ServiceConfig.getTenantId()}`+"?r="+ Math.random(),
                        moduleName: moduleName || "getCart",
                        preLoader: true,
                        preLoaderTarget: preLoaderTarget,
                        noCache: true,
                    };

                    ServiceConfig.callPending.getCartService = true;

                    ApiWrapper.experienceServices(getCartConfig).then(res => {
                        callBackFunction("resolveFn", "getCartService", "cart", res);
                    }).catch(res => {
                        callBackFunction("rejectFn", "getCartService", "cart", res);
                    });
                }
                return promise;
            }
        }
    };


    static getCartMashup(moduleName, serviceUrl, shouldCache = true) {
        if (canUseDOM()) {
            let promiseResolve,
                promiseReject,
                promiseFnObj,
                promise = new Promise((resolve, reject) => {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
            promiseFnObj = {
                resolveFn: promiseResolve,
                rejectFn: promiseReject,
            };
            ServiceConfig.promiseStack.getCartMashupService.push(promiseFnObj);
            if (shouldCache && Object.keys(ServiceConfig.config.cartMashUp).length) {
                return new Promise((resolve, reject) => {
                    resolve(ServiceConfig.config.cartMashUp);
                });
            } else {
                if (!ServiceConfig.callPending.getCartMashupService) {
                    let getCartConfig = {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        url: `${serviceUrl}/${ServiceConfig.getTenantId()}`+"?r="+ Math.random(),
                        moduleName: moduleName || "getCart",
                        preLoader: true,
                        preLoaderTarget: preLoaderTarget,
                        noCache: true,
                    };

                    ServiceConfig.callPending.getCartMashupService = true;

                    ApiWrapper.experienceServices(getCartConfig).then(res => {
                        callBackFunction("resolveFn", "getCartMashupService", "cartMashUp", res);
                    }).catch(res => {
                        callBackFunction("rejectFn", "getCartMashupService", "cartMashUp", res);
                    });
                }
                return promise;
            }
        }
    };

    static getCartMashupAnonymous(moduleName, serviceUrl , cart=[]) {
        const getCartConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data : cart,
            url: `${serviceUrl}/${ServiceConfig.getTenantId()}`+"?r="+ Math.random(),
            moduleName: moduleName || "getCart",
            preLoader: true,
            preLoaderTarget: preLoaderTarget,
            noCache: true,
        };

        return ApiWrapper.experienceServices(getCartConfig ,false);
    };

    static updateCart = (cart, moduleName, serviceUrl) => {
        let updateCartOptions = {
            method: "POST",
            url: serviceUrl,
            data: cart,
            moduleName: moduleName || "updateCart",
            preLoader: true,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(updateCartOptions);
    };

    static deleteCart = (moduleName, serviceUrl) => {
        const deleteCartOptions = {
            method: "DELETE",
            url: `${serviceUrl}/${ServiceConfig.getTenantId()}`,
            moduleName: moduleName || "deleteCart",
            preLoader: true,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(deleteCartOptions);
    };
};

export class PartnerService {

     static getPartnerDetails = (moduleName, serviceUrl, preLoader, preLoaderTarget) => {
        if (canUseDOM()) {
            let promiseResolve,
                promiseReject,
                promiseFnObj,
                promise = new Promise((resolve, reject) => {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
            promiseFnObj = {
                resolveFn: promiseResolve,
                rejectFn: promiseReject,
            };
            ServiceConfig.promiseStack.getPartnerService.push(promiseFnObj);
            if (Object.keys(ServiceConfig.config.partnerDetails).length) {
                return new Promise((resolve, reject) => {
                    resolve(ServiceConfig.config.partnerDetails);
                });
            } else {
                if ( !ServiceConfig.callPending.getPartnerService ) {
                    let partnerOptions = {
                            method: "GET",
                            url: serviceUrl + "/" + ServiceConfig.getPartnerId()+"?r="+ Math.random(),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            moduleName: moduleName || "partnerOption",
                            preLoader: preLoader,
                            preLoaderTarget: preLoaderTarget,
                            noCache: true,
                        };
                    ServiceConfig.callPending.getPartnerService = true;
                    ApiWrapper.omniServices(partnerOptions).then(res => {
                        callBackFunction("resolveFn","getPartnerService","partnerDetails",res);
                    }).catch(res => {
                        callBackFunction("rejectFn","getPartnerService","partnerDetails",res);
                    });
                }
                return promise;
            }
        }
    };


    static getPartnerAccountCredit = (moduleName, serviceUrl) => {

        let partnerOptions = {
            method: "GET",
            url: ServiceConfig.getParnterCreditUrl(serviceUrl),
            headers: {
                "Content-Type": "application/json",
            },
            moduleName: moduleName || "partnerOption",
            noCache: true,
        };
        return ApiWrapper.omniServices(partnerOptions);

    };
    
    static getContactUsDetails = (moduleName, serviceUrl) => {
        const partnerOptions = {
            url: serviceUrl,
            method: "GET",
            preLoader: true,
            preLoaderTarget: UIConfig.loader.defaultPreLoaderTarget,
            moduleName: moduleName,            
        };
        return ApiWrapper.crmServices(partnerOptions);
    }
}

export class SessionService {

    static getSession = (moduleName, url, preLoader, preLoaderTarget) => {
        if (canUseDOM()) {
            let promiseResolve,
                promiseReject,
                promiseFnObj,
                promise = new Promise((resolve, reject) => {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
            promiseFnObj = {
                resolveFn: promiseResolve,
                rejectFn: promiseReject,
            };
            ServiceConfig.promiseStack.sessionService.push(promiseFnObj);
            if (Object.keys(ServiceConfig.config.userDetails).length) {
                return new Promise((resolve, reject) => {
                    resolve(ServiceConfig.config.userDetails);
                });
            }
            else {
                if (!ServiceConfig.callPending.sessionService) {
                    let sessionConfig = {
                        method: "GET",
                        url: url +"?r="+ Math.random(),
                        moduleName: moduleName || "startSession",
                        preLoader: preLoader,
                        preLoaderTarget: preLoaderTarget,
                        noCache: true,
                    };

                    ServiceConfig.callPending.sessionService = true;

                    ApiWrapper.omniServices(sessionConfig).then(res => {
                        let length = ServiceConfig.promiseStack.sessionService.length;
                        ServiceConfig.setUserDetails(res.data);
                        ServiceConfig.callPending.sessionService = false;
                        for (let index = 0; index < length; index++) {
                            let curPromise = ServiceConfig.promiseStack.sessionService[index];
                            curPromise.resolveFn(res.data);
                        }
                        ServiceConfig.promiseStack.sessionService.length = 0;
                    }).catch(res => {
                        let length = ServiceConfig.promiseStack.sessionService.length;
                        ServiceConfig.setUserDetails(res.data);
                        for (let index = 0; index < length; index++) {
                            let curPromise = ServiceConfig.promiseStack.sessionService[index];
                            curPromise.rejectFn(res);
                        }
                        ServiceConfig.promiseStack.sessionService.length = 0;
                        ServiceConfig.callPending.sessionService = false;
                    });
                }
                return promise;
            }
        }
    };

    static setSession = (data, moduleName, url, preLoader, preLoaderTarget) => {
        let sessionConfig = {
            method: "POST",
            url: url,
            data: data,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName || "setSession",
        };
        return ApiWrapper.omniServices(sessionConfig);
    };

};

export class LoggingService {
    static postLogs = (data, loggingUrl) => {
        let loggingConfig = {
            method: "POST",
            url: (loggingUrl) ? loggingUrl : ServiceConfig.getLoggingUrl(),
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        return axios(loggingConfig);
    }
}

export class OrderService {
    //To create order
    static createOrder = (moduleName, serviceUrl, preLoaderTarget, agentRefNum = "default", dueDate = "default", isSubmitForApproval = false) => {
        let orderConfig = {
            method: "GET",
            url: `${serviceUrl}/${ServiceConfig.getTenantId()}?agentRefNum=${agentRefNum}&dueDate=${dueDate}&isSubmitForApproval=${isSubmitForApproval}`,
            headers: {
                "Content-Type": "application/json",
            },
            preLoader: true,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName || "createOrder",
        };

        return ApiWrapper.experienceServices(orderConfig);
    };

    //To close order
    static closeOrder = (moduleName, data, serviceUrl, preLoaderTarget) => {
        let orderConfig = {
            method: "PUT",
            url: serviceUrl + "/" + data.orderId + "?tenantid=" + ServiceConfig.getTenantId(),
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
            preLoader: true,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName || "closeOrder",
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static getOrders = (url, preLoader, preLoaderTarget) => {

        let orderConfig = {
            url: url, method: "GET", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }


    static deleteOrder = (url, preLoader, preLoaderTarget) => {

        let orderConfig = {
            url: url, method: "DELETE", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static getOrderGuestDetails = (url, preLoader, preLoaderTarget) => {

        let orderConfig = {
            url: url, method: "GET", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static getB2BOrder = (url, preLoader, preLoaderTarget) => {

        let orderConfig = {
            url: url, method: "GET", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static getB2cOrder = (url, preLoader, preLoaderTarget) => {

        const orderConfig = {
            url: url+"?tenantid=" + ServiceConfig.getTenantId(), method: "GET", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static getB2cOrdersList = (url, preLoader, preLoaderTarget) => {
        const orderUrl = url.replace("{yasid}", currUser.yasId);
        const orderConfig = {
            url: orderUrl,
            method: "GET", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }


    static declineOrder = (data, url, preLoader, preLoaderTarget) => {

        let orderConfig = {
            url: url, method: "POST", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            data: data,
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static downloadOrder = (data, url, responseType, preLoader, preLoaderTarget) => {

        let orderConfig = {
            url: url, method: "POST", preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            data: data,
            responseType: responseType,
            headers: {
                "token": ServiceConfig.getUserToken(),
            },
        };
        return ApiWrapper.experienceServices(orderConfig);
    }

    static downloadOrderTickets = (config) => {
        //  Download tickets for given OrderId
        //  Following is config template
        /*  config={
                service: {
                    url: "Url in string", 
                    errors: {
                        "404": "NotFound",
                        "code": "text"
                    }
                },
                orderId: "orderId",
                errorData: "state object from calling component - this.state.errorData "
            }
        */
    
        const downloadOrderPromise =  new Promise((resolve, reject) => {
            const language = getCurrentLanguage();
            let data = {
                "orderId": config.orderId,
                "language": getCurrentLanguage(),
                "tenantId": getLoggedInUser().tenantID,
            };
            
            if (localStorage.getItem(UIConfig.invoiceDetail)) {
                data = { ...data, ...JSON.parse(localStorage.getItem(UIConfig.invoiceDetail)), };
            }
    
            const downloadTicket = OrderService.downloadOrder(JSON.stringify(data), config.service.url, "blob", true, config.preLoaderTarget || UIConfig.loader.defaultPreLoaderTarget);
    
    
            downloadTicket.then(response => {
                const fileName = config.orderId + "_" + language + ".pdf";
                blobToPdf(response, fileName);
                resolve({ "success": "Download successful" })
            }).catch((response, ) => {
                const errorObj = getErrorMap("eTicketDownload", config.service.errors, false, response.error, config.errorData);
                reject({ error: errorObj });
            });
        });
    
        return downloadOrderPromise;
    }
}
export class PayPalServices {
    static getPayPalToken = (moduleName, serviceUrl) => {

        let PayPalTokenOption = {
            method: "GET",
            url: serviceUrl,
            moduleName: moduleName || "PayPal",
        };
        return ApiWrapper.experienceServices(PayPalTokenOption);

    };
    static sendPayPalTrans = (moduleName, data, serviceUrl) => {

        let PayPalTransaction = {
            method: "POST",
            url: serviceUrl,
            data: data,
            moduleName: moduleName || "PayPal",
            preLoader: true,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.experienceServices(PayPalTransaction);

    };
}
export class OmniService {
    static getPartenerProducts = (moduleName, url, preLoader, preLoaderTarget) => {
        let omniConfig = {
            method: "GET",
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            url: (url).replace("{0}", ServiceConfig.getPartnerId()) + "?tenantid=" + ServiceConfig.getTenantId(),
            moduleName: moduleName,
        };

        return ApiWrapper.omniServices(omniConfig);

    };


    static getOmniOrder = (url, preLoader, preLoaderTarget, ) => {

        let omniConfig = {
            method: "GET",
            url: url, preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
        };
        return ApiWrapper.omniServices(omniConfig);

    };
}

export class DownloadService {
    static downloadFile = (data, serviceUrl) => {
        let downloadFileOptions = {
            url: serviceUrl,
            method: "POST",
            responseType: "blob",
            ContentType: "application/json",
            data: JSON.stringify(data),
        };
        return ApiWrapper.experienceServices(downloadFileOptions);
    };
};

export class DownloadCSV {
    static fileDownload = (data, serviceUrl, method) => {
        let downloadFileOptions = {
            url: serviceUrl,
            method: method ? method : "GET",
            responseType: "blob",
            ContentType: "application/json",
            data: data ? data : {},
        };
        return ApiWrapper.experienceServices(downloadFileOptions);
    };
};



export class PerformanceService {

    static getPerformanceData = (url, from, to, preLoader, preLoaderTarget) => {
        let config = {
            method: "GET",
            url: `${url}?tenantid=${ServiceConfig.getTenantId()}&fromDate=${from}&toDate=${to}`,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            headers: {
                "Content-Type": "application/json",
            },
        };

        return ApiWrapper.omniServices(config);

    };
}

export class ProductService {

    static getRelatedProducts = (moduleName, data, serviceUrl, preLoader, preLoaderTarget) => {
        const config = {
            method: "POST",
            url: `${serviceUrl}?mode=${data.mode}&tenantid=${ServiceConfig.getTenantId()}&recordCount=${data.recordCount}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data.payload,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName || "closeOrder",
        };
        return ApiWrapper.experienceServices(config);
    };
}
export class Promotion {
    static ValidateCoupon = (url , couponCode, moduleName ,preLoader = true) => {
        const config = {
            method: "GET",
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            url: (url).replace("{couponCode}", couponCode) + "?tenantid=" + ServiceConfig.getTenantId(),
            moduleName: moduleName,
        };

        return ApiWrapper.omniServices(config);
    }
}

export class ProfileServices {
    // my profile tab services

    static GetGuestInfo = (moduleName, serviceUrl, preLoader, preLoaderTarget) => {
        const getGuestInfoConfig = {
            url: replacePlaceHolder("{yasId}", currUser.yasId, serviceUrl),
            method: "GET",
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.experienceServices(getGuestInfoConfig);
    };
    static UpdateGuestInfo = (moduleName, serviceUrl,data, preLoader, preLoaderTarget) => {
        const updateGuestInfoConfig = {
            url: replacePlaceHolder("{yasId}", currUser.yasId, serviceUrl),
            method: "PUT",
            data: data,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.experienceServices(updateGuestInfoConfig);
    };
    static GetGuestCommunicationPref = (moduleName, serviceUrl, preLoader, preLoaderTarget, needFacility) => {
        const parkParam = getParkAsParameter(needFacility, "&");
        const getGuestInfoConfig = {
            url: replacePlaceHolder("{email}", currUser.emails[0], serviceUrl) + "?yasId=" + currUser.yasId + parkParam,
            method: "GET",
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.experienceServices(getGuestInfoConfig);
    };
    static CreateCommunicationPref = (moduleName, serviceUrl, data, preLoader, preLoaderTarget, needFacility) => {
        const parkParam = getParkAsParameter(needFacility, "&");
        const createPreferenceInfoConfig = {
            url: replacePlaceHolder("{email}",  currUser.emails[0], serviceUrl) + "?yasId=" + currUser.yasId + parkParam,
            method: "POST",
            data:data,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.crmServices(createPreferenceInfoConfig);
    }
    static UpdateCommunicationPref = (moduleName, serviceUrl,data, preLoader, preLoaderTarget, needFacility) => {
        const parkParam = getParkAsParameter(needFacility, "&");
        const updatePreferenceInfoConfig = {
            url: replacePlaceHolder("{email}",  currUser.emails[0], serviceUrl) + "?yasId=" + currUser.yasId + parkParam,
            method: "PUT",
            data:data,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.crmServices(updatePreferenceInfoConfig);
    }
    //prefernce tab services
    static GetPreferenceInfo = (moduleName, serviceUrl, preLoader, preLoaderTarget, needFacility) => {
        const parkParam = getParkAsParameter(needFacility, "?");
        const getPreferenceInfoConfig = {
            url: replacePlaceHolder("{yasId}", currUser.yasId, serviceUrl) + parkParam,
            method: "GET",
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.crmServices(getPreferenceInfoConfig);
    }
    static CreatePreferenceInfo = (moduleName, serviceUrl, data, preLoader, preLoaderTarget, needFacility) => {
        const parkParam = getParkAsParameter(needFacility, "?");
        const createPreferenceInfoConfig = {
            url: replacePlaceHolder("{yasId}", currUser.yasId, serviceUrl) + parkParam,
            method: "POST",
            data:data,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.crmServices(createPreferenceInfoConfig);
    }
    static UpdatePreferenceInfo = (moduleName, serviceUrl,data, preLoader, preLoaderTarget, needFacility) => {
        const parkParam = getParkAsParameter(needFacility, "?");
        const updatePreferenceInfoConfig = {
            url: replacePlaceHolder("{yasId}", currUser.yasId, serviceUrl) + parkParam,
            method: "PUT",
            data:data,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };
        return ApiWrapper.crmServices(updatePreferenceInfoConfig);
    }
}
export class CurrencyConverterService {
    static getConvertedCurrency = (url, apiData, moduleName, preLoader, preLoaderTarget) => {
        const config = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: apiData,
            preLoader: preLoader,
            preLoaderTarget: preLoaderTarget,
            moduleName: moduleName,
        };

        return ApiWrapper.experienceServices(config);
    }
}
