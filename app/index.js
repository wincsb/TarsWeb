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
// const HttpController = require('../controller/http/HttpController');
const WebConf = require('../config/webConf');

if (WebConf.enable) {
	const ServerController = require('./controller/server/ServerController');
	const TreeController = require('./controller/server/TreeController');
	const NotifyController = require('./controller/notify/NotifyController');
	const ConfigController = require('./controller/config/ConfigController');
	const AdapterController = require('./controller/adapter/AdapterController');
	const ExpandServerController = require('./controller/expand/ExpandServerController');
	const DeployServerController = require('./controller/deploy/DeployServerController');
	const TaskController = require('./controller/task/TaskController');
	const PatchController = require('./controller/patch/PatchController');
	const TemplateController = require('./controller/template/TemplateController');
	const ApplicationController = require('./controller/application/ApplicationController');
	const BusinessController = require('./controller/business/BusinessController');
	const BusinessRelationController = require('./controller/businessRelation/BusinessRelationController');
	const ResourceController = require('./controller/resource/ResourceController');

	// const InfTestController = require('../index/controller/infTest/InfTestController');
	const LogviewController = require('./controller/logview/LogviewController');
	const IDCController = require('./controller/idc/IDCController');
	const ImageController = require('./controller/image/ImageController');
	const FrameworkController = require('./controller/framework/FrameworkController');

	const apiConf = [
		// 服务管理接口
		['get', '/server', ServerController.getServerConfById, {
			id: 'notEmpty'
		}],
		['post', '/server_exist', ServerController.serverExist, {
			application: 'notEmpty',
			server_name: 'notEmpty',
			node_names: ''
		}],
		['post', '/server_exist_and_deploy', ServerController.serverExistAndDeploy, {
			application: 'notEmpty',
			server_name: 'notEmpty',
		}],
		['get', '/application_list', ServerController.getApplicationList],
		['get', '/node_list', ServerController.getNodeList],
		['get', '/server_list', ServerController.getServerConfList4Tree, {
			tree_node_id: 'notEmpty'
		}],
		['get', '/inactive_server_list', ServerController.getInactiveServerConfList],
		['get', '/get_realtime_state', ServerController.getRealtimeState, {
			id: 'notEmpty'
		}],
		['get', '/load_server', ServerController.loadServer, {
			application: 'notEmpty',
			server_name: 'notEmpty',
			node_name: 'notEmpty'
		}],
		['post', '/update_server', ServerController.updateServerConf, {
				id: 'notEmpty'
			},
			['id', 'isBak', 'template_name', 'server_type', 'enable_set', 'set_name', 'set_area', 'set_group', 'async_thread_num', 'base_path', 'exe_path',
				'start_script_path', 'stop_script_path', 'monitor_script_path', 'profile', 'enable_group', 'ip_group_name', 'run_type', 'base_image_id'
			]
		],
		['post', '/batch_update_server', ServerController.batchUpdateServerConf, {
				id: 'notEmpty'
			},
			['id', 'isBak', 'template_name', 'server_type', 'enable_set', 'set_name', 'set_area', 'set_group', 'async_thread_num', 'base_path', 'exe_path',
				'start_script_path', 'stop_script_path', 'monitor_script_path', 'profile', 'enable_group', 'ip_group_name', 'run_type', 'base_image_id'
			]
		],
		['get', '/server_search', ServerController.getServerSearch],

		['get', '/tree', TreeController.listTree],
		['get', '/send_command', ServerController.sendCommand, {
			server_ids: 'notEmpty',
			command: 'notEmpty'
		}],
		['get', '/server_nodes', ServerController.getServerNodes, {
			application: 'notEmpty',
			server_name: 'notEmpty'
		}],

		['post', '/update_flowstatus', ServerController.updateFlowStatus, {
			server_id: 'notEmpty',
			status: 'notEmpty',
			node_list: 'notEmpty'
		}],
		['post', '/server_state', ServerController.getServerState],
		//       ['get', '/get_alarm_conf', ServerController.getAlarmConf],

		//检查框架
		['get', '/get_framework_list', ServerController.getFrameworkList],
		['post', '/check_framework_server', ServerController.checkFrameworkServer],

		//log server 部署
		['get', '/need_deploy_log', ServerController.needDeployLog],
		['get', '/expand_deploy_log', ServerController.expandDeployLog],

		//notify日志接口
		['get', '/server_notify_list', NotifyController.getServerNotifyList, {
			tree_node_id: 'notEmpty'
		}],

		//Adapter接口
		['get', '/adapter_conf', AdapterController.getAdapterConfById, {
			id: 'notEmpty'
		}],
		['get', '/adapter_conf_list', AdapterController.getAdapterConfListByServerConfId, {
			id: 'notEmpty'
		}],
		['get', '/all_adapter_conf_list', AdapterController.getAllAdapterConfList, {
			application: 'notEmpty',
			server_name: 'notEmpty'
		}],
		['post', '/add_adapter_conf', AdapterController.addAdapterConf, {
				application: 'notEmpty',
				server_name: 'notEmpty',
				node_name: 'notEmpty'
			},
			['application', 'server_name', 'node_name', 'thread_num', 'endpoint', 'max_connections', 'allow_ip', 'servant', 'queuecap', 'queuetimeout', 'protocol', 'handlegroup']
		],
		['get', '/delete_adapter_conf', AdapterController.deleteAdapterConf, {
			id: 'notEmpty'
		}],
		['post', '/update_adapter_conf', AdapterController.updateAdapterConf, {
				id: 'notEmpty',
				servant: 'notEmpty'
			},
			['id', 'thread_num', 'endpoint', 'max_connections', 'allow_ip', 'servant', 'queuecap', 'queuetimeout', 'protocol', 'handlegroup']
		],
		['get', '/auto_port', AdapterController.getAvaliablePort, {
			node_name: ''
		}],

		//上线和扩容接口
		['post', '/deploy_server', DeployServerController.deployServer],
		['post', '/deploy_server_from_cloud', DeployServerController.deployServerFromCloud],
		['post', '/upgrade_server_from_cloud', DeployServerController.upgradeServerFromCloud],
		['get', '/server_type_list', DeployServerController.serverTypeList],
		['post', '/expand_server_preview', ExpandServerController.expandServerPreview, {
				application: 'notEmpty',
				server_name: 'notEmpty',
				node_name: 'notEmpty',
				expand_nodes: 'notEmpty'
			},
			['application', 'server_name', 'set', 'node_name', 'expand_nodes', 'enable_set', 'set_name', 'set_area', 'set_group', 'copy_node_config']
		],
		['post', '/expand_server', ExpandServerController.expandServer],
		['get', '/cascade_select_server', ExpandServerController.selectAppServer],

		// 服务配置接口
		['get', '/unused_config_file_list', ConfigController.getUnusedApplicationConfigFile],
		['get', '/config_file_list', ConfigController.configFileList, {
			level: 'number',
			application: 'notEmpty'
		}],
		['post', '/add_config_file', ConfigController.addConfigFile, {
			level: 'number',
			application: 'notEmpty',
			filename: 'notEmpty',
			config: 'notEmpty'
		}],
		['get', '/delete_config_file', ConfigController.deleteConfigFile, {
			id: 'number'
		}],
		['post', '/update_config_file', ConfigController.updateConfigFile, {
			id: 'number',
			config: 'notEmpty',
			reason: 'notEmpty'
		}],
		['get', '/config_file', ConfigController.configFile, {
			id: 'number'
		}],
		['get', '/node_config_file_list', ConfigController.nodeConfigFileList, {
			application: 'notEmpty',
			server_name: 'notEmpty'
		}],
		['get', '/config_file_history', ConfigController.getConfigFileHistory, {
			id: 'number'
		}],
		['get', '/config_file_history_list', ConfigController.configFileHistoryList, {
			config_id: 'number'
		}],
		['get', '/add_config_ref', ConfigController.addConfigRef, {
			config_id: 'number',
			reference_id: 'number'
		}],
		['get', '/delete_config_ref', ConfigController.deleteConfigRef, {
			id: 'number'
		}],
		['get', '/config_ref_list', ConfigController.configRefList, {
			config_id: 'number'
		}],
		['get', '/merged_node_config', ConfigController.mergedNodeConfig, {
			id: 'number'
		}],
		['get', '/push_config_file', ConfigController.pushConfigFile, {
			ids: 'notEmpty'
		}],

		// 任务管理
		['get', '/task_list', TaskController.getTasks],
		['get', '/task', TaskController.getTask, {
			task_no: 'notEmpty'
		}],
		['post', '/add_task', TaskController.addTask],
		['get', '/del_task', TaskController.delTask],

		// 发布包
		['post', '/upload_and_publish', PatchController.uploadAndPublish, {
			application: 'notEmpty',
			module_name: 'notEmpty'
		}],
		['post', '/upload_patch_package', PatchController.uploadPatchPackage, {
			application: 'notEmpty'
		}],
		['put', '/upload_patch_package', PatchController.uploadPatchPackage, {
			application: 'notEmpty'
		}],
		['get', '/server_patch_list', PatchController.serverPatchList, {
			application: 'notEmpty'
		}],
		['get', '/server_now_version', PatchController.serverNowList, {
			application: 'notEmpty',
			serverName: 'notEmpty'
		}],
		['get', '/get_server_patch', PatchController.getServerPatchByTaskId, {
			task_id: 'notEmpty'
		}],
		// ['get', '/get_tag_list', PatchController.getTagList, {
		// 	application: 'notEmpty',
		// 	server_name: 'notEmpty'
		// }],
		// ['get', '/get_tag_conf', PatchController.getCodeInfConf, {
		// 	application: 'notEmpty',
		// 	server_name: 'notEmpty'
		// }],
		// ['get', '/set_tag_conf', PatchController.setCodeInfConf, {
		// 	path: 'notEmpty',
		// 	application: 'notEmpty',
		// 	server_name: 'notEmpty'
		// }],
		// ['post', '/do_compile', PatchController.doCompile],
		// ['get', '/compiler_task', PatchController.compilerTask],
		// ['get', '/get_compile_conf', PatchController.getCompilerConf],

		['get', '/download_package', PatchController.downloadPackage, {
			id: 'notEmpty'
		}],
		['post', '/delete_patch_package', PatchController.deletePatchPackage],
		['post', '/set_patch_package_default', PatchController.setPatchPackageDefault],
		['get', '/has_dcache_patch_package', PatchController.hasDcachePatchPackage],

		//模板管理
		['get', '/profile_template', TemplateController.getTemplate, {
			template_name: 'notEmpty'
		}],
		['get', '/query_profile_template', TemplateController.getTemplateList],
		['get', '/template_name_list', TemplateController.getTemplateNameList],
		['post', '/add_profile_template', TemplateController.addTemplate, {
			template_name: 'notEmpty',
			parents_name: 'notEmpty',
			profile: 'notEmpty'
		}],
		['get', '/get_merge_profile_template', TemplateController.getMergeTemplate, {
			template_name: 'notEmpty'
		}],
		['get', '/delete_profile_template', TemplateController.deleteTemplate, {
			id: 'notEmpty'
		}],
		['post', '/update_profile_template', TemplateController.updateTemplate, {
			id: 'notEmpty',
			template_name: 'notEmpty',
			parents_name: 'notEmpty',
			profile: 'notEmpty'
		}],
		['get', '/view_server_merge', TemplateController.getServerProfileTemplate, {
			application: 'notEmpty',
			serverName: 'notEmpty',
			nodeName: 'notEmpty'
		}],

		//应用管理
		['post', '/add_application', ApplicationController.add, {
			f_name: 'notEmpty'
		}],
		['get', '/delete_application', ApplicationController.delete, {
			f_id: 'notEmpty'
		}],
		['get', '/query_application', ApplicationController.getList],

		//业务管理
		['post', '/add_business', BusinessController.add, {
			f_name: 'notEmpty'
		}],
		['get', '/delete_business', BusinessController.delete, {
			f_id: 'notEmpty'
		}],
		['post', '/update_business', BusinessController.update, {
			f_id: 'notEmpty',
			f_name: 'notEmpty',
			f_show_name: 'notEmpty'
		}],
		['get', '/query_business', BusinessController.getList],

		//业务关联
		['post', '/add_business_relation', BusinessRelationController.add, {
			f_business_name: 'notEmpty',
			f_application_name: 'notEmpty'
		}],
		['get', '/delete_business_relation', BusinessRelationController.delete, {
			f_id: 'notEmpty'
		}],
		['post', '/update_business_relation', BusinessRelationController.update, {
			f_id: 'notEmpty',
			f_business_name: 'notEmpty',
			f_application_name: 'notEmpty'
		}],
		['get', '/query_business_relation', BusinessRelationController.getList],

		//IDC分组管理
		['get', '/query_idc', IDCController.getIDCGroupList],
		['get', '/dict_idc', IDCController.getIDCGroupDict],
		['post', '/add_idc', IDCController.addIDCGroup, {
				group_name: 'notEmpty',
				group_name_cn: 'notEmpty',
				ip_order: 'notEmpty'
			},
			['group_name', 'group_name_cn', 'ip_order', 'allowList', 'dennyList']
		],
		['get', '/delete_idc', IDCController.deleteIDCGroup, {
			group_id: 'notEmpty'
		}],
		['post', '/update_idc', IDCController.updateIDCGroup, {
				group_id: 'notEmpty',
				group_name: 'notEmpty',
				group_name_cn: 'notEmpty',
				ip_order: 'notEmpty'
			},
			['group_id', 'group_name', 'group_name_cn', 'ip_order', 'allowList', 'dennyList']
		],

		//基础镜像
		['get', '/base_registry', ImageController.getRegistryList],
		['post', '/add_registry', ImageController.addRegistry, {
				registry: 'notEmpty'
			},
			["registry", "username", "password", "remark"]
		],
		['post', '/check_docker_registry', ImageController.checkDockerRegistry, {
				registry: 'notEmpty',
			},
			['id', "registry", "username", "password"]
		],

		['post', '/update_registry', ImageController.updateRegistry, {
				id: 'notEmpty',
				registry: 'notEmpty',
			},
			['id', "registry", "username", "password", "remark"]
		],
		['post', '/delete_registry', ImageController.deleteRegistry, {
			id: 'notEmpty'
		}],

		['get', '/base_image', ImageController.getImageList],
		['post', '/add_image', ImageController.addImage, {
				image: 'notEmpty',
				registryId: 'notEmpty',
				remark: 'notEmpty',
			},
			["image", "registryId", "remark"]
		],
		['post', '/update_image', ImageController.updateImage, {
				id: 'notEmpty',
				image: 'notEmpty',
				registryId: 'notEmpty',
				remark: 'notEmpty',
			},
			["id", "image", "registryId", "remark"]
		],
		['post', '/delete_image', ImageController.deleteImage, {
			id: 'notEmpty'
		}],
		['get', '/base_image_list', ImageController.getImageRegistryList],
		['post', '/force_docker_login', ImageController.forceDockerLogin, {
			nodeName: 'notEmpty'
		}],
		['post', '/docker_pull', ImageController.dockerPull, {
			id: 'notEmpty'
		}],

		//资源管理
		['get', '/list_tars_node', ResourceController.listTarsNode],
		['get', '/load_node_label', ResourceController.loadNodeLabel, {
			node_name: 'notEmpty'
		}],
		['post', '/add_node_label', ResourceController.addNodeLabel, {
			node_name: 'notEmpty',
			name: 'notEmpty',
			value: 'notEmpty'
		}],
		['post', '/delete_node_label', ResourceController.deleteNodeLabel, {
			node_name: 'notEmpty',
			name: 'notEmpty'
		}],
		['post', '/connect_tars_node', ResourceController.connectTarsNode],
		['post', '/install_tars_nodes', ResourceController.installTarsNodes],
		['get', '/uninstall_tars_nodes', ResourceController.uninstallTarsNodes, {
			ips: 'notEmpty'
		}],
		['get', '/uninstall_tars_node', ResourceController.uninstallTarsNode, {
			node_name: 'notEmpty'
		}],
		['get', '/check_tars_node', ResourceController.checkTarsNode, {
			node_name: 'notEmpty'
		}],

		//logview
		['get', '/logview_list', LogviewController.getLogFileList, {
			application: 'notEmpty',
			server_name: 'notEmpty',
			node_name: 'notEmpty'
		}],
		['get', '/logview_data', LogviewController.getLogData, {
			application: 'notEmpty',
			server_name: 'notEmpty',
			node_name: 'notEmpty',
			log_file: 'notEmpty',
			interface_params: 'notEmpty'
		}],

		//framework key
		['post', '/get_framework_cuid', FrameworkController.getFrameworkCUid],
		['post', '/get_framework_ticket', FrameworkController.getFrameworkTicket, {
			secret: 'notEmpty'
		}],
		['post', '/update_framework_autologin', FrameworkController.updateFrameworkAutoLogin, {
			autologin: 'notEmpty',
		}],
		['post', '/update_framework_key', FrameworkController.updateFrameworkKey, {
			priKey: 'notEmpty',
			cuid: 'notEmpty',
		}],

	];

	const clientConf = [
		['get', '/get_tarsnode', ResourceController.getTarsNode],
	];
	module.exports = {
		apiConf,
		clientConf
	};

} else {

	const apiConf = [];
	const clientConf = [];
	module.exports = {
		apiConf,
		clientConf
	};
}