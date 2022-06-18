/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

const logger = require('../../../logger');
const CommonService = require('../common/CommonService');
const AuthService = require('../auth/AuthService');
const AdapterService = require('../adapter/AdapterService');
const ApplicationService = require('../application/ApplicationService');
const PodService = require('../pod/PodService');
const _ = require('lodash');
const ServerService = {};

ServerService.searchServer = async (searchKey) => {

    let allItems = await CommonService.getServerList();

    let items = [];

    allItems.forEach((item) => {

        if (searchKey.length > 0 && item.spec.server.indexOf(searchKey) == -1)
            return;

        items.push(item);
    })

    allItems = items;

    // Count填充
    let result = {};

    // Data填充
    result.Data = [];

    allItems.forEach(item => {

        let elem = {
            ServerId: item.spec.app + '.' + item.spec.server,
            ServerApp: item.spec.app,
            ServerName: item.spec.server,
        };


        result.Data.push(elem);
    })

    return {
        ret: 200,
        msg: 'succ',
        data: result
    };
}

ServerService.selectServer = async (ServerApp, ServerName, limiter, force) => {

    let allItems = await CommonService.getServerList(force);

    let items = [];

    allItems.forEach((item) => {

        if (ServerApp.length > 0 && item.spec.app.indexOf(ServerApp) == -1)
            return;

        if (ServerName.length > 0 && item.spec.server.indexOf(ServerName) == -1)
            return;

        items.push(item);
    })

    allItems = items;

    // filter
    let filterItems = allItems;

    // limiter
    if (limiter != null) {
        let {
            start,
            stop
        } = CommonService.pageList(filterItems.length, limiter);

        filterItems = filterItems.slice(start, stop);
    }

    // Count填充
    let result = {};
    result.Count = {};
    result.Count["AllCount"] = allItems.length;
    result.Count["FilterCount"] = filterItems.length;

    // Data填充
    result.Data = [];

    filterItems.forEach(item => {

        let annotations = item.metadata.annotations || {};

        let elem = {
            ServerId: item.spec.app + '.' + item.spec.server,
            ServerApp: item.spec.app,
            ServerName: item.spec.server,
            SubType: item.spec.subType,
            Source: annotations[CommonService.TServerCloudInstall]
        };

        if (item.spec.Release != null) {
            elem["ServerType"] = item.spec.release.serverType;
        }

        result.Data.push(elem);
    })

    return {
        ret: 200,
        msg: 'succ',
        data: result
    };
}

ServerService.updateServer = async (serverData, target) => {

    let server = await CommonService.getServer(serverData.application + "-" + serverData.serverName);
    if (!server) {
        return {
            ret: 500,
            msg: 'no server'
        };
    }

    let serverCopy = JSON.parse(JSON.stringify(server));

    if (serverCopy.spec.release == null) {
        serverCopy.spec.release = {};
    }

    if (serverCopy.spec.release.serverType == target.ServerType) {
        // 服务发布时会调用，默认一定是传相同的
        return {
            ret: 200,
            msg: 'succ',
            data: {
                Result: 0
            }
        };
    }

    serverCopy.spec.release.serverType = target.serverType;

    let data = await k8sApi.replacObject("tservers", serverCopy.metadata.name, serverCopy);

    return {
        ret: 200,
        msg: 'succ',
        data: data.body
    };
}


ServerService.deleteServer = async (serverData) => {

    // metadata.ServerId.forEach(async (item) => {
    let item = serverData;

    try {
        await CommonService.deleteObject("tservers", CommonService.getTServerName(item.application + '-' + item.serverName));
    } catch (e) {

        logger.error(`deleteServer tserver ${item}`, e.message);
        return {
            ret: 500,
            msg: e.message
        };
    }

    try {
        await CommonService.deleteObject("timages", CommonService.getTServerName(item.application + '-' + item.serverName));
    } catch (e) {
        logger.error(`deleteServer timages ${item}`, e.message);
        return {
            ret: 500,
            msg: e.message
        };
    }

    let filter = {
        eq: {},
    }

    filter.eq[CommonService.TServerAppLabel] = item.application;
    filter.eq[CommonService.TServerNameLabel] = item.serverName;

    let labelSelector = CommonService.createLabelSelector(filter);

    let configs = await CommonService.listObject("tconfigs", labelSelector);

    for (let i = 0; i < configs.body.items.length; i++) {
        let config = configs.body.items[i];

        try {
            await CommonService.deleteObject("tconfigs", config.metadata.name);
        } catch (e) {
            logger.error(`deleteServer tconfig item ${config.metadata.name}`, e.message);
            return {
                ret: 500,
                msg: e.message
            };
        }

    }

    // }

    return {
        ret: 200,
        msg: 'succ'
    };
}


ServerService.serverOptionSelect = async (serverData, limiter) => {

    let labelSelector = `${CommonService.TServerAppLabel}=${serverData.application}`;

    if (serverData.serverName && serverData.serverName.length > 0) {
        labelSelector += `,${CommonService.TServerNameLabel}=${serverData.serverName}`;
    }

    // console.log(serverData, labelSelector);

    let filterItems = (await CommonService.listObject("tservers", labelSelector)).body.items;

    // console.log(filterItems);

    // limiter
    if (limiter != null) {
        let {
            start,
            stop
        } = CommonService.pageList(filterItems.length, limiter);
        filterItems = filterItems.splice(start, stop);
    }

    // Count填充
    let result = {};
    result.Count = {};
    result.Count["AllCount"] = filterItems.length;
    result.Count["FilterCount"] = filterItems.length;

    // Data填充
    result.Data = [];
    // normal 服务无spec.tars域
    filterItems.forEach(item => {
        let elem = {};
        let tars = item.spec.tars;
        elem["ServerId"] = CommonService.getServerId(item.spec.app, item.spec.server);
        elem["ServerApp"] = item.spec.app
        elem["ServerName"] = item.spec.server
        elem["ServerImportant"] = item.spec.important
        elem["ServerTemplate"] = tars ? tars.template || "" : ""
        elem["ServerProfile"] = tars ? tars.profile || "" : ""
        elem["AsyncThread"] = tars ? tars.asyncThread || "" : ""
        elem["serverType"] = item.spec.subType
        result.Data.push(elem);
    });

    return {
        ret: 200,
        msg: 'succ',
        data: result
    };

}

ServerService.serverOptionUpdate = async (serverData, target) => {

    let tServer = await CommonService.getServer(serverData.application + "-" + serverData.serverName);
    if (!tServer) {
        return {
            ret: 500,
            msg: "server not exists"
        };
    }
    tServer = tServer.body;


    let tServerCopy = JSON.parse(JSON.stringify(tServer));

    tServerCopy.spec.important = target.ServerImportant
    tServerCopy.spec.tars.template = target.ServerTemplate
    tServerCopy.spec.tars.profile = target.ServerProfile
    tServerCopy.spec.tars.asyncThread = target.AsyncThread

    let data = await CommonService.replaceObject("tservers", tServerCopy.metadata.name, tServerCopy);

    return {
        ret: 200,
        msg: 'succ',
        data: data.body
    };
}

ServerService.serverOptionTemplate = async (serverData) => {

    let tServer = await CommonService.getServer(serverData.application + "-" + serverData.serverName);
    if (!tServer) {
        return {
            ret: 500,
            msg: "server not exists"
        };
    }

    tServer = tServer.body;

    let profile = tServer.spec.tars.profile;
    let templateName = tServer.spec.tars.template

    let allTemplateContent = [];
    allTemplateContent.push(profile);

    do {

        let curTemplate = await CommonService.getObject("ttemplates", templateName);
        if (!curTemplate) {
            return {
                ret: 500,
                msg: "template not exists"
            };
        }

        curTemplate = curTemplate.body;

        let templateContent = curTemplate.spec.content

        let parentTemplateName = curTemplate.spec.parent

        let parTemplate = await CommonService.getObject("ttemplates", parentTemplateName);
        if (!parTemplate) {
            return {
                ret: 500,
                msg: "parent template not exists"
            };
        }
        parTemplate = parTemplate.body;

        let parentContent = parTemplate.spec.content

        if (allTemplateContent.length == 1) {
            allTemplateContent.push(templateContent);
        }

        if (parentTemplateName == templateName) {
            break
        }

        allTemplateContent.push(parentContent);

        templateName = parentTemplateName
    } while (true);

    let afterJoinTemplateContent = "";

    allTemplateContent.forEach(item => {
        afterJoinTemplateContent += "\r\n";
        afterJoinTemplateContent += item;
    });

    return {
        ret: 200,
        msg: 'succ',
        data: afterJoinTemplateContent
    };
}

ServerService.getApplication = async (uid) => {
    if (await AuthService.hasAdminAuth(uid)) {

        let data = await ApplicationService.applicationSelect(true, '', '', null);
        if (data.ret == 200) {
            let rst = [];
            data.data.Data.forEach(d => {
                rst.push(d.ServerApp);
            });

            data.data = _.uniq(rst);
        } else {
            data.data = [];
        }

        return data;
    } else {
        let authList = await AuthService.getAuthListByUid(uid);
        let appList = [];
        authList.forEach((auth) => {
            let application = auth.application;
            appList.push(application);
        });
        return {
            ret: 200,
            msg: 'succ',
            data: _.uniq(appList)
        };
    }
};

ServerService.getServerName = async (application, uid) => {

    if (await AuthService.hasAdminAuth(uid)) {

        let data = await ServerService.selectServer(application, "", null, true);

        if (data.ret == 200) {
            let rst = [];
            data.data.Data.forEach(d => {

                if (d.SubType == "tars") {
                    rst.push(d.ServerName);
                }
            });

            data.data = _.uniq(rst);
        } else {
            data.data = [];
        }

        return data;
    } else {
        let serverList = [];
        let authList = await AuthService.getAuthListByUid(uid);

        for (var i = 0; i < authList.length; i++) {
            let auth = authList[i];
            let authApplication = auth.application;
            let authServerName = auth.serverName;
            if (authServerName) {
                if (authApplication == application) {
                    serverList.push(authServerName);
                }
            } else if (authApplication == application) {

                let data = await ServerService.selectServer(application, "", null, true);
                if (data.ret == 200) {
                    data.data.Data.forEach(d => {
                        serverList.push(d.ServerName);
                    });
                }

            }
        }

        return {
            ret: 200,
            msg: 'succ',
            data: _.uniq(serverList)
        };
    }
};

ServerService.getObj = async (application, serverName, uid) => {
    if (await AuthService.hasAdminAuth(uid)) {

        let data = await AdapterService.getAllAdapterConfList({
            ServerApp: application,
            ServerName: serverName
        });

        if (data.ret == 200) {
            let rst = [];

            data.data.forEach(d => {
                rst.push(d.servant);
            });

            data.data = _.uniq(rst);
        } else {
            data.data = []
        }

        return data;

    } else {
        let authList = await AuthService.getAuthListByUid(uid);
        for (let auth of authList) {
            if (auth.application == application || auth.serverName == serverName) {

                let data = await AdapterService.getAllAdapterConfList({
                    ServerApp: application,
                    ServerName: serverName
                });

                if (data.ret == 200) {
                    let rst = [];

                    data.data.forEach(d => {
                        rst.push(d.servant);
                    });

                    data.data = _.uniq(rst);

                } else {
                    data.data = []
                }
                return data;
            }
        }
    }
    return []
};

ServerService.getNodeName = async (application, serverName, set) => {
    let filter = {
        eq: {},
    }

    filter.eq[CommonService.TServerAppLabel] = application;
    if (serverName) {
        filter.eq[CommonService.TServerNameLabel] = serverName;
    }

    let data = await PodService.podAliveSelect(filter);

    if (data.ret == 200) {
        let rst = [];

        data.data.Data.forEach(d => {
            rst.push(d.PodName);
        });

        data.data = _.uniq(rst);

    } else {
        data.data = [];
    }
    return data;

};

module.exports = ServerService;