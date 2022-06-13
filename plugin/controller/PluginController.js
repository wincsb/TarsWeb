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

const logger = require('../../logger');
const WebConf = require('../../config/webConf');

let getPluginService = (k8s) => {
	if (WebConf.isEnableK8s() && (k8s == true || k8s == "true")) {
		return require('../service/PluginK8SService');
	} else {
		return require('../service/PluginService');
	}
}
const PluginController = {};

PluginController.loadPlugins = async (app) => {

	if (WebConf.enable) {
		await getPluginService(false).loadPlugins(app);
	}
	if (WebConf.isEnableK8s()) {
		await getPluginService(true).loadPlugins(app);
	}
}

PluginController.install = async (ctx) => {

	try {
		let result = await getPluginService(ctx.paramsObj.k8s).install(ctx.paramsObj);

		ctx.makeResObj(result.ret, result.msg, result.data);

	} catch (e) {
		logger.error('[install]', e.body ? e.body.message : e, ctx)
		ctx.makeResObj(500, e.body ? e.body.message : e);
	}
}

PluginController.list = async (ctx) => {

	try {
		let result = await getPluginService(ctx.paramsObj.k8s).list(ctx.paramsObj.type);

		// console.log(result);
		ctx.makeResObj(result.ret, result.msg, result.data);

	} catch (e) {
		logger.error('[list]', e.body ? e.body.message : e, ctx)
		ctx.makeResObj(500, e.body ? e.body.message : e);
	}
}

module.exports = PluginController;