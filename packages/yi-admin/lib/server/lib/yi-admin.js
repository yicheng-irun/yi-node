"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YiAdmin = void 0;
const site_nav_menu_1 = require("./site-nav-menu");
const types_1 = require("./types");
const router_koa_1 = require("./router-koa");
const router_express_1 = require("./router-express");
/**
 * admin站点
 */
class YiAdmin {
    constructor({ permissionKoa, permissionExpress, serverOrigin, siteConfig = {}, csrfParamKoa, csrfParamExpress, }) {
        var _a;
        /**
         * 判断用户是否有权限
         * 如果没有权限，直接在里侧抛出异常
         */
        this.permissionKoa = async (ctx, next) => {
            await next();
        };
        /**
         * 判断用户是否有权限
         * 如果没有权限，直接在里侧抛出异常
         */
        this.permissionExpress = (req, res, next) => {
            next();
        };
        /**
         * 站点导航菜单
         */
        this.siteNavMenu = new site_nav_menu_1.SiteNavMenu({
            title: 'root',
        });
        this.modelNavMenu = new site_nav_menu_1.SiteNavMenu({
            title: '数据模型管理',
        });
        this.modelAdminsMap = {};
        this.options = {
            csrfParamKoa,
            csrfParamExpress,
        };
        if (permissionKoa) {
            this.permissionKoa = permissionKoa;
        }
        if (permissionExpress) {
            this.permissionExpress = permissionExpress;
        }
        this.koaRouter = router_koa_1.createKoaRouter({
            serverOrigin,
            yiAdmin: this,
        });
        this.expressRouter = router_express_1.createExpressRouter({
            serverOrigin,
            yiAdmin: this,
        });
        this.siteNavMenu.add(this.modelNavMenu);
        this.siteConfig = {
            siteName: (_a = siteConfig.siteName) !== null && _a !== void 0 ? _a : 'yi-admin',
        };
    }
    /**
     * 添加一个modelAdmin到yi-admin实例中
     * @param modelAdmin
     */
    addModelAdmin(modelAdmin, { addToSiteNavMenu = true, } = {}) {
        if (this.modelAdminsMap[modelAdmin.name]) {
            throw new Error(`已经存在一个name为${modelAdmin.name}的model-admin实体在本站点中`);
        }
        this.modelAdminsMap[modelAdmin.name] = modelAdmin;
        if (addToSiteNavMenu) {
            this.modelNavMenu.add(new site_nav_menu_1.SiteNavMenu({
                title: `管理 ${modelAdmin.title || modelAdmin.name}`,
                link: `model-admin/${modelAdmin.name}/`,
            }));
        }
    }
}
exports.YiAdmin = YiAdmin;
YiAdmin.EditTypes = types_1.EditTypes;
YiAdmin.ListTypes = types_1.ListTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWktYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi95aS1hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxtREFBOEM7QUFDOUMsbUNBQStDO0FBQy9DLDZDQUErQztBQUMvQyxxREFBdUQ7QUFXdkQ7O0dBRUc7QUFDSCxNQUFhLE9BQU87SUFrRGpCLFlBQWEsRUFDVixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixVQUFVLEdBQUcsRUFBRSxFQUNmLFlBQVksRUFDWixnQkFBZ0IsR0F5QmxCOztRQWhGRDs7O1dBR0c7UUFDSSxrQkFBYSxHQUFzQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzNFLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRUQ7OztXQUdHO1FBQ0ksc0JBQWlCLEdBQTZFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNySCxJQUFJLEVBQUUsQ0FBQztRQUNWLENBQUMsQ0FBQTtRQWFEOztXQUVHO1FBQ0ksZ0JBQVcsR0FBZ0IsSUFBSSwyQkFBVyxDQUFDO1lBQy9DLEtBQUssRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBYUksaUJBQVksR0FBZ0IsSUFBSSwyQkFBVyxDQUFDO1lBQ2hELEtBQUssRUFBRSxRQUFRO1NBQ2pCLENBQUMsQ0FBQztRQStESSxtQkFBYyxHQUVqQixFQUFFLENBQUM7UUEvQkosSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNaLFlBQVk7WUFDWixnQkFBZ0I7U0FDbEIsQ0FBQztRQUVGLElBQUksYUFBYSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLDRCQUFlLENBQUM7WUFDOUIsWUFBWTtZQUNaLE9BQU8sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQ0FBbUIsQ0FBQztZQUN0QyxZQUFZO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNmLFFBQVEsUUFBRSxVQUFVLENBQUMsUUFBUSxtQ0FBSSxVQUFVO1NBQzdDLENBQUM7SUFDTCxDQUFDO0lBTUQ7OztPQUdHO0lBQ0gsYUFBYSxDQUFFLFVBQTBCLEVBQUUsRUFDeEMsZ0JBQWdCLEdBQUcsSUFBSSxNQUd0QixFQUFFO1FBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsVUFBVSxDQUFDLElBQUkscUJBQXFCLENBQUMsQ0FBQztTQUN0RTtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUVsRCxJQUFJLGdCQUFnQixFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksMkJBQVcsQ0FBQztnQkFDbkMsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUNsRCxJQUFJLEVBQUUsZUFBZSxVQUFVLENBQUMsSUFBSSxHQUFHO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSixDQUFDOztBQXZJSiwwQkE2SUM7QUFIUyxpQkFBUyxHQUFHLGlCQUFTLENBQUM7QUFFdEIsaUJBQVMsR0FBRyxpQkFBUyxDQUFDIn0=